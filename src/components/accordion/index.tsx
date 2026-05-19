import type { ComponentDefinition } from "../../registry/types";
import { accordionDefaults, type AccordionData } from "./defaults";
import { accordionMetadata } from "./metadata";
import { AccordionRenderer } from "./render";
import { accordionSchema } from "./schema";
import { getAccordionVaultFiles } from "./vault-files";

export const accordionComponent: ComponentDefinition<AccordionData> = {
	metadata: accordionMetadata,
	schema: accordionSchema,
	defaults: accordionDefaults,
	render: (props) => <AccordionRenderer {...props} />,
	getVaultFiles: getAccordionVaultFiles
};

