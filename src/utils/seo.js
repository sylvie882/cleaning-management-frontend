/**
 * SEO Utilities for Sylvie Cleaning Services
 * Centralized SEO configuration — production-grade, structured data, schema.org
 * Target: #1 for "cleaning services Nairobi" and all high-intent local queries
 */

export const BUSINESS_INFO = {
  name: "Sylvie Cleaning Services",
  legalName: "Sylvie Intercleaning Company Limited",
  url: "https://www.sylviecleaningservices.com",
  logo: "https://www.sylviecleaningservices.com/logo.png",
  phone: "+254726933261",
  phoneDisplay: "0726 933 261",
  email: "info@sylviecleaningservices.com",
  whatsapp: "https://wa.me/254726933261",
  priceRange: "KES 1,500 – 50,000",
  priceRangeSchema: "$$",
  founded: "2015",
  employeeCount: "50+",
  clientCount: "5000+",
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
    "https://www.youtube.com/@sylviecleaning",
  ],
};

// ── High-intent keywords for Nairobi cleaning searches ─────────────────────
export const BASE_KEYWORDS = [
  // Core money keywords
  "cleaning services Nairobi",
  "house cleaning services Nairobi",
  "professional cleaners Nairobi",
  "cleaning company Nairobi Kenya",
  "best cleaning services Nairobi",
  "affordable cleaning services Nairobi",
  "home cleaning Nairobi",
  "office cleaning Nairobi",
  // High-intent near-me
  "cleaning services near me Nairobi",
  "cleaners near me Nairobi",
  "house cleaner near me Nairobi",
  // Service-specific
  "deep cleaning Nairobi",
  "carpet cleaning Nairobi",
  "sofa cleaning Nairobi",
  "post construction cleaning Nairobi",
  "move in cleaning Nairobi",
  "move out cleaning Nairobi",
  "commercial cleaning Nairobi",
  "office cleaning Nairobi Kenya",
  "residential cleaning Nairobi",
  // Estate-level (where competitors rank)
  "cleaning services Karen Nairobi",
  "cleaning services Westlands Nairobi",
  "cleaning services Kilimani",
  "cleaning services Runda",
  "cleaning services Lavington",
  "cleaning services Kileleshwa",
  "cleaning services Parklands",
  // Brand
  "Sylvie Cleaning Services",
  "Sylvie cleaners Kenya",
];

// ── All Nairobi service areas (used in schema + county pages) ──────────────
export const NAIROBI_AREAS = [
  "Karen", "Westlands", "Runda", "Kilimani", "Lavington", "Kileleshwa",
  "Parklands", "Muthaiga", "Ridgeways", "Spring Valley", "Kyuna", "Loresho",
  "Lower Kabete", "Upper Kabete", "Gigiri", "Runda Mumwe", "Rosslyn",
  "Thigiri", "South C", "South B", "Langata", "Rongai", "Syokimau",
  "Embakasi", "Donholm", "Upperhill", "Hurlingham", "Ngong", "Athi River",
  "Kiambu", "Ruaka", "Ruiru", "Thika Road", "Parklands", "Kasarani",
  "Eastleigh", "South B", "South C", "Buruburu", "CBD Nairobi",
];

// ── All 47 Kenya counties ──────────────────────────────────────────────────
export const KENYA_COUNTIES = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
  "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
  "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot",
  "Samburu", "Trans-Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi",
  "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet",
  "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay",
  "Migori", "Kisii", "Nyamira", "Nairobi",
];

// ── Services catalogue ─────────────────────────────────────────────────────
export const SERVICES_LIST = [
  { name: "House Cleaning", slug: "residential", price: "From KES 1,500" },
  { name: "Office Cleaning", slug: "commercial", price: "From KES 3,000" },
  { name: "Deep Cleaning", slug: "deep-cleaning", price: "From KES 4,000" },
  { name: "Carpet Cleaning", slug: "specialized", price: "From KES 1,000/room" },
  { name: "Sofa Cleaning", slug: "specialized", price: "From KES 800/seat" },
  { name: "Post Construction Cleaning", slug: "specialized", price: "From KES 5,000" },
  { name: "Move-In/Move-Out Cleaning", slug: "residential", price: "From KES 3,500" },
  { name: "Commercial Cleaning", slug: "commercial", price: "Custom Quote" },
  { name: "Specialized Cleaning", slug: "specialized", price: "Custom Quote" },
  { name: "Event Cleanup Services", slug: "specialized", price: "From KES 2,500" },
  { name: "Mattress Cleaning", slug: "specialized", price: "From KES 800" },
  { name: "Window Cleaning", slug: "specialized", price: "From KES 500/window" },
];

