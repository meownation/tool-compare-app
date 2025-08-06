const express = require("express");
const router = express.Router();
const tools = require("../data/tools.json");

// Simple in-memory click counts (replace with DB for production)
const clicks = {};

router.get("/:toolId", (req, res) => {
  const toolId = req.params.toolId.toLowerCase();
  const tool = tools[toolId];

  if (!tool) return res.status(404).send("Tool not found.");

  clicks[toolId] = (clicks[toolId] || 0) + 1;
  console.log(`Redirected ${toolId} - total clicks: ${clicks[toolId]}`);

  res.redirect(tool.affiliate);
});

module.exports = router;
