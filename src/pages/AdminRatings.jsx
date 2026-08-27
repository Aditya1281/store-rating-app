import { useMemo, useState } from "react";
import {
  Search,
  Star,
  UserRound,
  Store,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import RatingStars from "../components/RatingStars";

function AdminRatings() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const ratings = [
    {
      user: "Aditya Pratap Singh",
      store: "The Urban Café",
      rating: 5,
      review:
        "Excellent service and very friendly staff.",
      date: "2 days ago",
    },
    {
      user: "Neha Verma",
      store: "TechWorld Store",
      rating: 4,
      review:
        "Good experience and quality products.",
      date: "4 days ago",
    },
    {
      user: "Rahul Sharma",
      store: "Fresh Basket",
      rating: 5,
      review:
        "Great store with excellent service.",
      date: "5 days ago",
    },
    {
      user: "Priya Singh",
      store: "Style Avenue",
      rating: 3,
      review:
        "The experience was average.",
      date: "1 week ago",
    },
    {
      user: "Amit Patel",
      store: "Home Comfort",
      rating: 4,
      review:
        "Nice collection and helpful staff.",
      date: "1 week ago",
    },
  ];

  const filteredRatings = useMemo(() => {
    return ratings.filter((item) => {
      const matchesSearch =
        item.user
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.store
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.review
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRating =
        ratingFilter === "All" ||
        item.rating === Number(ratingFilter);

      return matchesSearch && matchesRating;
    });
  }, [search, ratingFilter]);

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />

      <main className="dashboard-main">
        <Topbar
          title="Ratings"
          subtitle="Monitor ratings and customer feedback."
        />

        <section className="management-toolbar">
          <div className="management-search">
            <Search size={17} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, store or review..."
            />
          </div>

          <select
            className="rating-filter"
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </section>

        <section className="dashboard-panel management-panel">
          <div className="panel-heading">
            <div>
              <h2>Customer Ratings</h2>
              <p>
                {filteredRatings.length} ratings found
              </p>
            </div>
          </div>

          <div className="ratings-list">

            {filteredRatings.map((item, index) => (
              <div
                className="admin-rating-item"
                key={`${item.user}-${index}`}
              >
                <div className="rating-user-avatar">
                  <UserRound size={16} />
                </div>

                <div className="admin-rating-content">

                  <div className="admin-rating-top">
                    <div>
                      <strong>{item.user}</strong>

                      <span className="rating-store-name">
                        <Store size={12} />
                        {item.store}
                      </span>
                    </div>

                    <small>{item.date}</small>
                  </div>

                  <RatingStars
                    rating={item.rating}
                    size={13}
                  />

                  <p>{item.review}</p>

                </div>
              </div>
            ))}

            {filteredRatings.length === 0 && (
              <div className="empty-management">
                No ratings found.
              </div>
            )}

          </div>
        </section>

        <div className="rating-summary-card">
          <div className="rating-summary-icon">
            <Star size={20} fill="currentColor" />
          </div>

          <div>
            <strong>Platform Rating Overview</strong>
            <p>
              StoreRate currently has an average
              platform rating of 4.6 from 6,742 ratings.
            </p>
          </div>

          <div className="rating-summary-number">
            4.6
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminRatings;