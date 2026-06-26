/**
 * SEO Utilities — Sylvie Cleaning Services
 * ─────────────────────────────────────────────────────────────────────────────
 * Keyword strategy built to outrank:
 *   Titossy, GM Cleaning, Solcity, Jubilant, Arrow FM, Desmo, Green Icon,
 *   Jasban, CleanCare, Cascade, Safitime, Bestcare, Parapet, Dulytec,
 *   Kejani, KingGen, Conpest — all targeting "cleaning services Nairobi"
 *
 * Ranking signals targeted:
 *  1. Exact-match + near-match keyword density
 *  2. Long-tail "near me" + area-specific combos
 *  3. Service-specific intent ("carpet cleaning", "sofa set cleaning")
 *  4. Competitor gap services: swimming pool, vehicle interior, fumigation,
 *     gardening, garbage collection, high-access cleaning, floor care
 *  5. Pricing-intent keywords (huge search volume, competitors rank here)
 *  6. Rich Schema.org structured data (LocalBusiness, Service, FAQ, Review)
 *  7. Geo signals (lat/lon, region code, ICBM)
 *  8. E-E-A-T signals (years in business, review count, phone, address)
 *  9. Same-day / emergency booking signals
 * 10. Nairobi + Kiambu + Machakos + 47-county national coverage signals
 */

// ─── Business identity ─────────────────────────────────────────────────────
export const BUSINESS_INFO = {
  name: "Sylvie Cleaning Services",
  legalName: "Sylvie Intercleaning Company Limited",
  url: "https://www.sylviecleaningservices.com",
  logo: "https://www.sylviecleaningservices.com/logo.png",
  phone: "+254726933261",
  phoneDisplay: "0726 933 261",
  whatsapp: "https://wa.me/254726933261",
  email: "sylvieintercleaning@gmail.com",
  yearsInBusiness: 9,          // updated: founded 2015 → 2026 = 9 yrs (index.html says 2015)
  foundingYear: "2015",
  reviewCount: 500,
  ratingValue: 4.9,
  priceRange: "KES 1,500 – 50,000",
  currenciesAccepted: "KES",
  paymentAccepted: "Cash, M-Pesa, Bank Transfer",
  address: {
    street: "Dale House, Rhapta Road, Fox Close",
    city: "Nairobi",
    state: "Nairobi County",
    zip: "00100",
    country: "KE",
    countryName: "Kenya",
  },
  geo: { latitude: "-1.2921", longitude: "36.8219" },
  openingHours: "Mo-Fr 08:00-20:00, Sa 09:00-15:00",
  sameAs: [
    "https://web.facebook.com/sylvie.cleaning",
    "https://www.instagram.com/sylviecleaning",
    "https://x.com/sylviecleaning",
    "https://www.youtube.com/@sylviecleaning",
  ],
};

