import type { ReactElement } from "react";
import { createRoot } from "react-dom/client";

export function mountReactComponent(container: HTMLElement, element: ReactElement): () => void {
	const root = createRoot(container);
	root.render(element);

	return () => {
		root.unmount();
	};
}

