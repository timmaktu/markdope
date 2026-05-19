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
    value: 5
    helper: "Toggle, callout, timeline, steps, stats."
  - label: "Visual editors"
    value: 1
    helper: "Toggle writes back to YAML."
  - label: "Source format"
    value: "Plain Markdown"
    helper: "No MDX or JSX in the note."
```
