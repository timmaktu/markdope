import type { VaultComponentFile } from "../../registry/types";

export function getStatsVaultFiles(): VaultComponentFile[] {
	return [
		{
			name: "README.md",
			content: [
				"# official.stats",
				"",
				"Use `official.stats` for concise metric grids and summary cards."
			].join("\n")
		},
		{
			name: "schema.yaml",
			content: [
				"component: official.stats",
				"version: 1",
				"title: string | optional",
				"items:",
				"  - label: string",
				"    value: string | number",
				"    helper: string | optional"
			].join("\n")
		},
		{
			name: "example.md",
			content: [
				"```markdope",
				"component: official.stats",
				"version: 1",
				"title: Launch metrics",
				"items:",
				"  - label: Blocks rendered",
				"    value: 7",
				"  - label: Editable components",
				"    value: 1",
				"```"
			].join("\n")
		}
	];
}
