import { z } from "zod";

export const calloutSchema = z.object({
	title: z.string().min(1, "title is required"),
	body: z.string().min(1, "body is required"),
	tone: z.enum(["info", "success", "warning", "danger"])
});
