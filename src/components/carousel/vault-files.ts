import type { VaultComponentFile } from "../../registry/types";

export function getCarouselVaultFiles(): VaultComponentFile[] {
	return [
		{
			name: "README.md",
			content: [
				"# official.carousel",
				"",
				"Use `official.carousel` for multi-slide highlights, summaries, or feature cards."
			].join("\n")
		},
		{
			name: "schema.yaml",
			content: [
				"component: official.carousel",
				"version: 1",
				"title: string | optional",
				"items:",
				"  - kicker: string | optional",
				"    title: string | optional",
				"    body: string | optional",
				"    image: url | optional",
				"    imageAlt: string | optional",
				"    imageFit: cover | contain | optional"
			].join("\n")
		},
		{
			name: "example.md",
			content: [
				"```markdope",
				"component: official.carousel",
				"version: 1",
				"title: Feature Highlights",
				"items:",
				"  - kicker: Markdown-first",
				"    title: Readable source notes",
				"    body: Keep content understandable to humans and AI.",
				"    image: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
				"    imageAlt: Desk workspace with laptop and notebook.",
				"  - title: Workspace Gallery",
				"    image: https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
				"    imageAlt: Open notebook and tidy desk setup.",
				"```"
			].join("\n")
		}
	];
}
