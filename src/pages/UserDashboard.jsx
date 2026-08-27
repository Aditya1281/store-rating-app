import { useEffect, useState } from "react";

import {
  Search,
  MapPin,
  SlidersHorizontal,
  Star,
  Heart,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import RatingStars from "../components/RatingStars";

function UserDashboard() {
  const navigate = useNavigate();

  // ============================
  // RATING STATE
  // ============================

  const [selectedStore, setSelectedStore] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);

  // ============================
  // STORE STATE
  // ============================

  const [stores, setStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [storesLoading, setStoresLoading] = useState(true);
  const [storesError, setStoresError] = useState("");

  // ============================
  // FETCH STORES FROM MONGODB
  // ============================

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setStoresLoading(true);
        setStoresError("");

        const response = await fetch(
          "http://localhost:5000/api/stores"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch stores."
          );
        }

        const formattedStores = (data.stores || []).map(
          (store) => ({
            id: store._id,
            name: store.name,
            category: store.category,
            location: store.location,

            // Rating aggregation next step me backend se aayegi.
            rating: store.rating || 0,
            reviews: store.reviews || 0,
          })
        );

        setStores(formattedStores);
      } catch (error) {
        console.error("Fetch stores error:", error);

        setStoresError(
          "Unable to load stores. Please try again."
        );
      } finally {
        setStoresLoading(false);
      }
    };

    fetchStores();
  }, []);

  // ============================
  // LOGOUT
  // ============================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  // ============================
  // OPEN RATING
  // ============================

  const handleRateStore = (store) => {
    setSelectedStore(store);
    setRating(0);
    setReview("");
  };

  // ============================
  // CLOSE RATING
  // ============================

  const handleCloseRating = () => {
    if (ratingLoading) return;

    setSelectedStore(null);
    setRating(0);
    setReview("");
  };

  // ============================
  // SUBMIT RATING
  // ============================

  const handleSubmitRating = async () => {
    if (!selectedStore) return;

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (!user?.id) {
        alert(
          "User session not found. Please login again."
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });

        return;
      }

      setRatingLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/ratings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user: user.id,
            store: selectedStore.id,
            rating: rating,
            review: review.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to submit rating."
        );

        return;
      }

      alert(
        data.message ||
          "Rating submitted successfully!"
      );

      handleCloseRating();
    } catch (error) {
      console.error(
        "Submit rating error:",
        error
      );

      alert(
        "Unable to connect to backend. Please try again."
      );
    } finally {
      setRatingLoading(false);
    }
  };

  // ============================
  // RETURN
  // ============================
const filteredStores = stores.filter((store) =>
  store.name.toLowerCase().includes(searchQuery.toLowerCase())
);
  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <Sidebar role="user" />

      {/* MAIN */}
      <main className="dashboard-main">

        {/* TOPBAR */}
        <Topbar
          title="Explore Stores"
          subtitle="Discover trusted stores and share your experience."
          showSearch
        />

        {/* USER TOOLBAR */}
        <div className="user-toolbar">

          <div className="store-search">
            <Search size={18} />

            <input
  type="text"
  placeholder="Search by store name..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
          </div>

          <button
            type="button"
            className="filter-button"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>

          {/* LOGOUT */}
          <button
            type="button"
            className="filter-button"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

        {/* HEADING */}
        <div className="explore-heading">

          <div>
            <h2>Popular stores</h2>

            <p>
              Stores recommended by the community
            </p>
          </div>

          <span>
            {stores.length} stores
          </span>

        </div>

        {/* LOADING */}
        {storesLoading && (
          <div className="store-loading">
            Loading stores...
          </div>
        )}

        {/* ERROR */}
        {!storesLoading && storesError && (
          <div className="store-error">
            {storesError}
          </div>
        )}

        {/* NO STORES */}
        {!storesLoading &&
          !storesError &&
          filteredStores.length === 0 && (
            <div className="store-loading">
              No stores found.
            </div>
          )}

        {/* STORE GRID */}
        {!storesLoading &&
          !storesError &&
          stores.length > 0 && (
            <section className="store-grid">

              {filteredStores.map((store) => (

                <article
                  className="store-card"
                  key={store.id}
                >

                  {/* COVER */}
                  <div className="store-cover">

                    <div className="store-card-icon">
                      <Star
                        size={22}
                        fill="currentColor"
                      />
                    </div>

                    <button
                      type="button"
                      className="favorite-button"
                      title="Add to favorites"
                    >
                      <Heart size={17} />
                    </button>

                  </div>

                  {/* BODY */}
                  <div className="store-card-body">

                    <span className="store-category">
                      {store.category}
                    </span>

                    <h3>
                      {store.name}
                    </h3>

                    <div className="store-location">

                      <MapPin size={14} />

                      {store.location}

                    </div>

                    <div className="store-rating-row">

                      <RatingStars
                        rating={store.rating}
                        size={14}
                      />

                      <span>
                        {store.reviews} reviews
                      </span>

                    </div>

                    {/* RATE BUTTON */}
                    <button
                      type="button"
                      className="rate-store-button"
                      onClick={() =>
                        handleRateStore(store)
                      }
                    >
                      Rate this store

                      <Star size={15} />
                    </button>

                  </div>

                </article>

              ))}

            </section>
          )}

      </main>

      {/* ============================
          RATING MODAL
      ============================ */}

      {selectedStore && (

        <div
          className="rating-modal-overlay"
          onClick={handleCloseRating}
        >

          <div
            className="rating-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}
            <button
              type="button"
              className="rating-modal-close"
              onClick={handleCloseRating}
              disabled={ratingLoading}
            >
              ×
            </button>

            {/* ICON */}
            <div className="rating-modal-icon">
              <Star
                size={28}
                fill="currentColor"
              />
            </div>

            {/* TITLE */}
            <h2>
              Rate {selectedStore.name}
            </h2>

            <p>
              Share your experience with this store.
            </p>

            {/* STARS */}
            <div className="rating-select">

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <button
                    key={star}
                    type="button"
                    className={
                      star <= rating
                        ? "rating-star active"
                        : "rating-star"
                    }
                    onClick={() =>
                      setRating(star)
                    }
                    disabled={ratingLoading}
                    aria-label={`Rate ${star} stars`}
                  >

                    <Star
                      size={32}
                      fill={
                        star <= rating
                          ? "currentColor"
                          : "none"
                      }
                    />

                  </button>

                )
              )}

            </div>

            {/* RATING VALUE */}
            <div className="rating-value">

              {rating === 0
                ? "Select a rating"
                : `${rating} out of 5 stars`}

            </div>

            {/* REVIEW */}
            <textarea
              className="rating-review-input"
              placeholder="Write your review..."
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
              rows={5}
              maxLength={1000}
              disabled={ratingLoading}
            />

            {/* SUBMIT */}
            <button
              type="button"
              className="submit-rating-button"
              disabled={
                rating === 0 ||
                ratingLoading
              }
              onClick={handleSubmitRating}
            >
              {ratingLoading
                ? "Submitting..."
                : "Submit Rating"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default UserDashboard;