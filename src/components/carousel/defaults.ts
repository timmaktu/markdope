export interface CarouselSlideData {
	title?: string;
	body?: string;
	kicker?: string;
	image?: string;
	imageAlt?: string;
	imageFit?: "cover" | "contain";
}

export interface CarouselData {
	title?: string;
	items: CarouselSlideData[];
}

export const carouselDefaults: CarouselData = {
	title: "Feature Highlights",
	items: [
		{
			kicker: "Markdown-first",
			title: "Readable source notes",
			body: "Keep content understandable to both humans and AI without MDX or JSX in the note body.",
			image:
				"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
			imageAlt: "Desk workspace with laptop, notebook, and coffee mug.",
			imageFit: "cover"
		},
		{
			kicker: "Live Preview",
			title: "Source when focused",
			body: "When your cursor enters the fence, the raw YAML becomes editable source again.",
			image:
				"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
			imageAlt: "Open notebook and desk setup viewed from above.",
			imageFit: "cover"
		},
		{
			kicker: "Safe MVP",
			title: "Trusted built-ins first",
			body: "Official components are bundled safely while the future pack system stays extensible.",
			image:
				"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
			imageAlt: "Team working together around a table.",
			imageFit: "cover"
		}
	]
};
