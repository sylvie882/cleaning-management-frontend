/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
// Import your existing images
import cleaner1 from "../../assets/images/newSlider2.jpg";
import cleaner2 from "../../assets/images/newSlider3.jpg";
import cleaner3 from "../../assets/images/newSlider5.jpg";
import cleaner4 from "../../assets/images/newSlider6.jpg";
import cleaner10 from "../../assets/images/newSlider1.jpg";

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  // SEO Data for projects page
  const seoData = {
    title: "Our Cleaning Projects | Sylvie Cleaning Services Portfolio",
    description: "Explore our portfolio of professional cleaning projects in Nairobi. See before/after results of residential, commercial, and specialized cleaning services.",
    canonicalUrl: "https://www.sylviecleaningservices.com/projects",
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/projects-social.jpg",
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
      }
    }
  };

  // Structured data for project portfolio
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cleaning Projects Portfolio",
    "description": seoData.description,
    "url": seoData.canonicalUrl,
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "CreativeWork",
          "name": "Luxury Home Cleaning",
          "description": "Complete cleaning transformation of a 5-bedroom luxury home",
          "image": cleaner1
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "CreativeWork",
          "name": "Post-construction Cleaning",
          "description": "Post-construction cleaning for a new corporate headquarters",
          "image": cleaner3
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "CreativeWork",
          "name": "Restaurant Deep Clean",
          "description": "Overnight deep cleaning for a popular local restaurant",
          "image": cleaner4
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "CreativeWork",
          "name": "Event Venue Preparation",
          "description": "Same-day cleaning for a major corporate event venue",
          "image": cleaner10
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "CreativeWork",
          "name": "Corporate Office Setup",
          "description": "Post-construction cleaning for a new corporate headquarters spanning 3 floors",
          "image": cleaner2
        }
      }
    ]
  };

  // Updated projects data with videos
  const allProjects = [
    {
      id: 1,
      title: "Luxury Home Cleaning",
      description:
        "Complete cleaning transformation of a 5-bedroom luxury home",
      longDescription:
        "A comprehensive residential cleaning project for a luxury 5-bedroom home. The project included deep cleaning of all rooms, kitchen and bathroom sanitization, window cleaning, and carpet care.",
      image: cleaner1,
      video: "https://youtu.be/XpvmwxpQaGo?si=15-wQ-dyMH3fMCSq",
      category: "Residential",
      challenges: [
        "Delicate surfaces",
        "High-end fixtures",
        "Time constraints",
      ],
      results: [
        "Client satisfaction achieved",
        "Surfaces restored to pristine condition",
        "Long-term maintenance contract secured",
      ],
    },
    {
      id: 2,
      title: "Post-construction",
      description:
        "Post-construction cleaning for a new corporate headquarters",
      longDescription:
        "A major post-construction cleaning project for a 15,000 sq ft corporate office space. The project included removal of construction debris, dust elimination, window cleaning, and preparation for employee occupancy.",
      image: cleaner3,
      video: "https://youtu.be/_h4RWIrharQ?si=Pm2YY8pNbFNRHupp",
      category: "Commercial",
      challenges: ["Construction dust", "Large scale", "Strict deadlines"],
      results: [
        "Ready for occupancy on time",
        "Zero safety incidents",
        "Client contract extension",
      ],
    },
    {
      id: 3,
      title: "Restaurant Deep Clean",
      description: "Overnight deep cleaning for a popular local restaurant",
      longDescription:
        "Complete sanitization and deep cleaning of a busy restaurant during off-hours. Included kitchen equipment cleaning, grease removal, dining area refresh, and compliance with health department standards.",
      image: cleaner4,
      video: "https://youtu.be/TQG_WgXoytk?si=jcUiX7jVG86sCcYp",
      category: "Deep Cleaning",
      challenges: [
        "Food safety standards",
        "Equipment cleaning",
        "Time constraints",
      ],
      results: [
        "Health inspection passed",
        "Improved customer reviews",
        "Monthly service contract",
      ],
    },
    {
      id: 4,
      title: "Event Venue Preparation",
      description: "Same-day cleaning for a major corporate event venue",
      longDescription:
        "Rapid turnaround cleaning for a large event venue between bookings. Included floor cleaning, restroom maintenance, window cleaning, and preparation for a high-profile corporate event.",
      image: cleaner10,
      video: "https://youtu.be/So3b46JgkAc?si=y7HJtpqvZ6B6UWPH",
      category: "Special Services",
      challenges: ["Quick turnaround", "High standards", "Large capacity"],
      results: [
        "Event proceeded flawlessly",
        "Positive client feedback",
        "Repeat bookings secured",
      ],
    },
    {
      id: 5,
      title: "Corporate Office Setup",
      description:
        "Post-construction cleaning for a new corporate headquarters spanning 3 floors.",
      longDescription:
        "A major post-construction cleaning project for a 15,000 sq ft corporate office space. The project included removal of construction debris, dust elimination, window cleaning, and preparation for employee occupancy.",
      image: cleaner2,
      video: "https://youtu.be/oa4zciV1C4s?si=MXWw-x8HOuQ681N1",
      category: "Commercial",
      challenges: ["Construction dust", "Large scale", "Strict deadlines"],
      results: [
        "Ready for occupancy on time",
        "Zero safety incidents",
        "Client contract extension",
      ],
    },
  ];

  const categories = ["All", "Residential", "Commercial", "Deep Cleaning"];

  // Filter projects based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(
        allProjects.filter((project) => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  // Initialize with all projects
  useEffect(() => {
    setFilteredProjects(allProjects);
  }, []);

  return (
    <div className="w-full">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.socialImage} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta property="og:locale" content="en_KE" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonicalUrl} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.socialImage} />
        <meta name="twitter:creator" content={seoData.twitterHandle} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.sylviecleaningservices.com"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Projects",
              "item": seoData.canonicalUrl
            }]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Projects
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover the exceptional cleaning results we've delivered for our
            clients across residential, commercial, and specialized cleaning
            services.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                150+
              </div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                98%
              </div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                50+
              </div>
              <div className="text-gray-600">Repeat Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                5★
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Browse Our Work
            </h2>
            <p className="text-gray-600 mb-8">
              Filter by service category to see specific types of projects
            </p>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                {/* Project Image/Video */}
                <div className="relative h-64 overflow-hidden">
                  {project.video ? (
                    // Display video with autoplay if available
                    <iframe
                      src={
                        project.video.includes("youtube.com") ||
                        project.video.includes("youtu.be")
                          ? (() => {
                              // Extract video ID properly
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
                      title={`${project.title} - Sylvie Cleaning Services Project`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      itemProp="video"
                    />
                  ) : (
                    // Display image if no video
                    <img
                      src={project.image}
                      alt={`${project.title} cleaning project by Sylvie Cleaning Services`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      itemProp="image"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300" itemProp="name">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3" itemProp="description">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category to see more projects.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Project Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every project follows our proven methodology to ensure consistent,
              high-quality results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clipboard-list text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Assessment
              </h3>
              <p className="text-gray-600 text-sm">
                Thorough evaluation of requirements and scope
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar-alt text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Planning
              </h3>
              <p className="text-gray-600 text-sm">
                Detailed project timeline and resource allocation
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-broom text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Execution
              </h3>
              <p className="text-gray-600 text-sm">
                Professional cleaning with quality control
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Completion
              </h3>
              <p className="text-gray-600 text-sm">
                Final inspection and client satisfaction review
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Let us help you achieve the same exceptional results for your space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-block bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Book a Service
            </Link>
            <Link
              to="/contact"
              className="inline-block border-2 border-white hover:bg-white hover:text-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;