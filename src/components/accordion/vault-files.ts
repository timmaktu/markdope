import type { VaultComponentFile } from "../../registry/types";

export function getAccordionVaultFiles(): VaultComponentFile[] {
	return [
		{
			name: "README.md",
			content: [
				"# official.accordion",
				"",
				"Use `official.accordion` for FAQs, disclosure lists, or compact details sections."
			].join("\n")
		},
		{
			name: "schema.yaml",
			content: [
				"component: official.accordion",
				"version: 1",
				"title: string | optional",
				"type: single | multiple | optional",
				"defaultOpen:",
				"  - item-1",
				"items:",
				"  - title: string",
				"    content: string"
			].join("\n")
		},
		{
			name: "example.md",
			content: [
				"```markdope",
				"component: official.accordion",
				"version: 1",
				"title: Product Information",
				"type: single",
				"defaultOpen:",
				"  - item-1",
				"items:",
				"  - title: What does markdope preserve?",
				"    content: Your note remains plain Markdown.",
				"```"
			].join("\n")
		}
	];
}

