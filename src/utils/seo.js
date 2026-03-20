/**
 * SEO Utilities for Sylvie Cleaning Services
 * Centralized SEO configuration for consistent metadata across all pages
 */

export const BUSINESS_INFO = {
  name: "Sylvie Cleaning Services",
  legalName: "Sylvie Intercleaning Company Limited",
  url: "https://www.sylviecleaningservices.com",
  logo: "https://www.sylviecleaningservices.com/logo.png",
  phone: "+254726933261",
  phoneDisplay: "0726 933 261",
  email: "info@sylviecleaningservices.com",
  address: {
    street: "Dale House, Rhapta Road, Fox Close",
    city: "Nairobi",
    state: "Nairobi County",
    zip: "00100",
    country: "KE",
    countryName: "Kenya",
  },
  geo: {
    latitude: "-1.2921",
    longitude: "36.8219",
  },
  openingHours: "Mo-Fr 08:00-20:00, Sa 09:00-15:00",
  priceRange: "$$",
  socialMedia: {
    facebook: "https://web.facebook.com/sylvie.cleaning",
    instagram: "https://www.instagram.com/sylviecleaning",
    twitter: "https://x.com/sylviecleaning",
    youtube: "https://www.youtube.com/@sylviecleaning",
    whatsapp: "https://wa.me/254726933261",
  },
  sameAs: [
    "https://web.facebook.com/sylvie.cleaning",
    "https://www.instagram.com/sylviecleaning",
    "https://x.com/sylviecleaning",
  ],
};

export const SERVICES_LIST = [
  "House Cleaning",
  "Office Cleaning",
  "Deep Cleaning Services",
  "Carpet Cleaning",
  "Sofa Cleaning",
  "Post Construction Cleaning",
  "Move-In/Move-Out Cleaning",
  "Commercial Cleaning",
  "Specialized Cleaning",
  "Event Cleanup Services",
];

export const NAIROBI_AREAS = [
  "Karen", "Westlands", "Runda", "Kilimani", "Lavington", "Kileleshwa",
  "Parklands", "Muthaiga", "Ridgeways", "Spring Valley", "Kyuna",
  "Loresho", "Lower Kabete", "Upper Kabete", "Gigiri", "Runda Mumwe",
  "Rosslyn", "Thigiri", "South C", "South B", "Langata", "Rongai",
  "Syokimau", "Embakasi", "Donholm", "Upperhill", "Hurlingham",
  "Ngong", "Athi River", "Kiambu", "Ruaka", "Ruiru", "Thika Road",
];

/**
 * Build the main LocalBusiness structured data object
 */
export const buildLocalBusinessSchema = (overrides = {}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_INFO.name,
  legalName: BUSINESS_INFO.legalName,
  image: BUSINESS_INFO.logo,
  "@id": BUSINESS_INFO.url,
  url: BUSINESS_INFO.url,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  priceRange: BUSINESS_INFO.priceRange,
  description:
    "Professional cleaning services offering house cleaning, office cleaning, carpet cleaning, sofa cleaning, and deep cleaning services across all Nairobi areas. Certified, insured, and trusted by 5000+ clients.",
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
  sameAs: BUSINESS_INFO.sameAs,
  areaServed: NAIROBI_AREAS.map((area) => ({
    "@type": "City",
    name: area,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning Services",
    itemListElement: SERVICES_LIST.map((service, index) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        provider: {
          "@type": "Organization",
          name: BUSINESS_INFO.name,
        },
      },
    })),
  },
  ...overrides,
});

/**
 * Build BreadcrumbList schema
 */
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

/**
 * Build FAQ schema from array of {question, answer} objects
 */
export const buildFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * Build Service schema
 */
export const buildServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  provider: {
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
  },
  areaServed: "Nairobi, Kenya",
  serviceType: service.category || "Cleaning Service",
  url: `${BUSINESS_INFO.url}/services/${service.slug || ""}`,
});

/**
 * Standard keywords for all pages
 */
export const BASE_KEYWORDS = [
  "cleaning services Nairobi",
  "house cleaning Nairobi",
  "office cleaning Nairobi",
  "deep cleaning Kenya",
  "Sylvie Cleaning Services",
  "professional cleaners Nairobi",
  "carpet cleaning Nairobi",
  "sofa cleaning Nairobi",
  "post construction cleaning",
  "move in cleaning Nairobi",
  "commercial cleaning Nairobi",
];