// ── LocalBusiness + CleaningBusiness schema ────────────────────────────────
export const buildLocalBusinessSchema = (overrides = {}) => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness"],
  name: BUSINESS_INFO.name,
  legalName: BUSINESS_INFO.legalName,
  image: [
    BUSINESS_INFO.logo,
    "https://www.sylviecleaningservices.com/og-image.jpg",
  ],
  "@id": BUSINESS_INFO.url,
  url: BUSINESS_INFO.url,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  priceRange: BUSINESS_INFO.priceRange,
  currenciesAccepted: "KES",
  paymentAccepted: "Cash, M-Pesa, Bank Transfer",
  description:
    "Sylvie Cleaning Services is Nairobi's top-rated professional cleaning company with 5,000+ satisfied clients. We offer house cleaning, office cleaning, carpet cleaning, sofa cleaning, deep cleaning, and post-construction cleaning across all Nairobi areas and 47 counties in Kenya. Certified, insured, and trusted since 2015.",
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
  foundingDate: BUSINESS_INFO.founded,
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 50,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mercy Wangari" },
      datePublished: "2025-03-10",
      name: "Best cleaning company in Nairobi",
      reviewBody:
        "Sylvie Cleaning Services did a spectacular deep clean of our Karen home. The team arrived on time, were very professional and left every room spotless. Highly recommend for anyone looking for reliable cleaners in Nairobi!",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "James Odhiambo" },
      datePublished: "2025-05-02",
      name: "Excellent post-construction cleaning in Westlands",
      reviewBody:
        "After our office renovation in Westlands, Sylvie's team handled the post-construction cleaning perfectly. Dust-free, polished, and ready to use within a day. Will definitely book again.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Grace Achieng" },
      datePublished: "2025-06-15",
      name: "Outstanding carpet and sofa cleaning",
      reviewBody:
        "My sofas and carpets look brand new after Sylvie's cleaning team came over. Fair pricing, eco-friendly products, and great customer service. The best cleaning services I've used in Nairobi.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
  ],
  areaServed: [
    ...NAIROBI_AREAS.map((area) => ({ "@type": "City", name: area })),
    { "@type": "AdministrativeArea", name: "Nairobi County" },
    { "@type": "Country", name: "Kenya" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Professional Cleaning Services",
    itemListElement: SERVICES_LIST.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      price: service.price,
      priceCurrency: "KES",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        url: `${BUSINESS_INFO.url}/services/${service.slug}`,
        provider: {
          "@type": "Organization",
          name: BUSINESS_INFO.name,
        },
        areaServed: "Nairobi, Kenya",
        serviceType: "Cleaning Service",
      },
    })),
  },
  ...overrides,
});

// ── BreadcrumbList schema ──────────────────────────────────────────────────
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

// ── FAQPage schema ─────────────────────────────────────────────────────────
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

// ── Service schema (for individual service/county pages) ───────────────────
export const buildServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  provider: {
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    telephone: BUSINESS_INFO.phone,
  },
  areaServed: service.area || "Nairobi, Kenya",
  serviceType: "Cleaning Service",
  url: service.url || `${BUSINESS_INFO.url}/services/${service.slug || ""}`,
  offers: {
    "@type": "Offer",
    priceCurrency: "KES",
    price: service.price || "1500",
    availability: "https://schema.org/InStock",
  },
});

// ── WebSite schema (for home page — enables Sitelinks Search Box) ──────────
export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BUSINESS_INFO.name,
  url: BUSINESS_INFO.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BUSINESS_INFO.url}/services?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

// ── Home page FAQs — curated for voice search & featured snippets ──────────
export const HOME_PAGE_FAQS = [
  {
    question: "What cleaning services does Sylvie Cleaning Services offer in Nairobi?",
    answer:
      "Sylvie Cleaning Services offers house cleaning, office cleaning, deep cleaning, carpet cleaning, sofa cleaning, post-construction cleaning, move-in/move-out cleaning, event cleanup, mattress cleaning, and window cleaning across all areas in Nairobi and Kenya.",
  },
  {
    question: "What areas in Nairobi do you serve?",
    answer:
      "We serve all areas across Nairobi including Karen, Westlands, Runda, Kilimani, Lavington, Kileleshwa, Parklands, Muthaiga, Upperhill, Hurlingham, Langata, South C, Syokimau, Embakasi, Kasarani, and 500+ more neighborhoods and estates.",
  },
  {
    question: "How much does house cleaning cost in Nairobi?",
    answer:
      "House cleaning in Nairobi starts from KES 1,500 for a studio apartment, KES 2,500 for a 1-bedroom, and KES 3,500–5,000 for 2–3 bedroom homes. Deep cleaning, carpet cleaning, and sofa cleaning are separately priced. Contact us for a free quote tailored to your home.",
  },
  {
    question: "How do I book a cleaning service in Nairobi?",
    answer:
      "You can book online via our website form, call or WhatsApp us at +254726933261, or email info@sylviecleaningservices.com. We offer flexible scheduling 7 days a week with same-day bookings available.",
  },
  {
    question: "Are your cleaners in Nairobi vetted and insured?",
    answer:
      "Yes. All Sylvie Cleaning Services cleaners are background-checked, professionally trained, uniformed, and fully insured. We conduct regular quality assessments to maintain the highest standards of service.",
  },
  {
    question: "Do you offer eco-friendly cleaning services in Nairobi?",
    answer:
      "Yes. We use environmentally safe, non-toxic, and biodegradable cleaning products that are safe for children, pets, and the environment. Our eco-friendly cleaning services are available across all Nairobi areas.",
  },
  {
    question: "Do you serve counties outside Nairobi?",
    answer:
      "Yes. While our main hub is in Nairobi, we provide cleaning services across all 47 counties in Kenya including Mombasa, Kisumu, Nakuru, Eldoret, Kiambu, Machakos, Kajiado, and more. Contact us for out-of-Nairobi availability.",
  },
  {
    question: "What is the best cleaning company in Nairobi?",
    answer:
      "Sylvie Cleaning Services is widely regarded as one of Nairobi's best cleaning companies, with a 4.9-star rating from over 300 verified reviews, 5,000+ satisfied clients, and 10 years of experience serving homes and businesses across Kenya.",
  },
];
