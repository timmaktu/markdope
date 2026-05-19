import type { VaultComponentFile } from "../../registry/types";

export function getTimelineVaultFiles(): VaultComponentFile[] {
	return [
		{
			name: "README.md",
			content: [
				"# official.timeline",
				"",
				"Use `official.timeline` for a compact roadmap, milestone list, or chronological status view."
			].join("\n")
		},
		{
			name: "schema.yaml",
			content: [
				"component: official.timeline",
				"version: 1",
				"title: string | optional",
				"items:",
				"  - title: string",
				"    date: string | optional",
				"    status: done | next | planned | optional",
				"    description: string | optional"
			].join("\n")
		},
		{
			name: "example.md",
			content: [
				"```markdope",
				"component: official.timeline",
				"version: 1",
				"title: Roadmap",
				"items:",
				"  - title: Discovery",
				"    date: 2026-05-19",
				"    status: done",
				"  - title: Prototype",
				"    date: 2026-05-26",
				"    status: next",
				"```"
			].join("\n")
		}
	];
}

