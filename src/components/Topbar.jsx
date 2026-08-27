import {
  Bell,
  Search,
} from "lucide-react";

function Topbar({ title, subtitle, showSearch = false }) {
  return (
    <header className="dashboard-topbar">

      <div className="topbar-heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-right">

        {showSearch && (
          <div className="topbar-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search stores..."
            />
          </div>
        )}

        <button className="topbar-notification">
          <Bell size={19} />
          <span></span>
        </button>

        <div className="topbar-avatar">
          AD
        </div>

      </div>

    </header>
  );
}

export default Topbar;