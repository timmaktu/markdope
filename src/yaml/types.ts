export interface MarkdopeFenceBlock {
	from: number;
	to: number;
	fenceLanguage: string;
	openingLine: string;
	closingLine: string;
	yamlText: string;
	rawText: string;
}

export interface ParsedMarkdopeSourceOk {
	status: "ok";
	rawText: string;
	yamlText: string;
	componentId: string | null;
	version?: number | string;
	componentData: Record<string, unknown>;
	dataPlacement: "root" | "nested";
	sourceObject: Record<string, unknown>;
	yamlDocument: any;
}

export interface ParsedMarkdopeSourceError {
	status: "error";
	rawText: string;
	yamlText: string;
	componentId: string | null;
	errorKind: "yaml" | "shape";
	message: string;
}

export type ParsedMarkdopeSource = ParsedMarkdopeSourceOk | ParsedMarkdopeSourceError;

