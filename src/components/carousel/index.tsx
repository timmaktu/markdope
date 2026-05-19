import type { ComponentDefinition } from "../../registry/types";
import { carouselDefaults, type CarouselData } from "./defaults";
import { carouselMetadata } from "./metadata";
import { CarouselRenderer } from "./render";
import { carouselSchema } from "./schema";
import { getCarouselVaultFiles } from "./vault-files";

export const carouselComponent: ComponentDefinition<CarouselData> = {
	metadata: carouselMetadata,
	schema: carouselSchema,
	defaults: carouselDefaults,
	render: (props) => <CarouselRenderer {...props} />,
	getVaultFiles: getCarouselVaultFiles
};
