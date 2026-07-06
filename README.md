# barrierefreiheits-check

[![Deploy](https://github.com/moysies-partners-GmbH/barrierefreiheits-check/actions/workflows/static.yml/badge.svg)](https://github.com/moysies-partners-GmbH/barrierefreiheits-check/actions/workflows/static.yml)

A browser bookmarklet that runs a suite of accessibility checks against any Intrexx page and displays the results in an overlay panel.

Built and maintained by [moysies & partners GmbH](https://moysies.de).

---

## How it works

1. Visit the [GitHub Pages landing page](https://moysies-partners-gmbh.github.io/barrierefreiheits-check)
2. Drag the **barrierefreiheits-check** link into your browser's bookmarks bar
3. Open any Intrexx page and click the bookmark
4. A panel appears in the top-right corner showing pass/fail results for each check
5. Clicking the bookmark again while the panel is open removes it

The bookmarklet dynamically loads `dist/main.js` from GitHub Pages so checks are always up to date without needing to re-add the bookmark.

---

## Checks

| Check                                             | Rule                                                             |
| ------------------------------------------------- | ---------------------------------------------------------------- |
| Exactly one `<h1>`                                | Pages must have a single top-level heading                       |
| No empty headings                                 | `<h1>`–`<h6>` must have visible text content                     |
| Redundant `role="link"` on `<a>`                  | Native semantics make this redundant                             |
| Redundant `role="button"` on `[type="button"]`    | Native semantics make this redundant                             |
| `aria-readonly` on native `readonly`              | Attribute is redundant on natively read-only elements            |
| Tables have `aria-label`                          | Every `<table>` must be labelled                                 |
| No `tabindex` on `<td>`                           | Table cells should not be focusable                              |
| `label[for]` references a real element            | Orphaned labels are a WCAG failure                               |
| `aria-labelledby` references a real element       | Broken ID references break screen readers                        |
| Images have `alt` or `role="presentation"`        | Every `<img>` must convey purpose or be marked decorative        |
| Inputs have an associated `<label>`               | Text, checkbox, file, password, radio and textarea inputs        |
| No consecutive `<br>` tags                        | Use `<p>` or structural elements instead (BITV 9.1.3.1d)         |
| No `<b>` or `<i>` tags                            | Prefer `<strong>`, `<em>`, or CSS for formatting (BITV 9.1.3.1d) |
| `aria-activedescendant` references a real element | Broken ID references break keyboard navigation                   |

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20
- [pnpm](https://pnpm.io/)

### Setup

```bash
pnpm install
```

### Commands

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `pnpm build`       | Bundle `src/index.ts` → `dist/main.js` via esbuild |
| `pnpm build:watch` | Watch mode for local development                   |
| `pnpm typecheck`   | Run TypeScript type checking without emitting      |
| `pnpm lint`        | Run ESLint over `src/`                             |
| `pnpm format`      | Format `src/` with Prettier                        |

### Project structure

```
src/
  index.ts              # Entry point — registers window.runMpAccessibility()
  TestManager.ts        # Runs all tests, renders the results panel
  types.ts              # Shared TypeScript interfaces (Test, TestResult, Link)
  tests/
    h1.ts
    emptyHeadings.ts
    redundantRoles.ts
    ariaReadonly.ts
    tables.ts
    labels.ts
    ariaReferences.ts
    images.ts
    contentStructure.ts
dist/
  main.js               # Bundled output — committed and served via GitHub Pages
index.html              # Bookmarklet generator page (GitHub Pages)
errors.html             # Test fixture — page with known accessibility errors
noErrors.html           # Test fixture — page with no accessibility errors
```

### Adding a new check

1. Create a new file in `src/tests/` exporting a `Test` object:

```ts
import type { Test } from "../types";

export const myNewTest: Test = {
  run() {
    const selector = "...";
    const elements = document.querySelectorAll(selector);
    return {
      title: "Description of what is being checked",
      message: `found ${elements.length}`,
      state: elements.length === 0,
      elements,
      selector,
      links: [{ label: "Reference", url: "https://..." }],
    };
  },
};
```

2. Import and add it to the `tests` array in `src/index.ts`
3. Run `pnpm build` to update `dist/main.js`

---

## CI

Every push to `main` runs a GitHub Actions workflow that:

1. Type-checks the source with `tsc --noEmit`
2. Builds `dist/main.js` with esbuild
3. Commits the updated `dist/main.js` back to `main` if it changed

---

## License

ISC © moysies & partners GmbH
