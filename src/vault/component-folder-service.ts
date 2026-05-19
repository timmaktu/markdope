import { TFile, normalizePath } from "obsidian";
import type { App } from "obsidian";
import type { MarkdopeComponentRegistry } from "../registry/component-registry";
import { buildMarkdopeFenceBlock } from "../yaml/serialize";
import type { MarkdopePluginSettings } from "../settings/settings";

interface DemoSection {
	marker: string;
	content: string;
}

export class VaultComponentService {
	constructor(
		private readonly app: App,
		private readonly registry: MarkdopeComponentRegistry,
		private readonly getSettings: () => MarkdopePluginSettings
	) {}

	async ensureVaultStructure(): Promise<{ created: number; skipped: number }> {
		const settings = this.getSettings();
		const baseFolder = normalizePath(settings.componentsFolder);
		let created = 0;
		let skipped = 0;

		await this.ensureFolder(baseFolder);
		await this.ensureFolder(`${baseFolder}/official`);

		for (const component of this.registry.all()) {
			const componentFolder = `${baseFolder}/official/${component.metadata.slug}`;
			await this.ensureFolder(componentFolder);

			for (const file of component.getVaultFiles()) {
				const fileWasCreated = await this.ensureFile(
					`${componentFolder}/${file.name}`,
					file.content
				);
				if (fileWasCreated) {
					created += 1;
				} else {
					skipped += 1;
				}
			}
		}

		return { created, skipped };
	}

	async ensureDemoNote(): Promise<TFile | null> {
		await this.ensureVaultStructure();

		const settings = this.getSettings();
		const demoPath = normalizePath(`${settings.componentsFolder}/Markdope Demo.md`);
		const existingFile = this.app.vault.getFileByPath(demoPath);
		if (existingFile) {
			await this.syncDemoNote(existingFile);
			return existingFile;
		}

		return this.app.vault.create(demoPath, this.buildDemoNote());
	}

	private buildDemoNote(): string {
		const language = this.getSettings().fenceLanguages[0] ?? "markdope";

		return [
			"# Markdope Demo",
			"",
			"These blocks stay as plain Markdown in source mode and render as richer components in Live Preview and Reading Mode.",
			"",
			...this.buildDemoSections(language).flatMap((section) => [section.content, ""])
		].join("\n");
	}

	private async syncDemoNote(file: TFile): Promise<void> {
		const currentContent = await this.app.vault.cachedRead(file);
		const language = this.getSettings().fenceLanguages[0] ?? "markdope";
		const missingBlocks = this.buildDemoSections(language)
			.filter((section) => !currentContent.includes(section.marker))
			.flatMap((section) => [section.content, ""]);

		if (missingBlocks.length === 0) {
			return;
		}

		const nextContent = `${currentContent.trimEnd()}\n\n${missingBlocks.join("\n")}`.trimEnd() + "\n";
		await this.app.vault.modify(file, nextContent);
	}

	private buildDemoSections(language: string): DemoSection[] {
		return [
			...this.registry.all().map((component) => ({
				marker: `component: ${component.metadata.id}`,
				content: buildMarkdopeFenceBlock({
					language,
					componentId: component.metadata.id,
					version: component.metadata.version,
					data: component.defaults
				})
			})),
			{
				marker: "## Image Carousel Example",
				content: [
					"## Image Carousel Example",
					"",
					buildMarkdopeFenceBlock({
						language,
						componentId: "official.carousel",
						version: 1,
						data: {
							title: "Workspace Gallery",
							items: [
								{
									title: "Desk setup",
									image:
										"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
									imageAlt: "Desk workspace with laptop, notebook, and coffee mug."
								},
								{
									title: "Planning session",
									image:
										"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
									imageAlt: "Open notebook and desk setup viewed from above."
								},
								{
									title: "Team review",
									image:
										"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
									imageAlt: "Team collaborating around a table."
								}
							]
						}
					})
				].join("\n")
			}
		];
	}

	private async ensureFolder(path: string): Promise<void> {
		if (this.app.vault.getAbstractFileByPath(path)) {
			return;
		}

		const parts = normalizePath(path).split("/");
		let currentPath = "";
		for (const part of parts) {
			currentPath = currentPath ? `${currentPath}/${part}` : part;
			if (!this.app.vault.getAbstractFileByPath(currentPath)) {
				await this.app.vault.createFolder(currentPath);
			}
		}
	}

	private async ensureFile(path: string, content: string): Promise<boolean> {
		if (this.app.vault.getAbstractFileByPath(path)) {
			return false;
		}

		await this.app.vault.create(path, content);
		return true;
	}
}
