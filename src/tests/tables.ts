import type { Test } from "../types";

export const tableAriaLabelTest: Test = {
  run() {
    const selector = `table:not([aria-label])`;
    const elements = document.querySelectorAll(selector);
    return {
      title: `tables should have an aria-label`,
      message: `found ${elements.length}`,
      state: elements.length === 0,
      elements,
      selector,
      links: [
        {
          label: "Loop: aria-label",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EUhpUDJtPfdEuHVYFIEzu1UBcjJMtsoqjivtclkwMTWhZw?e=6Wnezz&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3S0lORklERTNKNTY1Q0xRNUtZQ1NBVEhPMlYmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMmJjNmY5N2M4LTM2MTctNGI1Ni1iZjhkLTc3ZWI2Y2ZlZGVhNyUyMiU3RA%3D%3D",
        },
      ],
    };
  },
};

export const tableCellTabindexTest: Test = {
  run() {
    const selector = `td[tabindex]`;
    const elements = document.querySelectorAll(selector);
    return {
      title: `table cells should not have tabindex`,
      message: `found ${elements.length}`,
      state: elements.length === 0,
      elements,
      selector,
      links: [
        {
          label: "Loop: Tastaturzugänglichkeit",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/ESueQBnMX09CrW9Fh9MGJBABgLy5LE_pkht3RI0fepd4jA?e=2vg28C&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3SkxUWkFCVFRDN0o1QksyMzJGUTdKUU1KQVEmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjU5ODRlMmM1LTc2NjQtNGU5NC1iZmYwLWQ3MDk1NmUyMjQwYyUyMiU3RA%3D%3D",
        },
      ],
    };
  },
};
