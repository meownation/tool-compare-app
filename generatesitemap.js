const fs = require("fs");
const path = require("path");
const tools = require("./data/tools.json");

const baseUrl = "https://tool-compare-app.onrender.com/compare";
const publicDir = path.join(__dirname, "public");

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

const toolIds = Object.keys(tools);
let urls = [];

for (let i = 0; i < toolIds.length; i++) {
    for (let j = i + 1; j < toolIds.length; j++) {
        const t1 = toolIds[i];
        const t2 = toolIds[j];
        urls.push(`${baseUrl}/${t1}-vs-${t2}`);
    }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (u) => `<url>
  <loc>${u}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
    )
    .join("\n")}
</urlset>`;

// Save sitemap.xml into public folder
const sitemapPath = path.join(publicDir, "sitemap.xml");
fs.writeFileSync(sitemapPath, xml, "utf8");
console.log(`Generated ${urls.length} comparison URLs in public/sitemap.xml`);

// Generate robots.txt in public folder
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl.replace("/compare", "")}/sitemap.xml
`;

const robotsPath = path.join(publicDir, "robots.txt");
fs.writeFileSync(robotsPath, robotsContent, "utf8");
console.log(`Generated robots.txt in public/robots.txt`);
