import { describe, it, expect, beforeEach } from "vitest";
import { multipleBreaksTest, boldItalicTagsTest } from "../contentStructure";

describe("multipleBreaksTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when there are no consecutive <br> tags", () => {
    document.body.innerHTML = "<p>Line one<br>Line two</p>";
    expect(multipleBreaksTest.run().state).toBe(true);
  });

  it("fails when two consecutive <br> tags are present", () => {
    document.body.innerHTML = "<p>Paragraph one<br><br>Paragraph two</p>";
    const result = multipleBreaksTest.run();
    expect(result.state).toBe(false);
  });

  it("fails when three consecutive <br> tags are present", () => {
    document.body.innerHTML = "<p>Text<br><br><br>More text</p>";
    expect(multipleBreaksTest.run().state).toBe(false);
  });
});

describe("boldItalicTagsTest", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("passes when no <b> or <i> tags are present", () => {
    document.body.innerHTML = "<p><strong>Bold</strong> and <em>italic</em></p>";
    expect(boldItalicTagsTest.run().state).toBe(true);
  });

  it("fails when a <b> tag is present", () => {
    document.body.innerHTML = "<p><b>Bold text</b></p>";
    const result = boldItalicTagsTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });

  it("fails when an <i> tag is present", () => {
    document.body.innerHTML = "<p><i>Italic text</i></p>";
    const result = boldItalicTagsTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(1);
  });

  it("fails when both <b> and <i> tags are present", () => {
    document.body.innerHTML = "<p><b>Bold</b> and <i>italic</i></p>";
    const result = boldItalicTagsTest.run();
    expect(result.state).toBe(false);
    expect(result.elements).toHaveLength(2);
  });
});
