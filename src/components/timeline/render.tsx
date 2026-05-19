import type { ComponentRenderProps } from "../../registry/types";
import type { TimelineData } from "./defaults";

export function TimelineRenderer({ data }: ComponentRenderProps<TimelineData>) {
	return (
		<div className="markdope-timeline">
			{data.title ? <div className="markdope-section-title">{data.title}</div> : null}
			<div className="markdope-timeline__items">
				{data.items.map((item, index) => (
					<div className="markdope-timeline__item" key={`${item.title}-${index}`}>
						<div className={`markdope-timeline__dot markdope-timeline__dot--${item.status ?? "planned"}`} />
						<div className="markdope-timeline__card">
							<div className="markdope-timeline__heading">
								<span className="markdope-timeline__item-title">{item.title}</span>
								{item.date ? (
									<span className="markdope-timeline__item-date">{item.date}</span>
								) : null}
							</div>
							{item.description ? (
								<div className="markdope-timeline__item-description">{item.description}</div>
							) : null}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

