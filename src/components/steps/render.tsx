import type { ComponentRenderProps } from "../../registry/types";
import type { StepsData } from "./defaults";

export function StepsRenderer({ data }: ComponentRenderProps<StepsData>) {
	return (
		<div className="markdope-steps">
			{data.title ? <div className="markdope-section-title">{data.title}</div> : null}
			<div className="markdope-steps__items">
				{data.items.map((item, index) => (
					<div className={`markdope-steps__item markdope-steps__item--${item.status ?? "upcoming"}`} key={`${item.title}-${index}`}>
						<div className="markdope-steps__count">{index + 1}</div>
						<div className="markdope-steps__copy">
							<div className="markdope-steps__title">{item.title}</div>
							{item.description ? (
								<div className="markdope-steps__description">{item.description}</div>
							) : null}
						</div>
						<div className="markdope-steps__status">{item.status ?? "upcoming"}</div>
					</div>
				))}
			</div>
		</div>
	);
}

