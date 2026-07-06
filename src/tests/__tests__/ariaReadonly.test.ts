import { describe, it, expect, beforeEach } from "vitest";
import { ariaReadonlyTest } from "../ariaReadonly";

describe("ariaReadonlyTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when a readonly input has no aria-readonly", () => {
    document.body.innerHTML = `<input readonly />`;
    expect(ariaReadonlyTest.run().state).toBe(true);
  });

  it("passes when aria-readonly is used without native readonly", () => {
    document.body.innerHTML = `<input aria-readonly="true" />`;
    expect(ariaReadonlyTest.run().state).toBe(true);
  });

  it("fails when both readonly and aria-readonly are present", () => {
    document.body.innerHTML = `<input readonly aria-readonly="true" />`;
    const result = ariaReadonlyTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});
