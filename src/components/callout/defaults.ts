export interface CalloutData {
	title: string;
	body: string;
	tone: "info" | "success" | "warning" | "danger";
}

export const calloutDefaults: CalloutData = {
	title: "Design note",
	body: "Keep the Markdown readable, but let the rendered block feel more intentional than plain YAML.",
	tone: "info"
};

