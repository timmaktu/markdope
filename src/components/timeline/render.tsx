import type { ComponentRenderProps } from "../../registry/types";
import { Badge } from "../ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import type { TimelineData } from "./defaults";

export function TimelineRenderer({ data }: ComponentRenderProps<TimelineData>) {
	return (
		<div className="space-y-3">
			{data.title ? <div className="text-sm font-medium">{data.title}</div> : null}
			<div className="relative space-y-4 pl-7 before:absolute before:inset-y-3 before:left-[0.4375rem] before:w-px before:bg-border">
				{data.items.map((item, index) => (
					<div className="relative" key={`${item.title}-${index}`}>
						<div
							className={cn(
								"absolute left-[-1.75rem] top-6 size-3.5 rounded-full border-[3px] border-background shadow-sm",
								item.status === "done" && "bg-primary",
								item.status === "next" && "bg-secondary",
								(!item.status || item.status === "planned") && "bg-muted"
							)}
						/>
						<Card className="gap-4 py-5">
							<CardHeader className="gap-3">
								<div className="flex flex-wrap items-center gap-2">
									<CardTitle className="text-base">{item.title}</CardTitle>
									{item.date ? (
										<Badge variant="outline" className="font-normal">
											{item.date}
										</Badge>
									) : null}
								</div>
								{item.status ? (
									<CardAction>
										<Badge variant={statusToBadgeVariant(item.status)}>
											{capitalize(item.status)}
										</Badge>
									</CardAction>
								) : null}
							</CardHeader>
							{item.description ? (
								<CardContent className="text-sm text-muted-foreground">
									{item.description}
								</CardContent>
							) : null}
						</Card>
					</div>
				))}
			</div>
		</div>
	);
}

function statusToBadgeVariant(status: NonNullable<TimelineData["items"][number]["status"]>) {
	switch (status) {
		case "done":
			return "default";
		case "next":
			return "secondary";
		default:
			return "outline";
	}
}

function capitalize(value: string): string {
	return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}
