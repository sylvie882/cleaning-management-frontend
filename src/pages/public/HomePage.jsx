/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import heroImage from "../../assets/images/banner.png";
import cleaner1 from "../../assets/images/newSlider1.jpg";
import cleaner2 from "../../assets/images/newSlider2.jpg";
import cleaner3 from "../../assets/images/newSlider3.jpg";
import cleaner4 from "../../assets/images/newSlider4.jpg";
import cleaner9 from "../../assets/images/newSlider5.jpg";
import cleaner10 from "../../assets/images/newSlider7.jpg";
import cleaner5 from "../../assets/images/Luxury_Home.png";
import cleaner6 from "../../assets/images/Corporate_Office.png";
import cleaner7 from "../../assets/images/Resturant_Deep.png";
import cleaner8 from "../../assets/images/Event_venue.png";
import { useEffect, useState } from "react";
import { getTestimonials } from "../../features/testimonial/testimonialSlice";
import "../../styles/animations.css";
import { ArrowUp } from "lucide-react";

const HomePage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatingText, setAnimatingText] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    whyChoose: false,
    howItWorks: false,
    videos: false,
    projects: false,
    testimonials: false,
    cta: false,
    trust: false,
    areas: false,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // All marketing areas organized by region - FOR SEO ONLY
  const marketingAreas = {
    "Karen & Langata Region": [
      "Karen Road", "Karen C Road", "Karen Greens Estate", "Karen Ridge Estate", 
      "Karen Brooks Estate", "Karen Brooks Road", "Karen Hills Estate", 
      "Langata Road", "Langata Forest View Estate", "Amani Ridge Karen", 
      "Nandi Road Karen", "Bogani Karen", "Sandalwood Estate Karen",
      "Ololua Ridge", "Marula Lane", "Acacia Drive", "Windy Ridge", "Pepo Lane",
      "Rhino Park Road", "Elgeyo Marakwet Road", "Safaripark Avenue",
      "Kivuli Lane", "USIU Road", "Nyati Road", "Kenyatta Road",
      "Mokoyeti South Road", "Mokoyeti West Road", "Silanga Road",
      "Kombe Road", "Fana Road", "St. Thomas Seminary", "Mukoma Rd",
      "Giraffe Center", "Bogani Rd", "Bogani East Rd", "Koitobos Rd",
      "Park Place", "Park View", "Simba Hill", "Kisembe", "Saifee Park",
      "Kipevu", "Banfa Rd", "Ndorobo Rd", "Muhuti R", "Munderendu Rd",
      "Brooke House", "Catholic University", "Banda Rd", "St Hellen Lane",
      "Hill Crest", "Fair Acres", "Marist Rd", "Don Bosco", "Kufuga Lane",
      "Kuwinda Rd", "Kufuga Rd", "Karen Green", "Jesuit Fathers", "Ndege Rd",
      "Mukinduri Rd", "Murishu Rd", "Forest Edge", "Stedmak", "Academy Rd",
      "Langata Barracks", "Carnivore Restaurant", "Carnivore Splash",
      "Trident Park Daisy Park", "West Park", "Phenom Park", "Phenom Est",
      "Shree Cutchi Leva Patel Samaj School", "KWS", "CALE Infrasture",
      "Ramarind", "Langata EPCO", "Langat South Rd", "KRA Langata",
      "Panda Matt", "Mwiri Lane", "Muiri Close", "Muiri Rd", "Nyumba Moja",
      "Ndarati Rd", "JKUAT Karen", "Kasuku Close", "Chemic Hemi Ndovu Rd"
    ],
    "Westlands & Parklands": [
      "Westlands", "Parklands Road", "Parklands", "1st Parklands", "2nd Parklands",
      "3rd Parklands", "4th Parklands", "5th Parklands", "6th Parklands",
      "Loresho Lane", "Loresho Ridge", "Kyuna Road", "Kyuna Crescent",
      "Spring Valley", "Muthangari Road", "Lower Kabete Road", "Upper Kabete Road",
      "Dennis Pritt Road", "Wood Avenue", "General Mathenge Road",
      "Eldama Ravine Road", "Ojijo Road", "Wambugu Road", "Mwanzi Road",
      "Kusi Lane", "Ngao Road", "Jalaram Road", "Muthaiga North", "Muthaiga South",
      "Runda Estate", "Runda Road", "Runda Grove", "Runda Mumwe", "Runda Riviera",
      "Runda Kigwaru", "Runda Water", "Runda Mhasibu", "Ridgeways", "Ridgeways Drive",
      "Rosslyn Green Close", "Rosslyn Green Crescent", "Rosslyn Green Drive",
      "Thigiri Ridge", "Thigiri Lane", "Thigiri Valley", "Thigiri Hilltop",
      "Thigiri Rise", "Thigiri Farm Road"
    ],
    "Kilimani & Kileleshwa": [
      "Kilimani Estate", "Kileleshwa", "Argwings Kodhek Road", "Lenana Road",
      "Ring Road Kilimani", "Woodley Estate", "Jamhuri Estate", "Muthithi Road",
      "Mpaka Road", "Mogotio Road", "Gitanga Road", "Ngong Road",
      "Valley Arcade", "Braeside Gardens", "Chania Avenue", "Kirichwa Road"
    ],
    "Lavington & Surrounding": [
      "Lavington", "James Gichuru Road", "Muthithi Gardens", "Mugumo Crescent",
      "Muthithi Road", "Mbaazi Avenue", "Msanduku Lane", "Othaya Road",
      "Kolloh Road", "Cotton Road", "Kayawe Road", "Galana Road"
    ],
    "Ngong & Surrounding Areas": [
      "Ngong Road", "Ngong Forest View", "Ngong View Road", "Ngong View Rise",
      "Forest Line Road", "Kiserian", "Isinya", "Tuala", "Kisaju", "Olooloitikosh",
      "Magadi Road", "Amboseli Road", "Olepolos", "Maasai Road", "Mbagathi Way",
      "Narok", "Naivasha", "Nakuru County"
    ],
    "Eastlands & Embakasi": [
      "Eastleigh Estate", "California Estate", "Mabruk", "Pumwani Hospital",
      "Uhuru Gardens Estate", "South C", "South End Estate", "Mugoya Phase 4 Estate",
      "Amana Estate", "Muhoho Avenue", "Mua University", "Amboseli Estate",
      "Highview Estate", "Popo Road", "Otiende Est", "Onyoka Estate",
      "Royal Park", "KMA Estate", "NHC Estate", "Park Gardens", "Jogoo Road",
      "Buruburu Phase 5", "Kayole Road", "Nasra Estate", "Sosion Estate",
      "Spine Road", "Airport North Road", "Syokimau", "Fahari Close",
      "EPZ Road", "Athi River", "Mombasa Road", "Katani Road", "Bustani Estate",
      "Mwananchi Road", "Muthama Access Road", "Athi River Road", "Loneview Access Road",
      "Epco Road", "Namanga Road", "Chuna Road", "Gesora Road"
    ],
    "Kiambu & Thika Road Corridor": [
      "Kiambu Road", "Thika Road", "Ruaka", "Ruiru", "Juja", "Juja South Estate",
      "Wakigwa Estate", "Adams Park Estate", "Chai Estate", "Garden Estate",
      "Thome Estate", "Thome 1 Estate", "Thome 2 Estate", "Ridgeways",
      "Mangu Road", "Githunguri-Githiga Road", "Kamiti Road", "Kahawa West",
      "Kahawa Sukari", "Gataka Road", "Muthiga", "Kinoo", "Uthiru", "Kikuyu Road",
      "Dagoretti Road"
    ],
    "Northern Nairobi & ByPasses": [
      "Northern Bypass", "Eastern Bypass", "Southern Bypass", "Mombasa Road",
      "Juja Road", "Kangundo Road", "Outering Road", "Donholm", "Embakasi",
      "Utawala", "Ruai", "Roysambu", "Pangani", "Kariokor", "Mathare North",
      "Huruma", "Umoja", "Kariobangi", "Dandora", "Kayole", "Komarock"
    ],
    "Upperhill & City Center": [
      "Upper Hill", "Community", "Museum Hill", "University Way", "Haile Selassie",
      "Mamlaka Road", "Nyerere Road", "Parliament Road", "Koinange Street",
      "Moi Avenue", "Kenyatta Avenue", "Tom Mboya Street", "Ronald Ngala Street",
      "River Road", "Latema Road", "Muindi Mbingu Street"
    ],
    "Other Prime Locations": [
      "The new horse shoe village", "Barton estate", "Whispers estate", 
      "migaa golf estate", "Daisy road", "Tara road", "Fairview estate", 
      "Riverrun estates", "Amani ridge", "Zaria village", "Karogo estate", 
      "Mind bridge gardens", "Mhasibu silver birch estate", "Royale ville gardens", 
      "Mitini scapes migaa", "Rose gate estate phase 1", "Nawiri estate", 
      "Nderi road", "Shanzu road", "kibarage estate", "Gitanga road", 
      "waithaka estate", "Ngong forest view", "Situ village", 
      "Diepolos road", "Kangawa road", "zambia road", "Baboon crescent", 
      "Cedar road", "Gitonga drive", "Makuyu ridge", "Diadpora village", 
      "Meadows estate", "Mimosa road", "Eliud Mathu street", "Benin Drive", 
      "Glory Road", "Egrets Drive road", "Red Hill Drive", "Thigiri Ridge Road", 
      "Ndoto road", "Convent road", "Kaptagat Road", "MCAKECH Residence", 
      "Natala ranch", "Grace Hill gardens", "Makuyu", "Samaki drive", 
      "Nyati drive", "Lukenya Hills estate", "Paradise Park estate", 
      "Silanga road", "kumbe road", "santack estate", "Muguga green estate", 
      "kitisuru country homes", "Shinyalu road", "The Zaria village", 
      "D134 Kamau residency", "Ngenda road", "Sahara estate", "Toll estate", 
      "Wendani estate", "Zahara ESTATE", "Saitoti road", "Shombole road", 
      "Gem lane", "Taita villas", "Natare Gardens", "Eve gardens estate", 
      "Third brooks avenue", "Street Elizabeth", "Muteero ridge", 
      "Kay estate", "Brook view estate", "Kihanya estate", "Kigwa road", 
      "Edenville estate", "Balozi estate", "Fourways junction", 
      "Paradise Lost", "Evergreen", "Tigoni,Limuru", "Sports Road", 
      "David osieli Road", "Mvuli Road", "Lantana Road", "terrace close", 
      "church Road", "Blueman road", "Maasai Lodge road", "ndorobo road", 
      "muhiti road", "Mayor road", "Bosto road", "Mahiga mairu avenue", 
      "riara road", "flame tree drive", "safaripark view estate", 
      "Chady road", "mukabi road", "hinga road", "THINDIGUA", "KASARINI", 
      "MUSHROOM ROAD", "Riabai road", ".muchatha", "Boma road", 
      "kiratina road", "kitsuru road", "marurui road", "UN AVENUE", 
      "ELIUD MATHU STREET", "EAGLE PARK", "BENIN DRIVE", 
      "ANDREW ZAGORITIS STREET", "PAN AFRICA INSURANCE AVENUE", 
      "ELIA ZAGORITIS ROAD", "ELIA ZAGORITIS AVENUE", "GLORY DRIVE", 
      "ALIBIZA DRIVE", "Rhapta road", "mvuli Road", "mkoko close", 
      "David osieli Road,", "sports road", "Roselyn drive road", 
      "Chiromo Lane", "Olengeruone road", "Mageta road", "Mugumo road", 
      "Isaac Gathanju Road", "Naurid Merali Road", "Majimazuri Road", 
      "Muhoya Avenue", "Jacaranda Avenue", "Suna Road", "City Park Estate", 
      "1st Ngong Avenue", "2nd Ngong Avenue", "3rd Ngong Avenue", 
      "Rironi Road", "Karoe", "Tilisi", "Nairobi West", "Muhoho Avenue", 
      "Muhuti Avenue", "Ole Shapara Road", "Uchumi Road", "Heshima Estate", 
      "Five Star Estate", "Ruby Estate", "Halai Estate", "Jua Kali Road", 
      "Olive Road", "Momon Estate", "Midland Court Estate", "Runda Drive", 
      "Mimosa Annex", "Mimosa Close", "Mimosa Vale", "Mimosa Gardens", 
      "Mimosa Ridge", "Mimosa Road", "Panafrican Insurance", "Mae Ridge", 
      "Part of Magadi Rd", "Kufuga Rd", "Mokoyet East", "Mokoyet West", 
      "Shree Cutchi Leva Patel Samaj School", "CALE Infrasture", 
      "Langata EPCO", "KRA Langata", "Otiende Est", "Onyoka Estate", 
      "Royal Park", "KMA Estate", "NHC Estate", "Park Gardens", "Tigoni", 
      "Loreto", "Redhill", "Ruaraka", "Enterprise Road", "Gilgil Road", 
      "Busia Road", "Isiolo Road", "Homabay Road", "Jirore Road", 
      "Lower Kabete", "Peponi Road", "Farasi Crescent", "New Kitsuru", 
      "Kitsuru Springs", "Hill view Estate", "Shanzu Road", "Kibagare way", 
      "Kinanda Road", "International School of Kenya", "Kirawa Road", 
      "Manga Garden", "Kitsuru Forward", "Tate Close", "Serenity Spa", 
      "Mitini Estate", "Ngecha Estate", "Lake View Estate", "Mungetho", 
      "Mirimani", "Kiaroa Farm", "Nchengo Farm", "Mtaro Farm", "Kariki Farm", 
      "Bob Harries", "Kijito", "Mashule Estate", "Gachimbi Farm", 
      "Kwa ndumbe", "Kirai", "Chai Road", "Forest Road", "Kitengela", 
      "Milimani", "Old Namanga Road", "Air View", "Almond Groove", 
      "Thorn Groove", "Warai north road", "Warai south road", "Three D lane", 
      "Miotoni", "Montessori Centre", "Link Road", "Mdodo Lane", 
      "St Christopher International School", "Ole Shapara road", 
      "Al Mubarak Estate", "Muhoho avenue", "Ambose li estate", 
      "Highview estate", "Popo road", "Mandera road", "Durham Road", 
      "Gichugu Road", "Gem Lane", "Kandara Road", "Kanjata Road", 
      "Olekajuado Road"
    ]
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Effect to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SEO Metadata with all areas optimization
  const seoData = {
    title: "Professional Cleaning Services in Nairobi | Sylvie Cleaning Services",
    description: "Affordable home and office cleaning in Nairobi. Book reliable, trained cleaners for spotless results today!",
    canonicalUrl: "https://www.sylviecleaningservices.com",
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: heroImage,
    businessInfo: {
      name: "Sylvie Cleaning Services",
      url: "https://www.sylviecleaningservices.com",
      logo: "https://www.sylviecleaningservices.com/logo.png",
      phone: "+254726933261",
      address: {
        street: "Dale House, Rhapta Road, Fox Close",
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
      areasServed: Object.values(marketingAreas).flat(),
      services: ["House Cleaning", "Office Cleaning", "Deep Cleaning Services", "Carpet Cleaning", "Sofa Cleaning", "Post Construction Cleaning", "Move-In/Move-Out Cleaning"]
    }
  };

  // Enhanced Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": seoData.businessInfo.name,
    "image": seoData.socialImage,
    "@id": seoData.canonicalUrl,
    "url": seoData.canonicalUrl,
    "telephone": seoData.businessInfo.phone,
    "priceRange": seoData.businessInfo.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": seoData.businessInfo.address.street,
      "addressLocality": seoData.businessInfo.address.city,
      "addressRegion": seoData.businessInfo.address.state,
      "postalCode": seoData.businessInfo.address.zip,
      "addressCountry": seoData.businessInfo.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-1.2921",
      "longitude": "36.8219"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "sameAs": seoData.businessInfo.sameAs,
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-1.2921",
        "longitude": "36.8219"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": seoData.businessInfo.services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "description": `Professional ${service}`,
          "provider": {
            "@type": "Organization",
            "name": "Sylvie Cleaning Services"
          }
        }
      }))
    },
    "serviceType": "Cleaning Services",
    "provider": {
      "@type": "Organization",
      "name": "Sylvie Cleaning Services"
    }
  };

  // Carousel data with area-focused content
  const carouselData = [
    {
      image: cleaner1,
      title: "Professional Cleaning Services Across Nairobi",
      subtitle: "Serving Karen, Westlands, Runda, Kilimani & All Nairobi Areas",
      description: "Professional cleaning services for homes and offices across all Nairobi neighborhoods. Expert carpet cleaning, sofa cleaning, deep cleaning services at affordable prices.",
      serviceType: "Nairobi-Wide Cleaning",
      accent: "from-blue-500 to-cyan-500",
    },
    {
      image: cleaner2,
      title: "House Cleaning Services | All Nairobi Estates Covered",
      subtitle: "Professional Residential Cleaning Across Nairobi",
      description: "Expert house cleaning services for all estates in Karen, Lavington, Kileleshwa, Westlands, and surrounding areas. Deep cleaning, regular maintenance, move-in/out cleaning.",
      serviceType: "Estate Cleaning",
      accent: "from-green-500 to-emerald-500",
    },
    {
      image: cleaner3,
      title: "Office Cleaning | Commercial Cleaning Nairobi-Wide",
      subtitle: "Professional Office Cleaning Across Nairobi Business Districts",
      description: "Commercial cleaning services for offices, businesses, and corporate spaces in Westlands, Upperhill, CBD, and industrial areas. Post-construction cleaning, carpet cleaning, and more.",
      serviceType: "Commercial Cleaning",
      accent: "from-purple-500 to-indigo-500",
    },
  ];

  const cleaningVideos = [
    {
      id: "6s2Vp91YUHw",
      title: "Professional Home Deep Cleaning Process",
      description:
        "Watch our cleaning team transform a family home with our comprehensive deep cleaning service.",
      category: "Deep Cleaning",
    },
    {
      id: "GgoW5zpDVaM",
      title: "Commercial Office Cleaning Standards",
      description:
        "See how we maintain the highest cleaning standards for corporate environments.",
      category: "Commercial Cleaning",
    },
    {
      id: "U_Wa8nol86k",
      title: "Move-Out Cleaning Transformation",
      description:
        "Complete move-out cleaning service that ensures you get your full deposit back.",
      category: "Move-Out Cleaning",
    },
    {
      id: "MA3sA8Yt62Q",
      title: "Eco-Friendly Cleaning Techniques",
      description:
        "Learn about our environmentally safe cleaning methods and products.",
      category: "Residential Cleaning",
    },
  ];

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials]);

  // Hero carousel auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingText(true);
      setTimeout(() => {
        setCurrentSlide((prev) =>
          prev === carouselData.length - 1 ? 0 : prev + 1
        );
        setTimeout(() => {
          setAnimatingText(false);
        }, 100);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  // Intersection Observer for animations
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

  // Services with area context
  const services = [
    {
      title: "House Cleaning",
      description:
        "Professional residential cleaning services for homes, apartments, and estates across all Nairobi neighborhoods.",
      icon: "fas fa-home",
      features: [
        "Regular Maintenance Cleaning",
        "Deep Cleaning Services",
        "Move-in/out Cleaning",
        "Custom Cleaning Schedules",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Office Cleaning",
      description:
        "Commercial cleaning solutions for offices, retail spaces, and businesses in Nairobi's business districts.",
      icon: "fas fa-building",
      features: [
        "Office Cleaning",
        "Retail Space Cleaning",
        "Industrial Cleaning",
        "24/7 Cleaning Service",
      ],
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Deep Cleaning Services",
      description:
        "Intensive deep cleaning services to remove deep-seated dirt, allergens, and bacteria for all property types.",
      icon: "fas fa-broom",
      features: [
        "Allergen Removal",
        "Sanitization Services",
        "Hard-to-reach Areas",
        "Eco-friendly Cleaning",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Specialized Cleaning",
      description:
        "Specialized cleaning services for carpets, upholstery, windows, and post-construction across Nairobi.",
      icon: "fas fa-sparkles",
      features: [
        "Carpet Cleaning",
        "Sofa Cleaning",
        "Post-construction Cleaning",
        "Event Cleanup Services",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  // Project showcase data with area context
  const projects = [
    {
      title: "Luxury Home Cleaning - Karen",
      description:
        "Complete cleaning transformation of a 5-bedroom luxury home in Karen",
      image: cleaner1,
      video: "https://youtu.be/XpvmwxpQaGo?si=15-wQ-dyMH3fMCSq",
      category: "Residential Cleaning",
      stats: { area: "4,500 sq ft", time: "6 hours", team: "4 cleaners" },
    },
    {
      title: "Corporate Office Cleaning - Westlands",
      description:
        "Post-construction cleaning for a new corporate headquarters in Westlands",
      image: cleaner3,
      category: "Commercial Cleaning",
      stats: { area: "25,000 sq ft", time: "3 days", team: "12 cleaners" },
    },
    {
      title: "Restaurant Deep Clean - Kilimani",
      description: "Overnight deep cleaning for a popular restaurant in Kilimani",
      image: cleaner4,
      video: "https://youtu.be/TQG_WgXoytk?si=jcUiX7jVG86sCcYp",
      category: "Deep Cleaning",
      stats: { area: "3,200 sq ft", time: "8 hours", team: "6 cleaners" },
    },
    {
      title: "Event Venue Cleaning - Runda",
      description: "Same-day cleaning for a major corporate event venue in Runda",
      image: cleaner10,
      video: "https://youtu.be/So3b46JgkAc?si=y7HJtpqvZ6B6UWPH",
      category: "Special Services",
      stats: { area: "15,000 sq ft", time: "4 hours", team: "8 cleaners" },
    },
  ];

  // Why choose us data with area focus
  const chooseBenefits = [
    {
      title: "Nairobi-Wide Coverage",
      description:
        "We serve all areas across Nairobi including Karen, Westlands, Runda, Kilimani, Lavington, and surrounding neighborhoods.",
      icon: "fas fa-map-marker-alt",
      stat: "500+ Areas Served",
    },
    {
      title: "Custom Cleaning Solutions",
      description:
        "Personalized cleaning plans tailored to your specific needs and preferences for your location.",
      icon: "fas fa-sliders-h",
      stat: "100% Custom",
    },
    {
      title: "Satisfaction Guarantee",
      description:
        "If you're not satisfied with our cleaning services, we'll re-clean at no additional cost.",
      icon: "fas fa-medal",
      stat: "100% Guarantee",
    },
    {
      title: "Local Area Experts",
      description:
        "Our teams are familiar with all Nairobi neighborhoods and understand local cleaning requirements.",
      icon: "fas fa-users",
      stat: "Local Knowledge",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Choose from one-time, weekly, bi-weekly, or monthly service to fit your schedule across all areas.",
      icon: "fas fa-calendar-alt",
      stat: "24/7 Booking",
    },
    {
      title: "Transparent Pricing",
      description:
        "No hidden fees or surprise charges. Clear, upfront pricing for all cleaning services in all areas.",
      icon: "fas fa-tag",
      stat: "No Hidden Fees",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* ✅ OPTIMIZED SEO META TAGS FOR HOME PAGE */}
      <Helmet>
        <title>Professional Cleaning Services in Nairobi | Sylvie Cleaning Services</title>
        <meta
          name="description"
          content="Affordable home and office cleaning in Nairobi. Book reliable, trained cleaners for spotless results today!"
        />
        <meta
          name="keywords"
          content="cleaning services Nairobi, house cleaning, office cleaning, deep cleaning Kenya, Sylvie Cleaning"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content="Professional Cleaning Services in Nairobi | Sylvie Cleaning Services" />
        <meta property="og:description" content="Affordable home and office cleaning in Nairobi. Book reliable, trained cleaners for spotless results today!" />
        <meta property="og:image" content={seoData.socialImage} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta property="og:locale" content="en_KE" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonicalUrl} />
        <meta name="twitter:title" content="Professional Cleaning Services in Nairobi | Sylvie Cleaning Services" />
        <meta name="twitter:description" content="Affordable home and office cleaning in Nairobi. Book reliable, trained cleaners for spotless results today!" />
        <meta name="twitter:image" content={seoData.socialImage} />
        <meta name="twitter:creator" content={seoData.twitterHandle} />
        
        {/* Enhanced Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sylvie Cleaning Services",
            "description": "Professional cleaning services offering house cleaning, office cleaning, carpet cleaning, and deep cleaning services across all Nairobi areas.",
            "url": "https://www.sylviecleaningservices.com",
            "telephone": "+254726933261",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dale House, Rhapta Road, Fox Close",
              "addressLocality": "Nairobi",
              "addressRegion": "Nairobi",
              "postalCode": "00100",
              "addressCountry": "KE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-1.2921",
              "longitude": "36.8219"
            },
            "openingHours": "Mo-Fr 08:00-20:00, Sa 09:00-15:00",
            "areaServed": "Nairobi and all surrounding areas including Karen, Westlands, Runda, Kilimani, Lavington, and more",
            "serviceType": "Cleaning Services"
          })}
        </script>
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Enhanced Geo Tags for Local SEO */}
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        
        {/* Location Specific Meta Tags */}
        <meta name="city" content="Nairobi" />
        <meta name="country" content="Kenya" />
        <meta name="distribution" content="local" />
        <meta name="target" content="Nairobi, Kenya" />
      </Helmet>

      {/* Hero Section with area focus */}
      <section
        className="relative h-screen overflow-hidden pt-44 md:pt-44 lg:pt-44"
        data-section="hero"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full">
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              }`}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            >
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
          {/* Professional cleaning icons floating */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`icon-${i}`}
              className="absolute text-white/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              <i
                className={`fas ${
                  [
                    "fa-broom",
                    "fa-spray-can",
                    "fa-tint",
                    "fa-sparkles",
                    "fa-home",
                    "fa-building",
                    "fa-leaf",
                    "fa-shield-alt",
                  ][i % 8]
                }`}
              ></i>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto h-full px-4 sm:px-6 flex items-center justify-center">
          <div className="text-center max-w-5xl w-full px-2">
            <div
              className={`transition-all duration-700 ease-out ${
                isVisible.hero
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-500 ${
                  animatingText
                    ? "opacity-0 transform -translate-y-10"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {carouselData[currentSlide].title}
              </h1>
              <h2
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-blue-200 mb-6 transition-all duration-500 ${
                  animatingText
                    ? "opacity-0 transform translate-y-10"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {carouselData[currentSlide].subtitle}
              </h2>
              <p
                className={`text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${
                  animatingText
                    ? "opacity-0 transform translate-y-10"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {carouselData[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/book"
                  className={`inline-flex items-center bg-gradient-to-r ${carouselData[currentSlide].accent} hover:scale-105 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform shadow-2xl hover:shadow-blue-500/25 btn-primary animate-pulse-glow text-base sm:text-lg`}
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Book {carouselData[currentSlide].serviceType}
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform border border-white/20 text-base sm:text-lg"
                >
                  <i className="fas fa-info-circle mr-2"></i>
                  Learn More
                </Link>
              </div>
            </div>

            {/* Enhanced Carousel Indicators */}
            <div className="flex justify-center mt-12 sm:mt-16 space-x-3">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAnimatingText(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setTimeout(() => {
                        setAnimatingText(false);
                      }, 100);
                    }, 500);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "bg-blue-500 w-10 sm:w-12 h-2 sm:h-3 shadow-lg shadow-blue-500/50"
                      : "bg-white/30 w-2 sm:w-3 h-2 sm:h-3 hover:bg-white/50"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Statistics Section with area context */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "5000+", label: "Happy Clients", icon: "fas fa-smile" },
              {
                number: "500+",
                label: "Areas Served",
                icon: "fas fa-map-marker-alt",
              },
              {
                number: "24/7",
                label: "Customer Support",
                icon: "fas fa-headset",
              },
              {
                number: "100%",
                label: "Satisfaction Rate",
                icon: "fas fa-star",
              },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 counter">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-blue-100 mb-3">{stat.label}</div>
                <div className="text-2xl sm:text-3xl text-blue-200">
                  <i className={stat.icon}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with area context */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white"
        data-section="services"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.services
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Professional Cleaning Services Across Nairobi
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive cleaning solutions designed to meet your specific needs across all Nairobi neighborhoods with the highest standards of quality and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover-lift hover-glow ${
                  isVisible.services
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={`${service.icon} text-white text-xl sm:text-2xl`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-xs sm:text-sm text-gray-500"
                    >
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base group-hover:translate-x-1 transition-all duration-300"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with area focus */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-indigo-50"
        data-section="whyChoose"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.whyChoose
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Why Customers Choose Us Across Nairobi
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference when you choose our professional cleaning services, backed by years of expertise and commitment to excellence across all Nairobi neighborhoods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chooseBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 border-blue-500 ${
                  isVisible.whyChoose
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 sm:p-4 rounded-2xl mr-3 sm:mr-4 shadow-lg">
                    <i className={`${benefit.icon} text-white text-xl sm:text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {benefit.title}
                    </h3>
                    <div className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold inline-block">
                      {benefit.stat}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with area context */}
      <section className="py-16 sm:py-24 bg-white" data-section="howItWorks">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.howItWorks
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              How Our Cleaning Service Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Simple steps to get your space cleaned professionally with our streamlined process across all Nairobi areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "1",
                title: "Book Cleaning Service",
                description:
                  "Fill out our simple booking form to request a cleaning service tailored to your location anywhere in Nairobi.",
                icon: "fas fa-calendar-plus",
              },
              {
                step: "2",
                title: "Area-Specific Assessment",
                description:
                  "Our head of cleaning will visit to assess your needs and provide a detailed quote for your specific area.",
                icon: "fas fa-clipboard-check",
              },
              {
                step: "3",
                title: "Professional Cleaning",
                description:
                  "Our skilled cleaners familiar with your area will provide exceptional service with attention to every detail.",
                icon: "fas fa-broom",
              },
              {
                step: "4",
                title: "Quality Assurance",
                description:
                  "Enjoy your clean space and provide feedback. We guarantee your satisfaction across all Nairobi areas.",
                icon: "fas fa-star",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`relative text-center transition-all duration-500 ${
                  isVisible.howItWorks
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto shadow-xl">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <i className={`${step.icon} text-white text-xs sm:text-sm`}></i>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 sm:top-10 left-full w-full h-1 bg-gradient-to-r from-blue-200 to-cyan-200 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white"
        data-section="videos"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.videos
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              See Our Team in Action Across Nairobi
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Watch our professional cleaning experts deliver exceptional results with our proven methods in various Nairobi neighborhoods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {cleaningVideos.map((video, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.videos
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative group">
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded-t-2xl"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      {video.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <i className="fas fa-play-circle mr-2 text-red-500"></i>
                      <span>Watch on YouTube</span>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Full Video
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <a
              href="https://www.youtube.com/@yourchannelname"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/25 text-sm sm:text-base"
            >
              <i className="fab fa-youtube mr-2 sm:mr-3 text-lg sm:text-xl"></i>
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section>

      {/* Our Projects Section with area context */}
      <section className="py-16 sm:py-24 bg-white" data-section="projects">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.projects
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Our Recent Projects Across Nairobi
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See the difference our professional cleaning services can make in transforming spaces across different Nairobi neighborhoods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.projects
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  {project.video ? (
                    <iframe
                      src={
                        project.video.includes("youtube.com") ||
                        project.video.includes("youtu.be")
                          ? (() => {
                              let videoId;
                              if (project.video.includes("watch?v=")) {
                                videoId = project.video
                                  .split("watch?v=")[1]
                                  .split("&")[0];
                              } else if (project.video.includes("youtu.be/")) {
                                videoId = project.video
                                  .split("youtu.be/")[1]
                                  .split("?")[0];
                              }
                              return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&enablejsapi=1`;
                            })()
                          : project.video
                      }
                      title={project.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <Link
                    to="/projects"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-xs sm:text-sm group-hover:translate-x-1 transition-all duration-300"
                  >
                    View Project
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/projects"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/25 text-sm sm:text-base"
            >
              <i className="fas fa-images mr-2"></i>
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with area context */}
      {testimonials.length > 0 && (
        <section
          className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white"
          data-section="testimonials"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div
              className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
                isVisible.testimonials
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                What Our Clients Say Across Nairobi
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Hear from our satisfied customers about their experience with our professional cleaning services in different Nairobi neighborhoods
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div
                className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden transition-all duration-1000 ${
                  isVisible.testimonials
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600"></div>
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>

                <div className="flex items-center mb-6 sm:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 sm:w-8 sm:h-8 ${
                        i < testimonials[currentTestimonial]?.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>

                <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700 italic mb-6 sm:mb-10 leading-relaxed">
                  "{testimonials[currentTestimonial]?.comment}"
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto shadow-lg">
                      {testimonials[currentTestimonial]?.name.charAt(0)}
                    </div>
                    <div className="ml-4 sm:ml-6">
                      <p className="font-bold text-gray-800 text-base sm:text-lg">
                        {testimonials[currentTestimonial]?.name}
                      </p>
                      <p className="text-gray-500 text-sm sm:text-base">
                        {testimonials[currentTestimonial]?.serviceType}
                      </p>
                      <p className="text-blue-600 text-xs sm:text-sm font-medium">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        {testimonials[currentTestimonial]?.area || "Nairobi"}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                          currentTestimonial === index
                            ? "bg-blue-600 w-6 sm:w-8 shadow-lg"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Professional Features Section with area context */}
      <section className="py-16 sm:py-24 bg-white" data-section="features">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Why Choose Our Cleaning Services Across Nairobi
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes our cleaning services stand out from the competition in every Nairobi neighborhood
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "fas fa-shield-alt",
                title: "Fully Insured",
                description: "Complete coverage for your peace of mind across all areas",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: "fas fa-clock",
                title: "Punctual Service",
                description: "We value your time and always arrive on schedule in every neighborhood",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: "fas fa-leaf",
                title: "Eco-Friendly Cleaning",
                description: "Environmentally safe cleaning products for all Nairobi homes",
                color: "from-green-400 to-teal-500",
              },
              {
                icon: "fas fa-user-check",
                title: "Vetted Staff",
                description: "Background-checked and trained professionals for every area",
                color: "from-purple-500 to-indigo-500",
              },
              {
                icon: "fas fa-medal",
                title: "Quality Guarantee",
                description: "100% satisfaction or we'll re-clean for free in any location",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: "fas fa-credit-card",
                title: "Flexible Payment",
                description: "Multiple payment options for your convenience across Nairobi",
                color: "from-pink-500 to-rose-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <i className={`${feature.icon} text-white text-2xl sm:text-3xl`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action with area focus */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden"
        data-section="cta"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-800/20"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible.cta
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              Ready to Experience Professional Cleaning in Your Area?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Book your cleaning service today and enjoy a cleaner, healthier space with our guaranteed satisfaction across all Nairobi neighborhoods
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                to="/book"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-700 font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/25 text-base sm:text-lg"
              >
                <i className="fas fa-calendar-check mr-2 sm:mr-3 text-lg sm:text-xl"></i>
                Book Service Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center bg-transparent hover:bg-white/10 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50 text-base sm:text-lg"
              >
                <i className="fas fa-phone mr-2 sm:mr-3 text-lg sm:text-xl"></i>
                Call Our Office
              </Link>
            </div>

            <div className="mt-8 sm:mt-12">
              <p className="text-blue-200 text-sm sm:text-base">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Serving all areas of Nairobi including Karen, Westlands, Runda, Kilimani, Lavington, and 500+ more locations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Trust Badges Section with area context */}
      <section className="py-16 sm:py-20 bg-white" data-section="trust">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 transition-all duration-1000 ${
              isVisible.trust
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[
              {
                icon: "fas fa-shield-alt",
                title: "Insured & Bonded",
                description: "Your property is fully protected across all areas",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: "fas fa-user-check",
                title: "Screened Staff",
                description: "Background checked professionals for every neighborhood",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: "fas fa-clock",
                title: "Reliable Service",
                description: "On-time, every time guarantee in all locations",
                color: "from-purple-500 to-indigo-500",
              },
              {
                icon: "fas fa-leaf",
                title: "Eco-Friendly",
                description: "Green cleaning options available Nairobi-wide",
                color: "from-green-400 to-teal-500",
              },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${badge.color} rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={badge.icon}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {badge.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        className={`fixed bottom-28 right-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } hover:from-blue-700 hover:to-indigo-800 transform hover:scale-110`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;