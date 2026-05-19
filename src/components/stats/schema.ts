import { z } from "zod";

export const statsSchema = z.object({
	title: z.string().optional(),
	items: z
		.array(
			z.object({
				label: z.string().min(1, "label is required"),
				value: z.union([z.string(), z.number()]),
				helper: z.string().optional()
			})
		)
		.min(1, "at least one stat item is required")
});

