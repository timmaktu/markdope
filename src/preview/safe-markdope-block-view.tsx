import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import type { ComponentPatch } from "../registry/types";
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
				<div className="markdope-block markdope-block--fallback">
					<div className="markdope-block__chrome">
						<div className="markdope-block__meta">
							<span className="markdope-block__badge">Render error</span>
							<span className="markdope-block__label">markdope fallback</span>
						</div>
					</div>
					<div className="markdope-block__fallback-copy">
						{this.state.errorMessage}
					</div>
				</div>
			);
		}

		return <MarkdopeBlockView {...this.props} />;
	}
}