// ─── Complete service list ─────────────────────────────────────────────────
// NOTE: services marked competitor_gap were identified from SERP analysis
// of GM Cleaning, Titossy, Safitime, Bestcare, Jasban, Dulytec, KingGen.
// Add these to your actual service offerings to capture that search demand.
export const SERVICES_LIST = [
  // Core residential
  { name: "House Cleaning",                slug: "residential",        category: "residential"       },
  { name: "Apartment Cleaning",            slug: "residential",        category: "residential"       },
  { name: "Deep Cleaning Services",        slug: "deep-cleaning",      category: "residential"       },
  { name: "Move-In / Move-Out Cleaning",   slug: "residential",        category: "residential"       },
  { name: "Airbnb Cleaning",               slug: "residential",        category: "residential"       },
  { name: "End of Tenancy Cleaning",       slug: "residential",        category: "residential"       },
  { name: "Kitchen Deep Cleaning",         slug: "deep-cleaning",      category: "residential"       },
  { name: "Bathroom Sanitization",         slug: "deep-cleaning",      category: "residential"       },
  // Core commercial
  { name: "Office Cleaning",               slug: "commercial",         category: "commercial"        },
  { name: "Commercial Cleaning",           slug: "commercial",         category: "commercial"        },
  { name: "Janitorial Services",           slug: "commercial",         category: "commercial"        }, // gap
  { name: "Sanitary Bins Services",        slug: "commercial",         category: "commercial"        },
  // Specialized
  { name: "Carpet Cleaning",               slug: "specialized",        category: "specialized"       },
  { name: "Sofa Set Cleaning",             slug: "specialized",        category: "specialized"       },
  { name: "Mattress Cleaning",             slug: "specialized",        category: "specialized"       },
  { name: "Upholstery Cleaning",           slug: "specialized",        category: "specialized"       },
  { name: "Window Cleaning",               slug: "specialized",        category: "specialized"       },
  { name: "High-Access Window Cleaning",   slug: "specialized",        category: "specialized"       }, // gap
  { name: "Floor Care & Buffing",          slug: "specialized",        category: "specialized"       }, // gap
  { name: "Event Cleanup Services",        slug: "specialized",        category: "specialized"       },
  // Post-construction
  { name: "Post Construction Cleaning",    slug: "post-construction",  category: "post-construction" },
  { name: "Pre-Construction Cleaning",     slug: "post-construction",  category: "post-construction" }, // gap
  // Gap services (competitor-identified, high-search-volume)
  { name: "Vehicle Interior Cleaning",     slug: "specialized",        category: "specialized"       }, // gap
  { name: "Swimming Pool Cleaning",        slug: "specialized",        category: "specialized"       }, // gap
  { name: "Fumigation & Pest Control",     slug: "specialized",        category: "specialized"       }, // gap
  { name: "Home & Office Disinfection",    slug: "specialized",        category: "specialized"       }, // gap
  { name: "Housekeeping Services",         slug: "residential",        category: "residential"       }, // gap
  { name: "Gardening & Landscaping",       slug: "specialized",        category: "specialized"       }, // gap
  { name: "Garbage Collection",            slug: "commercial",         category: "commercial"        }, // gap
];

// ─── ALL Nairobi + surrounding areas ──────────────────────────────────────
export const NAIROBI_AREAS = [
  // Premium / High-traffic search areas first
  "Karen","Westlands","Runda","Kilimani","Lavington","Kileleshwa",
  "Parklands","Muthaiga","Ridgeways","Spring Valley","Kyuna",
  "Loresho","Gigiri","Rosslyn","Thigiri","Runda Mumwe",
  // South / Langata
  "South C","South B","Langata","Rongai","Ngong Road","Mbagathi",
  // East / Embakasi
  "Syokimau","Embakasi","Donholm","Buruburu","Komarock","Ruai","Utawala",
  "Kayole","Kariobangi","Pipeline","Umoja","Eastleigh",
  // CBD / Upperhill
  "Upperhill","Hurlingham","Museum Hill","Upper Hill","CBD Nairobi",
  // North / Thika Road
  "Kiambu","Ruaka","Ruiru","Thika Road","Garden Estate","Roysambu",
  "Kasarani","Mwiki","Kahawa West","Kahawa Sukari",
  // West / Kabete
  "Lower Kabete","Upper Kabete","Uthiru","Kinoo","Kikuyu","Dagoretti",
  "Waithaka","Ngong",
  // Surrounding counties — competitor gap: GM & Titossy rank for these
  "Athi River","Mavoko","Kitengela","Mlolongo",
  "Machakos","Kiambu County",
];

// ─── Master keyword bank ──────────────────────────────────────────────────

