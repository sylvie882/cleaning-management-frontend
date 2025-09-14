/* eslint-disable */
const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

const siteUrl = "https://www.sylviecleaningservices.com";

// Collect all static routes from App.jsx
const routes = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/services", changefreq: "monthly", priority: 0.8 },
  { url: "/services/residential", changefreq: "monthly", priority: 0.8 },
  { url: "/services/commercial", changefreq: "monthly", priority: 0.8 },
  { url: "/services/deep-cleaning", changefreq: "monthly", priority: 0.8 },
  { url: "/services/specialized", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "yearly", priority: 0.5 },
  { url: "/projects", changefreq: "monthly", priority: 0.6 },
  { url: "/blog", changefreq: "weekly", priority: 0.7 },
  { url: "/book", changefreq: "monthly", priority: 0.6 },
  { url: "/booking/success", changefreq: "yearly", priority: 0.4 },
];

// Generate sitemap.xml into /public folder
(async () => {
  const sitemapStream = new SitemapStream({ hostname: siteUrl });
  const writeStream = createWriteStream("./public/sitemap.xml");

  routes.forEach((route) => sitemapStream.write(route));
  sitemapStream.end();

  streamToPromise(sitemapStream).then(() => console.log("✅ Sitemap generated at /public/sitemap.xml"));
  sitemapStream.pipe(writeStream);
})();
