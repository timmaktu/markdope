import { z } from "zod";

export const accordionSchema = z.object({
	title: z.string().optional(),
	type: z.enum(["single", "multiple"]).optional(),
	defaultOpen: z.array(z.string()).optional(),
	items: z
		.array(
			z.object({
				title: z.string().min(1, "title is required"),
				content: z.string().min(1, "content is required")
			})
		)
		.min(1, "at least one accordion item is required")
});

