import type { ComponentPatch } from "../registry/types";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
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
			<div className="markdope-ui">
				{component.render({
					data,
					mode,
					onPatch
				})}
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
		<div className="markdope-ui">
			<Card className="my-2">
				<CardHeader className="gap-2">
					<div className="flex flex-wrap items-center gap-2">
						<Badge variant="destructive">{props.title}</Badge>
						<CardTitle className="text-sm">{props.subtitle}</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="markdope-fallback-message">{props.message}</div>
				</CardContent>
				<pre className="markdope-fallback-pre mx-6 mb-6">
					<code>{props.rawText}</code>
				</pre>
			</Card>
		</div>
	);
}
