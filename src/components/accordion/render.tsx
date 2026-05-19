import type { ComponentRenderProps } from "../../registry/types";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "../ui/accordion";
import type { AccordionData } from "./defaults";

export function AccordionRenderer({ data }: ComponentRenderProps<AccordionData>) {
	const type = data.type ?? "single";
	const contentClassName = "text-sm text-muted-foreground";

	return (
		<div className="space-y-3">
			{data.title ? <div className="text-sm font-medium">{data.title}</div> : null}
			{type === "multiple" ? (
				<Accordion
					type="multiple"
					defaultValue={data.defaultOpen ?? ["item-1"]}
					className="w-full"
				>
					{data.items.map((item, index) => (
						<AccordionItem key={`${item.title}-${index}`} value={`item-${index + 1}`}>
							<AccordionTrigger>{item.title}</AccordionTrigger>
							<AccordionContent className={contentClassName}>{item.content}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			) : (
				<Accordion
					type="single"
					collapsible
					defaultValue={data.defaultOpen?.[0] ?? "item-1"}
					className="w-full"
				>
					{data.items.map((item, index) => (
						<AccordionItem key={`${item.title}-${index}`} value={`item-${index + 1}`}>
							<AccordionTrigger>{item.title}</AccordionTrigger>
							<AccordionContent className={contentClassName}>{item.content}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			)}
		</div>
	);
}
