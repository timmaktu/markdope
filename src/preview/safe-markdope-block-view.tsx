import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import type { ComponentPatch } from "../registry/types";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { MarkdopeBlockView } from "./markdope-block-view";
import type { ResolvedMarkdopeBlock } from "./types";

interface SafeMarkdopeBlockViewProps {
	resolved: ResolvedMarkdopeBlock;
	mode: "live-preview" | "reading";
	onPatch?: (patch: ComponentPatch) => void;
}

interface SafeMarkdopeBlockViewState {
	errorMessage: string | null;
}

export class SafeMarkdopeBlockView extends Component<
	SafeMarkdopeBlockViewProps,
	SafeMarkdopeBlockViewState
> {
	state: SafeMarkdopeBlockViewState = {
		errorMessage: null
	};

	static getDerivedStateFromError(error: unknown): SafeMarkdopeBlockViewState {
		return {
			errorMessage: error instanceof Error ? error.message : "Unknown markdope render error."
		};
	}

	componentDidCatch(error: unknown, info: ErrorInfo): void {
		console.error("markdope block render failed", error, info);
	}

	override render(): ReactNode {
		if (this.state.errorMessage) {
			return (
				<div className="markdope-ui">
					<Card className="my-2">
						<CardHeader className="gap-2">
							<div className="flex flex-wrap items-center gap-2">
								<Badge variant="destructive">Render error</Badge>
								<CardTitle className="text-sm">markdope fallback</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="markdope-fallback-message">
							{this.state.errorMessage}
						</CardContent>
					</Card>
				</div>
			);
		}

		return <MarkdopeBlockView {...this.props} />;
	}
}
