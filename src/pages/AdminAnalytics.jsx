import {
  TrendingUp,
  Users,
  Store,
  Star,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminAnalytics() {
  const ratingData = [
    { label: "5 Stars", value: 78 },
    { label: "4 Stars", value: 15 },
    { label: "3 Stars", value: 5 },
    { label: "2 Stars", value: 1 },
    { label: "1 Star", value: 1 },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />

      <main className="dashboard-main">
        <Topbar
          title="Analytics"
          subtitle="Monitor StoreRate platform performance."
        />

        {/* SUMMARY */}
        <section className="analytics-summary">

          <div className="analytics-highlight">
            <div className="analytics-highlight-icon">
              <TrendingUp size={22} />
            </div>

            <div>
              <span>Platform Growth</span>
              <strong>+18.7%</strong>
              <small>Compared with last month</small>
            </div>
          </div>

          <div className="analytics-mini-card">
            <Users size={19} />
            <span>Total Users</span>
            <strong>1,284</strong>
            <small>+12.5%</small>
          </div>

          <div className="analytics-mini-card">
            <Store size={19} />
            <span>Total Stores</span>
            <strong>348</strong>
            <small>+8.2%</small>
          </div>

          <div className="analytics-mini-card">
            <Star size={19} />
            <span>Total Ratings</span>
            <strong>6,742</strong>
            <small>+18.7%</small>
          </div>

        </section>

        {/* CHART */}
        <section className="dashboard-panel analytics-chart-panel">

          <div className="panel-heading">
            <div>
              <h2>Rating Distribution</h2>
              <p>How users rate stores on the platform</p>
            </div>

            <div className="analytics-average">
              <Star size={15} fill="currentColor" />
              4.6 Average
            </div>
          </div>

          <div className="analytics-bars">

            {ratingData.map((item) => (
              <div
                className="analytics-bar-row"
                key={item.label}
              >
                <span>{item.label}</span>

                <div className="analytics-bar">
                  <div
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>

                <strong>{item.value}%</strong>
              </div>
            ))}

          </div>

        </section>

        {/* ACTIVITY */}
        <section className="analytics-grid">

          <div className="dashboard-panel">

            <div className="panel-heading">
              <div>
                <h2>Platform Activity</h2>
                <p>Recent activity across StoreRate</p>
              </div>

              <BarChart3 size={19} />
            </div>

            <div className="activity-list">

              <div className="activity-item">
                <div className="activity-icon users">
                  <Users size={15} />
                </div>

                <div>
                  <strong>New users</strong>
                  <small>128 new users this month</small>
                </div>

                <span>+12.5%</span>
              </div>

              <div className="activity-item">
                <div className="activity-icon stores">
                  <Store size={15} />
                </div>

                <div>
                  <strong>New stores</strong>
                  <small>26 stores registered this month</small>
                </div>

                <span>+8.2%</span>
              </div>

              <div className="activity-item">
                <div className="activity-icon ratings">
                  <Star size={15} />
                </div>

                <div>
                  <strong>New ratings</strong>
                  <small>1,064 ratings this month</small>
                </div>

                <span>+18.7%</span>
              </div>

            </div>

          </div>

          <div className="dashboard-panel">

            <div className="panel-heading">
              <div>
                <h2>Top Performing Stores</h2>
                <p>Highest rated stores</p>
              </div>

              <button className="panel-action">
                View stores
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="top-store-list">

              {[
                ["The Urban Café", "4.8", "126"],
                ["Home Comfort", "4.7", "92"],
                ["TechWorld Store", "4.6", "98"],
                ["Fresh Basket", "4.5", "84"],
              ].map((store, index) => (
                <div
                  className="top-store-item"
                  key={store[0]}
                >
                  <span className="store-rank">
                    0{index + 1}
                  </span>

                  <div>
                    <strong>{store[0]}</strong>
                    <small>
                      {store[2]} ratings
                    </small>
                  </div>

                  <span className="store-score">
                    ★ {store[1]}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </section>
      </main>
    </div>
  );
}

export default AdminAnalytics;