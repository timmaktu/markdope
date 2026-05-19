import type { ComponentRenderProps } from "../../registry/types";
import type { ToggleData } from "./defaults";
import { buildToggleValuePatch } from "./visual-edit";

export function ToggleRenderer({ data, onPatch }: ComponentRenderProps<ToggleData>) {
	return (
		<div className="markdope-toggle">
			<div className="markdope-toggle__copy">
				<div className="markdope-toggle__label">{data.label}</div>
				{data.description ? (
					<div className="markdope-toggle__description">{data.description}</div>
				) : null}
			</div>
			<label className="markdope-toggle__switch" aria-label={data.label}>
				<input
					type="checkbox"
					checked={data.value}
					onChange={(event) => {
						onPatch?.(buildToggleValuePatch(event.currentTarget.checked));
					}}
				/>
				<span className="markdope-toggle__track">
					<span className="markdope-toggle__thumb" />
				</span>
			</label>
		</div>
	);
}

