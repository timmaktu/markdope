export interface TimelineItem {
	title: string;
	date?: string;
	status?: "done" | "next" | "planned";
	description?: string;
}

export interface TimelineData {
	title?: string;
	items: TimelineItem[];
}

export const timelineDefaults: TimelineData = {
	title: "Roadmap",
	items: [
		{
			title: "Discovery",
			date: "2026-05-19",
			status: "done",
			description: "Validate the editor and reading-mode architecture."
		},
		{
			title: "Prototype",
			date: "2026-05-26",
			status: "next",
			description: "Prove Live Preview swapping and toggle write-back."
		},
		{
			title: "Refine",
			date: "2026-06-02",
			status: "planned",
			description: "Harden docs, styling, and component pack ergonomics."
		}
	]
};

