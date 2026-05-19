import { stringify } from "yaml";
import type { ComponentPatch } from "../registry/types";
import type { MarkdopeFenceBlock, ParsedMarkdopeSourceOk } from "./types";

interface BuildFenceBlockOptions {
	language: string;
	componentId: string;
	version?: number | string;
	data: Record<string, unknown>;
	dataPlacement?: "root" | "nested";
}

export function buildMarkdopeFenceBlock(options: BuildFenceBlockOptions): string {
	const yamlText = buildMarkdopeYamlText(options);
	return `\`\`\`${options.language}\n${ensureTrailingNewline(yamlText)}\`\`\``;
}

export function buildMarkdopeYamlText(options: BuildFenceBlockOptions): string {
	const yamlPayload =
		options.dataPlacement === "nested"
			? {
					component: options.componentId,
					version: options.version ?? 1,
					data: options.data
				}
			: {
					component: options.componentId,
					version: options.version ?? 1,
					...options.data
				};

	return stringify(yamlPayload).trimEnd();
}

export function applyPatchToMarkdopeYaml(
	parsed: ParsedMarkdopeSourceOk,
	patch: ComponentPatch
): string {
	const nextDocument = parsed.yamlDocument.clone();
	const targetPath = parsed.dataPlacement === "nested" ? ["data", patch.key] : [patch.key];

	if (patch.type === "set") {
		nextDocument.setIn(targetPath, patch.value);
	}

	return String(nextDocument).trimEnd();
}

export function rebuildMarkdopeFenceBlock(
	block: MarkdopeFenceBlock,
	updatedYamlText: string
): string {
	const trailingNewline = block.rawText.endsWith("\n") ? "\n" : "";
	return `${block.openingLine}\n${ensureTrailingNewline(updatedYamlText)}${block.closingLine}${trailingNewline}`;
}

function ensureTrailingNewline(value: string): string {
	return value.endsWith("\n") ? value : `${value}\n`;
}
