class TestManager {
  class = "testResult";
  results = [];
  tests = [];
  errorCount = 0;

  constructor(tests) {
    this.tests = tests;
    if (this.isShowing()) {
      this.eraseTest();
      return;
    }
    this.run();
    this.logResult();
    this.showResult();
    if (this.errorCount === 0) {
      this.confetti();
    }
  }

  isShowing() {
    return !!document.querySelector("." + this.class);
  }

  eraseTest() {
    const elements = document.querySelectorAll("." + this.class);
    elements.forEach((e) => e.remove());
    console.clear();
  }

  run() {
    this.errorCount = 0;
    this.results = [];
    this.tests.forEach((test) => {
      const result = test.run();
      this.results.push(result);
      if (!result.state) this.errorCount++;
    });
  }

  getColorForState(state) {
    return state ? "#2eff2e" : state === false ? "#f04f4f" : "#44f272";
  }

  logResult() {
    this.results.forEach((result) => {
      const { message, elements, selector, title, state, links } = result;
      console.log("%c" + title, `color: ${this.getColorForState(state)}`, {
        message,
        elements,
        selector,
        links,
      });
    });
  }

  confetti() {
    const script = document.body.appendChild(document.createElement("script"));
    script.src =
      "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
    script.setAttribute(
      "onLoad",
      `confetti({
        particleCount: 1000,
        spread: 370,
        origin: { y: 0.2 },
      });
      `
    );
  }

  getResultElement(result) {
    const { message, elements, selector, title, state, links } = result;
    const element = document.createElement("div");

    element.style.padding = "6px";
    element.style.borderRadius = "8px";
    element.style.marginBottom = "3px";
    element.style.backgroundColor = this.getColorForState(state);
    const titleElement = document.createElement("div");
    titleElement.innerText = title;
    element.appendChild(titleElement);

    if (links) {
      const linkListElement = document.createElement("ul");
      linkListElement.style.margin = "5px";
      linkListElement.style.paddingLeft = "15px";
      links.forEach((link) => {
        const linkListItemElement = document.createElement("li");
        const linkElement = document.createElement("a");
        linkElement.innerText = link.label;
        linkElement.href = link.url;
        linkElement.style.color = "#13004b";
        linkElement.style.textDecoration = "underline";
        linkElement.setAttribute("target", "_blank");
        linkListItemElement.appendChild(linkElement);
        linkListElement.appendChild(linkListItemElement);
        element.appendChild(linkListElement);
      });
    }
    return element;
  }

  showResult() {
    const wraper = document.createElement("div");
    wraper.classList.add(this.class);
    wraper.style.position = "fixed";
    wraper.style.fontFamily = "Arial";
    wraper.style.width = "300px";
    wraper.style.overflowY = "auto";
    wraper.style.top = "10px";
    wraper.style.bottom = "10px";
    wraper.style.right = "10px";
    wraper.style.zIndex = "999999999999";
    wraper.style.borderRadius = "8px";
    wraper.style.color = "black";
    this.results.forEach((result) => {
      wraper.appendChild(this.getResultElement(result));
    });
    document.body.appendChild(wraper);
  }
}

