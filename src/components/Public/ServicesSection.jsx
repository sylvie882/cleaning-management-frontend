// src/components/Public/ServicesSection.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../features/services/servicesSlice";
import { formatContentForDisplay } from "../../utils/markdownUtils";

const ServicesSection = ({ featured = false, limit = 4 }) => {
  const dispatch = useDispatch();
  const { services, isLoading } = useSelector((state) => state.services);
  const [displayedServices, setDisplayedServices] = useState([]);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    if (services && services.length > 0) {
      let filteredServices = [...services];

      // Filter active services only
      filteredServices = filteredServices.filter((service) => service.isActive);

      // Filter featured services if needed
      if (featured) {
        filteredServices = filteredServices.filter(
          (service) => service.featured
        );
      }

      // Limit number of services if specified
      if (limit > 0 && filteredServices.length > limit) {
        filteredServices = filteredServices.slice(0, limit);
      }

      setDisplayedServices(filteredServices);
    }
  }, [services, featured, limit]);

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>We offer a wide range of cleaning services to meet your needs</p>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading services...</span>
          </div>
        ) : displayedServices.length > 0 ? (
          <div className="services-grid">
            {displayedServices.map((service) => (
              <div key={service._id} className="service-card">
                <div
                  className="service-image"
                  style={{
                    backgroundImage: `url(${
                      service.imageUrl || "/images/default-service.jpg"
                    })`,
                  }}
                >
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content">
                  <div className="service-icon">
                    <i className={service.icon || "fas fa-broom"}></i>
                  </div>
                  <h3>{service.name}</h3>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: formatContentForDisplay(
                        service.description,
                        false
                      ),
                    }}
                  />
                  <div className="service-meta">
                    {service.price > 0 && (
                      <span className="service-price">
                        From ${service.price}
                      </span>
                    )}
                    {service.duration > 0 && (
                      <span className="service-duration">
                        <i className="far fa-clock"></i>{" "}
                        {Math.ceil(service.duration / 60)} hr
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/services/${service._id}`}
                    className="service-link"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-services">
            <p>No services available at the moment. Please check back later.</p>
          </div>
        )}

        {featured && services.length > limit && (
          <div className="view-all-services">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
