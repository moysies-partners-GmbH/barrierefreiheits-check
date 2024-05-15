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
          title: `should have <a> with role="link" `,
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
          title: `tables should have aria lable`,
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

  ];

  let errorCount = 0

  tests.forEach((test) => {
    const { message, elements, selector, title, state } = test.run();

    if (!state) errorCount++
    console.log(
      "%c" + title,
      `color: ${state ? "#2eff2e" : state === false ? "#fe1a1a" : "#fec81a"}`,
      {
        message,
        elements,
        selector,
      }
    );
  });






  const confetti = () => {
    window.makeItRain = () => {
      poof();

    }
    const script = document.body.appendChild(document.createElement('script'))
    script.src = 'http://konradullrich.github.io/confetti.js'
    script.setAttribute('onLoad', 'window.makeItRain()')
  }
  if (errorCount === 0) {
    confetti()
  }

})();



// javascript:(function()%7Bdocument.body.appendChild(document.createElement('script')).src%3D'https%3A%2F%2Fkonradullrich.github.io%2Fmain.js'%7D)()%3B