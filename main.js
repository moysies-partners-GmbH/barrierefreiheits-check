(function () {
  const tests = [
    {
      run: () => {
        const selector = "h1";
        return {
          title: "should have exactly 1 <h1>",
          message: `found ${document.querySelectorAll(selector).length}`,
          state: document.querySelectorAll(selector).length === 1,
          elements: document.querySelectorAll(selector),
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
  ];

  tests.forEach((test) => {
    const testResult = test.run();
    console.log(
      "%c" + testResult.title,
      `color: ${
        testResult.state
          ? "#2eff2e"
          : testResult.state === false
          ? "#fe1a1a"
          : "#fec81a"
      }`,
      {
        message: testResult.message,
        elements: testResult.elements,
        selector: testResult.selector,
      }
    );
  });
})();
