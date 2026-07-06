import { TestManager } from "../src/TestManager";
import type { Test, TestResult } from "../src/types";

// ---------------------------------------------------------------------------
// Helpers to build mock elements so the panel has realistic content
// ---------------------------------------------------------------------------

function el(tag: string, attrs: Record<string, string> = {}): Element {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function pass(title: string, extra?: Partial<TestResult>): Test {
  return {
    run: () => ({
      title,
      message: "found 0",
      state: true,
      elements: [],
      selector: "",
      links: [],
      ...extra,
    }),
  };
}

function fail(title: string, elements: Element[], extra?: Partial<TestResult>): Test {
  return {
    run: () => ({
      title,
      message: `found ${elements.length}`,
      state: false,
      elements,
      selector: "",
      links: [],
      ...extra,
    }),
  };
}

// ---------------------------------------------------------------------------
// Mock test suites
// ---------------------------------------------------------------------------

const withErrors: Test[] = [
  pass("should have exactly 1 <h1>", {
    links: [{ label: "Loop: h1", url: "https://example.com" }],
  }),

  fail("should have no empty headings", [el("h2"), el("h3")], {
    links: [{ label: "Loop: Überschriften", url: "https://example.com" }],
  }),

  pass('<a> elements should not have role="link" — it is redundant'),

  fail(
    `elements with type="button" should not have role="button" — it is redundant`,
    [el("input", { type: "button", role: "button" })],
    { links: [{ label: "Loop: Redundante role-Attribute", url: "https://example.com" }] },
  ),

  fail("tables should have an aria-label", [el("table"), el("table"), el("table")], {
    links: [{ label: "Loop: aria-label", url: "https://example.com" }],
  }),

  pass("table cells should not have tabindex"),

  fail("label[for] should reference exactly one existing element", [el("label")], {
    links: [{ label: "Loop: Label Elemente", url: "https://example.com" }],
  }),

  pass("aria-labelledby should reference exactly one existing element"),

  fail(
    'Images should have an alt attribute or role="presentation"',
    [el("img", { src: "photo.jpg" }), el("img", { src: "banner.jpg" })],
    {
      links: [
        { label: "Loop: Bild-Zugänglichkeit", url: "https://example.com" },
        { label: "WCAG 1.1.1 Non-text Content", url: "https://example.com" },
      ],
    },
  ),

  fail("Input elements should have an associated <label>", [
    el("input", { type: "text", id: "name" }),
  ]),

  fail(
    "Multiple consecutive <br> tags detected — use <p> or other structural elements instead",
    [],
    { links: [{ label: "bitvtest 9.1.3.1d", url: "https://example.com" }] },
  ),

  pass("Don't use <b> or <i> for formatting — prefer <strong>, <em>, or CSS"),

  fail("aria-activedescendant should reference exactly one existing element", [
    el("ul", { "aria-activedescendant": "ghost" }),
  ]),
];

const allPassing: Test[] = withErrors.map((t) => {
  const result = t.run();
  return pass(result.title, { links: result.links });
});

// ---------------------------------------------------------------------------
// Mount
// ---------------------------------------------------------------------------

function mount(tests: Test[]): void {
  // Always erase any existing panel before mounting a new one
  document.querySelectorAll(".testResult").forEach((el) => el.remove());
  new TestManager(tests);
}

document.getElementById("btn-errors")?.addEventListener("click", () => {
  mount(withErrors);
});

document.getElementById("btn-all-pass")?.addEventListener("click", () => {
  mount(allPassing);
});

document.getElementById("btn-toggle")?.addEventListener("click", () => {
  // Re-clicking triggers the erase branch inside TestManager
  mount(withErrors);
});

// Show with errors on first load
mount(withErrors);
