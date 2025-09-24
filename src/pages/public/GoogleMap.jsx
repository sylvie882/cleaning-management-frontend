import React from "react";

const SimpleLocationMap = () => {
  const businessLocation = {
    lat: -1.265473,
    lng: 36.7989,
    address: "Dale House, Rhapta Road, Fox Close, Nairobi, Kenya",
  };

  // SEO Data for location page
  const seoData = {
    title: "Our Location | Sylvie Cleaning Services Nairobi Office",
    description: "Visit Sylvie Cleaning Services at Dale House, Rhapta Road Westlands, Nairobi. Professional cleaning services throughout Nairobi and surrounding areas.",
    canonicalUrl: "https://www.sylviecleaningservices.com/location",
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/location-social.jpg",
    businessInfo: {
      name: "Sylvie Cleaning Services",
      url: "https://www.sylviecleaningservices.com",
      logo: "https://www.sylviecleaningservices.com/logo.png",
      phone: "+254726933261",
      address: {
        street: "Dale House, Rhapta Road,Fox Close",
        city: "Nairobi",
        state: "Nairobi",
        zip: "00100",
        country: "KE"
      }
    }
  };

  // Structured data for local business
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": seoData.businessInfo.name,
    "image": seoData.businessInfo.logo,
    "description": seoData.description,
    "url": seoData.businessInfo.url,
    "telephone": seoData.businessInfo.phone,
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
      "latitude": businessLocation.lat,
      "longitude": businessLocation.lng
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://twitter.com/sylviecleaning",
      "https://www.facebook.com/sylviecleaningservices",
      "https://www.instagram.com/sylviecleaningservices"
    ]
  };

  // Function to open Google Maps in a new tab
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${businessLocation.lat},${businessLocation.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* SEO Meta Tags */}
      <head>
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
      </head>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Location Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Our Location</h1>
          <p className="text-gray-600 mt-1">{businessLocation.address}</p>
        </div>

        {/* Static Map Preview using Google Static Maps API */}
        <div className="relative w-full h-96 bg-gray-100">
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${businessLocation.lat},${businessLocation.lng}&zoom=16&size=800x400&markers=color:red%7C${businessLocation.lat},${businessLocation.lng}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dpoWzROIIGWu7A`}
            alt="Map showing Sylvie Cleaning Services location at Dale House, Rhapta Road, Nairobi"
            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={openInGoogleMaps}
            onError={(e) => {
              // Fallback if static map fails
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />

          {/* Fallback content if image fails to load */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 hidden items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Sylvie Cleaning Services
              </h2>
              <p className="text-gray-600 mb-4">
                Dale House, Rhapta Road Westlands
                <br />
                Nairobi, Kenya
              </p>
              <button
                onClick={openInGoogleMaps}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                View on Google Maps
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 flex flex-wrap gap-3 justify-center">
          <button
            onClick={openInGoogleMaps}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            View on Google Maps
          </button>

          <button
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${businessLocation.lat},${businessLocation.lng}`;
              window.open(url, "_blank");
            }}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Get Directions
          </button>

          <a
            href={`tel:${seoData.businessInfo.phone}`}
            className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleLocationMap;