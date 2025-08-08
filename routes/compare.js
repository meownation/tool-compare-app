const express = require("express");
const router = express.Router();
const tools = require("../data/tools.json");

// Unified route for root "/compare"
router.get("/", (req, res) => {
  const tool1 = req.query.tool1?.toLowerCase();
  const tool2 = req.query.tool2?.toLowerCase();
  const title = 'Compare AI Tools';


    // Default SEO values for the selector page
    const description = "Select and compare top AI tools based on features, pricing, and reviews.";
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const image = "https://tool-compare-app.onrender.com/default-image.png";

  if (tool1 && tool2) {
    // Redirect to SEO-friendly route
    return res.redirect(`/compare/${tool1}-vs-${tool2}`);
  }

  // No query params? Render tool selector page
  res.render("compare-select", {
      layout: 'layout',
      layoutClass: 'compare-select-page',
      description,
      url,
      image,
      title,
      tools });
});

// SEO-friendly compare route: /compare/chatgpt-vs-claude
router.get("/:tools", (req, res) => {
  const [tool1, tool2] = req.params.tools.toLowerCase().split("-vs-");
  if (!tools[tool1] || !tools[tool2]) {
    return res.status(404).send("One or both tools not found.");
  }

    // Prefer SEO-specific description if available
    const desc1 = tools[tool1].seo_description || tools[tool1].description;
    const desc2 = tools[tool2].seo_description || tools[tool2].description;

    // Prefer provided images
    const img1 = tools[tool1].image;
    const img2 = tools[tool2].image;

    // Dynamic SEO using the objects from tools.json
    const title = `${tools[tool1].name} vs ${tools[tool2].name} – AI Tool Comparison`;
    const description = `Compare ${tools[tool1].name} and ${tools[tool2].name}: ${desc1} vs ${desc2}`;
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const image = img1 || img2 || "https://tool-compare-app.onrender.com/default-image.png";

    res.render("compare", {
      layout: 'layout',
      layoutClass: 'compare-page',
      title,
      description,
      url,
      image,
      a: tools[tool1],
      b: tools[tool2],
      aid: tool1,
      bid: tool2
  });
});

module.exports = router;
