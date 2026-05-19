import type { ComponentDefinition } from "../../registry/types";
import { toggleDefaults, type ToggleData } from "./defaults";
import { toggleMetadata } from "./metadata";
import { ToggleRenderer } from "./render";
import { toggleSchema } from "./schema";
import { getToggleVaultFiles } from "./vault-files";

export const toggleComponent: ComponentDefinition<ToggleData> = {
	metadata: toggleMetadata,
	schema: toggleSchema,
	defaults: toggleDefaults,
	render: (props) => <ToggleRenderer {...props} />,
	getVaultFiles: getToggleVaultFiles
};

