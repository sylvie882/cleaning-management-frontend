/* eslint-disable */
/**
 * Sitemap Generator — Sylvie Cleaning Services
 * Run: node generate-sitemap.cjs
 * Outputs: ./public/sitemap.xml
 *
 * Priority logic:
 *   1.0  — homepage
 *   0.9  — core service pages (house cleaning, office cleaning, etc.)
 *   0.8  — Nairobi area landing pages + about/contact/blog
 *   0.7  — county pages (high-volume counties first)
 *   0.5  — remaining counties
 */

const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");

const siteUrl = "https://www.sylviecleaningservices.com";

// ── 1. Homepage ──────────────────────────────────────────────────────────────
const homepageRoute = [
  { url: "/", changefreq: "weekly", priority: 1.0, lastmod: new Date().toISOString() },
];

// ── 2. Core site pages ───────────────────────────────────────────────────────
const staticRoutes = [
  { url: "/services",                   changefreq: "weekly",   priority: 0.9 },
  { url: "/services/residential",       changefreq: "weekly",   priority: 0.9 },
  { url: "/services/commercial",        changefreq: "weekly",   priority: 0.9 },
  { url: "/services/deep-cleaning",     changefreq: "weekly",   priority: 0.9 },
  { url: "/services/specialized",       changefreq: "weekly",   priority: 0.9 },
  { url: "/about",                      changefreq: "monthly",  priority: 0.8 },
  { url: "/contact",                    changefreq: "monthly",  priority: 0.8 },
  { url: "/book",                       changefreq: "weekly",   priority: 0.8 },
  { url: "/blog",                       changefreq: "daily",    priority: 0.8 },
  { url: "/projects",                   changefreq: "monthly",  priority: 0.7 },
];

// ── 3. Nairobi neighbourhood pages (highest commercial intent) ────────────────
const nairobiAreas = [
  "nairobi", "karen", "westlands", "kilimani", "lavington", "kileleshwa",
  "runda", "parklands", "muthaiga", "upperhill", "hurlingham", "langata",
  "south-c", "south-b", "syokimau", "kasarani", "ridgeways", "spring-valley",
  "gigiri", "loresho", "kyuna", "rongai", "athi-river", "ruaka", "ruiru",
  "thika-road", "donholm", "embakasi", "eastleigh", "buruburu", "ngong",
];
const nairobiRoutes = nairobiAreas.map((area) => ({
  url: `/${area}`,
  changefreq: "monthly",
  priority: 0.8,
}));

// ── 4. High-priority counties (Tier 1 — major cities) ───────────────────────
const tier1Counties = [
  "mombasa", "kisumu", "nakuru", "eldoret", "thika", "machakos",
  "kiambu", "kajiado", "nyeri", "meru",
];
const tier1Routes = tier1Counties.map((county) => ({
  url: `/${county}`,
  changefreq: "monthly",
  priority: 0.7,
}));

// ── 5. All remaining 47 counties (Tier 2) ────────────────────────────────────
const allCounties = [
  "kwale","kilifi","tana-river","lamu","taita-taveta","garissa","wajir",
  "mandera","marsabit","isiolo","tharaka-nithi","embu","kitui","makueni",
  "nyandarua","kirinyaga","muranga","turkana","west-pokot","samburu",
  "trans-nzoia","uasin-gishu","elgeyo-marakwet","nandi","baringo","laikipia",
  "narok","kericho","bomet","kakamega","vihiga","bungoma","busia","siaya",
  "homa-bay","migori","kisii","nyamira",
];
const tier2Routes = allCounties.map((county) => ({
  url: `/${county}`,
  changefreq: "monthly",
  priority: 0.5,
}));

// ── 6. Service-specific county combos (high-value local SEO) ─────────────────
const topCounties = ["nairobi", "mombasa", "kisumu", "nakuru", "kiambu", "machakos"];
const topServices = ["house-cleaning", "office-cleaning", "carpet-cleaning", "deep-cleaning"];
// Note: These are informational routes. Add them to your React router as needed.
// const serviceCountyRoutes = topCounties.flatMap((county) =>
//   topServices.map((service) => ({
//     url: `/${county}/${service}`,
//     changefreq: "monthly",
//     priority: 0.6,
//   }))
// );

// ── Merge all routes ─────────────────────────────────────────────────────────
const allRoutes = [
  ...homepageRoute,
  ...staticRoutes,
  ...nairobiRoutes,
  ...tier1Routes,
  ...tier2Routes,
  // ...serviceCountyRoutes, // Uncomment when those routes are added to the router
];

// ── Generate sitemap.xml ─────────────────────────────────────────────────────
(async () => {
  const sitemap = new SitemapStream({ hostname: siteUrl });
  const writeStream = fs.createWriteStream("./public/sitemap.xml");

  allRoutes.forEach((route) => sitemap.write(route));
  sitemap.end();

  await streamToPromise(sitemap);
  sitemap.pipe(writeStream);

  console.log(`✅ Sitemap generated with ${allRoutes.length} URLs → /public/sitemap.xml`);
  console.log(`   Homepage: ${homepageRoute.length} | Static: ${staticRoutes.length} | Nairobi areas: ${nairobiRoutes.length} | Counties T1: ${tier1Routes.length} | Counties T2: ${tier2Routes.length}`);
})();
