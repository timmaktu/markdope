import type { ComponentPatch } from "../registry/types";
import type { ResolvedMarkdopeBlock } from "./types";

interface MarkdopeBlockViewProps {
	resolved: ResolvedMarkdopeBlock;
	mode: "live-preview" | "reading";
	onPatch?: (patch: ComponentPatch) => void;
}

export function MarkdopeBlockView(props: MarkdopeBlockViewProps) {
	const { resolved, mode, onPatch } = props;

	if (resolved.kind === "renderable") {
		const { component, data } = resolved;
		return (
			<div className={`markdope-block markdope-block--${mode}`}>
				<div className="markdope-block__chrome">
					<div className="markdope-block__meta">
						<span className="markdope-block__badge">{component.metadata.id}</span>
						<span className="markdope-block__label">{component.metadata.displayName}</span>
					</div>
				</div>
				<div className="markdope-block__body">
					{component.render({
						data,
						mode,
						onPatch
					})}
				</div>
			</div>
		);
	}

	if (resolved.kind === "unknown-component") {
		return (
			<FallbackBlock
				title="Unknown component"
				subtitle={resolved.componentId ?? "Missing component id"}
				message={resolved.message}
				rawText={resolved.parsed.yamlText}
			/>
		);
	}

	if (resolved.kind === "invalid-yaml") {
		return (
			<FallbackBlock
				title="Invalid YAML"
				subtitle="markdope could not parse this block"
				message={resolved.message}
				rawText={resolved.parsed.yamlText}
			/>
		);
	}

	return (
		<FallbackBlock
			title="Schema mismatch"
			subtitle={resolved.componentId ?? "Unknown component"}
			message={resolved.issues.join("\n")}
			rawText={resolved.parsed.yamlText}
		/>
	);
}

interface FallbackBlockProps {
	title: string;
	subtitle: string;
	message: string;
	rawText: string;
}

function FallbackBlock(props: FallbackBlockProps) {
	return (
		<div className="markdope-block markdope-block--fallback">
			<div className="markdope-block__chrome">
				<div className="markdope-block__meta">
					<span className="markdope-block__badge">{props.title}</span>
					<span className="markdope-block__label">{props.subtitle}</span>
				</div>
			</div>
			<div className="markdope-block__fallback-copy">{props.message}</div>
			<pre className="markdope-block__fallback-pre">
				<code>{props.rawText}</code>
			</pre>
		</div>
	);
}
