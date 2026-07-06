import { TestManager } from "./TestManager";
import type { Test } from "./types";

import { h1Test } from "./tests/h1";
import { emptyHeadingsTest } from "./tests/emptyHeadings";
import { redundantLinkRoleTest, redundantButtonRoleTest } from "./tests/redundantRoles";
import { ariaReadonlyTest } from "./tests/ariaReadonly";
import { tableAriaLabelTest, tableCellTabindexTest } from "./tests/tables";
import { labelForTest, inputLabelTest } from "./tests/labels";
import { ariaLabelledbyTest, ariaActivedescendantTest } from "./tests/ariaReferences";
import { imageAltTest } from "./tests/images";
import { multipleBreaksTest, boldItalicTagsTest } from "./tests/contentStructure";

const tests: Test[] = [
  h1Test,
  emptyHeadingsTest,
  redundantLinkRoleTest,
  redundantButtonRoleTest,
  ariaReadonlyTest,
  tableAriaLabelTest,
  tableCellTabindexTest,
  labelForTest,
  ariaLabelledbyTest,
  imageAltTest,
  inputLabelTest,
  multipleBreaksTest,
  boldItalicTagsTest,
  ariaActivedescendantTest,
];

declare global {
  interface Window {
    runMpAccessibility: () => void;
    testManager?: TestManager;
  }
}

window.runMpAccessibility = () => {
  window.testManager = new TestManager(tests);
};
