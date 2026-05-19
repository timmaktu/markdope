import type { ComponentDefinition } from "../../registry/types";
import { timelineDefaults, type TimelineData } from "./defaults";
import { timelineMetadata } from "./metadata";
import { TimelineRenderer } from "./render";
import { timelineSchema } from "./schema";
import { getTimelineVaultFiles } from "./vault-files";

export const timelineComponent: ComponentDefinition<TimelineData> = {
	metadata: timelineMetadata,
	schema: timelineSchema,
	defaults: timelineDefaults,
	render: (props) => <TimelineRenderer {...props} />,
	getVaultFiles: getTimelineVaultFiles
};

