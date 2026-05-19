import { z } from "zod";

export const carouselSchema = z.object({
	title: z.string().optional(),
	items: z
		.array(
			z
				.object({
					kicker: z.string().optional(),
					title: z.string().min(1, "title cannot be empty").optional(),
					body: z.string().min(1, "body cannot be empty").optional(),
					image: z.string().url("image must be a valid URL").optional(),
					imageAlt: z.string().optional(),
					imageFit: z.enum(["cover", "contain"]).optional()
				})
				.refine((item) => Boolean(item.title || item.body || item.image), {
					message: "each carousel item needs at least one of title, body, or image"
				})
		)
		.min(1, "at least one carousel item is required")
});
