/* eslint-disable no-unused-vars */
// src/pages/Public/RatingPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingByToken,
  submitRating,
} from "../../features/booking/bookingSlice";
import { Helmet } from "react-helmet";

const StarRating = ({ totalStars, initialRating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none transition-transform duration-200 hover:scale-110"
            onClick={() => onRatingChange(starValue)}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(0)}
          >
            <svg
              className={`w-10 h-10 md:w-12 md:h-12 ${
                starValue <= (hoveredRating || initialRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              } transition-colors duration-200`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

const RatingPage = () => {
  const { bookingId, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, isLoading, isSuccess, isError } = useSelector(
    (state) => state.booking
  );

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // SEO Metadata for rating page
  const seoData = {
    title: "Rate Your Service | Sylvie Cleaning Services Feedback",
    description: "Share your experience with Sylvie Cleaning Services. Your feedback helps us improve our cleaning services for future clients.",
    canonicalUrl: `https://www.sylviecleaningservices.com/rating/${bookingId}/${token}`,
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/rating-social.jpg",
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

  // Structured data for rating page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": seoData.title,
    "description": seoData.description,
    "url": seoData.canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": seoData.businessInfo.name,
      "logo": {
        "@type": "ImageObject",
        "url": seoData.businessInfo.logo
      }
    },
    "potentialAction": {
      "@type": "ReviewAction",
      "name": "Submit Rating",
      "target": seoData.canonicalUrl
    }
  };

  useEffect(() => {
    dispatch(getBookingByToken({ id: bookingId, token }));
  }, [dispatch, bookingId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ratingData = {
      score: rating,
      feedback,
    };

    dispatch(submitRating({ id: bookingId, token, ratingData })).then(
      (result) => {
        if (submitRating.fulfilled.match(result)) {
          setSubmitted(true);
        }
      }
    );
  };

  // Redirect to home if already rated or error
  useEffect(() => {
    if (booking && booking.rating && booking.rating.score) {
      setSubmitted(true);
    }
  }, [booking]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Helmet>
          <title>Loading Rating Form | Sylvie Cleaning Services</title>
          <meta name="description" content="Loading your rating form for Sylvie Cleaning Services" />
        </Helmet>
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Helmet>
          <title>Invalid Rating Request | Sylvie Cleaning Services</title>
          <meta name="description" content="The rating request is invalid or has expired." />
        </Helmet>
        <div className="max-w-md w-full text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Invalid Request
          </h1>
          <p className="text-gray-600 mb-6">
            The link you followed is invalid or has expired.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Helmet>
          <title>Rating Submitted | Sylvie Cleaning Services</title>
          <meta name="description" content="Thank you for submitting your rating. Your feedback helps us improve our services." />
        </Helmet>
        <div className="max-w-md w-full text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-green-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-2">
            Your feedback has been submitted successfully.
          </p>
          <p className="text-gray-600 mb-6">
            We appreciate your input and look forward to serving you again.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
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
              "name": "Booking",
              "item": `https://www.sylviecleaningservices.com/booking/${bookingId}`
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "Rating",
              "item": seoData.canonicalUrl
            }]
          })}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-green-600 py-6 px-4 sm:px-6">
            <h1 className="text-2xl font-bold text-white text-center">
              Rate Your Cleaning Service
            </h1>
            <p className="text-green-100 text-center mt-1">
              Your feedback helps us improve our services
            </p>
          </div>

          <div className="p-6">
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-green-800 uppercase tracking-wide mb-2">
                Service Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block text-gray-500">Service</span>
                  <span className="block font-medium text-gray-800">
                    {booking.serviceType}
                  </span>
                </div>
                <div>
                  <span className="block text-gray-500">Date</span>
                  <span className="block font-medium text-gray-800">
                    {new Date(booking.preferredDateTime).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="block text-gray-500">Location</span>
                  <span className="block font-medium text-gray-800">
                    {booking.location.address}, {booking.location.city}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                  How would you rate your experience?
                </h3>
                <div className="flex flex-col items-center">
                  <StarRating
                    totalStars={5}
                    initialRating={rating}
                    onRatingChange={setRating}
                  />
                  <p className="mt-2 text-lg font-medium text-gray-700">
                    {rating === 0 && "Select a rating"}
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Additional Feedback
                </h3>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Please share your experience and any suggestions for improvement..."
                  rows={5}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 ${
                    rating === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={rating === 0}
                >
                  Submit Rating
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} sylviecleaningservices. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;