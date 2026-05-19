export interface StepItem {
	title: string;
	status?: "done" | "current" | "upcoming";
	description?: string;
}

export interface StepsData {
	title?: string;
	items: StepItem[];
}

export const stepsDefaults: StepsData = {
	title: "Release checklist",
	items: [
		{
			title: "Write the plugin skeleton",
			status: "done",
			description: "Create the modular source layout and core services."
		},
		{
			title: "Hook up Live Preview widgets",
			status: "current",
			description: "Swap rendered cards with raw YAML when the cursor enters the block."
		},
		{
			title: "Polish docs and starter content",
			status: "upcoming",
			description: "Explain the safe MVP and future extension path."
		}
	]
};

