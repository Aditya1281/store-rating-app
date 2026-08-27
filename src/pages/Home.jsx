import {
  ArrowRight,
  Search,
  Star,
  ShieldCheck,
  Store,
  Users,
  MapPin,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const stores = [
    {
      name: "The Urban Café",
      location: "Ahmedabad, Gujarat",
      rating: 4.8,
      reviews: 126,
      category: "Café & Restaurant",
    },
    {
      name: "TechWorld Store",
      location: "Pune, Maharashtra",
      rating: 4.6,
      reviews: 98,
      category: "Electronics",
    },
    {
      name: "Fresh Basket",
      location: "Mumbai, Maharashtra",
      rating: 4.5,
      reviews: 84,
      category: "Grocery",
    },
  ];

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <header className="home-navbar">
        <div
          className="home-brand"
          onClick={() => navigate("/")}
        >
          <div className="home-brand-icon">
            <Star size={20} fill="currentColor" />
          </div>

          <span>StoreRate</span>
        </div>

        <nav className="home-nav-links">
          <button
            onClick={() => navigate("/user")}
          >
            Explore Stores
          </button>

          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#top-stores">
            Top Rated
          </a>
        </nav>

        <div className="home-nav-actions">
          <button
            className="home-login-btn"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

          <button
            className="home-signup-btn"
            onClick={() => navigate("/signup")}
          >
            Get Started
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="home-hero">

        <div className="home-hero-content">

          <div className="home-badge">
            <span></span>
            Trusted by thousands of customers
          </div>

          <h1>
            Find stores you
            <br />
            <span>can trust.</span>
          </h1>

          <p>
            Discover highly-rated stores, read real customer
            experiences, and make better choices with confidence.
          </p>

          <div className="home-search">

            <Search size={20} />

            <input
              type="text"
              placeholder="Search stores by name or location..."
            />

            <button
              onClick={() => navigate("/user")}
            >
              Search
              <ArrowRight size={17} />
            </button>

          </div>

          <div className="home-trust-row">

            <div>
              <CheckCircle2 size={16} />
              Real customer reviews
            </div>

            <div>
              <CheckCircle2 size={16} />
              Verified store listings
            </div>

          </div>

        </div>

        {/* HERO VISUAL */}
        <div className="home-hero-visual">

          <div className="hero-glow"></div>

          <div className="floating-rating-card">

            <div className="floating-store-icon">
              <Store size={20} />
            </div>

            <div>
              <small>Top Rated Store</small>
              <strong>The Urban Café</strong>

              <div className="floating-rating">
                <Star size={14} fill="currentColor" />
                <b>4.8</b>
                <span>126 reviews</span>
              </div>
            </div>

          </div>

          <div className="hero-main-card">

            <div className="hero-card-header">
              <div className="hero-card-icon">
                <Store size={24} />
              </div>

              <div>
                <small>Store of the week</small>
                <h3>Highly Recommended</h3>
              </div>
            </div>

            <div className="hero-big-rating">
              <span>4.8</span>

              <div>
                <div className="hero-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <small>Excellent customer rating</small>
              </div>
            </div>

            <div className="hero-card-progress">
              <span></span>
            </div>

            <div className="hero-card-footer">
              <span>126 customer ratings</span>
              <span>98% recommend</span>
            </div>

          </div>

          <div className="floating-users-card">
            <div className="mini-avatar">A</div>
            <div className="mini-avatar">R</div>
            <div className="mini-avatar">P</div>

            <div>
              <strong>6,742+</strong>
              <small>ratings shared</small>
            </div>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="home-stats">

        <div className="home-stat">
          <Store size={21} />
          <div>
            <strong>348+</strong>
            <span>Registered Stores</span>
          </div>
        </div>

        <div className="home-stat">
          <Users size={21} />
          <div>
            <strong>1,284+</strong>
            <span>Active Users</span>
          </div>
        </div>

        <div className="home-stat">
          <Star size={21} />
          <div>
            <strong>6,742+</strong>
            <span>Customer Ratings</span>
          </div>
        </div>

        <div className="home-stat">
          <ShieldCheck size={21} />
          <div>
            <strong>4.6 / 5</strong>
            <span>Average Rating</span>
          </div>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section
        className="home-section"
        id="how-it-works"
      >

        <div className="home-section-heading">
          <span>HOW IT WORKS</span>

          <h2>
            Better choices,
            <br />
            <em>made simple.</em>
          </h2>

          <p>
            StoreRate makes it easy to discover stores and
            share experiences with the community.
          </p>
        </div>

        <div className="home-feature-grid">

          <div className="home-feature-card">
            <div className="feature-number">01</div>

            <div className="home-feature-icon">
              <Search size={22} />
            </div>

            <h3>Discover</h3>

            <p>
              Search for stores by name, location,
              or explore highly-rated places.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="feature-number">02</div>

            <div className="home-feature-icon">
              <Star size={22} />
            </div>

            <h3>Rate & Review</h3>

            <p>
              Share your honest experience and help
              other customers make informed decisions.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="feature-number">03</div>

            <div className="home-feature-icon">
              <ShieldCheck size={22} />
            </div>

            <h3>Choose Confidently</h3>

            <p>
              Use real customer ratings to find stores
              that match your expectations.
            </p>
          </div>

        </div>

      </section>

      {/* TOP STORES */}
      <section
        className="home-section top-stores-section"
        id="top-stores"
      >

        <div className="home-section-heading row-heading">

          <div>
            <span>TOP RATED</span>

            <h2>
              Stores people
              <br />
              <em>love.</em>
            </h2>
          </div>

          <button
            className="view-all-btn"
            onClick={() => navigate("/user")}
          >
            View all stores
            <ArrowRight size={17} />
          </button>

        </div>

        <div className="home-store-grid">

          {stores.map((store) => (
            <div
              className="home-store-card"
              key={store.name}
            >

              <div className="store-card-top">

                <div className="store-card-icon">
                  <Store size={21} />
                </div>

                <span className="store-category">
                  {store.category}
                </span>

              </div>

              <h3>{store.name}</h3>

              <div className="store-location">
                <MapPin size={14} />
                {store.location}
              </div>

              <div className="store-card-rating">

                <div className="store-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <strong>{store.rating}</strong>

                <span>
                  ({store.reviews})
                </span>

              </div>

              <button
                onClick={() => navigate("/user")}
                className="store-view-btn"
              >
                View Store
                <ArrowRight size={15} />
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="home-cta">

        <div>
          <span>READY TO GET STARTED?</span>

          <h2>
            Your next great store
            <br />
            is waiting.
          </h2>

          <p>
            Join the StoreRate community and start
            discovering better places today.
          </p>
        </div>

        <button
          onClick={() => navigate("/signup")}
        >
          Create Free Account
          <ArrowRight size={18} />
        </button>

      </section>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="home-brand">
          <div className="home-brand-icon">
            <Star size={17} fill="currentColor" />
          </div>

          <span>StoreRate</span>
        </div>

        <p>
          © 2026 StoreRate. Built for better choices.
        </p>

        <div>
          <button>Privacy</button>
          <button>Terms</button>
          <button>Contact</button>
        </div>

      </footer>

    </div>
  );
}

export default Home;