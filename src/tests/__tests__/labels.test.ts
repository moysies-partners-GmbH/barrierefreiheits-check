import { describe, it, expect, beforeEach } from "vitest";
import { labelForTest, inputLabelTest } from "../labels";

describe("labelForTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when label[for] references an existing element", () => {
    document.body.innerHTML = `
      <label for="name">Name</label>
      <input id="name" type="text" />
    `;
    expect(labelForTest.run().state).toBe(true);
  });

  it("fails when label[for] references a non-existent id", () => {
    document.body.innerHTML = `<label for="ghost">Name</label>`;
    const result = labelForTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});

describe("inputLabelTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when every input has an associated label", () => {
    document.body.innerHTML = `
      <label for="email">Email</label>
      <input id="email" type="text" />
    `;
    expect(inputLabelTest.run().state).toBe(true);
  });

  it("fails when an input has no associated label", () => {
    document.body.innerHTML = `<input id="unlabelled" type="text" />`;
    const result = inputLabelTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });

  it("fails when a textarea has no associated label", () => {
    document.body.innerHTML = `<textarea id="notes"></textarea>`;
    const result = inputLabelTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});
