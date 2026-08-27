import {
  LayoutDashboard,
  Users,
  Store,
  Star,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ role = "admin" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = {
    admin: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin",
      },
      {
        label: "Users",
        icon: Users,
        path: "/admin/users",
      },
      {
        label: "Stores",
        icon: Store,
        path: "/admin/stores",
      },
      {
        label: "Ratings",
        icon: Star,
        path: "/admin/ratings",
      },
      {
        label: "Analytics",
        icon: BarChart3,
        path: "/admin/analytics",
      },
      {
        label: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
    ],

    user: [
      {
        label: "Explore Stores",
        icon: Store,
        path: "/user",
      },
      {
        label: "My Ratings",
        icon: Star,
        path: "/user/ratings",
      },
      {
        label: "Profile",
        icon: Users,
        path: "/user/profile",
      },
    ],

    owner: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/owner",
      },
      {
        label: "My Store",
        icon: Store,
        path: "/owner/store",
      },
      {
        label: "Ratings",
        icon: Star,
        path: "/owner/ratings",
      },
      {
        label: "Analytics",
        icon: BarChart3,
        path: "/owner/analytics",
      },
      {
        label: "Profile",
        icon: Users,
        path: "/owner/profile",
      },
    ],
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="dashboard-sidebar">

      {/* BRAND */}
      <div className="dashboard-brand">
        <div className="dashboard-brand-icon">
          <Star size={20} fill="currentColor" />
        </div>

        <span>StoreRate</span>
      </div>

      {/* MENU TITLE */}
      <div className="sidebar-label">
        {role === "admin"
          ? "ADMIN PANEL"
          : role === "owner"
          ? "STORE MANAGEMENT"
          : "STORE DISCOVERY"}
      </div>

      {/* MENU */}
      <nav className="dashboard-menu">

        {menus[role].map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path;

          return (
            <button
              key={item.path}
              className={`dashboard-menu-item ${
                isActive ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </button>
          );
        })}

      </nav>

      {/* BOTTOM */}
      <div className="sidebar-bottom">

        <div className="sidebar-user">

          <div className="sidebar-avatar">
            {role === "admin"
              ? "AD"
              : role === "owner"
              ? "SO"
              : "US"}
          </div>

          <div>
            <strong>
              {role === "admin"
                ? "Admin User"
                : role === "owner"
                ? "Store Owner"
                : "Store User"}
            </strong>

            <small>
              {role === "admin"
                ? "Administrator"
                : role === "owner"
                ? "Store Owner"
                : "Normal User"}
            </small>
          </div>

        </div>

        <button
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;