// src/components/Dashboard.jsx
import "./Dashboard.css";

const dashboardStats = [
  { label: "Total Students", value: "186", tone: "violet" },
  { label: "Active Classes", value: "12", tone: "green" },
  { label: "Attendance Today", value: "91%", tone: "amber" },
  { label: "Pending Reports", value: "7", tone: "red" }
];

export default function Dashboard() {
  return (
    <div className="dashboard-content-area">
      <section className="dashboard-overview">
        <div>
          <p className="dashboard-eyebrow">College ERP</p>
          <h1>Dashboard</h1>
          <p>Overview of academic activity and daily administration.</p>
        </div>
      </section>

      <section className="dashboard-stat-grid">
        {dashboardStats.map((stat) => (
          <article className={`dashboard-stat-card ${stat.tone}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>
    </div>
  );
}
