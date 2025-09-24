/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import cleaner10 from "../../assets/images/newSlider7.jpg";

// SEO Data for specialized service
const serviceSeoData = {
  title: "Specialized Cleaning Services Nairobi | Sylvie Cleaning Experts",
  description: "Specialized cleaning services in Nairobi: post-construction, event cleanup, carpet, upholstery and window cleaning. Professional equipment.",
  keywords: "specialized cleaning Nairobi, post-construction cleaning, event cleanup Kenya, carpet cleaning services",
  canonical: "https://www.sylviecleaningservices.com/services/specialized-cleaning"
};

// Structured Data Generator
const generateServiceStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Specialized Cleaning Services",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Sylvie Cleaning Services",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dale House, Rhapta Road,Fox Close",
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
    "description": "Specialized cleaning services including post-construction, carpet, and window cleaning in Nairobi",
    "name": "Specialized Cleaning Services"
  };
};

// Specialized Cleaning Page
const SpecializedCleaning = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    specialties: false,
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

  const specializedServices = [
    {
      title: "Post-Construction Cleaning",
      description: "Thorough cleanup after construction or renovation projects",
      icon: "fas fa-tools",
      features: ["Debris removal", "Fine dust elimination", "Window cleaning", "Surface protection removal", "Final touch cleaning"],
      price: "From KES 20,000"
    },
    {
      title: "Carpet & Upholstery Cleaning",
      description: "Professional cleaning and stain removal for carpets and furniture",
      icon: "fas fa-couch",
      features: ["Steam cleaning", "Stain treatment", "Deodorizing", "Protective treatment", "Quick drying"],
      price: "From KES 3,000 per room"
    },
    {
      title: "Window Cleaning",
      description: "Interior and exterior window cleaning for crystal-clear views",
      icon: "fas fa-window-maximize",
      features: ["Interior window cleaning", "Exterior window cleaning", "Frame and sill cleaning", "Streak-free finish", "Hard water stain removal"],
      price: "From KES 2,500 per window"
    },
    {
      title: "Event Cleanup",
      description: "Pre and post-event cleaning services for venues and spaces",
      icon: "fas fa-glass-cheers",
      features: ["Pre-event preparation", "Post-event cleanup", "Trash removal", "Floor cleaning", "Restroom servicing"],
      price: "From KES 15,000 per event"
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
      <section className="relative py-20 bg-gradient-to-r from-orange-600 to-red-700 overflow-hidden" data-section="hero">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${cleaner10})` }}
        ></div>
        
        <div className="container relative z-10 mx-auto px-6 text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Specialized Cleaning Services</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Expert cleaning solutions for unique situations and specialized requirements in Nairobi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="bg-white text-orange-700 font-bold py-3 px-8 rounded-full hover:bg-orange-50 transition-colors">
                Book Specialized Service
              </Link>
              <Link to="/contact" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50" data-section="services">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Specialized Cleaning Services</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Tailored cleaning solutions for specific needs and situations in Nairobi
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specializedServices.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-xl shadow-md transition-all duration-500 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 p-4 rounded-xl mr-4">
                    <i className={`${service.icon} text-orange-600 text-2xl`}></i>
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
                  <span className="font-bold text-orange-700">{service.price}</span>
                  <Link to="/contact" className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition-colors">
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-white" data-section="specialties">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Specialized Cleaning Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Equipment",
                description: "We use professional-grade equipment designed for specialized cleaning tasks",
                icon: "fas fa-tools"
              },
              {
                title: "Specialized Training",
                description: "Our team receives ongoing training in specialized cleaning techniques",
                icon: "fas fa-user-graduate"
              },
              {
                title: "Eco-Friendly Solutions",
                description: "We use environmentally safe products that are effective yet gentle",
                icon: "fas fa-leaf"
              },
              {
                title: "Insurance Coverage",
                description: "Fully insured for your peace of mind during specialized cleaning projects",
                icon: "fas fa-shield-alt"
              },
              {
                title: "Flexible Scheduling",
                description: "Available for emergency and after-hours specialized cleaning needs",
                icon: "fas fa-calendar-alt"
              },
              {
                title: "Quality Guarantee",
                description: "We stand behind our work with a satisfaction guarantee",
                icon: "fas fa-medal"
              }
            ].map((specialty, index) => (
              <div 
                key={index} 
                className={`text-center p-6 bg-orange-50 rounded-lg transition-all duration-500 ${isVisible.specialties ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl text-orange-600 mb-4">
                  <i className={specialty.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{specialty.title}</h3>
                <p className="text-gray-600">{specialty.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-700 text-white" data-section="cta">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Specialized Cleaning Solutions?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our expert team is ready to handle your unique cleaning challenges in Nairobi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-orange-700 font-bold py-3 px-8 rounded-full hover:bg-orange-50 transition-colors">
              Discuss Your Needs
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

export default SpecializedCleaning;