import {
  Users,
  Store,
  Star,
  BarChart3,
  Search,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import RatingStars from "../components/RatingStars";

function AdminDashboard() {
  const stores = [
    {
      name: "The Urban Café",
      owner: "Rahul Sharma",
      location: "Ahmedabad",
      rating: 4.8,
      reviews: 126,
      status: "Active",
    },
    {
      name: "TechWorld Store",
      owner: "Amit Patel",
      location: "Pune",
      rating: 4.6,
      reviews: 98,
      status: "Active",
    },
    {
      name: "Fresh Basket",
      owner: "Neha Verma",
      location: "Mumbai",
      rating: 4.5,
      reviews: 84,
      status: "Active",
    },
    {
      name: "Style Avenue",
      owner: "Priya Singh",
      location: "Delhi",
      rating: 4.3,
      reviews: 71,
      status: "Pending",
    },
  ];

  const users = [
    {
      name: "Aditya Pratap Singh",
      email: "aditya@example.com",
      role: "User",
    },
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Store Owner",
    },
    {
      name: "Neha Verma",
      email: "neha@example.com",
      role: "User",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />

      <main className="dashboard-main">
        <Topbar
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening today."
        />

        <section className="dashboard-stats">
          <StatCard
            title="Total Users"
            value="1,284"
            change="+12.5%"
            icon={Users}
          />

          <StatCard
            title="Total Stores"
            value="348"
            change="+8.2%"
            icon={Store}
          />

          <StatCard
            title="Total Ratings"
            value="6,742"
            change="+18.7%"
            icon={Star}
          />

          <StatCard
            title="Average Rating"
            value="4.6"
            change="+0.3"
            icon={BarChart3}
          />
        </section>

        <section className="dashboard-panels">

          {/* STORES */}
          <div className="dashboard-panel large-panel">

            <div className="panel-heading">
              <div>
                <h2>Recent Stores</h2>
                <p>Latest registered stores</p>
              </div>

              <button className="panel-action">
                View all
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="dashboard-search">
              <Search size={16} />
              <input placeholder="Search stores..." />
            </div>

            <div className="data-table">

              <div className="table-header">
                <span>STORE</span>
                <span>LOCATION</span>
                <span>RATING</span>
                <span>STATUS</span>
              </div>

              {stores.map((store) => (
                <div className="table-item" key={store.name}>

                  <div className="store-cell">
                    <div className="store-mini-icon">
                      <Store size={17} />
                    </div>

                    <div>
                      <strong>{store.name}</strong>
                      <small>{store.owner}</small>
                    </div>
                  </div>

                  <span className="location-text">
                    {store.location}
                  </span>

                  <RatingStars rating={store.rating} size={14} />

                  <span
                    className={`status-badge ${
                      store.status === "Active"
                        ? "status-active"
                        : "status-pending"
                    }`}
                  >
                    {store.status}
                  </span>

                </div>
              ))}

            </div>
          </div>

          {/* USERS */}
          <div className="dashboard-panel">

            <div className="panel-heading">
              <div>
                <h2>Recent Users</h2>
                <p>Newly registered users</p>
              </div>

              <button className="icon-action">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="recent-users">

              {users.map((user) => (
                <div className="recent-user" key={user.email}>

                  <div className="user-avatar">
                    {user.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>

                  <span className="role-badge">
                    {user.role}
                  </span>

                </div>
              ))}

            </div>

            <button className="full-width-action">
              Manage all users
              <ArrowUpRight size={15} />
            </button>

          </div>
        </section>

        {/* PERFORMANCE */}
        <section className="performance-card">

          <div className="performance-info">

            <div className="performance-icon">
              <BarChart3 size={21} />
            </div>

            <div>
              <h3>Platform performance</h3>
              <p>
                Your platform activity is growing steadily
                this month.
              </p>
            </div>

          </div>

          <div className="performance-stats">

            <div>
              <strong>+18.7%</strong>
              <span>Ratings</span>
            </div>

            <div>
              <strong>+12.5%</strong>
              <span>Users</span>
            </div>

            <div>
              <strong>+8.2%</strong>
              <span>Stores</span>
            </div>

          </div>

        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;