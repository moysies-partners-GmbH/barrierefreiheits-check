import { describe, it, expect, beforeEach } from "vitest";
import { tableAriaLabelTest, tableCellTabindexTest } from "../tables";

describe("tableAriaLabelTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when every table has an aria-label", () => {
    document.body.innerHTML = `<table aria-label="Users"><tr><td>Alice</td></tr></table>`;
    expect(tableAriaLabelTest.run().state).toBe(true);
  });

  it("fails when a table has no aria-label", () => {
    document.body.innerHTML = `<table><tr><td>Alice</td></tr></table>`;
    const result = tableAriaLabelTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});

describe("tableCellTabindexTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when no td has tabindex", () => {
    document.body.innerHTML = `<table><tr><td>Alice</td></tr></table>`;
    expect(tableCellTabindexTest.run().state).toBe(true);
  });

  it("fails when a td has tabindex", () => {
    document.body.innerHTML = `<table><tr><td tabindex="0">Alice</td></tr></table>`;
    const result = tableCellTabindexTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});