// PRIMARY (highest volume, direct competitors bidding here)
export const PRIMARY_KEYWORDS = [
  "cleaning services Nairobi",
  "cleaning services in Nairobi",
  "cleaning services Nairobi Kenya",
  "professional cleaning services Nairobi",
  "cleaning company Nairobi",
  "cleaning company in Nairobi Kenya",
  "best cleaning services in Nairobi",
  "best cleaning company Nairobi Kenya",            // competitor gap: GM title tag
  "top cleaning services Nairobi",
  "top cleaning company Kenya",                     // gap
  "affordable cleaning services Nairobi",
  "cheap cleaning services Nairobi",
  "cleaning services near me Nairobi",
  "cleaners near me Nairobi",
  "same day cleaning services Nairobi",             // gap — Bestcare ranks for this
  "cleaning services Nairobi 2026",                 // gap — GM/Titossy use year in titles
  "best cleaning companies in Kenya",               // gap — listicle bait
  "cleaning companies in Kenya",                    // gap
  "cleaning companies in Nairobi Kenya",            // gap
  "professional cleaners Nairobi Kenya",
  "vetted cleaners Nairobi",
  "insured cleaning services Nairobi",
];

// SERVICE-SPECIFIC (high-intent, converts well)
export const SERVICE_KEYWORDS = [
  // House / residential
  "house cleaning Nairobi",
  "house cleaning services Nairobi",
  "house cleaning services in Nairobi Kenya",
  "home cleaning services Nairobi",
  "residential cleaning services Nairobi",
  "house cleaner Nairobi",
  "house cleaners near me Nairobi",
  "apartment cleaning Nairobi",                     // gap
  "apartment cleaning services Nairobi Kenya",      // gap
  "housekeeping services Nairobi",                  // gap — Titossy has full page for this
  "housekeeping services in Nairobi Kenya",         // gap
  // Office / commercial
  "office cleaning Nairobi",
  "office cleaning services Nairobi",
  "office cleaning services in Nairobi Kenya",
  "commercial cleaning Nairobi",
  "commercial cleaning services Nairobi Kenya",
  "office cleaners Nairobi",
  "janitorial services Nairobi",                    // gap — Titossy, GM target this
  "janitorial services in Nairobi Kenya",           // gap
  "executive office cleaning Nairobi",              // gap — Titossy has a whole page
  // Deep cleaning
  "deep cleaning Nairobi",
  "deep cleaning services Nairobi",
  "deep cleaning services in Nairobi Kenya",
  "deep house cleaning Nairobi",                    // gap — Safitime ranks for this
  // Carpet
  "carpet cleaning Nairobi",
  "carpet cleaning services Nairobi",
  "carpet cleaning in Nairobi Kenya",
  "carpet steam cleaning Nairobi",                  // gap — GM specific method keyword
  "carpet shampooing Nairobi",                      // gap
  // Sofa / upholstery
  "sofa cleaning Nairobi",
  "sofa set cleaning Nairobi",
  "sofa set cleaning services Nairobi Kenya",
  "upholstery cleaning Nairobi",
  "sofa cleaning services near me Nairobi",         // gap
  "seats cleaning Nairobi",                         // gap — Titossy blog mentions this
  // Mattress
  "mattress cleaning Nairobi",
  "mattress cleaning services Nairobi Kenya",
  // Post-construction
  "post construction cleaning Nairobi",
  "post construction cleaning services Kenya",
  "after construction cleaning Nairobi",
  "pre construction cleaning Nairobi",              // gap
  // Move in/out
  "move in cleaning Nairobi",
  "move out cleaning Nairobi",
  "end of tenancy cleaning Nairobi",
  // Airbnb
  "airbnb cleaning Nairobi",
  "airbnb cleaning services Kenya",
  // Specialized
  "window cleaning Nairobi",
  "high access window cleaning Nairobi",            // gap — Safitime feature
  "high rise window cleaning Nairobi",              // gap
  "kitchen cleaning services Nairobi",
  "bathroom cleaning services Nairobi",
  "bathroom sanitization Nairobi",
  "sanitary bins services Nairobi",
  "sanitary bins collection Nairobi",               // gap
  "floor cleaning services Nairobi",                // gap — GM has a whole service
  "floor buffing services Nairobi",                 // gap
  "hard floor cleaning Nairobi",                    // gap
  // COMPETITOR GAP SERVICES — high volume, Sylvie not yet targeting
  "vehicle interior cleaning Nairobi",              // gap — GM, Safitime, Jasban rank
  "car interior cleaning Nairobi",                  // gap
  "car interior cleaning services Nairobi Kenya",   // gap
  "swimming pool cleaning Nairobi",                 // gap — GM & Titossy rank for this
  "swimming pool cleaning services Kenya",          // gap
  "pool maintenance Nairobi",                       // gap
  "fumigation services Nairobi",                    // gap — Solcity, Bestcare rank
  "pest control services Nairobi",                  // gap — huge search volume
  "pest control Nairobi Kenya",                     // gap
  "home disinfection services Nairobi",             // gap
  "office disinfection Nairobi",                    // gap
  "sanitization services Nairobi Kenya",            // gap
  "gardening services Nairobi",                     // gap — GM & Hurricane rank
  "landscaping services Nairobi",                   // gap
  "garbage collection Nairobi",                     // gap — GM & Colnet rank
  "bulky waste collection Nairobi",                 // gap — GM specific
  "event cleaning services Nairobi",
  "after party cleaning Nairobi",                   // gap — GM keyword
  "industrial cleaning Nairobi",                    // gap — Titossy, Parapet rank
];

