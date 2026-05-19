import type { App, Editor, MarkdownSectionInformation } from "obsidian";
import { MarkdownView } from "obsidian";
import type { ComponentPatch } from "../registry/types";
import { parseMarkdopeFenceBlocks, getOffsetRangeForLines } from "../yaml/block-parser";
import { parseMarkdopeYamlSource } from "../yaml/parse";
import { applyPatchToMarkdopeYaml, rebuildMarkdopeFenceBlock } from "../yaml/serialize";

interface ReadingModePatchRequest {
	sourcePath: string;
	expectedYamlText: string;
	allowedLanguages: string[];
	patch: ComponentPatch;
	sectionInfo?: MarkdownSectionInformation | null;
}

export async function applyPatchFromReadingMode(
	app: App,
	request: ReadingModePatchRequest
): Promise<{ ok: true } | { ok: false; message: string }> {
	const editor = findOpenEditorForPath(app, request.sourcePath);
	if (editor) {
		const updated = applyPatchToSourceText(editor.getValue(), request);
		if (!updated) {
			return { ok: false, message: "markdope could not locate the source block to update." };
		}

		editor.replaceRange(
			updated.replacement,
			editor.offsetToPos(updated.from),
			editor.offsetToPos(updated.to)
		);
		return { ok: true };
	}

	const file = app.vault.getFileByPath(request.sourcePath);
	if (!file) {
		return { ok: false, message: `The source note "${request.sourcePath}" was not found.` };
	}

	let updateFailed = false;
	await app.vault.process(file, (content) => {
		const updated = applyPatchToSourceText(content, request);
		if (!updated) {
			updateFailed = true;
			return content;
		}

		return `${content.slice(0, updated.from)}${updated.replacement}${content.slice(updated.to)}`;
	});

	if (updateFailed) {
		return { ok: false, message: "markdope could not locate the source block to update." };
	}

	return { ok: true };
}

function applyPatchToSourceText(
	content: string,
	request: ReadingModePatchRequest
): { from: number; to: number; replacement: string } | null {
	const sectionRange = request.sectionInfo
		? getOffsetRangeForLines(content, request.sectionInfo.lineStart, request.sectionInfo.lineEnd)
		: { from: 0, to: content.length };
	const sectionText = content.slice(sectionRange.from, sectionRange.to);
	const sectionBlocks = parseMarkdopeFenceBlocks(sectionText, request.allowedLanguages);
	const sectionMatch = findMatchingBlock(sectionBlocks, request.expectedYamlText);
	const globalMatch =
		sectionMatch ??
		findMatchingBlock(parseMarkdopeFenceBlocks(content, request.allowedLanguages), request.expectedYamlText);

	if (!globalMatch) {
		return null;
	}

	const blockFrom = sectionMatch ? sectionMatch.from + sectionRange.from : globalMatch.from;
	const blockTo = sectionMatch ? sectionMatch.to + sectionRange.from : globalMatch.to;
	const block = sectionMatch ?? globalMatch;
	const parsed = parseMarkdopeYamlSource(block.yamlText, block.rawText);
	if (parsed.status !== "ok") {
		return null;
	}

	const updatedYaml = applyPatchToMarkdopeYaml(parsed, request.patch);
	return {
		from: blockFrom,
		to: blockTo,
		replacement: rebuildMarkdopeFenceBlock(block, updatedYaml)
	};
}

function findMatchingBlock(
	blocks: ReturnType<typeof parseMarkdopeFenceBlocks>,
	expectedYamlText: string
) {
	return (
		blocks.find((block) => block.yamlText === expectedYamlText) ??
		blocks.find((block) => block.yamlText.trimEnd() === expectedYamlText.trimEnd())
	);
}

function findOpenEditorForPath(app: App, sourcePath: string): Editor | null {
	for (const leaf of app.workspace.getLeavesOfType("markdown")) {
		const view = leaf.view;
		if (view instanceof MarkdownView && view.file?.path === sourcePath && view.editor) {
			return view.editor;
		}
	}

	return null;
}
