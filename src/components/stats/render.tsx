import type { ComponentRenderProps } from "../../registry/types";
import type { StatsData } from "./defaults";

export function StatsRenderer({ data }: ComponentRenderProps<StatsData>) {
	return (
		<div className="markdope-stats">
			{data.title ? <div className="markdope-section-title">{data.title}</div> : null}
			<div className="markdope-stats__grid">
				{data.items.map((item, index) => (
					<div className="markdope-stats__card" key={`${item.label}-${index}`}>
						<div className="markdope-stats__label">{item.label}</div>
						<div className="markdope-stats__value">{item.value}</div>
						{item.helper ? (
							<div className="markdope-stats__helper">{item.helper}</div>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
}

