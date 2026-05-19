import type { ComponentRenderProps } from "../../registry/types";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "../ui/carousel";
import type { CarouselData } from "./defaults";

export function CarouselRenderer({ data }: ComponentRenderProps<CarouselData>) {
	return (
		<div className="space-y-3">
			{data.title ? <div className="text-sm font-medium">{data.title}</div> : null}
			<Carousel
				opts={{
					align: "start",
					loop: data.items.length > 1
				}}
				className="pr-0"
			>
				<CarouselContent>
					{data.items.map((item, index) => (
						<CarouselItem key={`${item.title ?? item.image ?? "slide"}-${index}`}>
							<Card className="h-full gap-0 overflow-hidden py-0">
								{item.image ? (
									<div className="bg-muted aspect-video w-full overflow-hidden border-b">
										<img
											alt={item.imageAlt ?? item.title ?? "Carousel image"}
											className={cn(
												"h-full w-full",
												item.imageFit === "contain" ? "object-contain" : "object-cover"
											)}
											loading="lazy"
											src={item.image}
										/>
									</div>
								) : null}
								{item.kicker || item.title ? (
									<CardHeader className="gap-3 pt-5">
										{item.kicker ? <Badge variant="outline">{item.kicker}</Badge> : null}
										{item.title ? (
											<CardTitle className="text-base">{item.title}</CardTitle>
										) : null}
									</CardHeader>
								) : null}
								{item.body ? (
									<CardContent
										className={cn(
											"pb-5 text-sm text-muted-foreground",
											!(item.kicker || item.title) && "pt-5"
										)}
									>
										{item.body}
									</CardContent>
								) : null}
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
