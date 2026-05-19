import type { ComponentDefinition } from "../../registry/types";
import { calloutDefaults, type CalloutData } from "./defaults";
import { calloutMetadata } from "./metadata";
import { CalloutRenderer } from "./render";
import { calloutSchema } from "./schema";
import { getCalloutVaultFiles } from "./vault-files";

export const calloutComponent: ComponentDefinition<CalloutData> = {
	metadata: calloutMetadata,
	schema: calloutSchema,
	defaults: calloutDefaults,
	render: (props) => <CalloutRenderer {...props} />,
	getVaultFiles: getCalloutVaultFiles
};

