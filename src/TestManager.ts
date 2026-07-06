import type { Test, TestResult } from "./types";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#0e0e16",
  border: "rgba(255,255,255,0.07)",
  headerBg: "#13131f",
  pass: "#22c55e",
  fail: "#ef4444",
  textPrimary: "#f1f5f9",
  textMuted: "#64748b",
  textPass: "#4ade80",
  link: "#818cf8",
  itemBg: "rgba(255,255,255,0.02)",
  itemBgHover: "rgba(255,255,255,0.05)",
  shadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
};

export class TestManager {
  private readonly panelClass = "testResult";
  private results: TestResult[] = [];
  private errorCount = 0;

  constructor(private readonly tests: Test[]) {
    if (this.isShowing()) {
      this.erasePanel();
      return;
    }
    this.run();
    this.logResults();
    this.showPanel();
    if (this.errorCount === 0) {
      this.loadConfetti();
    }
  }

  private isShowing(): boolean {
    return !!document.querySelector(`.${this.panelClass}`);
  }

  private erasePanel(): void {
    document.querySelectorAll(`.${this.panelClass}`).forEach((el) => el.remove());
  }

  private run(): void {
    this.errorCount = 0;
    this.results = this.tests.map((test) => {
      const result = test.run();
      if (!result.state) this.errorCount++;
      return result;
    });
  }

  private logResults(): void {
    this.results.forEach(({ title, message, elements, selector, links, state }) => {
      const color = state ? C.pass : C.fail;
      console.log(`%c${state ? "✓" : "✗"} ${title}`, `color: ${color}`, {
        message,
        elements,
        selector,
        links,
      });
    });
  }

  private loadConfetti(): void {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
    script.addEventListener("load", () => {
      (window as Window & { confetti?: (opts: object) => void }).confetti?.({
        particleCount: 1000,
        spread: 370,
        origin: { y: 0.2 },
      });
    });
    document.body.appendChild(script);
  }

  // ─── Panel header ───────────────────────────────────────────────────────────

  private buildHeader(): HTMLElement {
    const header = document.createElement("div");
    header.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px 11px;
      border-bottom: 1px solid ${C.border};
      background: ${C.headerBg};
      border-radius: 12px 12px 0 0;
      flex-shrink: 0;
    `;

    const title = document.createElement("span");
    title.innerText = "Barrierefreiheit";
    title.style.cssText = `
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${C.textMuted};
    `;

    const badge = document.createElement("span");
    const allPassed = this.errorCount === 0;
    badge.innerText = allPassed
      ? "All passing ✓"
      : `${this.errorCount} error${this.errorCount > 1 ? "s" : ""}`;
    badge.style.cssText = `
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      background: ${allPassed ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)"};
      color: ${allPassed ? C.pass : C.fail};
      border: 1px solid ${allPassed ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"};
    `;

    header.appendChild(title);
    header.appendChild(badge);
    return header;
  }

  // ─── Individual result row ───────────────────────────────────────────────────

  private buildResultElement(result: TestResult): HTMLElement {
    const { title, links, state, message } = result;

    const row = document.createElement("div");
    row.style.cssText = `
      padding: 9px 14px 9px 13px;
      border-left: 3px solid ${state ? C.pass : C.fail};
      border-bottom: 1px solid ${C.border};
      background: ${C.itemBg};
      transition: background 0.1s;
    `;
    row.addEventListener("mouseenter", () => {
      row.style.background = C.itemBgHover;
    });
    row.addEventListener("mouseleave", () => {
      row.style.background = C.itemBg;
    });

    // Status dot + title
    const titleRow = document.createElement("div");
    titleRow.style.cssText = "display: flex; align-items: flex-start; gap: 7px;";

    const dot = document.createElement("span");
    dot.innerText = state ? "✓" : "✗";
    dot.style.cssText = `
      font-size: 11px;
      font-weight: 700;
      color: ${state ? C.pass : C.fail};
      flex-shrink: 0;
      margin-top: 1px;
    `;

    const titleEl = document.createElement("span");
    titleEl.innerText = title;
    titleEl.style.cssText = `
      font-size: 12px;
      line-height: 1.4;
      color: ${state ? C.textPass : C.textPrimary};
      font-weight: ${state ? "400" : "500"};
    `;

    titleRow.appendChild(dot);
    titleRow.appendChild(titleEl);
    row.appendChild(titleRow);

    // Element count (only for failures)
    if (!state && message && message !== "found 0") {
      const count = document.createElement("div");
      count.innerText = message;
      count.style.cssText = `
        font-size: 11px;
        color: ${C.textMuted};
        margin: 3px 0 0 18px;
      `;
      row.appendChild(count);
    }

    // Links
    if (links?.length) {
      const linkWrap = document.createElement("div");
      linkWrap.style.cssText = "display: flex; flex-wrap: wrap; gap: 4px; margin: 6px 0 0 18px;";
      links.forEach(({ label, url }) => {
        const a = document.createElement("a");
        a.innerText = label + " ↗";
        a.href = url;
        a.style.cssText = `
          font-size: 11px;
          color: ${C.link};
          text-decoration: none;
          background: rgba(129,140,248,0.1);
          border: 1px solid rgba(129,140,248,0.2);
          padding: 1px 6px;
          border-radius: 4px;
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        `;
        a.addEventListener("mouseenter", () => {
          a.style.background = "rgba(129,140,248,0.2)";
        });
        a.addEventListener("mouseleave", () => {
          a.style.background = "rgba(129,140,248,0.1)";
        });
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
        linkWrap.appendChild(a);
      });
      row.appendChild(linkWrap);
    }

    return row;
  }

  // ─── Panel shell ────────────────────────────────────────────────────────────

  private showPanel(): void {
    const panel = document.createElement("div");
    panel.classList.add(this.panelClass);
    panel.style.cssText = `
      position: fixed;
      top: 12px;
      bottom: 12px;
      right: 12px;
      width: 320px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      background: ${C.bg};
      border: 1px solid ${C.border};
      box-shadow: ${C.shadow};
      font-family: ${C.font};
      font-size: 13px;
      overflow: hidden;
    `;

    const scrollArea = document.createElement("div");
    scrollArea.style.cssText = "overflow-y: auto; overflow-x: hidden; flex: 1; min-width: 0;";

    // Sort: failures first, then passes
    const sorted = [...this.results].sort((a, b) => Number(b.state) - Number(a.state) * 1 || 0);
    sorted.reverse(); // failures on top
    this.results.forEach((result) => scrollArea.appendChild(this.buildResultElement(result)));

    panel.appendChild(this.buildHeader());
    panel.appendChild(scrollArea);
    document.body.appendChild(panel);
  }
}
