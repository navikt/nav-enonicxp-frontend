# nav-enonicxp-frontend

Follow existing patterns, keep changes minimal, and verify before claiming something works.

## How to act in this codebase

- Edit only what's asked. Don't invent files, APIs, or refactors.
- Preserve existing structure and unrelated code.
- Use existing utilities, components, and patterns before creating new ones.
- Don't create tests unless asked or the logic warrants it.
- Reference files with repo paths using backticks: `packages/nextjs/src/...`
- No apologies, no "I think", no change summaries, no pleasantries like "good point".
- **Be direct and critical**: Challenge approaches when you have better solutions. The user isn't always correct - speak up. Skip the politeness.
- **Verify technical details**: Check config files and actual code before stating how things work. Don't speculate.
- **Verify fixes**: After fixing errors, use get_errors tool to confirm they're resolved before claiming success.
- **Iterate until valid**: Keep fixing and verifying until all errors are resolved, tests pass, and TypeScript compiles. Don't stop at the first attempt.
- **Documentation**: Never create new documentation files. Keep inline comments minimal - well-named variables and clear logic are preferred over comments.
- When performing a code review, respond in Norwegian.

## Repository Overview

This is a **Next.js frontend** for nav.no's public pages, serving as a headless frontend for **Enonic XP CMS**.

- **Languages**: TypeScript, React, Next.js, SCSS
- **Code language**: Mix of English and Norwegian - file names, component names, variables can be in either language
- **Package manager**: npm (workspaces)
- **Testing**: Jest
- **Design System**: @navikt/aksel (see NAV Design System section below for conventions)
- **Target**: Modern browsers (ES2022+) - use modern JavaScript features freely
- **Local dev**: `npm run dev`

### Architecture

**Monorepo packages**:

- **packages/nextjs**: Next.js app with SSG/ISR rendering, component mapping, and UI
- **packages/server**: Custom Express server wrapping Next.js with caching and request handling
- **packages/shared**: Shared utilities imported as `@/shared/*`

### Key Architectural Patterns

**Component Mapping System**: Content from Enonic XP is mapped through a hierarchical system:

- `ComponentMapper.tsx` routes XP component types (Page/Layout/Part/Fragment/Text)
- `PartsMapper.tsx` maps part types to React components
- `LayoutMapper.tsx` handles layout components
- Editor props (`data-portal-component-type`, `data-portal-component`) enable XP editor integration

**Dual Rendering Modes** (same code, different build configuration):

- **Regular ISR**: Pages generated on-demand with incremental revalidation
- **Failover**: All pages pre-rendered at build time on separate instances for disaster recovery

Both use `[...pathRouter].tsx` - the `IS_FAILOVER_INSTANCE` env var (set at build time) determines the rendering strategy.

**Three-Tier Cache Strategy**:

1. Local LRU cache - fastest
2. Redis/Valkey cache - shared across instances
3. XP content API - source of truth
4. Failover static fallback - disaster recovery

See `packages/server/src/cache/page-cache-handler.ts` for implementation.

## NAV Design System (Aksel)

This project uses **@navikt/aksel** as its design system:

- `@navikt/ds-react` – React components (Button, Alert, Accordion, etc.)
- `@navikt/ds-css` – Base CSS and component styles
- `@navikt/aksel-icons` – Icon library
- `@navikt/ds-tokens` – Design tokens (colors, spacing, typography)

**Important conventions**:

- **Tokens over hardcoded values**: Use `var(--a-spacing-*)`, `var(--a-font-*)`, `var(--a-color-*)` tokens in CSS - never hardcode spacing, colors, or typography
- **Semantic typography**: Use `<Heading>` for headings and `<BodyLong>` for paragraphs instead of raw HTML tags (`<h1>`, `<p>`)
- **Import pattern**: `import { Heading, BodyLong } from '@navikt/ds-react'`
- **Heading props**: Always specify `level` (semantic HTML) and `size` (visual size) separately - they don't have to match
- **Spacing prop**: Aksel components support `spacing` prop for consistent bottom margin
- **Icon imports**: `import { IconName } from '@navikt/aksel-icons'`

## Project Conventions

**Component Patterns**: Part components always check config existence:

```typescript
export const MyPart = ({ config }: PartComponentProps<PartType.MyPart>) => {
    // config contains XP part configuration
    // Always check for config existence
    if (!config?.requiredField) return null;
};
```

**Editor Integration**: Components receive `editorProps` from `ComponentMapper` when `pageProps.editorView === true`. These props enable live editing in XP Content Studio.

**Content Types**: Content from XP is typed via `ContentProps` union type (see `types/content-props/_content-common.ts`) - all extend `ContentCommonProps`.

**Fetching Content**: Use `fetchPageProps()` in `utils/fetch/fetch-page-props.ts` for routing, redirects, and typed `ContentProps`. Cache invalidation via `/api/internal/invalidate-paths`.

## File Organization

**Split when complexity warrants it** - if a component is hard to understand, extract sub-components or utilities.

**Component file structure**:

```
MyComponent/
├── MyComponent.tsx           # Main component
├── MyComponent.module.scss   # Styles (always colocate)
├── MyComponent.test.tsx      # Tests (if needed)
├── components/               # Sub-components (if complex)
│   └── MySubComponent.tsx
└── utils.ts                  # Component-specific utilities
```

**Shared code rule**: If both `nextjs` and `server` packages need it, it **must** go in `packages/shared/src/`. Never duplicate.

## Type Safety

- **Never use `any`** - use `unknown` and narrow with type guards
- **Leverage existing type guards**: Import from `types/_type-guards.ts`:

```typescript
import { createTypeGuard } from 'types/_type-guards';

const isValidType = createTypeGuard([ContentType.Artikkel, ContentType.Melding] as const);
if (!isValidType(content.type)) return null;
```

- **Content types**: Always use `ContentProps` union type - it provides type narrowing based on `type` field





----




Clean Code Standards
No Comments: Write self-documenting code instead of adding comments
Descriptive Names: Use clear, specific names for variables, functions, and components
Extract Functions: Break complex logic into well-named functions
Small Functions: Keep functions focused and easy to understand at a glance

--

# Copilot Behavior

Do:
- Be direct and concise in your response
- Write code for clarity, not cleverness
- Follow existing code patterns in the project

Don't:
- Add code comments unless explicitly asked
- Create documentation files unless explicitly asked
- Use verbose or overly polite language
- Introduce new dependencies without justification