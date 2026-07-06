import type { Test } from "../types";

const redundantRoleUrl =
  "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EZvFaOBxG_5Jp9VqLJeh5bsBa3gq-MUtW7eHWE1a6Mr73w?e=fpFBif&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TTNZVlVPQTRJMzdaRTJQVkxLRlNMMkRaTjMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODE0OSUyMiU3RA%3D%3D";

export const redundantLinkRoleTest: Test = {
  run() {
    const selector = "a[role='link']";
    const elements = document.querySelectorAll(selector);
    return {
      title: `<a> elements should not have role="link" — it is redundant`,
      message: `found ${elements.length}`,
      state: elements.length === 0,
      elements,
      selector,
      links: [{ label: "Loop: Redundante role-Attribute", url: redundantRoleUrl }],
    };
  },
};

export const redundantButtonRoleTest: Test = {
  run() {
    const selector = `[type='button'][role='button']`;
    const elements = document.querySelectorAll(selector);
    return {
      title: `elements with type="button" should not have role="button" — it is redundant`,
      message: `found ${elements.length}`,
      state: elements.length === 0,
      elements,
      selector,
      links: [{ label: "Loop: Redundante role-Attribute", url: redundantRoleUrl }],
    };
  },
};
