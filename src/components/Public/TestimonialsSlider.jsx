/* eslint-disable no-unused-vars */
// src/components/Public/TestimonialsSlider.jsx
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../../features/testimonials/testimonialsSlice";

const TestimonialsSlider = () => {
  const dispatch = useDispatch();
  const { testimonials, isLoading } = useSelector(
    (state) => state.testimonials
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayInterval = useRef(null);

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  // Set up autoplay
  useEffect(() => {
    if (autoplay && testimonials && testimonials.length > 1) {
      autoplayInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    };
  }, [autoplay, testimonials]);

  // Pause autoplay on mouse enter
  const handleMouseEnter = () => {
    setAutoplay(false);
  };

  // Resume autoplay on mouse leave
  const handleMouseLeave = () => {
    setAutoplay(true);
  };

  // Navigate to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p>Hear from our satisfied customers</p>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading testimonials...</span>
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <div
            className="testimonials-slider"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="slider-container">
              <button className="slider-arrow prev" onClick={prevSlide}>
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className="slider-wrapper">
                <div
                  className="slider-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={testimonial._id} className="testimonial-slide">
                      <div className="testimonial-card">
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${
                                i < testimonial.rating ? "filled" : ""
                              }`}
                            ></i>
                          ))}
                        </div>

                        <div className="quote">
                          <i className="fas fa-quote-left"></i>
                          <p>{testimonial.comment}</p>
                          <i className="fas fa-quote-right"></i>
                        </div>

                        <div className="client-info">
                          <div className="client-avatar">
                            {testimonial.clientImage ? (
                              <img
                                src={testimonial.clientImage}
                                alt={testimonial.clientName}
                              />
                            ) : (
                              <div className="avatar-placeholder">
                                {testimonial.clientName.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="client-details">
                            <h4>{testimonial.clientName}</h4>
                            <p>{testimonial.serviceType}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="slider-arrow next" onClick={nextSlide}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-testimonials">
            <p>
              No testimonials available at the moment. Be the first to share
              your experience!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSlider;
