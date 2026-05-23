/**
 * SEO Utilities — Sylvie Cleaning Services
 * Keyword strategy built to outrank:
 *   Titossy, GM Cleaning, Solcity, Jubilant, Arrow FM, Desmo, Green Icon,
 *   Jasban, CleanCare, Cascade — all targeting "cleaning services Nairobi"
 *
 * Ranking signals targeted:
 *  1. Exact-match + near-match keyword density
 *  2. Long-tail "near me" + area-specific combos
 *  3. Service-specific intent ("carpet cleaning", "sofa set cleaning")
 *  4. Rich Schema.org structured data (LocalBusiness, Service, FAQ, Review)
 *  5. Geo signals (lat/lon, region code, ICBM)
 *  6. E-E-A-T signals (years in business, review count, phone, address)
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
  email: "info@sylviecleaningservices.com",
  yearsInBusiness: 7,
  reviewCount: 500,
  ratingValue: 4.9,
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
  priceRange: "$$",
  sameAs: [
    "https://web.facebook.com/sylvie.cleaning",
    "https://www.instagram.com/sylviecleaning",
    "https://x.com/sylviecleaning",
    "https://www.youtube.com/@sylviecleaning",
  ],
};

// ─── Complete service list (used in schemas + keywords) ────────────────────
export const SERVICES_LIST = [
  { name: "House Cleaning",            slug: "residential",       category: "residential"      },
  { name: "Office Cleaning",           slug: "commercial",        category: "commercial"       },
  { name: "Deep Cleaning Services",    slug: "deep-cleaning",     category: "residential"      },
  { name: "Carpet Cleaning",           slug: "specialized",       category: "specialized"      },
  { name: "Sofa Set Cleaning",         slug: "specialized",       category: "specialized"      },
  { name: "Mattress Cleaning",         slug: "specialized",       category: "specialized"      },
  { name: "Post Construction Cleaning",slug: "post-construction", category: "post-construction"},
  { name: "Move-In / Move-Out Cleaning",slug:"residential",       category: "residential"      },
  { name: "Commercial Cleaning",       slug: "commercial",        category: "commercial"       },
  { name: "Event Cleanup Services",    slug: "specialized",       category: "specialized"      },
  { name: "Window Cleaning",           slug: "specialized",       category: "specialized"      },
  { name: "Airbnb Cleaning",           slug: "residential",       category: "residential"      },
  { name: "End of Tenancy Cleaning",   slug: "residential",       category: "residential"      },
  { name: "Sanitary Bins Services",    slug: "commercial",        category: "commercial"       },
  { name: "Kitchen Deep Cleaning",     slug: "deep-cleaning",     category: "residential"      },
  { name: "Bathroom Sanitization",     slug: "deep-cleaning",     category: "residential"      },
];

// ─── ALL Nairobi areas (every major estate, road, neighborhood) ────────────
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
  "Upperhill","Hurlingham","Museum Hill","Upper Hill",
  // North / Thika Road
  "Kiambu","Ruaka","Ruiru","Thika Road","Garden Estate","Roysambu",
  "Kasarani","Mwiki","Kahawa West","Kahawa Sukari",
  // West / Kabete
  "Lower Kabete","Upper Kabete","Uthiru","Kinoo","Kikuyu","Dagoretti",
  "Waithaka","Ngong",
  // Surrounding counties
  "Athi River","Mavoko","Kitengela","Syokimau","Mlolongo",
];

// ─── Master keyword bank — grouped by intent ──────────────────────────────
//
//  PRIMARY (highest volume, direct competitors bidding here)
export const PRIMARY_KEYWORDS = [
  "cleaning services Nairobi",
  "cleaning services in Nairobi",
  "cleaning services Nairobi Kenya",
  "professional cleaning services Nairobi",
  "cleaning company Nairobi",
  "cleaning company in Nairobi Kenya",
  "best cleaning services in Nairobi",
  "top cleaning services Nairobi",
  "affordable cleaning services Nairobi",
  "cheap cleaning services Nairobi",
  "cleaning services near me Nairobi",
];

//  SERVICE-SPECIFIC (high-intent, converts well)
export const SERVICE_KEYWORDS = [
  // House / residential
  "house cleaning Nairobi",
  "house cleaning services Nairobi",
  "house cleaning services in Nairobi Kenya",
  "home cleaning services Nairobi",
  "residential cleaning services Nairobi",
  "house cleaner Nairobi",
  "house cleaners near me Nairobi",
  // Office / commercial
  "office cleaning Nairobi",
  "office cleaning services Nairobi",
  "commercial cleaning Nairobi",
  "commercial cleaning services Nairobi Kenya",
  "office cleaners Nairobi",
  // Deep cleaning
  "deep cleaning Nairobi",
  "deep cleaning services Nairobi",
  "deep cleaning services in Nairobi Kenya",
  // Carpet
  "carpet cleaning Nairobi",
  "carpet cleaning services Nairobi",
  "carpet cleaning in Nairobi Kenya",
  // Sofa / upholstery
  "sofa cleaning Nairobi",
  "sofa set cleaning Nairobi",
  "sofa set cleaning services Nairobi Kenya",
  "upholstery cleaning Nairobi",
  // Mattress
  "mattress cleaning Nairobi",
  "mattress cleaning services Nairobi Kenya",
  // Post-construction
  "post construction cleaning Nairobi",
  "post construction cleaning services Kenya",
  "after construction cleaning Nairobi",
  // Move in/out
  "move in cleaning Nairobi",
  "move out cleaning Nairobi",
  "end of tenancy cleaning Nairobi",
  // Airbnb
  "airbnb cleaning Nairobi",
  "airbnb cleaning services Kenya",
  // Specialized
  "window cleaning Nairobi",
  "kitchen cleaning services Nairobi",
  "bathroom cleaning services Nairobi",
  "sanitary bins services Nairobi",
];

//  AREA-SPECIFIC (long-tail, low competition, high local intent)
export const AREA_KEYWORDS = [
  "cleaning services Karen Nairobi",
  "house cleaning Karen",
  "cleaning services Westlands Nairobi",
  "cleaning services Runda Nairobi",
  "cleaning services Kilimani",
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
  "cleaning services Athi River",
  "carpet cleaning Karen",
  "carpet cleaning Westlands",
  "sofa cleaning Karen Nairobi",
  "deep cleaning Kilimani",
  "office cleaning Westlands",
  "house cleaning Runda",
];

//  COMPETITOR COMPARISON (people searching alternatives)
export const COMPETITOR_KEYWORDS = [
  "cleaning services Nairobi reviews",
  "best cleaning company Nairobi",
  "reliable cleaning services Nairobi",
  "trusted cleaning services Nairobi",
  "vetted cleaners Nairobi",
  "insured cleaning services Nairobi",
  "professional house cleaners Nairobi",
  "experienced cleaners Nairobi Kenya",
];

//  QUESTION / INFORMATIONAL (voice search + featured snippet targets)
export const QUESTION_KEYWORDS = [
  "how much does house cleaning cost in Nairobi",
  "how much is carpet cleaning in Nairobi",
  "how much is sofa cleaning in Nairobi Kenya",
  "how to find a good cleaner in Nairobi",
  "best way to book cleaning services Nairobi",
  "how often should I clean my office Nairobi",
];

// Base export used on every page
export const BASE_KEYWORDS = [
  ...PRIMARY_KEYWORDS.slice(0, 6),
  ...SERVICE_KEYWORDS.slice(0, 10),
  ...AREA_KEYWORDS.slice(0, 6),
];

// Full combined list (used on homepage + sitemap)
export const ALL_KEYWORDS = [
  ...new Set([
    ...PRIMARY_KEYWORDS,
    ...SERVICE_KEYWORDS,
    ...AREA_KEYWORDS,
    ...COMPETITOR_KEYWORDS,
  ]),
];

// ─── Rich LocalBusiness schema (E-E-A-T signals) ──────────────────────────
export const buildLocalBusinessSchema = (overrides = {}) => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
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
  foundingDate: "2017",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20, maxValue: 80 },
  description:
    "Sylvie Cleaning Services is Nairobi's top-rated professional cleaning company with 7+ years experience. We offer house cleaning, office cleaning, carpet cleaning, sofa set cleaning, deep cleaning and post construction cleaning across all Nairobi neighborhoods including Karen, Westlands, Runda, Kilimani and 500+ estates. Vetted, insured, 5000+ happy clients.",
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
  // 24/7 phone support
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
  // Aggregate rating for rich snippets (stars in SERPs)
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS_INFO.ratingValue,
    reviewCount: BUSINESS_INFO.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  // Areas served — all major Nairobi estates
  areaServed: NAIROBI_AREAS.map((area) => ({
    "@type": "City",
    name: `${area}, Nairobi, Kenya`,
  })),
  // Full service catalog
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Professional Cleaning Services in Nairobi",
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

// ─── FAQ schema ────────────────────────────────────────────────────────────
export const buildFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

// ─── Individual Service schema ─────────────────────────────────────────────
export const buildServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  url: `${BUSINESS_INFO.url}/services/${service.slug || ""}`,
  serviceType: service.category || "Cleaning Service",
  areaServed: NAIROBI_AREAS.map((a) => ({ "@type": "City", name: a })),
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
    priceRange: "Affordable",
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
  description: "Professional cleaning services across all Nairobi areas — house cleaning, office cleaning, carpet & sofa cleaning, deep cleaning.",
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
  foundingDate: "2017",
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
