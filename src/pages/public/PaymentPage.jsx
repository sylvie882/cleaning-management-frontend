// src/pages/Public/PaymentPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookingByToken } from "../../features/booking/bookingSlice";
import { makePayment } from "../../features/payment/paymentSlice";
import { Helmet } from "react-helmet";

const PaymentPage = () => {
  const { bookingId, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, isLoading, isError } = useSelector((state) => state.booking);
  const { isSuccess: paymentSuccess } = useSelector((state) => state.payment);

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // SEO Metadata for payment page
  const seoData = {
    title: "Secure Payment | Sylvie Cleaning Services",
    description: "Complete your payment securely for Sylvie Cleaning Services. We accept M-Pesa, bank transfer, and cash payments for your convenience.",
    canonicalUrl: `https://www.sylviecleaningservices.com/payment/${bookingId}/${token}`,
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/payment-social.jpg",
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

  // Structured data for payment page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CheckoutPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seoData.canonicalUrl
    },
    "name": seoData.title,
    "description": seoData.description,
    "image": seoData.socialImage,
    "publisher": {
      "@type": "Organization",
      "name": seoData.businessInfo.name,
      "logo": {
        "@type": "ImageObject",
        "url": seoData.businessInfo.logo
      }
    },
    "potentialAction": {
      "@type": "PayAction",
      "target": seoData.canonicalUrl,
      "expectsAcceptanceOf": {
        "@type": "Offer",
        "price": booking?.budget || 0,
        "priceCurrency": "KES"
      }
    }
  };

  useEffect(() => {
    dispatch(getBookingByToken({ id: bookingId, token }));
  }, [dispatch, bookingId, token]);

  // Set the phone number from booking if available
  useEffect(() => {
    if (booking && booking.client && booking.client.phone) {
      setPhoneNumber(booking.client.phone);
    }
  }, [booking]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
      bookingId,
      amount: booking.budget,
      paymentMethod,
      phoneNumber,
      transactionId,
    };

    dispatch(makePayment(paymentData)).then((result) => {
      if (makePayment.fulfilled.match(result)) {
        setSubmitted(true);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="payment-page loading">
        <Helmet>
          <title>Processing Payment | Sylvie Cleaning Services</title>
          <meta name="description" content="Processing your payment for Sylvie Cleaning Services" />
        </Helmet>
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="payment-page error">
        <Helmet>
          <title>Invalid Payment Request | Sylvie Cleaning Services</title>
          <meta name="description" content="The payment request is invalid or has expired." />
        </Helmet>
        <div className="container">
          <div className="error-icon">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h1>Invalid Request</h1>
          <p>The link you followed is invalid or has expired.</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (submitted || paymentSuccess) {
    return (
      <div className="payment-page success">
        <Helmet>
          <title>Payment Submitted | Sylvie Cleaning Services</title>
          <meta name="description" content="Your payment has been submitted successfully and is being processed." />
        </Helmet>
        <div className="container">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1>Payment Submitted</h1>
          <p>Your payment information has been submitted successfully.</p>
          <p>Our accountant will verify the payment shortly.</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (booking.paymentStatus === "completed") {
    return (
      <div className="payment-page already-paid">
        <Helmet>
          <title>Payment Completed | Sylvie Cleaning Services</title>
          <meta name="description" content="This booking has already been paid in full." />
        </Helmet>
        <div className="container">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1>Payment Already Completed</h1>
          <p>This booking has already been paid in full.</p>
          <p>Thank you for your business!</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
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
              "name": "Payment",
              "item": seoData.canonicalUrl
            }]
          })}
        </script>
      </Helmet>

      <div className="container">
        <div className="payment-card">
          <div className="payment-header">
            <h1>Make Payment</h1>
            <p>Complete your payment for the cleaning service</p>
          </div>

          <div className="booking-details">
            <h3>Service Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Reference:</span>
                <span className="value">
                  #{bookingId.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Service:</span>
                <span className="value">{booking.serviceType}</span>
              </div>
              <div className="detail-item">
                <span className="label">Location:</span>
                <span className="value">{booking.location.address}</span>
              </div>
              <div className="detail-item">
                <span className="label">Amount Due:</span>
                <span className="value price">
                  ${booking.budget.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="payment-instructions">
            <h3>Payment Instructions</h3>
            <ol>
              <li>
                Send the payment to our M-Pesa Till Number:{" "}
                <strong>123456</strong>
              </li>
              <li>
                Enter the Reference Number:{" "}
                <strong>#{bookingId.slice(-6).toUpperCase()}</strong>
              </li>
              <li>After payment, enter the M-Pesa Transaction ID below</li>
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="mpesa">M-Pesa</option>
                <option value="bank">Bank Transfer</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="transactionId">Transaction ID / Reference</label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter the M-Pesa Transaction ID"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Submit Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;