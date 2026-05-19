import { z } from "zod";

export const timelineSchema = z.object({
	title: z.string().optional(),
	items: z
		.array(
			z.object({
				title: z.string().min(1, "title is required"),
				date: z.string().optional(),
				status: z.enum(["done", "next", "planned"]).optional(),
				description: z.string().optional()
			})
		)
		.min(1, "at least one timeline item is required")
});

