const errors = [];

errors.push({
  title: "should have exactly 1 <h1>",
  message: `found ${document.querySelectorAll("h1").length}`,
});

errors.forEach((e) => {
  console.log(e.title, ":", e.message);
  console.log("----");
});
