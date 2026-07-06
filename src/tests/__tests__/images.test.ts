import { describe, it, expect, beforeEach } from "vitest";
import { imageAltTest } from "../images";

describe("imageAltTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when all images have an alt attribute", () => {
    document.body.innerHTML = `<img src="photo.jpg" alt="A mountain landscape" />`;
    expect(imageAltTest.run().state).toBe(true);
  });

  it("passes when a decorative image has role='presentation'", () => {
    document.body.innerHTML = `<img src="divider.png" role="presentation" alt="" />`;
    expect(imageAltTest.run().state).toBe(true);
  });

  it("passes when a decorative image has role='presentation' and no alt", () => {
    document.body.innerHTML = `<img src="divider.png" role="presentation" />`;
    expect(imageAltTest.run().state).toBe(true);
  });

  it("fails when an image has no alt and no role='presentation'", () => {
    document.body.innerHTML = `<img src="photo.jpg" />`;
    const result = imageAltTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });
});
