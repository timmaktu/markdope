import { accordionComponent } from "../components/accordion";
import type { ComponentDefinition } from "./types";
import { carouselComponent } from "../components/carousel";
import { calloutComponent } from "../components/callout";
import { statsComponent } from "../components/stats";
import { stepsComponent } from "../components/steps";
import { timelineComponent } from "../components/timeline";
import { toggleComponent } from "../components/toggle";

export class MarkdopeComponentRegistry {
	private readonly components = new Map<string, ComponentDefinition<any>>();

	constructor(definitions: ComponentDefinition<any>[]) {
		for (const definition of definitions) {
			this.components.set(definition.metadata.id, definition);
		}
	}

	get(componentId: string | null | undefined): ComponentDefinition<any> | undefined {
		if (!componentId) {
			return undefined;
		}

		return this.components.get(componentId);
	}

	all(): ComponentDefinition<any>[] {
		return Array.from(this.components.values());
	}
}

export function createOfficialComponentRegistry(): MarkdopeComponentRegistry {
	return new MarkdopeComponentRegistry([
		toggleComponent,
		calloutComponent,
		accordionComponent,
		carouselComponent,
		timelineComponent,
		stepsComponent,
		statsComponent
	]);
}
