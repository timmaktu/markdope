import { ZodError } from "zod";
import type { MarkdopeComponentRegistry } from "../registry/component-registry";
import { parseMarkdopeYamlSource } from "../yaml/parse";
import type { ResolvedMarkdopeBlock } from "./types";

export function resolveMarkdopeBlock(
	yamlText: string,
	rawText: string,
	registry: MarkdopeComponentRegistry
): ResolvedMarkdopeBlock {
	const parsed = parseMarkdopeYamlSource(yamlText, rawText);
	if (parsed.status === "error") {
		return {
			kind: "invalid-yaml",
			parsed,
			message: parsed.message
		};
	}

	if (!parsed.componentId) {
		return {
			kind: "invalid-data",
			componentId: null,
			parsed,
			issues: ["The component field is required."],
			message: "This block is missing the required component field."
		};
	}

	const component = registry.get(parsed.componentId);
	if (!component) {
		return {
			kind: "unknown-component",
			componentId: parsed.componentId,
			parsed,
			message: `The component "${parsed.componentId}" is not registered.`
		};
	}

	const validation = component.schema.safeParse(parsed.componentData);
	if (!validation.success) {
		return {
			kind: "invalid-data",
			component,
			componentId: parsed.componentId,
			parsed,
			issues: formatZodIssues(validation.error),
			message: `The data for "${parsed.componentId}" does not match the component schema.`
		};
	}

	return {
		kind: "renderable",
		component,
		parsed,
		data: validation.data
	};
}

function formatZodIssues(error: ZodError): string[] {
	return error.issues.map((issue) => {
		const path = issue.path.length > 0 ? issue.path.join(".") : "data";
		return `${path}: ${issue.message}`;
	});
}

