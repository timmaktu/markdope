import { normalizePath } from "obsidian";

export interface MarkdopePluginSettings {
	fenceLanguages: string[];
	componentsFolder: string;
	initializeComponentsFolderOnLoad: boolean;
}

export const DEFAULT_SETTINGS: MarkdopePluginSettings = {
	fenceLanguages: ["markdope", "component"],
	componentsFolder: "markdope-components",
	initializeComponentsFolderOnLoad: true
};

export function parseFenceLanguagesInput(value: string): string[] {
	return value
		.split(/[\n,]/)
		.map((entry) => normalizeFenceLanguage(entry))
		.filter((entry, index, all) => entry.length > 0 && all.indexOf(entry) === index);
}

export function formatFenceLanguages(settings: MarkdopePluginSettings): string {
	return settings.fenceLanguages.join(", ");
}

export function normalizeFenceLanguage(value: string): string {
	return value.trim().toLowerCase();
}

export function normalizeSettings(
	partiallyDefined?: Partial<MarkdopePluginSettings> | null
): MarkdopePluginSettings {
	const nextFenceLanguages =
		partiallyDefined?.fenceLanguages && partiallyDefined.fenceLanguages.length > 0
			? partiallyDefined.fenceLanguages
			: DEFAULT_SETTINGS.fenceLanguages;

	return {
		fenceLanguages: nextFenceLanguages
			.map((entry) => normalizeFenceLanguage(entry))
			.filter((entry, index, all) => entry.length > 0 && all.indexOf(entry) === index),
		componentsFolder: normalizePath(
			partiallyDefined?.componentsFolder ?? DEFAULT_SETTINGS.componentsFolder
		),
		initializeComponentsFolderOnLoad:
			partiallyDefined?.initializeComponentsFolderOnLoad ??
			DEFAULT_SETTINGS.initializeComponentsFolderOnLoad
	};
}

