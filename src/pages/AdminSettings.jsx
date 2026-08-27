import { useState } from "react";
import {
  UserRound,
  Mail,
  Lock,
  Bell,
  ShieldCheck,
  Save,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />

      <main className="dashboard-main">

        <Topbar
          title="Settings"
          subtitle="Manage your administrator account and preferences."
        />

        {saved && (
          <div className="settings-success">
            <ShieldCheck size={17} />
            Settings saved successfully.
          </div>
        )}

        <section className="settings-grid">

          {/* PROFILE */}
          <div className="dashboard-panel settings-panel">

            <div className="settings-section-heading">
              <div className="settings-section-icon">
                <UserRound size={18} />
              </div>

              <div>
                <h2>Profile Information</h2>
                <p>
                  Update your administrator information.
                </p>
              </div>
            </div>

            <form onSubmit={handleSave}>

              <div className="settings-form-grid">

                <div className="settings-field">
                  <label>Full Name</label>

                  <div className="settings-input">
                    <UserRound size={15} />

                    <input
                      defaultValue="Admin User"
                    />
                  </div>
                </div>

                <div className="settings-field">
                  <label>Email Address</label>

                  <div className="settings-input">
                    <Mail size={15} />

                    <input
                      type="email"
                      defaultValue="admin@storerate.com"
                    />
                  </div>
                </div>

              </div>

              <div className="settings-section-divider" />

              <div className="settings-section-heading">
                <div className="settings-section-icon">
                  <Lock size={18} />
                </div>

                <div>
                  <h2>Change Password</h2>
                  <p>
                    Keep your administrator account secure.
                  </p>
                </div>
              </div>

              <div className="settings-form-grid">

                <div className="settings-field">
                  <label>Current Password</label>

                  <div className="settings-input">
                    <Lock size={15} />

                    <input
                      type="password"
                      placeholder="Current password"
                    />
                  </div>
                </div>

                <div className="settings-field">
                  <label>New Password</label>

                  <div className="settings-input">
                    <Lock size={15} />

                    <input
                      type="password"
                      placeholder="New password"
                    />
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="settings-save-button"
              >
                <Save size={16} />
                Save Changes
              </button>

            </form>
          </div>

          {/* PREFERENCES */}
          <div className="dashboard-panel preferences-panel">

            <div className="settings-section-heading">
              <div className="settings-section-icon">
                <Bell size={18} />
              </div>

              <div>
                <h2>Notifications</h2>
                <p>
                  Choose what notifications you receive.
                </p>
              </div>
            </div>

            <label className="preference-row">
              <div>
                <strong>New user registrations</strong>
                <small>
                  Get notified when a new user joins.
                </small>
              </div>

              <input
                type="checkbox"
                defaultChecked
              />
            </label>

            <label className="preference-row">
              <div>
                <strong>New store registrations</strong>
                <small>
                  Get notified about new stores.
                </small>
              </div>

              <input
                type="checkbox"
                defaultChecked
              />
            </label>

            <label className="preference-row">
              <div>
                <strong>New ratings</strong>
                <small>
                  Get notified about new reviews.
                </small>
              </div>

              <input
                type="checkbox"
              />
            </label>

            <div className="security-box">
              <ShieldCheck size={18} />

              <div>
                <strong>Administrator Account</strong>
                <p>
                  Your account has administrator-level
                  access to the StoreRate platform.
                </p>
              </div>
            </div>

          </div>

        </section>
      </main>
    </div>
  );
}

export default AdminSettings;