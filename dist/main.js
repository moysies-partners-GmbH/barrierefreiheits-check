"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // src/TestManager.ts
  var C, TestManager;
  var init_TestManager = __esm({
    "src/TestManager.ts"() {
      "use strict";
      C = {
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
        font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
      };
      TestManager = class {
        constructor(tests) {
          this.tests = tests;
          this.panelClass = "testResult";
          this.results = [];
          this.errorCount = 0;
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
        isShowing() {
          return !!document.querySelector(`.${this.panelClass}`);
        }
        erasePanel() {
          document.querySelectorAll(`.${this.panelClass}`).forEach((el) => el.remove());
        }
        run() {
          this.errorCount = 0;
          this.results = this.tests.map((test) => {
            const result = test.run();
            if (!result.state) this.errorCount++;
            return result;
          });
        }
        logResults() {
          this.results.forEach(({ title, message, elements, selector, links, state }) => {
            const color = state ? C.pass : C.fail;
            console.log(`%c${state ? "\u2713" : "\u2717"} ${title}`, `color: ${color}`, {
              message,
              elements,
              selector,
              links
            });
          });
        }
        loadConfetti() {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
          script.addEventListener("load", () => {
            window.confetti?.({
              particleCount: 1e3,
              spread: 370,
              origin: { y: 0.2 }
            });
          });
          document.body.appendChild(script);
        }
        // ─── Panel header ───────────────────────────────────────────────────────────
        buildHeader() {
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
          badge.innerText = allPassed ? "All passing \u2713" : `${this.errorCount} error${this.errorCount > 1 ? "s" : ""}`;
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
        buildResultElement(result) {
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
          const titleRow = document.createElement("div");
          titleRow.style.cssText = "display: flex; align-items: flex-start; gap: 7px;";
          const dot = document.createElement("span");
          dot.innerText = state ? "\u2713" : "\u2717";
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
          if (links?.length) {
            const linkWrap = document.createElement("div");
            linkWrap.style.cssText = "display: flex; flex-wrap: wrap; gap: 4px; margin: 6px 0 0 18px;";
            links.forEach(({ label, url }) => {
              const a = document.createElement("a");
              a.innerText = label + " \u2197";
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
        showPanel() {
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
          const sorted = [...this.results].sort((a, b) => Number(b.state) - Number(a.state) * 1 || 0);
          sorted.reverse();
          this.results.forEach((result) => scrollArea.appendChild(this.buildResultElement(result)));
          panel.appendChild(this.buildHeader());
          panel.appendChild(scrollArea);
          document.body.appendChild(panel);
        }
      };
    }
  });

  // src/tests/h1.ts
  var h1Test;
  var init_h1 = __esm({
    "src/tests/h1.ts"() {
      "use strict";
      h1Test = {
        run() {
          const selector = "h1";
          const elements = document.querySelectorAll(selector);
          return {
            title: "should have exactly 1 <h1>",
            message: `found ${elements.length}`,
            state: elements.length === 1,
            elements,
            selector,
            links: [
              {
                label: "Loop: h1",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EagVWICRgepNsiZNjYTRxokBi_lYJSVlkWCp6KNz1FaE4w?e=oEJSTM&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TklDVk1JQkVNQjVKRzNFSlNOUldDTkRSVUomYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODEzYSUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
    }
  });

  // src/tests/emptyHeadings.ts
  var emptyHeadingsTest;
  var init_emptyHeadings = __esm({
    "src/tests/emptyHeadings.ts"() {
      "use strict";
      emptyHeadingsTest = {
        run() {
          const selector = "h1:empty,h2:empty,h3:empty,h4:empty,h5:empty,h6:empty";
          const elements = document.querySelectorAll(selector);
          return {
            title: "should have no empty headings",
            message: `found ${elements.length}`,
            state: elements.length === 0,
            elements,
            selector,
            links: [
              {
                label: "Loop: Best Practices f\xFCr semantische \xDCberschriften",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EagVWICRgepNsiZNjYTRxokBi_lYJSVlkWCp6KNz1FaE4w?e=oEJSTM&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TklDVk1JQkVNQjVKRzNFSlNOUldDTkRSVUomYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODEzYSUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
    }
  });

  // src/tests/redundantRoles.ts
  var redundantRoleUrl, redundantLinkRoleTest, redundantButtonRoleTest;
  var init_redundantRoles = __esm({
    "src/tests/redundantRoles.ts"() {
      "use strict";
      redundantRoleUrl = "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EZvFaOBxG_5Jp9VqLJeh5bsBa3gq-MUtW7eHWE1a6Mr73w?e=fpFBif&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TTNZVlVPQTRJMzdaRTJQVkxLRlNMMkRaTjMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODE0OSUyMiU3RA%3D%3D";
      redundantLinkRoleTest = {
        run() {
          const selector = "a[role='link']";
          const elements = document.querySelectorAll(selector);
          return {
            title: `<a> elements should not have role="link" \u2014 it is redundant`,
            message: `found ${elements.length}`,
            state: elements.length === 0,
            elements,
            selector,
            links: [{ label: "Loop: Redundante role-Attribute", url: redundantRoleUrl }]
          };
        }
      };
      redundantButtonRoleTest = {
        run() {
          const selector = `[type='button'][role='button']`;
          const elements = document.querySelectorAll(selector);
          return {
            title: `elements with type="button" should not have role="button" \u2014 it is redundant`,
            message: `found ${elements.length}`,
            state: elements.length === 0,
            elements,
            selector,
            links: [{ label: "Loop: Redundante role-Attribute", url: redundantRoleUrl }]
          };
        }
      };
    }
  });

  // src/tests/ariaReadonly.ts
  var ariaReadonlyTest;
  var init_ariaReadonly = __esm({
    "src/tests/ariaReadonly.ts"() {
      "use strict";
      ariaReadonlyTest = {
        run() {
          const selector = `[aria-readonly][readonly]`;
          const elements = document.querySelectorAll(selector);
          return {
            title: `should not have aria-readonly on a native readonly element`,
            message: `found ${elements.length}`,
            state: elements.length === 0,
            elements,
            selector,
            links: [
              {
                label: "Loop: Redundante role-Attribute",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EZvFaOBxG_5Jp9VqLJeh5bsBa3gq-MUtW7eHWE1a6Mr73w?e=fpFBif&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TTNZVlVPQTRJMzdaRTJQVkxLRlNMMkRaTjMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODE0OSUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
    }
  });

  // src/tests/tables.ts
  var tableAriaLabelTest, tableCellTabindexTest;
  var init_tables = __esm({
    "src/tests/tables.ts"() {
      "use strict";
      tableAriaLabelTest = {
        run() {
          const selector = `table:not([aria-label])`;
          const elements = document.querySelectorAll(selector);
          return {
            title: `tables should have an aria-label`,
            message: `found ${elements.length}`,
            state: elements.length === 0,
            elements,
            selector,
            links: [
              {
                label: "Loop: aria-label",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EUhpUDJtPfdEuHVYFIEzu1UBcjJMtsoqjivtclkwMTWhZw?e=6Wnezz&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3S0lORklERTNKNTY1Q0xRNUtZQ1NBVEhPMlYmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMmJjNmY5N2M4LTM2MTctNGI1Ni1iZjhkLTc3ZWI2Y2ZlZGVhNyUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
      tableCellTabindexTest = {
        run() {
          const selector = `td[tabindex]`;
          const elements = document.querySelectorAll(selector);
          return {
            title: `table cells should not have tabindex`,
            message: `found ${elements.length}`,
            state: elements.length === 0,
            elements,
            selector,
            links: [
              {
                label: "Loop: Tastaturzug\xE4nglichkeit",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/ESueQBnMX09CrW9Fh9MGJBABgLy5LE_pkht3RI0fepd4jA?e=2vg28C&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3SkxUWkFCVFRDN0o1QksyMzJGUTdKUU1KQVEmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjU5ODRlMmM1LTc2NjQtNGU5NC1iZmYwLWQ3MDk1NmUyMjQwYyUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
    }
  });

  // src/tests/labels.ts
  var labelForTest, inputLabelTest;
  var init_labels = __esm({
    "src/tests/labels.ts"() {
      "use strict";
      labelForTest = {
        run() {
          const selector = `label[for]`;
          const labelElements = document.querySelectorAll(selector);
          const failingElements = [];
          labelElements.forEach((label) => {
            const id = label.getAttribute("for");
            if (!id || document.querySelectorAll(`#${id}`).length !== 1) {
              failingElements.push(label);
            }
          });
          return {
            title: `label[for] should reference exactly one existing element`,
            message: `found ${failingElements.length} failing label(s)`,
            state: failingElements.length === 0,
            elements: failingElements,
            selector,
            links: [
              {
                label: "Loop: Label Elemente",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EXY-0S7IwJBFqoyHOyu_WlcBu9Nl0-mGjiriQRkaxUWXrw?e=Ipmrey&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TFdIM0lTNVNHQVNCQzJWREVISE1WMzZXU1gmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjRlNmY1YWY2LTQ3MGYtNDZkYS1hZDRjLWZmNDQ5M2NkZDUzNCUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
      inputLabelTest = {
        run() {
          const selector = 'input[type="text"],input[type="checkbox"],input[type="file"],input[type="password"],input[type="radio"],textarea';
          const failingElements = [];
          document.querySelectorAll(selector).forEach((input) => {
            if (!document.querySelector(`label[for="${input.id}"]`)) {
              failingElements.push(input);
            }
          });
          return {
            title: `Input elements should have an associated <label>`,
            message: `found ${failingElements.length}`,
            state: failingElements.length === 0,
            elements: failingElements,
            selector,
            links: [
              {
                label: "Loop: Label Elemente",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EXY-0S7IwJBFqoyHOyu_WlcBu9Nl0-mGjiriQRkaxUWXrw?e=6ikCpY&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TFdIM0lTNVNHQVNCQzJWREVISE1WMzZXU1gmYz0lMkYmYT1Mb29wQXBwJng9JTdCJTIydyUyMiUzQSUyMlQwUlRVSHh0YjNsemFXVnpMbk5vWVhKbGNHOXBiblF1WTI5dGZHSWhiWGxQWmpOMUxVdGZNRFphYVU0NGFHeFRNRUUxYjAxRVduazBkbFZxUWtwcFZHaGFaRGhpTTFkdFUxQkpVRmxGYURoamFsRlphM0l0V2t4bFdVeFphSHd3TVVGS05sSlhOMGxMUkVGTlVWRlVVMDlTVmtOSlZ6SlhORlZQUjBOVE1qWkMlMjIlMkMlMjJpJTIyJTNBJTIyNGU2ZjVhZjYtNDcwZi00NmRhLWFkNGMtZmY0NDkzY2RkNTM0JTIyJTdE"
              }
            ]
          };
        }
      };
    }
  });

  // src/tests/ariaReferences.ts
  var ariaLabelledbyTest, ariaActivedescendantTest;
  var init_ariaReferences = __esm({
    "src/tests/ariaReferences.ts"() {
      "use strict";
      ariaLabelledbyTest = {
        run() {
          const selector = `[aria-labelledby]`;
          const elements = document.querySelectorAll(selector);
          const failingElements = [];
          elements.forEach((element) => {
            const id = element.getAttribute("aria-labelledby");
            if (!id || document.querySelectorAll(`#${id}`).length !== 1) {
              failingElements.push(element);
            }
          });
          return {
            title: `aria-labelledby should reference exactly one existing element`,
            message: `found ${failingElements.length} failing element(s)`,
            state: failingElements.length === 0,
            elements: failingElements,
            selector,
            links: [
              {
                label: "Loop: aria-labelledby",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EW57UOVLiPlAvJZKB-JGS7QB12w7peolXlcPijvGFCtLZA?e=P8oXhi&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TE9QTklPS1M0STdGQUxaRlNLQTdSRU1TNVUmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjQwZGY4ODYxLWJjNjAtNGZiMC1iMTY4LTc3NjBhMjM2OWRlNyUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
      ariaActivedescendantTest = {
        run() {
          const selector = `[aria-activedescendant]`;
          const elements = document.querySelectorAll(selector);
          const failingElements = [];
          elements.forEach((element) => {
            const id = element.getAttribute("aria-activedescendant");
            if (!id || document.querySelectorAll(`#${id}`).length !== 1) {
              failingElements.push(element);
            }
          });
          return {
            title: `aria-activedescendant should reference exactly one existing element`,
            message: `found ${failingElements.length} failing element(s)`,
            state: failingElements.length === 0,
            elements: failingElements,
            selector,
            links: [
              {
                label: "Loop: aria-activedescendant",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EYQfTD8WZd5MsT7BI_Zfu2kBwB4YpUIU4k6yr6hx2IABQw?e=cO1WlQ&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TUVENUdENkZURjNaR0xDUFdCRVAzRjdPM0omYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMmJjNmY5N2M4LTM2MTctNGI1Ni1iZjhkLTc3ZWI2Y2ZlZGVjNiUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
    }
  });

  // src/tests/images.ts
  var imageAltTest;
  var init_images = __esm({
    "src/tests/images.ts"() {
      "use strict";
      imageAltTest = {
        run() {
          const selector = `img:not([alt]):not([role="presentation"])`;
          const elements = document.querySelectorAll(selector);
          return {
            title: `Images should have an alt attribute or role="presentation"`,
            message: `found ${elements.length}`,
            state: elements.length === 0,
            elements,
            selector,
            links: [
              {
                label: "Loop: Bild- und Multimedia-Zug\xE4nglichkeit",
                url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EbZdMZfoYEBHmd0ZYDh4LvIBLF_3Dv_FHYsBkBNnyhTq9g?e=KPmhgz&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TldMVVlaUDJEQUlCRFpUWElaTUE0SFFMWFMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjU5ODRlMmM1LTc2NjQtNGU5NC1iZmYwLWQ3MDk1NmUyMjNmZiUyMiU3RA%3D%3D"
              }
            ]
          };
        }
      };
    }
  });

  // src/tests/contentStructure.ts
  var bitvUrl, multipleBreaksTest, boldItalicTagsTest;
  var init_contentStructure = __esm({
    "src/tests/contentStructure.ts"() {
      "use strict";
      bitvUrl = "https://bitvtest.de/pruefschritt/bitv-20-web/bitv-20-web-9-1-3-1d-inhalt-gegliedert";
      multipleBreaksTest = {
        run() {
          const regexp = /(\s*<br>){2,}/gm;
          const matches = [...document.body.innerHTML.matchAll(regexp)];
          const hasFails = matches.length > 0;
          return {
            title: hasFails ? `Multiple consecutive <br> tags detected \u2014 use <p> or other structural elements instead` : `No multiple consecutive <br> tags detected`,
            message: `found ${matches.length}`,
            state: !hasFails,
            elements: [],
            selector: regexp,
            links: [{ label: "bitvtest 9.1.3.1d", url: bitvUrl }]
          };
        }
      };
      boldItalicTagsTest = {
        run() {
          const selector = "b,i";
          const elements = document.querySelectorAll(selector);
          return {
            title: `Don't use <b> or <i> for formatting \u2014 prefer <strong>, <em>, or CSS`,
            message: `found ${elements.length}`,
            state: elements.length === 0,
            elements,
            selector,
            links: [{ label: "bitvtest 9.1.3.1d", url: bitvUrl }]
          };
        }
      };
    }
  });

  // src/index.ts
  var require_index = __commonJS({
    "src/index.ts"() {
      init_TestManager();
      init_h1();
      init_emptyHeadings();
      init_redundantRoles();
      init_ariaReadonly();
      init_tables();
      init_labels();
      init_ariaReferences();
      init_images();
      init_contentStructure();
      var tests = [
        h1Test,
        emptyHeadingsTest,
        redundantLinkRoleTest,
        redundantButtonRoleTest,
        ariaReadonlyTest,
        tableAriaLabelTest,
        tableCellTabindexTest,
        labelForTest,
        ariaLabelledbyTest,
        imageAltTest,
        inputLabelTest,
        multipleBreaksTest,
        boldItalicTagsTest,
        ariaActivedescendantTest
      ];
      window.runMpAccessibility = () => {
        window.testManager = new TestManager(tests);
      };
    }
  });
  require_index();
})();
