import { useEffect, useState } from "react";
import {
  Store,
  Star,
  Users,
  TrendingUp,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import RatingStars from "../components/RatingStars";

function OwnerDashboard() {
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerStore = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        const ownerId = user?.id || user?._id;

        if (!ownerId) {
          console.error("Owner ID not found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/stores/owner/${ownerId}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          setLoading(false);
          return;
        }

        setStore(data.store);
        setRatings(data.ratings || []);
      } catch (error) {
        console.error("Owner dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerStore();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar role="owner" />

        <main className="dashboard-main">
          <Topbar
            title="Store Dashboard"
            subtitle="Track your store performance and customer feedback."
          />

          <div className="page-content">
            <p>Loading store dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="dashboard-layout">
        <Sidebar role="owner" />

        <main className="dashboard-main">
          <Topbar
            title="Store Dashboard"
            subtitle="Track your store performance and customer feedback."
          />

          <div className="page-content">
            <h2>No store found</h2>
            <p>
              No store is assigned to this store owner.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const averageRating = store.rating || 0;
  const totalRatings = ratings.length;

  const ratingCounts = {
    5: ratings.filter((item) => item.rating === 5).length,
    4: ratings.filter((item) => item.rating === 4).length,
    3: ratings.filter((item) => item.rating === 3).length,
    2: ratings.filter((item) => item.rating === 2).length,
    1: ratings.filter((item) => item.rating === 1).length,
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="owner" />

      <main className="dashboard-main">
        <Topbar
          title="Store Dashboard"
          subtitle="Track your store performance and customer feedback."
        />

        {/* STORE HEADER */}
        <section className="owner-store-header">
          <div className="owner-store-icon">
            <Store size={30} />
          </div>

          <div className="owner-store-info">
            <span>YOUR STORE</span>

            <h2>{store.name}</h2>

            <p>
              {store.location} · {store.category}
            </p>
          </div>

          <button className="edit-store-button">
            Manage Store
            <ArrowUpRight size={16} />
          </button>
        </section>

        {/* STATS */}
        <section className="dashboard-stats">
          <StatCard
            title="Average Rating"
            value={averageRating.toFixed(1)}
            change="Overall"
            icon={Star}
          />

          <StatCard
            title="Total Ratings"
            value={totalRatings}
            change="Customer ratings"
            icon={MessageSquare}
          />

          <StatCard
            title="Customers"
            value={totalRatings}
            change="Rated your store"
            icon={Users}
          />

          <StatCard
            title="This Month"
            value={
              ratings.filter((item) => {
                const date = new Date(item.createdAt);
                const now = new Date();

                return (
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                );
              }).length
            }
            change="Ratings"
            icon={TrendingUp}
          />
        </section>

        <section className="owner-content-grid">
          {/* RATING OVERVIEW */}
          <div className="dashboard-panel rating-overview">
            <div className="panel-heading">
              <div>
                <h2>Rating overview</h2>
                <p>How customers rate your store</p>
              </div>
            </div>

            <div className="big-rating">
              <strong>{averageRating.toFixed(1)}</strong>

              <RatingStars
                rating={averageRating}
                size={19}
              />

              <span>
                Based on {totalRatings} ratings
              </span>
            </div>

            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map((number) => {
                const percentage =
                  totalRatings > 0
                    ? Math.round(
                        (ratingCounts[number] /
                          totalRatings) *
                          100
                      )
                    : 0;

                return (
                  <div
                    className="rating-bar-row"
                    key={number}
                  >
                    <span>{number}</span>

                    <Star
                      size={13}
                      fill="currentColor"
                    />

                    <div className="rating-bar">
                      <span
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <small>{percentage}%</small>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RECENT REVIEWS */}
          <div className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <h2>Recent reviews</h2>
                <p>Latest customer feedback</p>
              </div>

              <button className="panel-action">
                View all
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="review-list">
              {ratings.length === 0 ? (
                <p>No ratings yet.</p>
              ) : (
                ratings.slice(0, 5).map((review) => {
                  const userName =
                    review.user?.name || "User";

                  return (
                    <div
                      className="review-item"
                      key={review._id}
                    >
                      <div className="review-avatar">
                        {userName
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div className="review-content">
                        <div className="review-top">
                          <strong>
                            {userName}
                          </strong>

                          <small>
                            {new Date(
                              review.createdAt
                            ).toLocaleDateString()}
                          </small>
                        </div>

                        <RatingStars
                          rating={review.rating}
                          size={12}
                        />

                        <p>
                          {review.review ||
                            "No written review."}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OwnerDashboard;