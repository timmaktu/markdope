import { App, PluginSettingTab, Setting } from "obsidian";
import { formatFenceLanguages, parseFenceLanguagesInput } from "./settings";
import type MarkdopePlugin from "../main";

export class MarkdopeSettingTab extends PluginSettingTab {
	constructor(app: App, private readonly plugin: MarkdopePlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "markdope" });

		new Setting(containerEl)
			.setName("Fence languages")
			.setDesc(
				"Comma- or newline-separated code fence languages that markdope should recognize."
			)
			.addTextArea((text) => {
				text
					.setPlaceholder("markdope, component")
					.setValue(formatFenceLanguages(this.plugin.settings))
					.onChange(async (value) => {
						const parsedLanguages = parseFenceLanguagesInput(value);
						await this.plugin.updateSettings({
							fenceLanguages:
								parsedLanguages.length > 0
									? parsedLanguages
									: this.plugin.settings.fenceLanguages
						});
					});
				text.inputEl.rows = 3;
				text.inputEl.addClass("markdope-settings-textarea");
			});

		new Setting(containerEl)
			.setName("Components folder")
			.setDesc("Vault folder where markdope writes official component docs and starter examples.")
			.addText((text) =>
				text
					.setPlaceholder("markdope-components")
					.setValue(this.plugin.settings.componentsFolder)
					.onChange(async (value) => {
						const nextValue = value.trim();
						await this.plugin.updateSettings({
							componentsFolder:
								nextValue.length > 0 ? nextValue : this.plugin.settings.componentsFolder
						});
					})
			);

		new Setting(containerEl)
			.setName("Initialize components folder on load")
			.setDesc(
				"Create the markdope vault folder structure when the plugin loads, if it does not exist yet."
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.initializeComponentsFolderOnLoad)
					.onChange(async (value) => {
						await this.plugin.updateSettings({
							initializeComponentsFolderOnLoad: value
						});
					})
			);
	}
}

