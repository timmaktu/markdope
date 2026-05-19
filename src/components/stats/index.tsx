import type { ComponentDefinition } from "../../registry/types";
import { statsDefaults, type StatsData } from "./defaults";
import { statsMetadata } from "./metadata";
import { StatsRenderer } from "./render";
import { statsSchema } from "./schema";
import { getStatsVaultFiles } from "./vault-files";

export const statsComponent: ComponentDefinition<StatsData> = {
	metadata: statsMetadata,
	schema: statsSchema,
	defaults: statsDefaults,
	render: (props) => <StatsRenderer {...props} />,
	getVaultFiles: getStatsVaultFiles
};
