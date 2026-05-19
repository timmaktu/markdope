import type { ComponentPatch } from "../../registry/types";

export function buildToggleValuePatch(value: boolean): ComponentPatch {
	return {
		type: "set",
		key: "value",
		value
	};
}

