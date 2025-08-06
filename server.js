const express = require("express");
const path = require("path");
const compareRoute = require("./routes/compare");
const outboundRoute = require("./routes/outbound");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/compare", compareRoute);
app.use("/out", outboundRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});