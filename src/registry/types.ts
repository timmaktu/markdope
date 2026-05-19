import type { ReactElement } from "react";
import type { ZodType } from "zod";

export interface ComponentPatch {
	type: "set";
	key: string;
	value: unknown;
}

export interface ComponentMetadata {
	id: string;
	namespace: "official";
	slug: string;
	version: number;
	displayName: string;
	description: string;
	supportsVisualEditing: boolean;
}

export interface VaultComponentFile {
	name: string;
	content: string;
}

export interface ComponentRenderProps<TData extends object> {
	data: TData;
	mode: "live-preview" | "reading";
	onPatch?: (patch: ComponentPatch) => void;
	onRequestSource?: () => void;
}

export interface ComponentDefinition<TData extends object = Record<string, unknown>> {
	metadata: ComponentMetadata;
	schema: ZodType<TData>;
	defaults: TData;
	render: (props: ComponentRenderProps<TData>) => ReactElement;
	getVaultFiles: () => VaultComponentFile[];
}
