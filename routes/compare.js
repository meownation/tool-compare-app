const express = require("express");
const router = express.Router();
const tools = require("../data/tools.json");

// SEO-friendly compare route: /compare/chatgpt-vs-claude
router.get("/:tools", (req, res) => {
  const [tool1, tool2] = req.params.tools.toLowerCase().split("-vs-");

  if (!tools[tool1] || !tools[tool2]) {
    return res.status(404).send("One or both tools not found.");
  }

  res.render("compare", {
    a: tools[tool1],
    b: tools[tool2]
  });
});

// Redirect old query param style to SEO-friendly URLs
router.get("/", (req, res) => {
  const tool1 = req.query.tool1?.toLowerCase();
  const tool2 = req.query.tool2?.toLowerCase();

  if (tool1 && tool2) {
    res.redirect(`/compare/${tool1}-vs-${tool2}`);
  } else {
    res.status(400).send("Please provide tool1 and tool2 query parameters.");
  }
});

module.exports = router;
