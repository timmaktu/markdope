import { MarkdownView, Notice, Plugin, TFile } from "obsidian";
import { createOfficialComponentRegistry } from "./registry/component-registry";
import { buildMarkdopeFenceBlock } from "./yaml/serialize";
import { DEFAULT_SETTINGS, normalizeSettings, type MarkdopePluginSettings } from "./settings/settings";
import { MarkdopeSettingTab } from "./settings/settings-tab";
import { MarkdopeReadingRenderer } from "./preview/reading-renderer";
import { VaultComponentService } from "./vault/component-folder-service";

export default class MarkdopePlugin extends Plugin {
	settings: MarkdopePluginSettings = DEFAULT_SETTINGS;

	private readonly registry = createOfficialComponentRegistry();
	private readonly registeredFenceLanguages = new Set<string>();
	private readingRenderer!: MarkdopeReadingRenderer;
	private vaultComponentService!: VaultComponentService;

	async onload(): Promise<void> {
		this.settings = normalizeSettings(await this.loadData());
		this.readingRenderer = new MarkdopeReadingRenderer(
			this.app,
			this.registry,
			() => this.settings
		);
		this.vaultComponentService = new VaultComponentService(
			this.app,
			this.registry,
			() => this.settings
		);

		this.registerFenceLanguages(this.settings.fenceLanguages);
		this.addSettingTab(new MarkdopeSettingTab(this.app, this));
		this.addCommands();

		if (this.settings.initializeComponentsFolderOnLoad) {
			await this.vaultComponentService.ensureVaultStructure();
		}
	}

	async updateSettings(nextSettings: Partial<MarkdopePluginSettings>): Promise<void> {
		this.settings = normalizeSettings({
			...this.settings,
			...nextSettings
		});
		await this.saveData(this.settings);

		this.app.workspace.updateOptions();
		this.registerFenceLanguages(this.settings.fenceLanguages);
	}

	private registerFenceLanguages(languages: string[]): void {
		for (const language of languages) {
			if (this.registeredFenceLanguages.has(language)) {
				continue;
			}

			this.registerMarkdownCodeBlockProcessor(
				language,
				this.readingRenderer.createHandler(language)
			);
			this.registeredFenceLanguages.add(language);
		}
	}

	private addCommands(): void {
		this.addCommand({
			id: "initialize-components-folder",
			name: "Initialize markdope components folder",
			callback: async () => {
				const result = await this.vaultComponentService.ensureVaultStructure();
				new Notice(
					`markdope initialized component docs: ${result.created} created, ${result.skipped} already present.`
				);
			}
		});

		this.addCommand({
			id: "create-demo-note",
			name: "Create markdope demo note",
			callback: async () => {
				try {
					const file = await this.vaultComponentService.ensureDemoNote();
					if (!file) {
						new Notice("markdope could not create the demo note.");
						return;
					}

					await this.openFileSafely(file);
				} catch (error) {
					console.error("markdope failed to create or open the demo note", error);
					new Notice("markdope failed to open the demo note. Check the developer console.");
				}
			}
		});

		for (const component of this.registry.all()) {
			this.addCommand({
				id: `insert-${component.metadata.slug}-block`,
				name: `Insert ${component.metadata.displayName} block`,
				editorCallback: (editor) => {
					const language = this.settings.fenceLanguages[0] ?? "markdope";
					const block = buildMarkdopeFenceBlock({
						language,
						componentId: component.metadata.id,
						version: component.metadata.version,
						data: component.defaults
					});
					editor.replaceRange(`${block}\n`, editor.getCursor("to"));
				}
			});
		}

		this.addCommand({
			id: "open-components-folder-note",
			name: "Open markdope demo note or components folder",
			checkCallback: (checking) => {
				const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!activeView) {
					return false;
				}

				if (!checking) {
					void this.vaultComponentService.ensureDemoNote().then(async (file) => {
						if (file) {
							await this.openFileSafely(file);
						}
					});
				}

				return true;
			}
		});
	}

	private async openFileSafely(file: TFile): Promise<void> {
		const leaf = this.app.workspace.getLeaf(true);
		await leaf.openFile(file, {
			active: true,
			state: {
				mode: "source"
			}
		});
	}
}
