/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import cleaner2 from "../../assets/images/newSlider2.jpg";

// SEO Data for residential service - Enhanced with Nairobi-specific optimization
const serviceSeoData = {
  title: "Professional Residential Cleaning Services in Nairobi | Sylvie Cleaning",
  description: "Expert home cleaning services in Nairobi. Deep cleaning, regular maintenance, move-in/out cleaning. Eco-friendly products, trained staff. Free quotes.",
  keywords: "residential cleaning Nairobi, home cleaning services, house cleaning Westlands, deep cleaning Nairobi, move-in cleaning, Karen, Runda, Kileleshwa cleaning",
  canonicalUrl: "https://www.sylviecleaningservices.com/services/residential-cleaning",
  siteName: "Sylvie Cleaning Services",
  twitterHandle: "@sylviecleaning",
  socialImage: cleaner2,
  businessInfo: {
    name: "Sylvie Cleaning Services",
    url: "https://www.sylviecleaningservices.com",
    logo: "https://www.sylviecleaningservices.com/logo.png",
    phone: "+254726933261",
    address: {
      street: "Dale House, Rhapta Road Westlands",
      city: "Nairobi",
      state: "Nairobi",
      zip: "00100",
      country: "KE"
    },
    openingHours: "Mo-Fr 08:00-20:00, Sa 09:00-15:00",
    priceRange: "$$",
    sameAs: [
      "https://web.facebook.com/sylvie.cleaning",
      "https://www.instagram.com/sylviecleaning",
      "https://x.com/sylviecleaning"
    ],
    areasServed: [
      "Nairobi", "Westlands", "Karen", "Runda", "Kileleshwa", "Lavington", "Kilimani",
      "Ngong", "Upper Hill", "Naivasha", "Nakuru County", "Narok", "Kiambu", "Thika", "Ongata Rongai", "Parklands", "Highridge", "Syokimau", "Kitengela",
      "Horse Shoe Village", "Barton Estate", "Whispers Estate", "Migaa Golf Estate", "Daisy Road", "Tara Road", "Fairview Estate", "Riverrun Estates", "Amani Ridge", "Zaria Village", "Karogo Estate", "Mind Bridge Gardens", "Mhasibu Silver Birch Estate", "Royale Ville Gardens", "Mitini Scapes Migaa", "Rose Gate Estate", "Nawiri Estate", "Nderi Road", "Shanzu Road", "Kibarage Estate", "Gitanga Road", "Waithaka Estate", "Muthithi Gardens", "Ngong Forest View", "Langata Forest View Estate", "Karen Greens Estate", "Karen Ridge Estate", "Karen Road", "Langata Road", "Marula Lane", "Karen Brooks Estate", "Karen Brooks Road", "Acacia Drive", "Situ Village", "Ololua Ridge", "Diepolos Road", "Kangawa Road", "Zambia Road", "Baboon Crescent", "Cedar Road", "Gitonga Drive", "Windy Ridge", "Pepo Lane", "Rhino Park Road", "Elgeyo Marakwet Road", "Safari Park Avenue", "Kivuli Lane", "Usiu Road", "Nyati Road", "Kenyatta Road", "Makuyu Ridge", "Isinya", "Tuala", "Diadpora Village", "Meadows Estate", "Mimosa Road", "Eliud Mathu Street", "Benin Drive", "Glory Road", "Egrets Drive Road", "Red Hill Drive", "Thigiri Ridge Road", "Ndoto Road", "Kisaju", "Olooloitikosh", "Magadi Road", "Amboseli Road", "Convent Road", "Kaptagat Road", "Southern Bypass", "MCAKECH Residence", "Natala Ranch", "Grace Hill Gardens", "Maasai Road", "Olepolos", "Mbagathi Way", "Makuyu", "Samaki Drive", "Nyati Drive", "Lukenya Hills Estate", "Paradise Park Estate", "Thome Estate", "Garden Estate", "Silanga Road", "Kombe Road", "Fana Road", "Mokoyeti South Road", "Mokoyeti West Road", "Karen C Road", "Kumbe Road", "Santack Estate", "Jamhuri Estate", "Kilimani", "Woodley Estate", "Golf Course Estate", "Akinseye Estate", "Muguga Green Estate", "Kitisuru Country Homes", "Shinyalu Road", "D134 Kamau Residency", "Ngenda Road", "Sahara Estate", "Toll Estate", "Wendani Estate", "Zahara Estate", "Saitoti Road", "Shombole Road", "Gem Lane", "Taita Villas", "Natare Gardens", "Eve Gardens Estate", "Third Brooks Avenue", "Ngong Road", "Street Elizabeth", "Ngong View Road", "Ngong View Rise", "Forest Line Road", "Muteero Ridge", "Kay Estate", "Brook View Estate", "Kihanya Estate", "Mugumo Crescent", "Kyuna Road", "Kyuna Crescent", "Utawala", "Ruai", "Kangundo Road", "Ruaka", "Nandi Road Karen", "Bogani Karen", "Karen Hills Estate", "Kikenni Drive", "Mukoma Estate", "Sandalwood Estate Karen", "Runda Mhasibu", "Kugeria North Close", "Ridgeways", "Ridgeways Drive", "Kigwa Road", "Edenville Estate", "Balozi Estate", "Fourways Junction", "Paradise Lost", "Evergreen", "Tigoni", "Limuru", "Athi River", "Muthaiga North", "Muthaiga South", "Juja", "Wakigwa Estate", "Adams Park Estate", "Juja South Estate", "Chai Estate", "Lower Kabete Road", "Upper Kabete Road", "Spring Valley", "Sports Road", "David Osieli Road", "Mvuli Road", "Lantana Road", "Terrace Close", "Church Road", "Blueman Road", "Parklands Road", "Maasai Lodge Road", "Ndorobo Road", "Muhiti Road", "Gataka Road", "Mayor Road", "Bosto Road", "Mahiga Mairu Avenue", "Riara Road", "Flame Tree Drive", "Safari Park View Estate", "Chady Road", "Airport North Road", "Fahari Close", "Kiambu Road", "Mukabi Road", "Hinga Road", "Loresho Lane", "Thindigua", "Kasarini", "Mushroom Road", "Riabai Road", "Muchatha", "Boma Road", "Kiratina Road", "Kitisuru Road", "Marurui Road", "Githunguri-Githiga Road", "Kamiti Road", "Eastern Bypass Road", "Northern Bypass Road", "Mombasa Road", "Katani Road", "Bustani Estate", "Mwananchi Road", "Muthama Access Road", "Athi River Road", "Loneview Access Road", "Epco Road", "Namanga Road", "Chuna Road", "EPZ Road", "Gesora Road", "Kayole Road", "Uhuru Gardens Estate", "Runda Road", "Runda Grove", "Ruaka Road", "UN Avenue", "Eagle Park", "Andrew Zagoritis Street", "Pan Africa Insurance Avenue", "Elia Zagoritis Road", "Elia Zagoritis Avenue", "Glory Drive", "Alibiza Drive"
    ],
    services: ["Residential Cleaning", "Regular Home Cleaning", "Deep Cleaning", "Move-In/Move-Out Cleaning", "Post-Construction Cleaning"]
  }
};

