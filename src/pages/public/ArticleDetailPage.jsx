/* eslint-disable no-unused-vars */
// src/pages/public/ArticleDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Calendar,
  User,
  Eye,
  Clock,
  Tag,
  Share2,
  ThumbsUp,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  getArticleBySlug,
  getRelatedArticles,
  addComment,
} from "../../features/articles/articleSlice";
import {
  selectCurrentArticle,
  selectArticleLoading,
  selectRelatedArticles,
} from "../../features/articles/articleSelectors";

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);
  const isLoading = useSelector(selectArticleLoading);
  const relatedArticles = useSelector(selectRelatedArticles);

  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(getArticleBySlug(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (article?._id) {
      dispatch(getRelatedArticles({ id: article._id, limit: 3 }));
    }
  }, [dispatch, article?._id]);

  // SEO Metadata with Nairobi-specific optimization
  const seoData = {
    title: article?.title ? `${article.title} | Sylvie Cleaning Services Blog` : "Cleaning Tips & Articles | Sylvie Cleaning Services",
    description: article?.excerpt || "Discover professional cleaning tips, guides, and industry insights from Nairobi's leading cleaning service provider.",
    canonicalUrl: `https://www.sylviecleaningservices.com/blog/${slug}`,
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: article?.featuredImage || "https://www.sylviecleaningservices.com/assets/images/blog-default.jpg",
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
         areasServed : [
    "Nairobi", "Westlands", "Karen", "Runda", "Kileleshwa", "Lavington", "Kilimani",
    "Ngong", "Upper Hill", "Naivasha", "Nakuru County", "Narok", "Kiambu", "Thika", "Ongata Rongai", "Parklands", "Highridge", "Syokimau", "Kitengela",
    "Horse Shoe Village", "Barton Estate", "Whispers Estate", "Migaa Golf Estate", "Daisy Road", "Tara Road", "Fairview Estate", "Riverrun Estates", "Amani Ridge", "Zaria Village", "Karogo Estate", "Mind Bridge Gardens", "Mhasibu Silver Birch Estate", "Royale Ville Gardens", "Mitini Scapes Migaa", "Rose Gate Estate", "Nawiri Estate", "Nderi Road", "Shanzu Road", "Kibarage Estate", "Gitanga Road", "Waithaka Estate", "Muthithi Gardens", "Ngong Forest View", "Langata Forest View Estate", "Karen Greens Estate", "Karen Ridge Estate", "Karen Road", "Langata Road", "Marula Lane", "Karen Brooks Estate", "Karen Brooks Road", "Acacia Drive", "Situ Village", "Ololua Ridge", "Diepolos Road", "Kangawa Road", "Zambia Road", "Baboon Crescent", "Cedar Road", "Gitonga Drive", "Windy Ridge", "Pepo Lane", "Rhino Park Road", "Elgeyo Marakwet Road", "Safari Park Avenue", "Kivuli Lane", "Usiu Road", "Nyati Road", "Kenyatta Road", "Makuyu Ridge", "Isinya", "Tuala", "Diadpora Village", "Meadows Estate", "Mimosa Road", "Eliud Mathu Street", "Benin Drive", "Glory Road", "Egrets Drive Road", "Red Hill Drive", "Thigiri Ridge Road", "Ndoto Road", "Kisaju", "Olooloitikosh", "Magadi Road", "Amboseli Road", "Convent Road", "Kaptagat Road", "Southern Bypass", "MCAKECH Residence", "Natala Ranch", "Grace Hill Gardens", "Maasai Road", "Olepolos", "Mbagathi Way", "Makuyu", "Samaki Drive", "Nyati Drive", "Lukenya Hills Estate", "Paradise Park Estate", "Thome Estate", "Garden Estate", "Silanga Road", "Kombe Road", "Fana Road", "Mokoyeti South Road", "Mokoyeti West Road", "Karen C Road", "Kumbe Road", "Santack Estate", "Jamhuri Estate", "Kilimani", "Woodley Estate", "Golf Course Estate", "Akinseye Estate", "Muguga Green Estate", "Kitisuru Country Homes", "Shinyalu Road", "D134 Kamau Residency", "Ngenda Road", "Sahara Estate", "Toll Estate", "Wendani Estate", "Zahara Estate", "Saitoti Road", "Shombole Road", "Gem Lane", "Taita Villas", "Natare Gardens", "Eve Gardens Estate", "Third Brooks Avenue", "Ngong Road", "Street Elizabeth", "Ngong View Road", "Ngong View Rise", "Forest Line Road", "Muteero Ridge", "Kay Estate", "Brook View Estate", "Kihanya Estate", "Mugumo Crescent", "Kyuna Road", "Kyuna Crescent", "Utawala", "Ruai", "Kangundo Road", "Ruaka", "Nandi Road Karen", "Bogani Karen", "Karen Hills Estate", "Kikenni Drive", "Mukoma Estate", "Sandalwood Estate Karen", "Runda Mhasibu", "Kugeria North Close", "Ridgeways", "Ridgeways Drive", "Kigwa Road", "Edenville Estate", "Balozi Estate", "Fourways Junction", "Paradise Lost", "Evergreen", "Tigoni", "Limuru", "Athi River", "Muthaiga North", "Muthaiga South", "Juja", "Wakigwa Estate", "Adams Park Estate", "Juja South Estate", "Chai Estate", "Lower Kabete Road", "Upper Kabete Road", "Spring Valley", "Sports Road", "David Osieli Road", "Mvuli Road", "Lantana Road", "Terrace Close", "Church Road", "Blueman Road", "Parklands Road", "Maasai Lodge Road", "Ndorobo Road", "Muhiti Road", "Gataka Road", "Mayor Road", "Bosto Road", "Mahiga Mairu Avenue", "Riara Road", "Flame Tree Drive", "Safari Park View Estate", "Chady Road", "Airport North Road", "Fahari Close", "Kiambu Road", "Mukabi Road", "Hinga Road", "Loresho Lane", "Thindigua", "Kasarini", "Mushroom Road", "Riabai Road", "Muchatha", "Boma Road", "Kiratina Road", "Kitisuru Road", "Marurui Road", "Githunguri-Githiga Road", "Kamiti Road", "Eastern Bypass Road", "Northern Bypass Road", "Mombasa Road", "Katani Road", "Bustani Estate", "Mwananchi Road", "Muthama Access Road", "Athi River Road", "Loneview Access Road", "Epco Road", "Namanga Road", "Chuna Road", "EPZ Road", "Gesora Road", "Kayole Road", "Uhuru Gardens Estate", "Runda Road", "Runda Grove", "Ruaka Road", "UN Avenue", "Eagle Park", "Andrew Zagoritis Street", "Pan Africa Insurance Avenue", "Elia Zagoritis Road", "Elia Zagoritis Avenue", "Glory Drive", "Alibiza Drive"
    ],
      services: ["Residential Cleaning", "Commercial Cleaning", "Deep Cleaning", "Move-In/Move-Out Cleaning"]
    }
  };

  // Enhanced Structured Data for SEO (Article schema)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article?.title || "",
    "description": article?.excerpt || "",
    "datePublished": article?.publishedAt || article?.createdAt || new Date().toISOString(),
    "dateModified": article?.updatedAt || article?.publishedAt || article?.createdAt || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": article?.author?.name || "Sylvie Cleaning Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sylvie Cleaning Services",
      "logo": {
        "@type": "ImageObject",
        "url": seoData.businessInfo.logo
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": seoData.socialImage,
      "width": "1200",
      "height": "630"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seoData.canonicalUrl
    },
    "keywords": article?.tags?.join(", ") || "cleaning, nairobi, cleaning tips, home cleaning",
    "articleSection": article?.category ? article.category.replace(/-/g, " ") : "Cleaning Tips"
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.content) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(addComment({ id: article._id, commentData: commentForm }));
    setCommentForm({ name: "", email: "", content: "" });
    setShowCommentForm(false);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || "";
    const text = article?.excerpt || "";

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${title} ${url}`
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      "cleaning-tips": "bg-blue-100 text-blue-800",
      "eco-friendly-cleaning": "bg-green-100 text-green-800",
      "commercial-cleaning": "bg-purple-100 text-purple-800",
      "residential-cleaning": "bg-orange-100 text-orange-800",
      "cleaning-products": "bg-yellow-100 text-yellow-800",
      maintenance: "bg-indigo-100 text-indigo-800",
      "health-safety": "bg-red-100 text-red-800",
      "industry-news": "bg-pink-100 text-pink-800",
      "company-updates": "bg-teal-100 text-teal-800",
      testimonials: "bg-cyan-100 text-cyan-800",
      "how-to-guides": "bg-lime-100 text-lime-800",
      "seasonal-cleaning": "bg-amber-100 text-amber-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          categoryColors[category] || "bg-gray-100 text-gray-800"
        }`}
      >
        {category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Enhanced SEO Meta Tags */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.socialImage} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta property="og:locale" content="en_KE" />
        <meta property="article:published_time" content={article?.publishedAt || article?.createdAt} />
        <meta property="article:modified_time" content={article?.updatedAt || article?.publishedAt || article?.createdAt} />
        {article?.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
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
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.2657;36.8025" />
        <meta name="ICBM" content="-1.2657, 36.8025" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rest of the component remains the same */}
        {/* Back to Blog */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {getCategoryBadge(article.category)}
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(article.publishedAt || article.createdAt)}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

          {/* Article Meta */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-2" />
                <span>{article.author?.name || "Admin"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="h-4 w-4 mr-2" />
                <span>{article.views} views</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>{article.readingTime} min read</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Share:</span>
              <button
                onClick={() => handleShare("facebook")}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Share on Facebook"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Share on Twitter"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Share on LinkedIn"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: article.content.replace(/\n/g, "<br />"),
            }}
          />
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Comments ({article.comments?.length || 0})
            </h3>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Add Comment
            </button>
          </div>

          {/* Comment Form */}
          {showCommentForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <form onSubmit={handleCommentSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={commentForm.name}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, name: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={commentForm.email}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, email: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <textarea
                  placeholder="Your Comment"
                  value={commentForm.content}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, content: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Comments List */}
          {article.comments && article.comments.length > 0 && (
            <div className="space-y-4">
              {article.comments
                .filter((comment) => comment.status === "approved")
                .map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {comment.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <article
                  key={relatedArticle._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {relatedArticle.featuredImage && (
                    <img
                      src={relatedArticle.featuredImage}
                      alt={relatedArticle.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link
                        to={`/blog/${relatedArticle.slug}`}
                        className="hover:text-blue-600 transition-colors duration-200"
                      >
                        {relatedArticle.title}
                      </Link>
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {formatDate(
                          relatedArticle.publishedAt || relatedArticle.createdAt
                        )}
                      </span>
                      <span>{relatedArticle.readingTime} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;