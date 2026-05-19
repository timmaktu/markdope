import type { ComponentDefinition } from "../../registry/types";
import { stepsDefaults, type StepsData } from "./defaults";
import { stepsMetadata } from "./metadata";
import { StepsRenderer } from "./render";
import { stepsSchema } from "./schema";
import { getStepsVaultFiles } from "./vault-files";

export const stepsComponent: ComponentDefinition<StepsData> = {
	metadata: stepsMetadata,
	schema: stepsSchema,
	defaults: stepsDefaults,
	render: (props) => <StepsRenderer {...props} />,
	getVaultFiles: getStepsVaultFiles
};