// Enhanced Structured Data for SEO
const generateServiceStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Residential Cleaning Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": serviceSeoData.businessInfo.name,
      "image": serviceSeoData.socialImage,
      "@id": serviceSeoData.canonicalUrl,
      "url": serviceSeoData.canonicalUrl,
      "telephone": serviceSeoData.businessInfo.phone,
      "priceRange": serviceSeoData.businessInfo.priceRange,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": serviceSeoData.businessInfo.address.street,
        "addressLocality": serviceSeoData.businessInfo.address.city,
        "addressRegion": serviceSeoData.businessInfo.address.state,
        "postalCode": serviceSeoData.businessInfo.address.zip,
        "addressCountry": serviceSeoData.businessInfo.address.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-1.2657",  // Nairobi coordinates
        "longitude": "36.8025"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      "sameAs": serviceSeoData.businessInfo.sameAs,
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-1.2657",
        "longitude": "36.8025"
      },
      "geoRadius": "20000"  // 20km radius from Nairobi center
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Residential Cleaning Services",
      "itemListElement": serviceSeoData.businessInfo.services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    },
    "description": serviceSeoData.description,
    "name": "Residential Cleaning Services"
  };
};

// Residential Cleaning Page
const ResidentialCleaning = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    benefits: false,
    services: false,
    process: false,
    pricing: false,
    cta: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const residentialServices = [
    {
      title: "Regular Home Cleaning",
      description: "Weekly, bi-weekly, or monthly maintenance cleaning to keep your home consistently clean",
      icon: "fas fa-home",
      features: ["Dusting all surfaces", "Vacuuming and mopping floors", "Bathroom sanitization", "Kitchen cleaning", "Trash removal"],
      price: "From KES 2,500 per session"
    },
    {
      title: "Deep Cleaning",
      description: "Thorough cleaning of every corner of your home for a fresh start",
      icon: "fas fa-broom",
      features: ["Behind appliances", "Inside cabinets", "Baseboard cleaning", "Window sills", "Light fixtures"],
      price: "From KES 8,000"
    },
    {
      title: "Move-In/Move-Out Cleaning",
      description: "Comprehensive cleaning for tenants and homeowners during transitions",
      icon: "fas fa-truck-moving",
      features: ["Wall washing", "Inside appliances", "Cabinet interiors", "Window cleaning", "Carpet cleaning"],
      price: "From KES 12,000"
    },
    {
      title: "Post-Construction Cleaning",
      description: "Eliminate construction dust and debris from your newly built or renovated home",
      icon: "fas fa-hard-hat",
      features: ["Debris removal", "Fine dust elimination", "Surface protection removal", "Final touch cleaning", "Waste disposal"],
      price: "From KES 15,000"
    },
  ];

  const benefits = [
    {
      title: "Healthier Living Environment",
      description: "Reduce allergens, dust mites, and bacteria that can affect your family's health",
      icon: "fas fa-heartbeat"
    },
    {
      title: "More Free Time",
      description: "Reclaim your weekends and spend quality time with loved ones instead of cleaning",
      icon: "fas fa-clock"
    },
    {
      title: "Extended Home Longevity",
      description: "Regular maintenance prevents wear and tear, preserving your home's value",
      icon: "fas fa-home"
    },
    {
      title: "Professional Results",
      description: "Our trained staff uses professional-grade equipment and techniques for superior cleaning",
      icon: "fas fa-award"
    },
  ];

  const structuredData = generateServiceStructuredData();

  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <title>{serviceSeoData.title}</title>
        <meta name="description" content={serviceSeoData.description} />
        <meta name="keywords" content={serviceSeoData.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={serviceSeoData.canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="service" />
        <meta property="og:url" content={serviceSeoData.canonicalUrl} />
        <meta property="og:title" content={serviceSeoData.title} />
        <meta property="og:description" content={serviceSeoData.description} />
        <meta property="og:image" content={serviceSeoData.socialImage} />
        <meta property="og:site_name" content={serviceSeoData.siteName} />
        <meta property="og:locale" content="en_KE" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={serviceSeoData.canonicalUrl} />
        <meta name="twitter:title" content={serviceSeoData.title} />
        <meta name="twitter:description" content={serviceSeoData.description} />
        <meta name="twitter:image" content={serviceSeoData.socialImage} />
        <meta name="twitter:creator" content={serviceSeoData.twitterHandle} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.2657;36.8025" />
        <meta name="ICBM" content="-1.2657, 36.8025" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden" data-section="hero">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${cleaner2})` }}
        ></div>
        
        <div className="container relative z-10 mx-auto px-6 text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Residential Cleaning Services</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional home cleaning services in Nairobi that give you back your time and ensure a healthier living environment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors">
                Book Now
              </Link>
              <Link to="/contact" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white" data-section="benefits">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Benefits of Professional Home Cleaning</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`text-center p-6 bg-blue-50 rounded-lg transition-all duration-500 ${isVisible.benefits ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl text-blue-600 mb-4">
                  <i className={benefit.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50" data-section="services">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Residential Cleaning Services</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Customized cleaning solutions for homes in Nairobi and surrounding areas
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {residentialServices.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-xl shadow-md transition-all duration-500 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-xl mr-4">
                    <i className={`${service.icon} text-blue-600 text-2xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <h4 className="font-bold mb-3">Includes:</h4>
                <ul className="mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center mb-2">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-700">{service.price}</span>
                  <Link to="/book" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white" data-section="cta">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Cleaner Home?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the Sylvie Cleaning difference with our professional residential cleaning services in Nairobi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors">
              Book Your Cleaning
            </Link>
            <Link to="/contact" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
              Call Us: +254726933261
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResidentialCleaning;