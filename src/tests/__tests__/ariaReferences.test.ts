import { describe, it, expect, beforeEach } from "vitest";
import { ariaLabelledbyTest, ariaActivedescendantTest } from "../ariaReferences";

describe("ariaLabelledbyTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when aria-labelledby references an existing element", () => {
    document.body.innerHTML = `
      <h2 id="section-title">Section</h2>
      <div aria-labelledby="section-title">Content</div>
    `;
    expect(ariaLabelledbyTest.run().state).toBe(true);
  });

  it("fails when aria-labelledby references a non-existent id", () => {
    document.body.innerHTML = `<div aria-labelledby="missing-id">Content</div>`;
    const result = ariaLabelledbyTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});

describe("ariaActivedescendantTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when aria-activedescendant references an existing element", () => {
    document.body.innerHTML = `
      <ul role="listbox" aria-activedescendant="opt1">
        <li id="opt1" role="option">Option 1</li>
      </ul>
    `;
    expect(ariaActivedescendantTest.run().state).toBe(true);
  });

  it("fails when aria-activedescendant references a non-existent id", () => {
    document.body.innerHTML = `<ul role="listbox" aria-activedescendant="ghost"><li role="option">Option</li></ul>`;
    const result = ariaActivedescendantTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});
