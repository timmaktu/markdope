import type { ComponentRenderProps } from "../../registry/types";
import type { CalloutData } from "./defaults";

export function CalloutRenderer({ data }: ComponentRenderProps<CalloutData>) {
	return (
		<div className={`markdope-callout markdope-callout--${data.tone}`}>
			<div className="markdope-callout__title">{data.title}</div>
			<div className="markdope-callout__body">{data.body}</div>
		</div>
	);
}

