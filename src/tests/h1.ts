import type { Test } from "../types";

export const h1Test: Test = {
  run() {
    const selector = "h1";
    const elements = document.querySelectorAll(selector);
    return {
      title: "should have exactly 1 <h1>",
      message: `found ${elements.length}`,
      state: elements.length === 1,
      elements,
      selector,
      links: [
        {
          label: "Loop: h1",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EagVWICRgepNsiZNjYTRxokBi_lYJSVlkWCp6KNz1FaE4w?e=oEJSTM&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TklDVk1JQkVNQjVKRzNFSlNOUldDTkRSVUomYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODEzYSUyMiU3RA%3D%3D",
        },
      ],
    };
  },
};
