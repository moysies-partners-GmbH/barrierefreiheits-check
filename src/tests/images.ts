import type { Test } from "../types";

export const imageAltTest: Test = {
  run() {
    const selector = `img:not([alt]):not([role="presentation"])`;
    const elements = document.querySelectorAll(selector);
    return {
      title: `Images should have an alt attribute or role="presentation"`,
      message: `found ${elements.length}`,
      state: elements.length === 0,
      elements,
      selector,
      links: [
        {
          label: "Loop: Bild- und Multimedia-Zugänglichkeit",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EbZdMZfoYEBHmd0ZYDh4LvIBLF_3Dv_FHYsBkBNnyhTq9g?e=KPmhgz&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TldMVVlaUDJEQUlCRFpUWElaTUE0SFFMWFMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjU5ODRlMmM1LTc2NjQtNGU5NC1iZmYwLWQ3MDk1NmUyMjNmZiUyMiU3RA%3D%3D",
        },
      ],
    };
  },
};
