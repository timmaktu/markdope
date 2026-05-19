import { WidgetType, type EditorView } from "@codemirror/view";
import type { MarkdopePluginSettings } from "../settings/settings";
import type { MarkdopeFenceBlock } from "../yaml/types";
import type { ResolvedMarkdopeBlock } from "../preview/types";
import { mountReactComponent } from "../preview/react-root";
import { SafeMarkdopeBlockView } from "../preview/safe-markdope-block-view";
import { applyPatchToMarkdopeYaml, rebuildMarkdopeFenceBlock } from "../yaml/serialize";

interface MarkdopeBlockWidgetProps {
	block: MarkdopeFenceBlock;
	resolved: ResolvedMarkdopeBlock;
	getSettings: () => MarkdopePluginSettings;
}

export class MarkdopeBlockWidget extends WidgetType {
	constructor(private readonly props: MarkdopeBlockWidgetProps) {
		super();
	}

	toDOM(view: EditorView): HTMLElement {
		const container = document.createElement("div");
		container.className = "markdope-widget";
		container.contentEditable = "false";

		const unmount = mountReactComponent(
			container,
			<SafeMarkdopeBlockView
				resolved={this.props.resolved}
				mode="live-preview"
				onPatch={(patch) => {
					if (this.props.resolved.kind !== "renderable") {
						return;
					}

					const nextYaml = applyPatchToMarkdopeYaml(this.props.resolved.parsed, patch);
					const nextRawBlock = rebuildMarkdopeFenceBlock(this.props.block, nextYaml);

					view.dispatch({
						changes: {
							from: this.props.block.from,
							to: this.props.block.to,
							insert: nextRawBlock
						}
					});
				}}
			/>
		);

		Object.assign(container, {
			__markdopeUnmount: unmount
		});

		return container;
	}

	destroy(dom: HTMLElement): void {
		const cleanup = (dom as HTMLElement & { __markdopeUnmount?: () => void }).__markdopeUnmount;
		cleanup?.();
	}

	ignoreEvent(): boolean {
		return false;
	}
}