(function () {
  const tests = [
    {
      run: () => {
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
              label: "Loop: h1 ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EagVWICRgepNsiZNjYTRxokBi_lYJSVlkWCp6KNz1FaE4w?e=oEJSTM&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TklDVk1JQkVNQjVKRzNFSlNOUldDTkRSVUomYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODEzYSUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },
    {
      run: () => {
        const selector =
          "h1:empty,h2:empty,h3:empty,h4:empty,h5:empty,h6:empty";
        return {
          title: "should have no empty headers",
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
          links: [
            {
              label: "Loop: Best Practices für semantische Überschriften ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EagVWICRgepNsiZNjYTRxokBi_lYJSVlkWCp6KNz1FaE4w?e=oEJSTM&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TklDVk1JQkVNQjVKRzNFSlNOUldDTkRSVUomYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODEzYSUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },
    {
      run: () => {
        const selector = "a[role='link']";
        return {
          title: `elements with type='link' should not have role='link' because it redundant" `,
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
          links: [
            {
              label: "Loop: Redundante role-Attribute ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EZvFaOBxG_5Jp9VqLJeh5bsBa3gq-MUtW7eHWE1a6Mr73w?e=fpFBif&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TTNZVlVPQTRJMzdaRTJQVkxLRlNMMkRaTjMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODE0OSUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },
    {
      run: () => {
        const selector = `[type='button'][role='button']`;
        return {
          title: `elements with type='button' should not have role='button' because it redundant`,
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
          links: [
            {
              label: "Loop: Redundante role-Attribute ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EZvFaOBxG_5Jp9VqLJeh5bsBa3gq-MUtW7eHWE1a6Mr73w?e=fpFBif&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TTNZVlVPQTRJMzdaRTJQVkxLRlNMMkRaTjMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODE0OSUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },
    {
      run: () => {
        const selector = `[aria-readonly][readonly]`;
        return {
          title: `should not have aria-readonly on native "readonly" element`,
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
          links: [
            {
              label: "Loop: Redundante role-Attribute ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EZvFaOBxG_5Jp9VqLJeh5bsBa3gq-MUtW7eHWE1a6Mr73w?e=fpFBif&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TTNZVlVPQTRJMzdaRTJQVkxLRlNMMkRaTjMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODE0OSUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },
    {
      run: () => {
        const selector = `table:not([aria-label])`;
        return {
          title: `tables should have aria label`,
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
          links: [
            {
              label: "Loop: Label Elemente ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EXY-0S7IwJBFqoyHOyu_WlcBu9Nl0-mGjiriQRkaxUWXrw?e=gzZZt9&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TFdIM0lTNVNHQVNCQzJWREVISE1WMzZXU1gmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjRlNmY1YWY2LTQ3MGYtNDZkYS1hZDRjLWZmNDQ5M2NkZDUzNCUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },
    {
      run: () => {
        const selector = `td[tabindex]`;
        return {
          title: `table cells should not have tabindex`,
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
          links: [
            {
              label: "Loop: Tastaturzugänglichkeit ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/ESueQBnMX09CrW9Fh9MGJBABgLy5LE_pkht3RI0fepd4jA?e=2vg28C&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3SkxUWkFCVFRDN0o1QksyMzJGUTdKUU1KQVEmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjU5ODRlMmM1LTc2NjQtNGU5NC1iZmYwLWQ3MDk1NmUyMjQwYyUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },

    {
      run: () => {
        const selector = `label[for]`;
        const labelElements = document.querySelectorAll(selector);
        const failingElements = [];
        labelElements.forEach((label) => {
          const associatedElements = document.querySelectorAll(
            `#${label.getAttribute("for")}`
          );
          if (associatedElements.length !== 1) {
            failingElements.push(label);
          }
        });
        return {
          title: `labels 'for' attribue should have an associated element`,
          message: `found ${failingElements.length} failing labels`,
          state: failingElements.length === 0,
          elements: failingElements,
          selector,
          links: [
            {
              label: "Loop: Label Elemente ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EXY-0S7IwJBFqoyHOyu_WlcBu9Nl0-mGjiriQRkaxUWXrw?e=Ipmrey&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TFdIM0lTNVNHQVNCQzJWREVISE1WMzZXU1gmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjRlNmY1YWY2LTQ3MGYtNDZkYS1hZDRjLWZmNDQ5M2NkZDUzNCUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },

    {
      run: () => {
        const selector = `[*|aria-labelledby]`;
        const labelByElements = document.querySelectorAll(selector);
        const failingElements = [];
        labelByElements.forEach((element) => {
          const associatedElements = document.querySelectorAll(
            `#${element.getAttribute("aria-labelledby")}`
          );
          if (associatedElements.length !== 1) {
            failingElements.push(element);
          }
        });
        return {
          title: `Ensure the label-by attribute has a corresponding ID.`,
          message: `found ${failingElements.length} failing labels`,
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
    },

    {
      run: () => {
        const selector = 'img:not([alt]):not([role="presentation"])';
        return {
          title: `Images should have an alt attribute or role presentation `,
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
          links: [
            {
              label: "Loop: Bild- und Multimedia-Zugänglichkeit ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EbZdMZfoYEBHmd0ZYDh4LvIBLF_3Dv_FHYsBkBNnyhTq9g?e=KPmhgz&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TldMVVlaUDJEQUlCRFpUWElaTUE0SFFMWFMmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjU5ODRlMmM1LTc2NjQtNGU5NC1iZmYwLWQ3MDk1NmUyMjNmZiUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },

    {
      run: () => {
        const selector =
          'input[type="text"],input[type="checkbox"],input[type="file"],input[type="password"],input[type="radio"],textarea';
        var faultyElements = new Array();

        document.querySelectorAll(selector).forEach((inputElement) => {
          if (
            document.querySelector('label[for="' + inputElement.id + '"]') ==
            undefined
          ) {
            faultyElements.push(inputElement);
          }
        });

        return {
          title: `Input elements should have a label element `,
          message: `found ${faultyElements.length}`,
          state: faultyElements.length === 0,
          elements: faultyElements,
          selector,
          links: [
            {
              label: "Loop: Label Elemente",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EXY-0S7IwJBFqoyHOyu_WlcBu9Nl0-mGjiriQRkaxUWXrw?e=6ikCpY&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TFdIM0lTNVNHQVNCQzJWREVISE1WMzZXU1gmYz0lMkYmYT1Mb29wQXBwJng9JTdCJTIydyUyMiUzQSUyMlQwUlRVSHh0YjNsemFXVnpMbk5vWVhKbGNHOXBiblF1WTI5dGZHSWhiWGxQWmpOMUxVdGZNRFphYVU0NGFHeFRNRUUxYjAxRVduazBkbFZxUWtwcFZHaGFaRGhpTTFkdFUxQkpVRmxGYURoamFsRlphM0l0V2t4bFdVeFphSHd3TVVGS05sSlhOMGxMUkVGTlVWRlVVMDlTVmtOSlZ6SlhORlZQUjBOVE1qWkMlMjIlMkMlMjJpJTIyJTNBJTIyNGU2ZjVhZjYtNDcwZi00NmRhLWFkNGMtZmY0NDkzY2RkNTM0JTIyJTdE",
            },
          ],
        };
      },
    },

    {
      // Checks for 9.1.3.1d Inhalt gegliedert @see https://bitvtest.de/pruefschritt/bitv-20-web/bitv-20-web-9-1-3-1d-inhalt-gegliedert
      run: () => {
        var regexp = /(\s*<br>){2,}/gm;
        var regexpResult = [...document.body.innerHTML.matchAll(regexp)];
        var returnObject = {
          title: `No multiple <br> tags in a row detected.`,
          message: `found ${regexpResult.length}`,
          state: regexpResult.length === 0,
          elements: regexpResult,
          selector: regexp,
          links: [
            {
              label: "bitvtest",
              url: "https://bitvtest.de/pruefschritt/bitv-20-web/bitv-20-web-9-1-3-1d-inhalt-gegliedert",
            },
          ],
        };

        if (regexpResult.length > 0) {
          returnObject.title = `Multiple <br> tags in a row detected. Consider using paragraphs or other structural html tags.`;
        }

        return returnObject;
      },
    },

    {
      // Additional check for 9.1.3.1d Inhalt gegliedert @see https://bitvtest.de/pruefschritt/bitv-20-web/bitv-20-web-9-1-3-1d-inhalt-gegliedert
      run: () => {
        const selector = "b,i";
        return {
          title: `Don't use <b> or <i> to format your content. Either use more expressive tags like <strong>, <em> and the like or CSS.`,
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
          links: [
            {
              label: "bitvtest",
              url: "https://bitvtest.de/pruefschritt/bitv-20-web/bitv-20-web-9-1-3-1d-inhalt-gegliedert",
            },
          ],
        };
      },
    },

    {
      run: () => {
        const selector = `[aria-activedescendant]`;
        const activedescendantElements = document.querySelectorAll(selector);
        const failingElements = [];
        activedescendantElements.forEach((element) => {
          const associatedElements = document.querySelectorAll(
            `#${element.getAttribute("aria-activedescendant")}`
          );
          if (associatedElements.length !== 1) {
            failingElements.push(element);
          }
        });
        return {
          title: `Ensure the aria-activedescendant attribute has a corresponding ID.`,
          message: `found ${failingElements.length} failing labels`,
          state: failingElements.length === 0,
          elements: failingElements,
          selector,
          links: [
            {
              label: "Loop: aria-activedescendant ",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EYQfTD8WZd5MsT7BI_Zfu2kBwB4YpUIU4k6yr6hx2IABQw?e=cO1WlQ&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TUVENUdENkZURjNaR0xDUFdCRVAzRjdPM0omYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMmJjNmY5N2M4LTM2MTctNGI1Ni1iZjhkLTc3ZWI2Y2ZlZGVjNiUyMiU3RA%3D%3D",
            },
          ],
        };
      },
    },
  ];
  window.runMpAccessibility = () => {
    window.testManager = new TestManager(tests);
  };
})();
