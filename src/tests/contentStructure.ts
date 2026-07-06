import type { Test } from "../types";

const bitvUrl =
  "https://bitvtest.de/pruefschritt/bitv-20-web/bitv-20-web-9-1-3-1d-inhalt-gegliedert";

export const multipleBreaksTest: Test = {
  run() {
    const regexp = /(\s*<br>){2,}/gm;
    const matches = [...document.body.innerHTML.matchAll(regexp)];
    const hasFails = matches.length > 0;
    return {
      title: hasFails
        ? `Multiple consecutive <br> tags detected — use <p> or other structural elements instead`
        : `No multiple consecutive <br> tags detected`,
      message: `found ${matches.length}`,
      state: !hasFails,
      elements: [],
      selector: regexp,
      links: [{ label: "bitvtest 9.1.3.1d", url: bitvUrl }],
    };
  },
};

export const boldItalicTagsTest: Test = {
  run() {
    const selector = "b,i";
    const elements = document.querySelectorAll(selector);
    return {
      title: `Don't use <b> or <i> for formatting — prefer <strong>, <em>, or CSS`,
      message: `found ${elements.length}`,
      state: elements.length === 0,
      elements,
      selector,
      links: [{ label: "bitvtest 9.1.3.1d", url: bitvUrl }],
    };
  },
};
