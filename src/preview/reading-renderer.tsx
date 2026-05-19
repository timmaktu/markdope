import { MarkdownRenderChild, Notice } from "obsidian";
import type { App, MarkdownPostProcessorContext } from "obsidian";
import type { MarkdopeComponentRegistry } from "../registry/component-registry";
import type { MarkdopePluginSettings } from "../settings/settings";
import { mountReactComponent } from "./react-root";
import { resolveMarkdopeBlock } from "./resolve-markdope-block";
import { SafeMarkdopeBlockView } from "./safe-markdope-block-view";
import { applyPatchFromReadingMode } from "../vault/source-updater";

export class MarkdopeReadingRenderer {
	constructor(
		private readonly app: App,
		private readonly registry: MarkdopeComponentRegistry,
		private readonly getSettings: () => MarkdopePluginSettings
	) {}

	createHandler(language: string) {
		return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
			if (!this.getSettings().fenceLanguages.includes(language)) {
				renderRawCodeBlock(el, language, source);
				return;
			}

			let resolved;
			try {
				resolved = resolveMarkdopeBlock(source, source, this.registry);
			} catch (error) {
				console.error("markdope failed to resolve a Reading Mode block", error);
				renderRawCodeBlock(el, language, source);
				return;
			}
			const child = new ReactBlockRenderChild(
				el,
				<SafeMarkdopeBlockView
					resolved={resolved}
					mode="reading"
					onPatch={async (patch) => {
						const result = await applyPatchFromReadingMode(this.app, {
							sourcePath: ctx.sourcePath,
							expectedYamlText: source,
							allowedLanguages: this.getSettings().fenceLanguages,
							patch,
							sectionInfo: ctx.getSectionInfo(el)
						});

						if (!result.ok) {
							new Notice(result.message);
						}
					}}
				/>
			);

			ctx.addChild(child);
		};
	}
}

class ReactBlockRenderChild extends MarkdownRenderChild {
	private readonly cleanup: () => void;

	constructor(containerEl: HTMLElement, element: JSX.Element) {
		super(containerEl);
		containerEl.contentEditable = "false";
		this.cleanup = mountReactComponent(containerEl, element);
	}

	onunload(): void {
		this.cleanup();
	}
}

function renderRawCodeBlock(el: HTMLElement, language: string, source: string): void {
	el.empty();
	const pre = el.createEl("pre", { cls: "markdope-raw-code" });
	pre.createEl("code", {
		cls: `language-${language}`,
		text: source
	});
}
