import type { ComponentRenderProps } from "../../registry/types";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { StatsData } from "./defaults";

export function StatsRenderer({ data }: ComponentRenderProps<StatsData>) {
	return (
		<div className="space-y-3">
			{data.title ? <div className="text-sm font-medium">{data.title}</div> : null}
			<div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
				{data.items.map((item, index) => (
					<Card key={`${item.label}-${index}`}>
						<CardHeader className="gap-3">
							<Badge variant="outline" className="uppercase tracking-[0.04em]">
								{item.label}
							</Badge>
							<CardTitle className="text-2xl">{item.value}</CardTitle>
						</CardHeader>
						{item.helper ? (
							<CardContent className="text-muted-foreground text-sm">{item.helper}</CardContent>
						) : null}
					</Card>
				))}
			</div>
		</div>
	);
}
