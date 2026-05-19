import { z } from "zod";

export const stepsSchema = z.object({
	title: z.string().optional(),
	items: z
		.array(
			z.object({
				title: z.string().min(1, "title is required"),
				status: z.enum(["done", "current", "upcoming"]).optional(),
				description: z.string().optional()
			})
		)
		.min(1, "at least one step is required")
});

