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
    return state ? "#2eff2e" : state === false ? "#fe1a1a" : "#fec81a";
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
      links.forEach((link) => {
        const linkElement = document.createElement("a");
        linkElement.innerText = link.label;
        linkElement.href = link.url;
        linkElement.setAttribute("target", "_blank");
        element.appendChild(linkElement);
      });
    }
    return element;
  }

  showResult() {
    const wraper = document.createElement("div");
    wraper.classList.add(this.class);
    wraper.style.position = "absolute";
    wraper.style.fontFamily = "Arial";
    wraper.style.width = "300px";
    wraper.style.overflowY = "auto";
    wraper.style.top = "10px";
    wraper.style.bottom = "10px";
    wraper.style.right = "10px";
    wraper.style.zIndex = "999999999999";
    wraper.style.backgroundColor = "white";
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
<<<<<<< HEAD
          links: [
            {
              label: "Loop: h1",
              url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EagVWICRgepNsiZNjYTRxokBi_lYJSVlkWCp6KNz1FaE4w?e=oEJSTM&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TklDVk1JQkVNQjVKRzNFSlNOUldDTkRSVUomYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODEzYSUyMiU3RA%3D%3D",
            },
          ],
=======
          links: [{ label: "Loop: Best Practices für semantische Überschriften", url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EagVWICRgepNsiZNjYTRxokBi_lYJSVlkWCp6KNz1FaE4w?e=oEJSTM&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TklDVk1JQkVNQjVKRzNFSlNOUldDTkRSVUomYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODEzYSUyMiU3RA%3D%3D" }],
>>>>>>> 64aaecb812209a4ed582e0ff6309c23765865a33
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
          links: [{ label: "Loop: Best Practices für semantische Überschriften", url: "https://moysies.sharepoint.com/:fl:/g/contentstorage/CSP_de9f239b-8aef-4eff-9988-df21952d00e6/EagVWICRgepNsiZNjYTRxokBi_lYJSVlkWCp6KNz1FaE4w?e=oEJSTM&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kZTlmMjM5Yi04YWVmLTRlZmYtOTk4OC1kZjIxOTUyZDAwZTYmZD1iJTIxbXlPZjN1LUtfMDZaaU44aGxTMEE1b01EWnk0dlVqQkppVGhaZDhiM1dtU1BJUFlFaDhjalFZa3ItWkxlWUxZaCZmPTAxQUo2Ulc3TklDVk1JQkVNQjVKRzNFSlNOUldDTkRSVUomYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dGIzbHphV1Z6TG5Ob1lYSmxjRzlwYm5RdVkyOXRmR0loYlhsUFpqTjFMVXRmTURaYWFVNDRhR3hUTUVFMWIwMUVXbmswZGxWcVFrcHBWR2hhWkRoaU0xZHRVMUJKVUZsRmFEaGphbEZaYTNJdFdreGxXVXhaYUh3d01VRktObEpYTjBsTFJFRk5VVkZVVTA5U1ZrTkpWekpYTkZWUFIwTlRNalpDJTIyJTJDJTIyaSUyMiUzQSUyMjEzNzk4MGE2LTQwOTUtNGQ5OS1iYzYzLTAyZGFhYmY2ODEzYSUyMiU3RA%3D%3D" }],
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
              label: "Loop: Redundante role-Attribute",
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
          links: [{ label: "", url: "" }],
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
          links: [{ label: "", url: "" }],
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
          links: [{ label: "", url: "" }],
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
          links: [{ label: "", url: "" }],
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
          links: [{ label: "", url: "" }],
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
          links: [{ label: "", url: "" }],
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
          links: [{ label: "", url: "" }],
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
          links: [{ label: "", url: "" }],
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
          links: [{ label: "", url: "" }],
        };
      },
    },
  ];
  window.runMpAccessibility = () => {
    window.testManager = new TestManager(tests);
  };
})();
