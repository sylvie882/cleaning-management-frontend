/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import cleaner4 from "../../assets/images/newSlider4.jpg";

// SEO Data for deep cleaning service
const serviceSeoData = {
  title: "Deep Cleaning Services Nairobi | Professional Deep Clean | Sylvie Cleaning",
  description: "Thorough deep cleaning services in Nairobi. Kitchen deep clean, bathroom sanitization, carpet cleaning. Allergy-friendly solutions. Book online.",
  keywords: "deep cleaning Nairobi, spring cleaning Kenya, thorough cleaning services, carpet cleaning Nairobi",
  canonical: "https://www.sylviecleaningservices.com/services/deep-cleaning"
};

// Structured Data Generator
const generateServiceStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Deep Cleaning Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Sylvie Cleaning Services",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dale House, Rhapta Road Westlands",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi",
        "postalCode": "00100",
        "addressCountry": "KE"
      },
      "telephone": "+254726933261",
         areasServed : [
    "Nairobi", "Westlands", "Karen", "Runda", "Kileleshwa", "Lavington", "Kilimani",
    "Ngong", "Upper Hill", "Naivasha", "Nakuru County", "Narok", "Kiambu", "Thika", "Ongata Rongai", "Parklands", "Highridge", "Syokimau", "Kitengela",
    "Horse Shoe Village", "Barton Estate", "Whispers Estate", "Migaa Golf Estate", "Daisy Road", "Tara Road", "Fairview Estate", "Riverrun Estates", "Amani Ridge", "Zaria Village", "Karogo Estate", "Mind Bridge Gardens", "Mhasibu Silver Birch Estate", "Royale Ville Gardens", "Mitini Scapes Migaa", "Rose Gate Estate", "Nawiri Estate", "Nderi Road", "Shanzu Road", "Kibarage Estate", "Gitanga Road", "Waithaka Estate", "Muthithi Gardens", "Ngong Forest View", "Langata Forest View Estate", "Karen Greens Estate", "Karen Ridge Estate", "Karen Road", "Langata Road", "Marula Lane", "Karen Brooks Estate", "Karen Brooks Road", "Acacia Drive", "Situ Village", "Ololua Ridge", "Diepolos Road", "Kangawa Road", "Zambia Road", "Baboon Crescent", "Cedar Road", "Gitonga Drive", "Windy Ridge", "Pepo Lane", "Rhino Park Road", "Elgeyo Marakwet Road", "Safari Park Avenue", "Kivuli Lane", "Usiu Road", "Nyati Road", "Kenyatta Road", "Makuyu Ridge", "Isinya", "Tuala", "Diadpora Village", "Meadows Estate", "Mimosa Road", "Eliud Mathu Street", "Benin Drive", "Glory Road", "Egrets Drive Road", "Red Hill Drive", "Thigiri Ridge Road", "Ndoto Road", "Kisaju", "Olooloitikosh", "Magadi Road", "Amboseli Road", "Convent Road", "Kaptagat Road", "Southern Bypass", "MCAKECH Residence", "Natala Ranch", "Grace Hill Gardens", "Maasai Road", "Olepolos", "Mbagathi Way", "Makuyu", "Samaki Drive", "Nyati Drive", "Lukenya Hills Estate", "Paradise Park Estate", "Thome Estate", "Garden Estate", "Silanga Road", "Kombe Road", "Fana Road", "Mokoyeti South Road", "Mokoyeti West Road", "Karen C Road", "Kumbe Road", "Santack Estate", "Jamhuri Estate", "Kilimani", "Woodley Estate", "Golf Course Estate", "Akinseye Estate", "Muguga Green Estate", "Kitisuru Country Homes", "Shinyalu Road", "D134 Kamau Residency", "Ngenda Road", "Sahara Estate", "Toll Estate", "Wendani Estate", "Zahara Estate", "Saitoti Road", "Shombole Road", "Gem Lane", "Taita Villas", "Natare Gardens", "Eve Gardens Estate", "Third Brooks Avenue", "Ngong Road", "Street Elizabeth", "Ngong View Road", "Ngong View Rise", "Forest Line Road", "Muteero Ridge", "Kay Estate", "Brook View Estate", "Kihanya Estate", "Mugumo Crescent", "Kyuna Road", "Kyuna Crescent", "Utawala", "Ruai", "Kangundo Road", "Ruaka", "Nandi Road Karen", "Bogani Karen", "Karen Hills Estate", "Kikenni Drive", "Mukoma Estate", "Sandalwood Estate Karen", "Runda Mhasibu", "Kugeria North Close", "Ridgeways", "Ridgeways Drive", "Kigwa Road", "Edenville Estate", "Balozi Estate", "Fourways Junction", "Paradise Lost", "Evergreen", "Tigoni", "Limuru", "Athi River", "Muthaiga North", "Muthaiga South", "Juja", "Wakigwa Estate", "Adams Park Estate", "Juja South Estate", "Chai Estate", "Lower Kabete Road", "Upper Kabete Road", "Spring Valley", "Sports Road", "David Osieli Road", "Mvuli Road", "Lantana Road", "Terrace Close", "Church Road", "Blueman Road", "Parklands Road", "Maasai Lodge Road", "Ndorobo Road", "Muhiti Road", "Gataka Road", "Mayor Road", "Bosto Road", "Mahiga Mairu Avenue", "Riara Road", "Flame Tree Drive", "Safari Park View Estate", "Chady Road", "Airport North Road", "Fahari Close", "Kiambu Road", "Mukabi Road", "Hinga Road", "Loresho Lane", "Thindigua", "Kasarini", "Mushroom Road", "Riabai Road", "Muchatha", "Boma Road", "Kiratina Road", "Kitisuru Road", "Marurui Road", "Githunguri-Githiga Road", "Kamiti Road", "Eastern Bypass Road", "Northern Bypass Road", "Mombasa Road", "Katani Road", "Bustani Estate", "Mwananchi Road", "Muthama Access Road", "Athi River Road", "Loneview Access Road", "Epco Road", "Namanga Road", "Chuna Road", "EPZ Road", "Gesora Road", "Kayole Road", "Uhuru Gardens Estate", "Runda Road", "Runda Grove", "Ruaka Road", "UN Avenue", "Eagle Park", "Andrew Zagoritis Street", "Pan Africa Insurance Avenue", "Elia Zagoritis Road", "Elia Zagoritis Avenue", "Glory Drive", "Alibiza Drive"
    ]
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-1.2657",
        "longitude": "36.8025"
      },
      "geoRadius": "20000"
    },
    "description": "Thorough deep cleaning services for homes and offices in Nairobi",
    "name": "Deep Cleaning Services"
  };
};

