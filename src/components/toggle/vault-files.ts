import type { VaultComponentFile } from "../../registry/types";

export function getToggleVaultFiles(): VaultComponentFile[] {
	return [
		{
			name: "README.md",
			content: [
				"# official.toggle",
				"",
				"Use `official.toggle` for a human-readable boolean with a polished rendered switch.",
				"",
				"Rendered interactions can update the YAML `value` field directly in the note.",
				"",
				"Required fields:",
				"- `component`",
				"- `label`",
				"- `value`"
			].join("\n")
		},
		{
			name: "schema.yaml",
			content: [
				"component: official.toggle",
				"version: 1",
				"label: string",
				"description: string | optional",
				"value: boolean"
			].join("\n")
		},
		{
			name: "example.md",
			content: [
				"```markdope",
				"component: official.toggle",
				"version: 1",
				"label: Ship feature",
				"description: Toggle the release flag directly from the rendered switch.",
				"value: false",
				"```"
			].join("\n")
		}
	];
}

