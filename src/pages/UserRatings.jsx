import { useEffect, useState } from "react";
import { Star, MapPin } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function UserRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        const userId = user?._id || user?.id;

        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/ratings/user/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Fetch ratings failed:", data);
          return;
        }

        setRatings(data.ratings || []);
      } catch (error) {
        console.error("Fetch ratings error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar role="user" />

      <main className="dashboard-main">
        <Topbar
          title="My Ratings"
          subtitle="View the stores you have rated."
        />

        <div className="page-content">
          <div className="explore-heading">
            <div>
              <h2>My Ratings</h2>
              <p>
                Stores you have rated and reviewed
              </p>
            </div>

            <span>
              {ratings.length} ratings
            </span>
          </div>

          {loading ? (
            <p>Loading ratings...</p>
          ) : ratings.length === 0 ? (
            <div className="empty-state">
              <Star size={40} />

              <h2>No ratings yet</h2>

              <p>
                You haven't rated any stores yet.
              </p>
            </div>
          ) : (
            <div className="ratings-list">
              {ratings.map((item) => (
                <div
                  className="rating-card"
                  key={item._id}
                >
                  <h2>
                    {item.store?.name || "Store"}
                  </h2>

                  {item.store?.location && (
                    <p className="store-location">
                      <MapPin size={15} />
                      {item.store.location}
                    </p>
                  )}

                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        fill={
                          star <= item.rating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>

                  <strong>
                    {item.rating}/5
                  </strong>

                  {item.review && (
                    <p>{item.review}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default UserRatings;