// Deep Cleaning Page
const DeepCleaning = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    benefits: false,
    services: false,
    process: false,
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

  const deepCleaningServices = [
    {
      title: "Kitchen Deep Cleaning",
      description: "Thorough cleaning of your kitchen including appliances, cabinets, and hard-to-reach areas",
      icon: "fas fa-utensils",
      features: ["Appliance deep cleaning", "Cabinet interior cleaning", "Degreasing surfaces", "Exhaust fan cleaning", "Backsplash scrubbing"],
      price: "From KES 5,000"
    },
    {
      title: "Bathroom Deep Cleaning",
      description: "Intensive sanitization and cleaning of bathrooms to eliminate germs and buildup",
      icon: "fas fa-bath",
      features: ["Grout and tile cleaning", "Sanitization of surfaces", "Lime scale removal", "Showerhead descaling", "Vent cleaning"],
      price: "From KES 4,500 per bathroom"
    },
    {
      title: "Whole House Deep Cleaning",
      description: "Comprehensive cleaning of your entire home from top to bottom",
      icon: "fas fa-home",
      features: ["Room-by-room deep clean", "Baseboard cleaning", "Light fixture dusting", "Window sill cleaning", "Interior window cleaning"],
      price: "From KES 15,000"
    },
    {
      title: "Spring Cleaning Package",
      description: "Seasonal deep cleaning to refresh your home after winter or before special occasions",
      icon: "fas fa-leaf",
      features: ["Closet organization", "Blind and curtain cleaning", "Upholstery vacuuming", "Wall spot cleaning", "Organization assistance"],
      price: "From KES 18,000"
    },
  ];

  const benefits = [
    {
      title: "Allergen Reduction",
      description: "Eliminate dust mites, pet dander, and other allergens from your home",
      icon: "fas fa-wind"
    },
    {
      title: "Germ Elimination",
      description: "Thorough sanitization reduces bacteria and viruses on surfaces",
      icon: "fas fa-bacteria"
    },
    {
      title: "Extended Home Life",
      description: "Regular deep cleaning protects surfaces and extends their lifespan",
      icon: "fas fa-home"
    },
    {
      title: "Improved Air Quality",
      description: "Removing built-up dust and contaminants improves indoor air quality",
      icon: "fas fa-lungs"
    },
  ];

  const structuredData = generateServiceStructuredData();

  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <title>{serviceSeoData.title}</title>
        <meta name="description" content={serviceSeoData.description} />
        <meta name="keywords" content={serviceSeoData.keywords} />
        <link rel="canonical" href={serviceSeoData.canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={serviceSeoData.title} />
        <meta property="og:description" content={serviceSeoData.description} />
        <meta property="og:url" content={serviceSeoData.canonical} />
        <meta property="og:type" content="service" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content={serviceSeoData.title} />
        <meta name="twitter:description" content={serviceSeoData.description} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-emerald-800 overflow-hidden" data-section="hero">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${cleaner4})` }}
        ></div>
        
        <div className="container relative z-10 mx-auto px-6 text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Deep Cleaning Services</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Intensive cleaning that reaches every corner of your home or office for a truly fresh and sanitized environment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-green-50 transition-colors">
                Book Deep Cleaning
              </Link>
              <Link to="/contact" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white" data-section="benefits">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Benefits of Professional Deep Cleaning</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`text-center p-6 bg-green-50 rounded-lg transition-all duration-500 ${isVisible.benefits ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl text-green-600 mb-4">
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Deep Cleaning Services</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Comprehensive deep cleaning solutions for homes and businesses in Nairobi
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deepCleaningServices.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-xl shadow-md transition-all duration-500 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-4 rounded-xl mr-4">
                    <i className={`${service.icon} text-green-600 text-2xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <h4 className="font-bold mb-3">Service Includes:</h4>
                <ul className="mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center mb-2">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-700">{service.price}</span>
                  <Link to="/book" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white" data-section="process">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Deep Cleaning Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "Assessment",
                description: "We evaluate your space and identify areas needing special attention",
                icon: "fas fa-clipboard-list"
              },
              {
                step: "Preparation",
                description: "We move furniture carefully and protect your belongings",
                icon: "fas fa-boxes"
              },
              {
                step: "Deep Cleaning",
                description: "Our team performs intensive cleaning using professional equipment",
                icon: "fas fa-broom"
              },
              {
                step: "Final Inspection",
                description: "We ensure every area meets our high standards before completion",
                icon: "fas fa-check-circle"
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className={`text-center p-6 transition-all duration-500 ${isVisible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">
                  <i className={step.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.step}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white" data-section="cta">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Deep Clean?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Transform your space with our professional deep cleaning services in Nairobi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-green-50 transition-colors">
              Schedule Deep Clean
            </Link>
            <Link to="/contact" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
              Call: +254726933261
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeepCleaning;