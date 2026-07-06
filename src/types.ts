export interface Link {
  label: string;
  url: string;
}

export interface TestResult {
  title: string;
  message: string;
  /** true = pass, false = fail */
  state: boolean;
  elements: Element[] | NodeListOf<Element>;
  selector: string | RegExp;
  links: Link[];
}

export interface Test {
  run(): TestResult;
}
