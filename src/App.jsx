import React, { useMemo, useState } from "react";
import { Building2, ChevronDown, Layers, Search } from "lucide-react";
import HostelManagement from "./hostel/hostel.jsx";
import CampusFacilities from "./facilities/facilities.jsx";
import { college } from "./header/header.js";
import "./App.css";

const sidebarSections = [
  {
    id: "hostel",
    title: "Hostel Management",
    icon: Building2,
    summary:
      "Manage student registration, room allocation, fees, attendance, leave, complaints, visitors, mess, and hostel services with a modern admin dashboard.",
    items: [
      { id: "students", title: "Student Registration" },
      { id: "rooms", title: "Room Allocation" },
      { id: "fees", title: "Fees Management" },
      { id: "attendance", title: "Attendance Management" },
      { id: "leave", title: "Leave Management" },
      { id: "complaints", title: "Complaints Management" },
      { id: "visitors", title: "Visitor Management" },
      { id: "mess", title: "Mess Management" },
      { id: "facilities", title: "Hostel Facilities" },
    ],
  },
  {
    id: "campus",
    title: "Campus Facilities",
    icon: Layers,
    summary:
      "Access library, computer labs, transport, sports, cafeteria, medical, auditorium, gymnasium, and Wi-Fi campus facilities without leaving the dashboard.",
    items: [
      { id: "library", title: "Library" },
      { id: "computer-labs", title: "Computer Labs" },
      { id: "transport", title: "Transport" },
      { id: "sports-games", title: "Sports & Games" },
      { id: "cafeteria", title: "Cafeteria" },
      { id: "medical-center", title: "Medical Center" },
      { id: "auditorium", title: "Auditorium" },
      { id: "gymnasium", title: "Gymnasium" },
      { id: "wifi-campus", title: "Wi-Fi Campus" },
    ],
  },
];

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState("students");
  const [expandedGroups, setExpandedGroups] = useState({
    hostel: true,
    campus: true,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const activeGroup = useMemo(
    () =>
      sidebarSections.find((group) =>
        group.items.some((item) => item.id === activeSectionId)
      ) || sidebarSections[0],
    [activeSectionId]
  );

  const activeSection = useMemo(
    () =>
      activeGroup.items.find((item) => item.id === activeSectionId) ||
      activeGroup.items[0],
    [activeGroup.items, activeSectionId]
  );

  const handleSectionSelect = (sectionId) => {
    setActiveSectionId(sectionId);
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-sidebar-brand">
          <img
            className="app-sidebar-logo"
            src={college.logo}
            alt="KAMP College logo"
          />
          <div>
            <p className="app-eyebrow">KAMP College</p>
            <h1>Dashboard</h1>
          </div>
        </div>

        <div className="app-sidebar-menu">
          {sidebarSections.map((group) => {
            const Icon = group.icon;

            return (
              <div key={group.id} className="app-menu-group">
                <button
                  type="button"
                  className={`app-menu-group-title ${
                    activeGroup.id === group.id ? "is-active-group" : ""
                  }`}
                  onClick={() =>
                    setExpandedGroups((prev) => ({
                      ...prev,
                      [group.id]: !prev[group.id],
                    }))
                  }
                >
                  <span>
                    <Icon size={18} />
                    <span>{group.title}</span>
                  </span>
                  <ChevronDown
                    className={expandedGroups[group.id] ? "is-open" : ""}
                    size={16}
                  />
                </button>

                {expandedGroups[group.id] && (
                  <div className="app-submenu">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`app-submenu-link ${
                          activeSectionId === item.id ? "is-active" : ""
                        }`}
                        onClick={() => handleSectionSelect(item.id)}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="app-sidebar-footer">
          <p>
            One global sidebar, one navbar, one content area — a modern college
            management interface.
          </p>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-topbar">
          <div className="app-topbar-copy">
            <p className="app-eyebrow">
              Dashboard / {activeGroup.title}
            </p>
            <h2>{activeSection.title}</h2>
            <p>{activeGroup.summary}</p>
          </div>

          <label className="app-search">
            <Search size={18} />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search the current dashboard"
            />
          </label>
        </header>

        <section className="app-content" aria-live="polite">
          {activeGroup.id === "hostel" ? (
            <HostelManagement
              activeModuleId={activeSection.id}
              searchTerm={searchTerm}
            />
          ) : activeGroup.id === "campus" ? (
            <CampusFacilities
              activeFacilityId={activeSection.id}
              searchTerm={searchTerm}
            />
          ) : null}
        </section>
      </main>
    </div>
  );
}