import { normalizeFenceLanguage } from "../settings/settings";
import type { MarkdopeFenceBlock } from "./types";

interface ParsedFenceStart {
	fenceChar: "`" | "~";
	fenceLength: number;
	language: string;
}

export function parseMarkdopeFenceBlocks(
	markdown: string,
	allowedLanguages: string[]
): MarkdopeFenceBlock[] {
	const normalizedLanguages = new Set(
		allowedLanguages.map((entry) => normalizeFenceLanguage(entry)).filter(Boolean)
	);
	const blocks: MarkdopeFenceBlock[] = [];
	const lines = markdown.split("\n");
	const offsets = getLineOffsets(markdown);

	let lineIndex = 0;
	while (lineIndex < lines.length) {
		const parsedStart = parseFenceStart(lines[lineIndex]);
		if (!parsedStart || !normalizedLanguages.has(parsedStart.language)) {
			lineIndex += 1;
			continue;
		}

		const closingLineIndex = findClosingFenceLine(lines, lineIndex + 1, parsedStart);
		if (closingLineIndex === -1) {
			lineIndex += 1;
			continue;
		}

		const blockFrom = offsets[lineIndex];
		const afterClosingLine =
			closingLineIndex + 1 < offsets.length ? offsets[closingLineIndex + 1] : markdown.length;
		const blockTo = afterClosingLine;
		const contentFrom = offsets[lineIndex + 1] ?? blockFrom;
		const contentTo = offsets[closingLineIndex] ?? blockTo;

		blocks.push({
			from: blockFrom,
			to: blockTo,
			fenceLanguage: parsedStart.language,
			openingLine: lines[lineIndex],
			closingLine: lines[closingLineIndex],
			yamlText: markdown.slice(contentFrom, contentTo),
			rawText: markdown.slice(blockFrom, blockTo)
		});

		lineIndex = closingLineIndex + 1;
	}

	return blocks;
}

export function getLineOffsets(markdown: string): number[] {
	const offsets = [0];

	for (let index = 0; index < markdown.length; index += 1) {
		if (markdown[index] === "\n") {
			offsets.push(index + 1);
		}
	}

	return offsets;
}

export function getOffsetRangeForLines(
	markdown: string,
	lineStart: number,
	lineEnd: number
): { from: number; to: number } {
	const offsets = getLineOffsets(markdown);
	const from = offsets[Math.max(0, lineStart)] ?? 0;
	const to = offsets[lineEnd + 1] ?? markdown.length;
	return { from, to };
}

function parseFenceStart(line: string): ParsedFenceStart | null {
	const match = line.match(/^\s{0,3}([`~]{3,})(.*)$/);
	if (!match) {
		return null;
	}

	const fenceText = match[1];
	const infoString = match[2].trim();
	const language = normalizeFenceLanguage(infoString.split(/\s+/)[0] ?? "");

	return {
		fenceChar: fenceText[0] as "`" | "~",
		fenceLength: fenceText.length,
		language
	};
}

function findClosingFenceLine(
	lines: string[],
	startLineIndex: number,
	fenceStart: ParsedFenceStart
): number {
	const closingRegex = new RegExp(
		`^\\s{0,3}\\${fenceStart.fenceChar}{${fenceStart.fenceLength},}\\s*$`
	);

	for (let lineIndex = startLineIndex; lineIndex < lines.length; lineIndex += 1) {
		if (closingRegex.test(lines[lineIndex])) {
			return lineIndex;
		}
	}

	return -1;
}

