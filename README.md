# markdope

`markdope` is an Obsidian community plugin that keeps notes as plain Markdown while rendering fenced YAML component blocks as richer React UI.

## What v1 implements

- Fenced YAML blocks using languages like `markdope` and `component`
- Reading Mode rendering for registered fence languages
- Live Preview source/render swapping:
  when the cursor or selection enters a supported fenced block, raw YAML stays visible and editable
  when the cursor leaves, Obsidian's processed code-block rendering returns automatically
- Built-in official components:
  - `official.toggle`
  - `official.callout`
  - `official.timeline`
  - `official.steps`
  - `official.stats`
- Visual editing write-back for `official.toggle`
- Graceful fallback for invalid YAML, schema mismatches, and unknown components
- Commands to initialize the vault component folder, insert starter blocks, and create a demo note
- A vault folder structure for future component packs:
  - `markdope-components/official/toggle/`
  - `markdope-components/official/callout/`
  - `markdope-components/official/timeline/`
  - `markdope-components/official/steps/`
  - `markdope-components/official/stats/`

## YAML format

Top-level fields work directly:

```md
```markdope
component: official.toggle
version: 1
label: "Ship feature"
description: "Click the rendered switch to update YAML."
value: false
```
```

Nested `data:` also works:

```md
```component
component: official.callout
version: 1
data:
  title: "Design note"
  body: "Built-in official components render safely."
  tone: "info"
```
```

`component` is required. Invalid YAML is never silently discarded. If parsing or validation fails, markdope renders an error/fallback card and preserves the raw source.

## Architecture

The code is intentionally split so the plugin stays extensible:

- `src/preview/`
  Reading Mode renderer plus the shared block renderer used by Reading Mode and Live Preview processed blocks
- `src/yaml/`
  Fence discovery, YAML parsing, serialization, and patching
- `src/registry/`
  Official component registry
- `src/components/<component>/`
  Per-component metadata, defaults, schema, renderer, and vault starter files
- `src/vault/`
  Vault folder initialization and source-write helpers
- `src/editor/`
  Reserved for future editor-specific enhancements; v1 intentionally avoids a parallel widget layer because Obsidian already swaps processed code blocks in Live Preview

Each official component owns its own source folder rather than sharing a single monolithic component file.

## Safety and scope

This repository intentionally ships a safe MVP first.

Built-in official components are bundled with the plugin and rendered from trusted code. The vault-side `markdope-components/` folders currently contain documentation, schema notes, and examples, but they do **not** execute arbitrary React/TSX from the vault.

That tradeoff is deliberate:

- arbitrary runtime loading of vault-side React/TypeScript is unsafe for a community-plugin v1
- it is also harder to make stable across Obsidian environments and plugin sandboxes

The folder structure is still designed so future community packs can fit cleanly into `markdope-components/` once there is a safe loading model, likely based on declarative manifests or prebuilt trusted bundles rather than raw vault code execution.

## Commands

- `Initialize markdope components folder`
- `Create markdope demo note`
- `Insert Toggle block`
- `Insert Callout block`
- `Insert Timeline block`
- `Insert Steps block`
- `Insert Stats block`

## Current limitations

- `official.toggle` is the only built-in component with visual write-back in v1
- Reading Mode updates locate the matching fenced block from note source; duplicate blocks with identical YAML in the same note can be ambiguous
- Newly added custom fence languages may require reopening the note to see Reading Mode rerender immediately
- Live Preview currently relies on Obsidian's built-in processed code-block lifecycle rather than a custom CodeMirror widget layer

## Demo

A repo-level demo note lives at [demo/Markdope Demo.md](demo/Markdope%20Demo.md).
