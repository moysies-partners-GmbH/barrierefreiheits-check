import { describe, it, expect, beforeEach } from "vitest";
import { h1Test } from "../h1";

describe("h1Test", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when there is exactly 1 h1", () => {
    document.body.innerHTML = "<h1>Page title</h1>";
    expect(h1Test.run().state).toBe(true);
  });

  it("fails when there are no h1s", () => {
    document.body.innerHTML = "<h2>Not a top-level heading</h2>";
    const result = h1Test.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(0);
  });

  it("fails when there are multiple h1s", () => {
    document.body.innerHTML = "<h1>First</h1><h1>Second</h1>";
    const result = h1Test.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(2);
  });
});
