import type { Test } from "../types";

export const ariaLabelledbyTest: Test = {
  run() {
    const selector = `[aria-labelledby]`;
    const elements = document.querySelectorAll(selector);
    const failingElements: Element[] = [];
    elements.forEach((element) => {
      const id = element.getAttribute("aria-labelledby");
      if (!id || document.querySelectorAll(`#${id}`).length !== 1) {
        failingElements.push(element);
      }
    });
    return {
      title: `aria-labelledby should reference exactly one existing element`,
      message: `found ${failingElements.length} failing element(s)`,
      state: failingElements.length === 0,
      elements: failingElements,
      selector,
      links: [
        {
          label: "Loop: aria-labelledby",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EW57UOVLiPlAvJZKB-JGS7QB12w7peolXlcPijvGFCtLZA?e=P8oXhi&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TE9QTklPS1M0STdGQUxaRlNLQTdSRU1TNVUmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjQwZGY4ODYxLWJjNjAtNGZiMC1iMTY4LTc3NjBhMjM2OWRlNyUyMiU3RA%3D%3D",
        },
      ],
    };
  },
};

export const ariaActivedescendantTest: Test = {
  run() {
    const selector = `[aria-activedescendant]`;
    const elements = document.querySelectorAll(selector);
    const failingElements: Element[] = [];
    elements.forEach((element) => {
      const id = element.getAttribute("aria-activedescendant");
      if (!id || document.querySelectorAll(`#${id}`).length !== 1) {
        failingElements.push(element);
      }
    });
    return {
      title: `aria-activedescendant should reference exactly one existing element`,
      message: `found ${failingElements.length} failing element(s)`,
      state: failingElements.length === 0,
      elements: failingElements,
      selector,
      links: [
        {
          label: "Loop: aria-activedescendant",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EYQfTD8WZd5MsT7BI_Zfu2kBwB4YpUIU4k6yr6hx2IABQw?e=cO1WlQ&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TUVENUdENkZURjNaR0xDUFdCRVAzRjdPM0omYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMmJjNmY5N2M4LTM2MTctNGI1Ni1iZjhkLTc3ZWI2Y2ZlZGVjNiUyMiU3RA%3D%3D",
        },
      ],
    };
  },
};
