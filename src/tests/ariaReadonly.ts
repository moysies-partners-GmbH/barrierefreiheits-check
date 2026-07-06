import type { Test } from "../types";

export const ariaReadonlyTest: Test = {
  run() {
    const selector = `[aria-readonly][readonly]`;
    const elements = document.querySelectorAll(selector);
    return {
      title: `should not have aria-readonly on a native readonly element`,
      message: `found ${elements.length}`,
      state: elements.length === 0,
      elements,
      selector,
      links: [
        {
          label: "Loop: Redundante role-Attribute",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EZvFaOBxG_5Jp9VqLJeh5bsBa3gq-MUtW7eHWE1a6Mr73w?e=fpFBif&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TTNZVlVPQTRJMzdaRTJQVkxLRlNMMkRaTjMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODE0OSUyMiU3RA%3D%3D",
        },
      ],
    };
  },
};
