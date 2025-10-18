/* eslint-disable */
const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");

const siteUrl = "https://www.sylviecleaningservices.com";

// Define all static public routes
const staticRoutes = [
  "/", "/about", "/services", "/contact", "/book", "/booking/success",
  "/projects", "/blog", "/services/residential", "/services/commercial",
  "/services/deep-cleaning", "/services/specialized"
];

// Define all 47 county routes (SEO benefit for local searches)
const counties = [
  "mombasa","kwale","kilifi","tana-river","lamu","taita-taveta",
  "garissa","wajir","mandera","marsabit","isiolo","meru","tharaka-nithi",
  "embu","kitui","machakos","makueni","nyandarua","nyeri","kirinyaga",
  "muranga","kiambu","turkana","west-pokot","samburu","trans-nzoia",
  "uasin-gishu","elgeyo-marakwet","nandi","baringo","laikipia","nakuru",
  "narok","kajiado","kericho","bomet","kakamega","vihiga","bungoma",
  "busia","siaya","kisumu","homa-bay","migori","kisii","nyamira","nairobi"
];

// Merge routes
const allRoutes = [
  ...staticRoutes.map((url) => ({ url, changefreq: "weekly", priority: 0.8 })),
  ...counties.map((county) => ({ url: `/${county}`, changefreq: "monthly", priority: 0.6 })),
  { url: "/blog", changefreq: "weekly", priority: 0.7 }
];

// Generate sitemap.xml in /public folder
(async () => {
  const sitemap = new SitemapStream({ hostname: siteUrl });
  const writeStream = fs.createWriteStream("./public/sitemap.xml");

  allRoutes.forEach((route) => sitemap.write(route));
  sitemap.end();

  await streamToPromise(sitemap);
  sitemap.pipe(writeStream);
  console.log("✅ Sitemap successfully created at /public/sitemap.xml");
})();
