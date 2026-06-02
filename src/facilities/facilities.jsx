import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  Building2,
  BusFront,
  Dumbbell,
  Gamepad2,
  LibraryBig,
  MonitorCog,
  Soup,
  Stethoscope,
  Theater,
  Wifi,
} from "lucide-react";
import { campusFacilities } from "./facilities.js";
import "./facilities.css";

const facilityIcons = {
  library: LibraryBig,
  computer: MonitorCog,
  bus: BusFront,
  sports: Gamepad2,
  cafeteria: Soup,
  medical: Stethoscope,
  auditorium: Theater,
  gym: Dumbbell,
  wifi: Wifi,
};

const pageMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function FacilityLoader() {
  return (
    <div className="facility-loader" aria-label="Loading facility details">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function CampusFacilities({ activeFacilityId, searchTerm }) {
  const [isLoading, setIsLoading] = useState(false);

  const filteredFacilities = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    if (!normalizedQuery) return campusFacilities;

    return campusFacilities.filter((facility) =>
      [facility.title, facility.description, ...facility.features].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [searchTerm]);

  const activeFacility =
    filteredFacilities.find((facility) => facility.id === activeFacilityId) || filteredFacilities[0] || campusFacilities[0];

  useEffect(() => {
    setIsLoading(true);
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 260);
    return () => window.clearTimeout(loadingTimer);
  }, [activeFacilityId]);

  return (
    <div className="facilities-page">
      <div className="facilities-panel">
        <div className="facilities-heading-row">
          <div className="facilities-heading-icon">
            <Activity size={22} />
          </div>
          <div>
            <p className="facilities-eyebrow">Campus Facilities</p>
            <h2>{activeFacility.title}</h2>
            <p>Review facility details, stats, and service features inside a single dashboard content area.</p>
          </div>
        </div>

        <nav className="facilities-breadcrumb" aria-label="Breadcrumb">
          <Building2 size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>Campus Facilities</span>
          <span>/</span>
          <strong>{activeFacility.title}</strong>
        </nav>

        <AnimatePresence mode="wait">
          <motion.section
            key={activeFacility.id}
            className="facility-detail"
            variants={pageMotion}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="facility-hero">
              <img src={activeFacility.image} alt={activeFacility.title} />
              <div className="facility-hero-overlay">
                <span className="facility-kicker">Premium Facility</span>
                <h2>{activeFacility.title}</h2>
                <p>{activeFacility.description}</p>
              </div>
            </div>

            {isLoading ? (
              <FacilityLoader />
            ) : (
              <>
                <div className="facility-stats-grid">
                  {activeFacility.stats.map((stat, index) => (
                    <motion.article
                      className="facility-stat-card"
                      key={stat.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <p>{stat.label}</p>
                      <strong>{stat.value}</strong>
                    </motion.article>
                  ))}
                </div>

                <div className="facility-main-grid">
                  <article className="facility-description-card">
                    <p className="facilities-eyebrow">Overview</p>
                    <h3>{activeFacility.title} Services</h3>
                    <p>{activeFacility.description}</p>
                  </article>

                  <article className="facility-feature-card">
                    <p className="facilities-eyebrow">Key Features</p>
                    <div className="facility-feature-list">
                      {activeFacility.features.map((feature) => (
                        <motion.div className="facility-feature" key={feature} whileHover={{ x: 6 }}>
                          <span />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </article>
                </div>
              </>
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}