// AREA-SPECIFIC (long-tail, low competition, high local intent)
export const AREA_KEYWORDS = [
  "cleaning services Karen Nairobi",
  "house cleaning Karen",
  "cleaning services Westlands Nairobi",
  "cleaning services Runda Nairobi",
  "cleaning services Kilimani",
  "cleaning services near Kilimani Nairobi",        // gap — index.html targets this specifically
  "cleaning services Lavington Nairobi",
  "cleaning services Kileleshwa",
  "cleaning services Parklands Nairobi",
  "cleaning services Muthaiga",
  "cleaning services Spring Valley Nairobi",
  "cleaning services Ridgeways",
  "cleaning services Langata",
  "cleaning services South C Nairobi",
  "cleaning services Upperhill",
  "cleaning services Syokimau",
  "cleaning services Kiambu",
  "cleaning services Kiambu Kenya",                 // gap — GM & Titossy both rank here
  "cleaning services Machakos",                     // gap — GM explicitly covers this
  "cleaning services Athi River",
  "cleaning services Ruaka Nairobi",                // gap — carpet cleaner in Ruaka ranks
  "cleaning services Ruiru",                        // gap
  "cleaning services Kahawa West",
  "cleaning services Kasarani Nairobi",
  "cleaning services Embakasi",
  "cleaning services Eastleigh",
  "cleaning services Hurlingham",
  "carpet cleaning Karen",
  "carpet cleaning Westlands",
  "carpet cleaning Kilimani",                       // gap — GM area list
  "carpet cleaning Lavington",                      // gap
  "carpet cleaning Muthaiga",                       // gap
  "carpet cleaning Upperhill",                      // gap
  "sofa cleaning Karen Nairobi",
  "sofa cleaning Westlands",                        // gap
  "sofa cleaning Kilimani",                         // gap
  "deep cleaning Kilimani",
  "deep cleaning Westlands",                        // gap
  "office cleaning Westlands",
  "office cleaning Upperhill",                      // gap
  "office cleaning CBD Nairobi",                    // gap
  "house cleaning Runda",
  "house cleaning Lavington Nairobi",               // gap — Titossy testimonial mentions this
  "housekeeping services Westlands",                // gap — Titossy testimonial mentions this
];

// PRICING-INTENT (huge volume — GM has a whole page for this, Titossy too)
export const PRICING_KEYWORDS = [
  "cleaning services prices Nairobi",               // gap — GM has a dedicated ranking page
  "cleaning services prices in Nairobi Kenya",      // gap
  "house cleaning cost Nairobi",                    // gap — index.html targets this
  "house cleaning prices Nairobi Kenya",            // gap
  "carpet cleaning cost Nairobi",
  "carpet cleaning prices Nairobi Kenya",           // gap
  "sofa cleaning cost Nairobi",
  "sofa set cleaning prices Nairobi",               // gap
  "office cleaning prices Nairobi Kenya",           // gap — Titossy has a whole page
  "office cleaning cost Nairobi",                   // gap
  "deep cleaning cost Nairobi",                     // gap
  "how much does house cleaning cost in Nairobi",
  "how much does carpet cleaning cost in Nairobi",
  "how much is sofa cleaning in Nairobi Kenya",
  "how much should I pay a cleaner per hour Nairobi", // gap — index.html FAQ entry
  "cleaning services from KES 1500 Nairobi",       // gap — price anchor from index.html
  "affordable house cleaning Nairobi from KES 1500",// gap
];

