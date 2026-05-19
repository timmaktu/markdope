import { z } from "zod";

export const toggleSchema = z.object({
	label: z.string().min(1, "label is required"),
	description: z.string().optional(),
	value: z.boolean()
});

