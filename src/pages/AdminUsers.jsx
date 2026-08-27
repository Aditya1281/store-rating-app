import { useState } from "react";
import {
  Search,
  UserRound,
  ShieldCheck,
  Store,
  MoreHorizontal,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminUsers() {
  const [search, setSearch] = useState("");

  const users = [
    {
      name: "Aditya Pratap Singh",
      email: "aditya@example.com",
      address: "Ahmedabad, Gujarat",
      role: "User",
    },
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      address: "Pune, Maharashtra",
      role: "Store Owner",
    },
    {
      name: "Neha Verma",
      email: "neha@example.com",
      address: "Mumbai, Maharashtra",
      role: "User",
    },
    {
      name: "Amit Patel",
      email: "amit@example.com",
      address: "Ahmedabad, Gujarat",
      role: "Store Owner",
    },
    {
      name: "Priya Singh",
      email: "priya@example.com",
      address: "Delhi, India",
      role: "User",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.address
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />

      <main className="dashboard-main">
        <Topbar
          title="Users"
          subtitle="Manage registered users and store owners."
        />

        <section className="management-toolbar">
          <div className="management-search">
            <Search size={17} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or address..."
            />
          </div>

          <div className="management-count">
            {filteredUsers.length} users
          </div>
        </section>

        <section className="dashboard-panel management-panel">
          <div className="panel-heading">
            <div>
              <h2>Registered Users</h2>
              <p>All users registered on StoreRate</p>
            </div>
          </div>

          <div className="management-table">

            <div className="management-table-head">
              <span>USER</span>
              <span>ADDRESS</span>
              <span>ROLE</span>
              <span>ACTION</span>
            </div>

            {filteredUsers.map((user) => (
              <div
                className="management-table-row"
                key={user.email}
              >
                <div className="management-user">
                  <div className="management-avatar">
                    {user.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div>
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                </div>

                <span className="management-address">
                  {user.address}
                </span>

                <span
                  className={`management-role ${
                    user.role === "Store Owner"
                      ? "owner-role"
                      : "user-role"
                  }`}
                >
                  {user.role === "Store Owner" ? (
                    <Store size={13} />
                  ) : (
                    <UserRound size={13} />
                  )}

                  {user.role}
                </span>

                <button className="management-action">
                  <MoreHorizontal size={17} />
                </button>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="empty-management">
                No users found.
              </div>
            )}

          </div>
        </section>

        <div className="management-info-card">
          <ShieldCheck size={20} />

          <div>
            <strong>User management</strong>
            <p>
              Administrators can view user details,
              roles and registered addresses from this
              section.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminUsers;