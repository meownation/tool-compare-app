const express = require("express");
const router = express.Router();
const tools = require("../data/tools.json");

// Unified route for root "/compare"
router.get("/", (req, res) => {
  const tool1 = req.query.tool1?.toLowerCase();
  const tool2 = req.query.tool2?.toLowerCase();
  const title = 'Compare AI Tools';


  if (tool1 && tool2) {
    // Redirect to SEO-friendly route
    return res.redirect(`/compare/${tool1}-vs-${tool2}`);
  }

  // No query params? Render tool selector page
  res.render("compare-select", {
      layout: 'layout',
      layoutClass: 'compare-select-page',
      title,
      tools });
});

// SEO-friendly compare route: /compare/chatgpt-vs-claude
router.get("/:tools", (req, res) => {
  const [tool1, tool2] = req.params.tools.toLowerCase().split("-vs-");
  const title = `${tool1.name} vs ${tool2.name} – AI Tool Comparison`;
  if (!tools[tool1] || !tools[tool2]) {
    return res.status(404).send("One or both tools not found.");
  }

  res.render("compare", {
      layout: 'layout',
      layoutClass: 'compare-page',
      title,
    a: tools[tool1],
    b: tools[tool2]
  });
});

module.exports = router;
