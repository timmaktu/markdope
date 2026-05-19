import type { ComponentRenderProps } from "../../registry/types";
import { Card, CardContent } from "../ui/card";
import { Switch } from "../ui/switch";
import type { ToggleData } from "./defaults";
import { buildToggleValuePatch } from "./visual-edit";

export function ToggleRenderer({ data, onPatch }: ComponentRenderProps<ToggleData>) {
	return (
		<Card className="gap-0">
			<CardContent className="flex items-center justify-between gap-4">
				<div className="space-y-1">
					<div className="text-sm leading-none font-medium">{data.label}</div>
					{data.description ? (
						<div className="text-muted-foreground text-sm">{data.description}</div>
					) : null}
				</div>
				<Switch
					aria-label={data.label}
					checked={data.value}
					onCheckedChange={(checked) => {
						onPatch?.(buildToggleValuePatch(checked));
					}}
				/>
			</CardContent>
		</Card>
	);
}
