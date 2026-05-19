import type { VaultComponentFile } from "../../registry/types";

export function getCalloutVaultFiles(): VaultComponentFile[] {
	return [
		{
			name: "README.md",
			content: [
				"# official.callout",
				"",
				"Use `official.callout` for concise highlight cards, notes, or warnings.",
				"",
				"Supported tones: `info`, `success`, `warning`, `danger`."
			].join("\n")
		},
		{
			name: "schema.yaml",
			content: [
				"component: official.callout",
				"version: 1",
				"title: string",
				"body: string",
				"tone: info | success | warning | danger"
			].join("\n")
		},
		{
			name: "example.md",
			content: [
				"```markdope",
				"component: official.callout",
				"version: 1",
				"title: Design note",
				"body: Keep the YAML approachable and the rendered block polished.",
				"tone: info",
				"```"
			].join("\n")
		}
	];
}

