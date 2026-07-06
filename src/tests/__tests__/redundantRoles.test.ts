import { describe, it, expect, beforeEach } from "vitest";
import { redundantLinkRoleTest, redundantButtonRoleTest } from "../redundantRoles";

describe("redundantLinkRoleTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when no <a> has role='link'", () => {
    document.body.innerHTML = `<a href="#">Home</a>`;
    expect(redundantLinkRoleTest.run().state).toBe(true);
  });

  it("fails when an <a> has role='link'", () => {
    document.body.innerHTML = `<a href="#" role="link">Home</a>`;
    const result = redundantLinkRoleTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});

describe("redundantButtonRoleTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when no button-type input has role='button'", () => {
    document.body.innerHTML = `<input type="button" value="Click" />`;
    expect(redundantButtonRoleTest.run().state).toBe(true);
  });

  it("fails when a button-type input has role='button'", () => {
    document.body.innerHTML = `<input type="button" role="button" value="Click" />`;
    const result = redundantButtonRoleTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});
