# Markdope Demo

These examples stay readable as plain Markdown source, but the plugin can render them as richer components.

```markdope
component: official.toggle
version: 1
label: "Ship feature"
description: "Click the rendered switch to edit the YAML boolean."
value: false
```

```markdope
component: official.callout
version: 1
title: "Design note"
body: "The source stays friendly to humans and AI, while the rendered block gets a richer visual treatment."
tone: "info"
```

```markdope
component: official.accordion
version: 1
title: "Product Information"
type: "single"
defaultOpen:
  - "item-1"
items:
  - title: "What does markdope preserve?"
    content: "Your note remains plain Markdown, and invalid YAML never silently destroys source content."
  - title: "Why use shadcn components here?"
    content: "They give us a realistic target for future user-imported component support."
  - title: "Can I still edit the raw block?"
    content: "Yes. In Live Preview, placing the cursor in the fence reveals the original YAML."
```

```markdope
component: official.carousel
version: 1
title: "Feature Highlights"
items:
  - kicker: "Markdown-first"
    title: "Readable source notes"
    body: "Keep content understandable to both humans and AI without MDX or JSX in the note body."
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    imageAlt: "Desk workspace with laptop, notebook, and coffee mug."
  - kicker: "Live Preview"
    title: "Source when focused"
    body: "When your cursor enters the fence, the raw YAML becomes editable source again."
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
    imageAlt: "Open notebook and desk setup viewed from above."
  - kicker: "Safe MVP"
    title: "Trusted built-ins first"
    body: "Official components are bundled safely while the future pack system stays extensible."
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
    imageAlt: "Team working together around a table."
```

```markdope
component: official.carousel
version: 1
title: "Workspace Gallery"
items:
  - title: "Desk setup"
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    imageAlt: "Desk workspace with laptop, notebook, and coffee mug."
  - title: "Planning session"
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
    imageAlt: "Open notebook and desk setup viewed from above."
  - title: "Team review"
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
    imageAlt: "Team collaborating around a table."
```

```markdope
component: official.timeline
version: 1
title: "Roadmap"
items:
  - title: "Discovery"
    date: "2026-05-19"
    status: "done"
    description: "Confirm the modular architecture."
  - title: "Prototype"
    date: "2026-05-26"
    status: "next"
    description: "Wire up Live Preview widget replacement."
  - title: "Refine"
    date: "2026-06-02"
    status: "planned"
    description: "Polish docs and future pack ergonomics."
```

```markdope
component: official.steps
version: 1
title: "Release checklist"
items:
  - title: "Build core plugin structure"
    status: "done"
    description: "Split YAML, registry, preview, and component code into focused folders."
  - title: "Validate source/render swap"
    status: "current"
    description: "Show source only when the selection enters the block."
  - title: "Document the safe MVP"
    status: "upcoming"
    description: "Explain why vault-side React loading is intentionally deferred."
```

```markdope
component: official.stats
version: 1
title: "Launch metrics"
items:
  - label: "Official components"
    value: 7
    helper: "Toggle, callout, accordion, carousel, timeline, steps, and stats."
  - label: "Visual editors"
    value: 1
    helper: "Toggle writes back to YAML."
  - label: "Source format"
    value: "Plain Markdown"
    helper: "No MDX or JSX in the note."
```