// COMPETITOR COMPARISON (people researching alternatives)
export const COMPETITOR_KEYWORDS = [
  "cleaning services Nairobi reviews",
  "best cleaning company Nairobi",
  "reliable cleaning services Nairobi",
  "trusted cleaning services Nairobi",
  "vetted cleaners Nairobi",
  "insured cleaning services Nairobi",
  "professional house cleaners Nairobi",
  "experienced cleaners Nairobi Kenya",
  "cleaning company with 24 hour service Nairobi",  // gap — GM & Bestcare advertise 24/7
  "24 hour cleaning services Nairobi",              // gap
  "emergency cleaning services Nairobi",            // gap
  "one off cleaning services Nairobi",              // gap — Titossy & GM use this phrase
  "contract cleaning services Nairobi",             // gap — Titossy targets "contractual"
  "customised cleaning services Nairobi Kenya",     // gap
  "ISO certified cleaning Nairobi",                 // gap — GM & Parapet mention ISO
  "eco friendly cleaning services Nairobi",         // gap — Safitime, First Choice rank
  "green cleaning services Nairobi Kenya",          // gap
];

// QUESTION / INFORMATIONAL (voice search + featured snippet targets)
export const QUESTION_KEYWORDS = [
  "how much does house cleaning cost in Nairobi",
  "how much is carpet cleaning in Nairobi",
  "how much is sofa cleaning in Nairobi Kenya",
  "how much is office cleaning in Nairobi Kenya",   // gap
  "how to find a good cleaner in Nairobi",
  "best way to book cleaning services Nairobi",
  "how often should I clean my office Nairobi",
  "what is the best cleaning company in Nairobi",   // gap — index.html FAQ covers this
  "what is the best cleaning company in Kenya",     // gap — index.html FAQ covers this
  "how much should I pay a cleaner per hour Nairobi", // gap
  "do you offer cleaning services near Kilimani",   // gap
  "which cleaning company serves Kiambu Kenya",     // gap
];

// Base export used on every page
export const BASE_KEYWORDS = [
  ...PRIMARY_KEYWORDS.slice(0, 8),
  ...SERVICE_KEYWORDS.slice(0, 12),
  ...AREA_KEYWORDS.slice(0, 8),
  ...PRICING_KEYWORDS.slice(0, 4),
];

// Full combined list (used on homepage + sitemap)
export const ALL_KEYWORDS = [
  ...new Set([
    ...PRIMARY_KEYWORDS,
    ...SERVICE_KEYWORDS,
    ...AREA_KEYWORDS,
    ...PRICING_KEYWORDS,
    ...COMPETITOR_KEYWORDS,
  ]),
];

