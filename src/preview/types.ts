import type { ComponentDefinition } from "../registry/types";
import type { ParsedMarkdopeSourceError, ParsedMarkdopeSourceOk } from "../yaml/types";

export type ResolvedMarkdopeBlock =
	| {
			kind: "renderable";
			component: ComponentDefinition<any>;
			parsed: ParsedMarkdopeSourceOk;
			data: Record<string, unknown>;
		}
	| {
			kind: "unknown-component";
			componentId: string | null;
			parsed: ParsedMarkdopeSourceOk;
			message: string;
		}
	| {
			kind: "invalid-yaml";
			parsed: ParsedMarkdopeSourceError;
			message: string;
		}
	| {
			kind: "invalid-data";
			component?: ComponentDefinition<any>;
			componentId: string | null;
			parsed: ParsedMarkdopeSourceOk;
			issues: string[];
			message: string;
		};

