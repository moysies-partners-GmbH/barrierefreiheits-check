import { describe, it, expect, beforeEach } from "vitest";
import { emptyHeadingsTest } from "../emptyHeadings";

describe("emptyHeadingsTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when all headings have content", () => {
    document.body.innerHTML = "<h1>Title</h1><h2>Section</h2>";
    expect(emptyHeadingsTest.run().state).toBe(true);
  });

  it("fails when an h1 is empty", () => {
    document.body.innerHTML = "<h1></h1>";
    const result = emptyHeadingsTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });

  it("fails when multiple heading levels are empty", () => {
    document.body.innerHTML = "<h1>Title</h1><h2></h2><h3></h3>";
    const result = emptyHeadingsTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(2);
  });
});
