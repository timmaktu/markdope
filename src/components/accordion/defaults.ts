export interface AccordionItemData {
	title: string;
	content: string;
}

export interface AccordionData {
	title?: string;
	type?: "single" | "multiple";
	items: AccordionItemData[];
	defaultOpen?: string[];
}

export const accordionDefaults: AccordionData = {
	title: "Product Information",
	type: "single",
	defaultOpen: ["item-1"],
	items: [
		{
			title: "What does markdope preserve?",
			content: "Your note remains plain Markdown, and invalid YAML never silently destroys source content."
		},
		{
			title: "Why use shadcn components here?",
			content: "They give us a realistic target for future user-imported component support."
		},
		{
			title: "Can I still edit the raw block?",
			content: "Yes. In Live Preview, placing the cursor in the fence reveals the original YAML."
		}
	]
};

