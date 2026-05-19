import type { ComponentRenderProps } from "../../registry/types";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import type { StepsData } from "./defaults";

export function StepsRenderer({ data }: ComponentRenderProps<StepsData>) {
	return (
		<div className="space-y-3">
			{data.title ? <div className="text-sm font-medium">{data.title}</div> : null}
			<div className="space-y-3">
				{data.items.map((item, index) => (
					<Card key={`${item.title}-${index}`}>
						<CardContent className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-4 pt-6 max-sm:grid-cols-[2.25rem_1fr] max-sm:items-start">
							<div className="bg-muted text-foreground grid size-9 place-items-center rounded-lg border text-sm font-medium">
								{index + 1}
							</div>
							<div className="space-y-1">
								<CardTitle className="text-sm">{item.title}</CardTitle>
								{item.description ? (
									<CardDescription>
										{item.description}
									</CardDescription>
								) : null}
							</div>
							<Badge
								className="max-sm:col-start-2"
								variant={statusToBadgeVariant(item.status ?? "upcoming")}
							>
								{item.status ?? "upcoming"}
							</Badge>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

function statusToBadgeVariant(status: NonNullable<StepsData["items"][number]["status"]>) {
	switch (status) {
		case "done":
			return "default";
		case "current":
			return "secondary";
		default:
			return "outline";
	}
}
