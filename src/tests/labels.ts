import type { Test } from "../types";

export const labelForTest: Test = {
  run() {
    const selector = `label[for]`;
    const labelElements = document.querySelectorAll(selector);
    const failingElements: Element[] = [];
    labelElements.forEach((label) => {
      const id = label.getAttribute("for");
      if (!id || !document.getElementById(id)) {
        failingElements.push(label);
      }
    });
    return {
      title: `label[for] should reference exactly one existing element`,
      message: `found ${failingElements.length} failing label(s)`,
      state: failingElements.length === 0,
      elements: failingElements,
      selector,
      links: [
        {
          label: "Loop: Label Elemente",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EXY-0S7IwJBFqoyHOyu_WlcBu9Nl0-mGjiriQRkaxUWXrw?e=Ipmrey&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TFdIM0lTNVNHQVNCQzJWREVISE1WMzZXU1gmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjRlNmY1YWY2LTQ3MGYtNDZkYS1hZDRjLWZmNDQ5M2NkZDUzNCUyMiU3RA%3D%3D",
        },
      ],
    };
  },
};

export const inputLabelTest: Test = {
  run() {
    const selector =
      'input[type="text"],input[type="checkbox"],input[type="file"],input[type="password"],input[type="radio"],textarea';

    // Build a Set of all label targets upfront — never construct a CSS selector from an ID
    const labelTargets = new Set(
      [...document.querySelectorAll("label[for]")].map((l) => l.getAttribute("for")),
    );

    const failingElements: Element[] = [];
    document.querySelectorAll(selector).forEach((input) => {
      if (!input.id || !labelTargets.has(input.id)) {
        failingElements.push(input);
      }
    });
    return {
      title: `Input elements should have an associated <label>`,
      message: `found ${failingElements.length}`,
      state: failingElements.length === 0,
      elements: failingElements,
      selector,
      links: [
        {
          label: "Loop: Label Elemente",
          url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EXY-0S7IwJBFqoyHOyu_WlcBu9Nl0-mGjiriQRkaxUWXrw?e=6ikCpY&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TFdIM0lTNVNHQVNCQzJWREVISE1WMzZXU1gmYz0lMkYmYT1Mb29wQXBwJng9JTdCJTIydyUyMiUzQSUyMlQwUlRVSHh0YjNsemFXVnpMbk5vWVhKbGNHOXBiblF1WTI5dGZHSWhiWGxQWmpOMUxVdGZNRFphYVU0NGFHeFRNRUUxYjAxRVduazBkbFZxUWtwcFZHaGFaRGhpTTFkdFUxQkpVRmxGYURoamFsRlphM0l0V2t4bFdVeFphSHd3TVVGS05sSlhOMGxMUkVGTlVWRlVVMDlTVmtOSlZ6SlhORlZQUjBOVE1qWkMlMjIlMkMlMjJpJTIyJTNBJTIyNGU2ZjVhZjYtNDcwZi00NmRhLWFkNGMtZmY0NDkzY2RkNTM0JTIyJTdE",
        },
      ],
    };
  },
};