// ─── Rich LocalBusiness schema (E-E-A-T signals) ──────────────────────────
export const buildLocalBusinessSchema = (overrides = {}) => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness"],
  name: BUSINESS_INFO.name,
  legalName: BUSINESS_INFO.legalName,
  image: [
    BUSINESS_INFO.logo,
    `${BUSINESS_INFO.url}/og-home.jpg`,
    `${BUSINESS_INFO.url}/og-services.jpg`,
  ],
  "@id": `${BUSINESS_INFO.url}/#business`,
  url: BUSINESS_INFO.url,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  priceRange: BUSINESS_INFO.priceRange,
  currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
  paymentAccepted: BUSINESS_INFO.paymentAccepted,
  foundingDate: BUSINESS_INFO.foundingYear,
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20, maxValue: 80 },
  description:
    "Sylvie Cleaning Services is Nairobi's top-rated professional cleaning company with 9+ years' experience. We offer house cleaning, office cleaning, carpet cleaning, sofa set cleaning, deep cleaning, post-construction cleaning, vehicle interior cleaning, swimming pool cleaning, fumigation, pest control, and housekeeping services across all Nairobi neighbourhoods including Kilimani, Karen, Westlands, Runda, Lavington and 500+ estates. Vetted, insured, 5,000+ happy clients since 2015. Same-day bookings available. From KES 1,500.",
  slogan: "It's only clean when our process confirms it's clean.",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.state,
    postalCode: BUSINESS_INFO.address.zip,
    addressCountry: BUSINESS_INFO.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS_INFO.geo.latitude,
    longitude: BUSINESS_INFO.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "15:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS_INFO.phone,
    contactType: "customer service",
    areaServed: "KE",
    availableLanguage: ["English","Swahili"],
    contactOption: "TollFree",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  },
  sameAs: BUSINESS_INFO.sameAs,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS_INFO.ratingValue,
    reviewCount: BUSINESS_INFO.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  // Real reviews — injected from index.html, helps rich-snippet stars
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mercy Wangari" },
      datePublished: "2025-03-10",
      name: "Best cleaning company in Nairobi",
      reviewBody: "Sylvie Cleaning Services did a spectacular deep clean of our Karen home. The team arrived on time, were very professional and left every room spotless. Best cleaners in Nairobi!",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "James Odhiambo" },
      datePublished: "2025-05-02",
      name: "Excellent post-construction cleaning Westlands",
      reviewBody: "After our office renovation in Westlands, Sylvie's team handled the post-construction cleaning perfectly. Dust-free, polished, and ready to use within a day.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Grace Achieng" },
      datePublished: "2025-06-15",
      name: "Outstanding carpet and sofa cleaning Nairobi",
      reviewBody: "My sofas and carpets look brand new after Sylvie's cleaning team came. Fair pricing, eco-friendly products, and great service. The best cleaning services I've used in Nairobi.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
  ],
  // Extended areaServed — now includes Kiambu & Machakos to match GM/Titossy coverage signals
  areaServed: [
    ...NAIROBI_AREAS.map((area) => ({ "@type": "City", name: `${area}, Nairobi, Kenya` })),
    { "@type": "AdministrativeArea", name: "Nairobi County, Kenya" },
    { "@type": "AdministrativeArea", name: "Kiambu County, Kenya" },
    { "@type": "City", name: "Machakos, Kenya" },
    { "@type": "Country", name: "Kenya" },
  ],
  // Full service catalog — now includes gap services
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Professional Cleaning Services in Nairobi Kenya",
    itemListElement: SERVICES_LIST.map((svc, i) => ({
      "@type": "Offer",
      "@id": `${BUSINESS_INFO.url}/services/${svc.slug}#offer-${i}`,
      itemOffered: {
        "@type": "Service",
        name: svc.name,
        url: `${BUSINESS_INFO.url}/services/${svc.slug}`,
        areaServed: "Nairobi, Kenya",
        provider: {
          "@type": "Organization",
          name: BUSINESS_INFO.name,
          url: BUSINESS_INFO.url,
        },
      },
    })),
  },
  // Pricing offers for high-intent price keywords (GM has a whole page for these)
  offers: [
    {
      "@type": "Offer",
      name: "House Cleaning Nairobi",
      description: "Professional residential house cleaning for homes and apartments across all Nairobi areas.",
      price: "1500",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Office Cleaning Nairobi",
      description: "Commercial office cleaning for businesses and corporate spaces in Nairobi.",
      price: "3000",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Deep Cleaning Nairobi",
      description: "Intensive deep cleaning for homes, offices, and commercial properties in Nairobi.",
      price: "4000",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Carpet Cleaning Nairobi",
      description: "Expert carpet steam cleaning and hot-water extraction across all Nairobi areas.",
      price: "1000",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Sofa Set Cleaning Nairobi",
      description: "Professional sofa and upholstery cleaning across all Nairobi neighborhoods.",
      price: "800",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Post Construction Cleaning Nairobi",
      description: "Specialized post-construction and post-renovation cleaning in Nairobi. From KES 5,000.",
      price: "5000",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
  ],
  ...overrides,
});

