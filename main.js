(function () {
  const tests = [
    {
      run: () => {
        const selector = "h1";
        const elements = document.querySelectorAll(selector)
        return {
          title: "should have exactly 1 <h1>",
          message: `found ${elements.length}`,
          state: elements.length === 1,
          elements,
          selector,
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
        };
      },
    },
    {
      run: () => {
        const selector = "a[role='link']";
        return {
          title: `should not have <a> with role="link" `,
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 0,
          elements: document.querySelectorAll(selector),
          selector,
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
        };
      },
    },

    {
      run: () => {
        const selector = `label[for]`;
        const labelElements = document.querySelectorAll(selector)
        const failingElements = []
        labelElements.forEach((label) => {
          const associatedElements = document.querySelectorAll(`#${label.getAttribute('for')}`)
          if (associatedElements.length !== 1) {
            failingElements.push(label)
          }
        })
        return {
          title: `labels 'for' attribue should have an associated element`,
          message: `found ${failingElements.length} failing labels`,
          state: failingElements.length === 0,
          elements: failingElements,
          selector,
        };
      },
    },

    {
      run: () => {
        const selector = `[*|aria-labelledby]`;
        const labelByElements = document.querySelectorAll(selector)
        const failingElements = []
        labelByElements.forEach(element => {
          const associatedElements = document.querySelectorAll(`#${element.getAttribute('aria-labelledby')}`)
          if (associatedElements.length !== 1) {
            failingElements.push(element)
          }
        })
        return {
          title: `Ensure the label-by attribute has a corresponding ID.`,
          message: `found ${failingElements.length} failing labels`,
          state: failingElements.length === 0,
          elements: failingElements,
          selector,
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
        };
      },
    },
    

  ];

  let errorCount = 0

  tests.forEach((test) => {
    const { message, elements, selector, title, state, links } = test.run();

    if (!state) errorCount++
    console.log(
      "%c" + title,
      `color: ${state ? "#2eff2e" : state === false ? "#fe1a1a" : "#fec81a"}`,
      {
        message,
        elements,
        selector,
        links,

      }
    );
  });






  const confetti = () => {
    const script = document.body.appendChild(document.createElement('script'))
    script.src = 'http://konradullrich.github.io/confetti.js'
    script.setAttribute('onLoad', ' poof()')
  }
  if (errorCount === 0) {
    confetti()
  }
})();

