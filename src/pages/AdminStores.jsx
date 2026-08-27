import { useMemo, useState } from "react";
import {
  Search,
  Store,
  MapPin,
  Star,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import RatingStars from "../components/RatingStars";

function AdminStores() {
  const [search, setSearch] = useState("");
  const [sortHigh, setSortHigh] = useState(true);

  const stores = [
    {
      name: "The Urban Café",
      owner: "Rahul Sharma",
      address: "Ahmedabad, Gujarat",
      rating: 4.8,
      ratings: 126,
    },
    {
      name: "TechWorld Store",
      owner: "Amit Patel",
      address: "Pune, Maharashtra",
      rating: 4.6,
      ratings: 98,
    },
    {
      name: "Fresh Basket",
      owner: "Neha Verma",
      address: "Mumbai, Maharashtra",
      rating: 4.5,
      ratings: 84,
    },
    {
      name: "Style Avenue",
      owner: "Priya Singh",
      address: "Delhi, India",
      rating: 4.3,
      ratings: 71,
    },
    {
      name: "Home Comfort",
      owner: "Karan Mehta",
      address: "Bangalore, Karnataka",
      rating: 4.7,
      ratings: 92,
    },
  ];

  const filteredStores = useMemo(() => {
    const result = stores.filter(
      (store) =>
        store.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        store.owner
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        store.address
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    return [...result].sort((a, b) =>
      sortHigh
        ? b.rating - a.rating
        : a.rating - b.rating
    );
  }, [search, sortHigh]);

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />

      <main className="dashboard-main">
        <Topbar
          title="Stores"
          subtitle="View and manage all registered stores."
        />

        <section className="management-toolbar">
          <div className="management-search">
            <Search size={17} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by store, owner or address..."
            />
          </div>

          <button
            className="sort-button"
            onClick={() => setSortHigh(!sortHigh)}
          >
            <ArrowUpDown size={16} />

            Rating:
            {sortHigh ? " High to Low" : " Low to High"}
          </button>
        </section>

        <section className="dashboard-panel management-panel">
          <div className="panel-heading">
            <div>
              <h2>Registered Stores</h2>
              <p>
                {filteredStores.length} stores found
              </p>
            </div>
          </div>

          <div className="management-table store-management-table">

            <div className="management-table-head">
              <span>STORE</span>
              <span>ADDRESS</span>
              <span>RATING</span>
              <span>ACTION</span>
            </div>

            {filteredStores.map((store) => (
              <div
                className="management-table-row"
                key={store.name}
              >
                <div className="management-user">
                  <div className="store-management-icon">
                    <Store size={17} />
                  </div>

                  <div>
                    <strong>{store.name}</strong>
                    <small>
                      Owner: {store.owner}
                    </small>
                  </div>
                </div>

                <span className="management-address">
                  <MapPin size={13} />
                  {store.address}
                </span>

                <div className="store-rating-info">
                  <RatingStars
                    rating={store.rating}
                    size={13}
                  />

                  <small>
                    {store.ratings} ratings
                  </small>
                </div>

                <button className="management-action">
                  <MoreHorizontal size={17} />
                </button>
              </div>
            ))}

            {filteredStores.length === 0 && (
              <div className="empty-management">
                No stores found.
              </div>
            )}

          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminStores;