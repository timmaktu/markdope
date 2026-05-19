import type { ComponentRenderProps } from "../../registry/types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import type { CalloutData } from "./defaults";
import { cn } from "../../lib/utils";

export function CalloutRenderer({ data }: ComponentRenderProps<CalloutData>) {
	return (
		<Alert className={cn("shadow-xs", toneClass(data.tone))} variant={mapToneToAlertVariant(data.tone)}>
			<AlertTitle>{data.title}</AlertTitle>
			<AlertDescription>{data.body}</AlertDescription>
		</Alert>
	);
}

function mapToneToAlertVariant(tone: CalloutData["tone"]) {
	switch (tone) {
		case "danger":
			return "destructive";
		default:
			return "default";
	}
}

function toneClass(tone: CalloutData["tone"]) {
	switch (tone) {
		case "success":
			return "border-l-4 border-l-emerald-500";
		case "warning":
			return "border-l-4 border-l-amber-500";
		case "danger":
			return "border-l-4 border-l-red-500";
		default:
			return "border-l-4 border-l-blue-500";
	}
}
