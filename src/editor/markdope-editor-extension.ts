import { Decoration, type DecorationSet, EditorView } from "@codemirror/view";
import {
	RangeSetBuilder,
	StateField,
	type EditorState,
	type Extension
} from "@codemirror/state";
import { editorLivePreviewField } from "obsidian";
import type { MarkdopeComponentRegistry } from "../registry/component-registry";
import type { MarkdopePluginSettings } from "../settings/settings";
import { resolveMarkdopeBlock } from "../preview/resolve-markdope-block";
import { parseMarkdopeFenceBlocks } from "../yaml/block-parser";
import { MarkdopeBlockWidget } from "./markdope-widget";

interface MarkdopeEditorExtensionContext {
	registry: MarkdopeComponentRegistry;
	getSettings: () => MarkdopePluginSettings;
}

export function createMarkdopeEditorExtension(
	context: MarkdopeEditorExtensionContext
): Extension {
	const markdopeDecorations = StateField.define<DecorationSet>({
		create(state) {
			return buildDecorations(state, context);
		},
		update(decorations, transaction) {
			if (transaction.docChanged || !transaction.startState.selection.eq(transaction.state.selection)) {
				return buildDecorations(transaction.state, context);
			}

			return decorations;
		},
		provide: (field) => EditorView.decorations.from(field)
	});

	return [markdopeDecorations];
}

function buildDecorations(
	state: EditorState,
	context: MarkdopeEditorExtensionContext
): DecorationSet {
	const builder = new RangeSetBuilder<Decoration>();
	const isLivePreview = state.field(editorLivePreviewField, false);
	if (!isLivePreview) {
		return builder.finish();
	}

	const markdown = state.doc.toString();
	const blocks = parseMarkdopeFenceBlocks(markdown, context.getSettings().fenceLanguages);

	for (const block of blocks) {
		if (selectionIntersectsBlock(state, block.from, block.to)) {
			continue;
		}

		let resolved;
		try {
			resolved = resolveMarkdopeBlock(block.yamlText, block.rawText, context.registry);
		} catch (error) {
			console.error("markdope failed to resolve a Live Preview block", error);
			continue;
		}

		builder.add(
			block.from,
			block.to,
			Decoration.replace({
				widget: new MarkdopeBlockWidget({
					block,
					resolved,
					getSettings: context.getSettings
				}),
				block: true
			})
		);
	}

	return builder.finish();
}

function selectionIntersectsBlock(state: EditorState, from: number, to: number): boolean {
	return state.selection.ranges.some((range) => !(range.to <= from || range.from >= to));
}