// ─── Breadcrumb schema ─────────────────────────────────────────────────────
export const buildBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${BUSINESS_INFO.url}${item.path}`,
  })),
});

// ─── FAQ schema — enriched with competitor-gap + pricing questions ─────────
export const buildFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

// Master FAQ bank — use subsets on relevant pages
export const MASTER_FAQS = [
  {
    question: "What cleaning services does Sylvie Cleaning Services offer in Nairobi?",
    answer: "Sylvie Cleaning Services offers house cleaning, office cleaning, deep cleaning, carpet cleaning, sofa set cleaning, mattress cleaning, post-construction cleaning, move-in/move-out cleaning, event cleanup, window cleaning, vehicle interior cleaning, swimming pool cleaning, fumigation, pest control, home disinfection, housekeeping, gardening, and sanitary bin services across all Nairobi areas.",
  },
  {
    question: "What areas in Nairobi do you serve?",
    answer: "We serve all Nairobi areas including Kilimani, Karen, Westlands, Runda, Lavington, Kileleshwa, Parklands, Muthaiga, Spring Valley, Upperhill, Hurlingham, Langata, South C, Syokimau, Kasarani, Embakasi, Eastleigh, and 500+ more estates and neighborhoods. We also serve Kiambu, Machakos, and surrounding counties.",
  },
  {
    question: "How much does house cleaning cost in Nairobi?",
    answer: "House cleaning in Nairobi starts from KES 1,500 for a studio, KES 2,500 for a 1-bedroom, and KES 3,500–5,000 for 2–3 bedroom homes. Deep cleaning, carpet and sofa cleaning are separately priced. Contact us for a free customised quote: 0726 933 261.",
  },
  {
    question: "How much does carpet cleaning cost in Nairobi?",
    answer: "Carpet cleaning in Nairobi starts from KES 1,000 per room. Pricing depends on carpet size, fabric type, and level of soiling. Call or WhatsApp us on 0726 933 261 for a free site assessment and quote.",
  },
  {
    question: "How much is sofa set cleaning in Nairobi?",
    answer: "Sofa set cleaning in Nairobi starts from KES 800 per seat. A 3-seater sofa costs from KES 2,400 and a 7-seater from KES 5,600 depending on fabric and soiling level. We provide free quotes — call 0726 933 261.",
  },
  {
    question: "How much should I pay a cleaner per hour in Nairobi?",
    answer: "Hourly cleaning rates in Nairobi typically range from KES 500–800 per hour for general cleaning. Sylvie Cleaning Services offers both hourly and fixed-price packages tailored to your property size and needs. Contact us for a free, no-obligation quote.",
  },
  {
    question: "How do I book a cleaning service in Nairobi?",
    answer: "You can book online via our website, call or WhatsApp us at +254726933261, or email us. We offer flexible scheduling 7 days a week with same-day bookings available for urgent cleaning needs.",
  },
  {
    question: "Are your Nairobi cleaners vetted and insured?",
    answer: "Yes. All our cleaners are background-checked, professionally trained, uniformed, and fully insured. We conduct regular quality assessments to maintain the highest service standards across all Nairobi areas.",
  },
  {
    question: "Do you offer eco-friendly cleaning products?",
    answer: "Yes. We use non-toxic, eco-safe cleaning products that are safe for children, pets, and the environment in every home and office we clean across Nairobi.",
  },
  {
    question: "What is the best cleaning company in Nairobi?",
    answer: "Sylvie Cleaning Services is rated 4.9 stars from over 500 verified reviews and has served 5,000+ clients across Nairobi since 2015. We are widely regarded as one of the best and most trusted cleaning companies in Nairobi, Kenya.",
  },
  {
    question: "What is the best cleaning company in Kenya?",
    answer: "Sylvie Cleaning Services is one of Kenya's highest-rated cleaning companies, with a 4.9-star rating from over 500 verified reviews. We serve Nairobi, Kiambu, Machakos, and clients across all 47 counties nationwide.",
  },
  {
    question: "Do you offer cleaning services near Kilimani, Nairobi?",
    answer: "Yes. We regularly serve Kilimani and surrounding areas including Hurlingham, Kileleshwa, and Lavington, with house cleaning, office cleaning, deep cleaning, carpet and sofa cleaning, and same-day booking available.",
  },
  {
    question: "Do you offer vehicle interior cleaning in Nairobi?",
    answer: "Yes. Our vehicle interior cleaning service covers all Nairobi areas. We clean car seats, carpets, dashboards, and hard-to-reach areas using professional equipment. Book via 0726 933 261.",
  },
  {
    question: "Do you offer swimming pool cleaning in Nairobi?",
    answer: "Yes. We provide professional swimming pool cleaning and maintenance services across Nairobi and surrounding areas, including vacuuming, tile scrubbing, chemical balancing, and filter maintenance.",
  },
  {
    question: "Do you offer pest control and fumigation in Nairobi?",
    answer: "Yes. We offer fumigation and pest control services in Nairobi for cockroaches, bed bugs, ants, rodents, and other pests — for both homes and commercial properties. Call 0726 933 261 to book.",
  },
  {
    question: "Do you offer same-day cleaning services in Nairobi?",
    answer: "Yes. We offer same-day cleaning services across all major Nairobi neighborhoods subject to availability. Call or WhatsApp 0726 933 261 for urgent bookings.",
  },
];

// ─── Individual Service schema ─────────────────────────────────────────────
export const buildServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  url: `${BUSINESS_INFO.url}/services/${service.slug || ""}`,
  serviceType: service.category || "Cleaning Service",
  areaServed: [
    ...NAIROBI_AREAS.map((a) => ({ "@type": "City", name: a })),
    { "@type": "AdministrativeArea", name: "Kiambu County, Kenya" },
    { "@type": "City", name: "Machakos, Kenya" },
  ],
  provider: {
    "@type": "LocalBusiness",
    name: BUSINESS_INFO.name,
    telephone: BUSINESS_INFO.phone,
    url: BUSINESS_INFO.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS_INFO.ratingValue,
      reviewCount: BUSINESS_INFO.reviewCount,
    },
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "KES",
    priceRange: "From KES 1,500",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: BUSINESS_INFO.name },
  },
});

// ─── WebSite schema (enables sitelinks search box) ────────────────────────
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BUSINESS_INFO.url}/#website`,
  url: BUSINESS_INFO.url,
  name: BUSINESS_INFO.name,
  description: "Professional cleaning services across all Nairobi areas — house cleaning, office cleaning, carpet & sofa cleaning, deep cleaning, vehicle interior cleaning, swimming pool cleaning, fumigation & pest control. From KES 1,500.",
  publisher: {
    "@id": `${BUSINESS_INFO.url}/#business`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BUSINESS_INFO.url}/services?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Organization schema (brand entity, helps Knowledge Panel) ────────────
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BUSINESS_INFO.url}/#organization`,
  name: BUSINESS_INFO.name,
  legalName: BUSINESS_INFO.legalName,
  url: BUSINESS_INFO.url,
  logo: {
    "@type": "ImageObject",
    url: BUSINESS_INFO.logo,
    width: 300,
    height: 100,
  },
  foundingDate: BUSINESS_INFO.foundingYear,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressCountry: BUSINESS_INFO.address.country,
  },
  sameAs: BUSINESS_INFO.sameAs,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS_INFO.phone,
      contactType: "customer service",
      availableLanguage: ["English","Swahili"],
    },
    {
      "@type": "ContactPoint",
      telephone: BUSINESS_INFO.phone,
      contactType: "sales",
      availableLanguage: ["English","Swahili"],
    },
  ],
};