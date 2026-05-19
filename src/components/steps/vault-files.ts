import type { VaultComponentFile } from "../../registry/types";

export function getStepsVaultFiles(): VaultComponentFile[] {
	return [
		{
			name: "README.md",
			content: [
				"# official.steps",
				"",
				"Use `official.steps` for sequential work, checklists, or rollout plans."
			].join("\n")
		},
		{
			name: "schema.yaml",
			content: [
				"component: official.steps",
				"version: 1",
				"title: string | optional",
				"items:",
				"  - title: string",
				"    status: done | current | upcoming | optional",
				"    description: string | optional"
			].join("\n")
		},
		{
			name: "example.md",
			content: [
				"```markdope",
				"component: official.steps",
				"version: 1",
				"title: Release checklist",
				"items:",
				"  - title: Draft architecture",
				"    status: done",
				"  - title: Wire up preview renderer",
				"    status: current",
				"```"
			].join("\n")
		}
	];
}

