import { parseDocument } from "yaml";
import type { ParsedMarkdopeSource, ParsedMarkdopeSourceOk } from "./types";

export function parseMarkdopeYamlSource(yamlText: string, rawText = yamlText): ParsedMarkdopeSource {
	const yamlDocument = parseDocument(yamlText, {
		prettyErrors: true,
		merge: true
	});

	if (yamlDocument.errors.length > 0) {
		return {
			status: "error",
			rawText,
			yamlText,
			componentId: null,
			errorKind: "yaml",
			message: yamlDocument.errors.map((error) => error.message).join("\n")
		};
	}

	const sourceObject = yamlDocument.toJSON();
	if (!isPlainRecord(sourceObject)) {
		return {
			status: "error",
			rawText,
			yamlText,
			componentId: null,
			errorKind: "shape",
			message: "The YAML block must be an object with a required component field."
		};
	}

	const componentId = typeof sourceObject.component === "string" ? sourceObject.component : null;
	const version =
		typeof sourceObject.version === "string" || typeof sourceObject.version === "number"
			? sourceObject.version
			: undefined;
	const usesNestedData = isPlainRecord(sourceObject.data);
	const componentData = usesNestedData
		? { ...sourceObject.data }
		: omitKeys(sourceObject, ["component", "version"]);

	return {
		status: "ok",
		rawText,
		yamlText,
		componentId,
		version,
		componentData,
		dataPlacement: usesNestedData ? "nested" : "root",
		sourceObject: sourceObject as Record<string, unknown>,
		yamlDocument
	};
}

export function isParsedMarkdopeSourceOk(
	value: ParsedMarkdopeSource
): value is ParsedMarkdopeSourceOk {
	return value.status === "ok";
}

function omitKeys(source: Record<string, unknown>, keys: string[]): Record<string, unknown> {
	const omitted = new Set(keys);

	return Object.fromEntries(
		Object.entries(source).filter(([key]) => !omitted.has(key))
	);
}

function isPlainRecord(value: unknown): value is Record<string, any> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

