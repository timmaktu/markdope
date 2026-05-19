export interface ToggleData {
	label: string;
	description?: string;
	value: boolean;
}

export const toggleDefaults: ToggleData = {
	label: "Ship feature",
	description: "Click the rendered switch to edit the YAML boolean.",
	value: false
};

