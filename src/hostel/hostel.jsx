import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  BedDouble,
  BookOpen,
  Building2,
  BusFront,
  CalendarCheck,
  Camera,
  ClipboardCheck,
  CreditCard,
  DoorOpen,
  Droplets,
  Dumbbell,
  Edit3,
  Eye,
  Gamepad2,
  HeartPulse,
  LibraryBig,
  MessageSquareWarning,
  MonitorCog,
  Plus,
  Settings,
  ShieldCheck,
  Shirt,
  Soup,
  Stethoscope,
  Theater,
  Trash2,
  Utensils,
  UserCheck,
  Users,
  WalletCards,
  Wifi,
  X,
} from "lucide-react";
import { college } from "../header/header.js";
import "./hostel.css";
import {
  attendanceData,
  attendanceStats,
  complaintsData,
  facilitiesData,
  feesData,
  hostelModules,
  leaveData,
  messMenu,
  occupancyStats,
  paymentStats,
  roomsData,
  statisticsCards,
  studentsData,
  visitorsData,
} from "./hostel.js";

const moduleIcons = {
  students: Users,
  rooms: BedDouble,
  fees: WalletCards,
  attendance: ClipboardCheck,
  leave: CalendarCheck,
  complaints: MessageSquareWarning,
  visitors: UserCheck,
  mess: Soup,
  facilities: Settings,
  campusFacilities: Building2,
};

const statIcons = {
  users: Users,
  bed: BedDouble,
  wallet: CreditCard,
  alert: AlertCircle,
};

const facilityIcons = {
  study: BookOpen,
  mess: Utensils,
  wifi: Wifi,
  laundry: Shirt,
  gym: Dumbbell,
  transport: BusFront,
  security: Camera,
  water: Droplets,
  medical: HeartPulse,
};

const campusIcons = {
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

const statusClassMap = {
  Active: "is-success",
  Paid: "is-success",
  Approved: "is-success",
  Resolved: "is-success",
  Operational: "is-success",
  Stable: "is-success",
  Online: "is-success",
  Available: "is-success",
  Open: "is-warning",
  Pending: "is-warning",
  Waiting: "is-warning",
  Scheduled: "is-info",
  "In Progress": "is-info",
  Full: "is-info",
  Exited: "is-info",
  Overdue: "is-danger",
  Rejected: "is-danger",
};

const panelMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function StatusBadge({ status }) {
  return <span className={`hostel-status ${statusClassMap[status] || "is-info"}`}>{status}</span>;
}

function StatCard({ card, index }) {
  const Icon = statIcons[card.icon] || Building2;

  return (
    <motion.article
      className="hostel-glass-card hostel-stat-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <div>
        <p className="hostel-stat-label">{card.label}</p>
        <h3 className="hostel-stat-value">{card.value}</h3>
        <span className="hostel-stat-trend">{card.trend}</span>
      </div>
      <div className="hostel-stat-icon">
        <Icon size={22} />
      </div>
    </motion.article>
  );
}

function FeatureGrid({ actions }) {
  return (
    <div className="hostel-feature-grid">
      {actions.map((action, index) => (
        <motion.div className="hostel-feature" key={action} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
          <ShieldCheck size={18} />
          <span>{action}</span>
        </motion.div>
      ))}
    </div>
  );
}

function MiniStats({ items }) {
  return (
    <div className="hostel-mini-stats">
      {items.map((item) => (
        <article className="hostel-mini-card" key={item.label}>
          <p className="hostel-mini-label">{item.label}</p>
          <h4 className="hostel-mini-value">{item.value}</h4>
        </article>
      ))}
    </div>
  );
}

function DataTable({ columns, rows, renderActions }) {
  return (
    <div className="hostel-table-wrap">
      <table className="hostel-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {renderActions ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || row.receipt || row.ticket || row.pass || row.room || index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.isStatus ? <StatusBadge status={row[column.key]} /> : row[column.key]}
                </td>
              ))}
              {renderActions ? <td>{renderActions(row)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableActions({ type = "default" }) {
  if (type === "approval") {
    return (
      <div className="hostel-table-actions">
        <button className="hostel-action-button" type="button">
          <ClipboardCheck size={15} /> Approve
        </button>
        <button className="hostel-action-button" type="button">
          <X size={15} /> Reject
        </button>
      </div>
    );
  }

  return (
    <div className="hostel-table-actions">
      <button className="hostel-action-button" type="button" aria-label="View">
        <Eye size={15} />
      </button>
      <button className="hostel-action-button" type="button" aria-label="Edit">
        <Edit3 size={15} />
      </button>
      <button className="hostel-action-button" type="button" aria-label="Delete">
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function MessContent() {
  return (
    <>
      <div className="hostel-menu-grid">
        {messMenu.map((item) => (
          <article className="hostel-menu-card" key={item.meal}>
            <p className="hostel-card-title">{item.meal}</p>
            <p className="hostel-card-copy">{item.menu}</p>
            <p className="hostel-card-muted">{item.nutrition}</p>
            <span className="hostel-stat-trend">{item.attendance}</span>
          </article>
        ))}
      </div>
      <MiniStats
        items={[
          { label: "Meal Attendance", value: "89%" },
          { label: "Food Rating", value: "4.6/5" },
          { label: "Nutrition Report", value: "Ready" },
        ]}
      />
      <div className="hostel-feedback">
        <p className="hostel-card-title">Food Feedback</p>
        <textarea placeholder="Record student feedback for mess quality, menu, service, or nutrition." />
        <button className="hostel-primary-button" type="button">
          <Plus size={16} /> Submit Feedback
        </button>
      </div>
    </>
  );
}

function FacilitiesContent() {
  return (
    <div className="hostel-facility-grid">
      {facilitiesData.map((facility) => (
        <motion.article className="hostel-facility-card" key={facility.name} whileHover={{ y: -5 }}>
          <div className="hostel-facility-image-wrap">
            <img className="hostel-facility-image" src={facility.image} alt={facility.name} loading="lazy" />
            <div className="hostel-facility-icon">
              {React.createElement(facilityIcons[facility.icon] || Settings, { size: 20 })}
            </div>
          </div>
          <div className="hostel-facility-body">
            <div className="hostel-facility-title-row">
              <p className="hostel-card-title">{facility.name}</p>
              <StatusBadge status={facility.status} />
            </div>
            <p className="hostel-card-copy">{facility.description}</p>
            <div className="hostel-availability">
              <span className="hostel-pulse" />
              {facility.availability}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function ModuleContent({ activeModule, searchTerm }) {
  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return studentsData;
    return studentsData.filter((student) =>
      [student.id, student.name, student.course, student.room, student.guardian, student.status].some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    );
  }, [searchTerm]);

  const commonHeader = (
    <div className="hostel-panel-head">
      <div>
        <p className="hostel-eyebrow-dark">Administration Module</p>
        <h2 className="hostel-section-title">{activeModule.title}</h2>
        <p className="hostel-section-copy">{activeModule.description}</p>
      </div>
      <button className="hostel-primary-button" type="button">
        <Plus size={16} /> {activeModule.actions[0]}
      </button>
    </div>
  );

  const contentMap = {
    students: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <DataTable
          columns={[
            { key: "id", label: "Student ID" },
            { key: "name", label: "Name" },
            { key: "course", label: "Course" },
            { key: "room", label: "Room" },
            { key: "guardian", label: "Guardian" },
            { key: "status", label: "Status", isStatus: true },
          ]}
          rows={filteredStudents}
          renderActions={() => <TableActions />}
        />
      </>
    ),
    rooms: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <MiniStats items={occupancyStats} />
        <DataTable
          columns={[
            { key: "block", label: "Block" },
            { key: "room", label: "Room" },
            { key: "type", label: "Room Type" },
            { key: "capacity", label: "Capacity" },
            { key: "occupied", label: "Occupied" },
            { key: "status", label: "Status", isStatus: true },
          ]}
          rows={roomsData}
          renderActions={() => <TableActions />}
        />
      </>
    ),
    fees: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <MiniStats items={paymentStats} />
        <DataTable
          columns={[
            { key: "receipt", label: "Receipt" },
            { key: "student", label: "Student" },
            { key: "amount", label: "Amount" },
            { key: "dueDate", label: "Due Date" },
            { key: "status", label: "Status", isStatus: true },
          ]}
          rows={feesData}
          renderActions={() => <TableActions />}
        />
      </>
    ),
    attendance: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <MiniStats items={attendanceStats} />
        <DataTable
          columns={[
            { key: "date", label: "Date" },
            { key: "present", label: "Present" },
            { key: "absent", label: "Absent" },
            { key: "percentage", label: "Percentage" },
          ]}
          rows={attendanceData}
        />
      </>
    ),
    leave: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <DataTable
          columns={[
            { key: "id", label: "Request ID" },
            { key: "student", label: "Student" },
            { key: "type", label: "Leave Type" },
            { key: "from", label: "From" },
            { key: "to", label: "To" },
            { key: "status", label: "Status", isStatus: true },
          ]}
          rows={leaveData}
          renderActions={() => <TableActions type="approval" />}
        />
      </>
    ),
    complaints: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <DataTable
          columns={[
            { key: "ticket", label: "Ticket" },
            { key: "category", label: "Category" },
            { key: "raisedBy", label: "Raised By" },
            { key: "priority", label: "Priority" },
            { key: "status", label: "Status", isStatus: true },
          ]}
          rows={complaintsData}
          renderActions={() => <TableActions />}
        />
      </>
    ),
    visitors: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <DataTable
          columns={[
            { key: "pass", label: "Pass ID" },
            { key: "visitor", label: "Visitor" },
            { key: "student", label: "Student" },
            { key: "time", label: "Time" },
            { key: "status", label: "Status", isStatus: true },
          ]}
          rows={visitorsData}
          renderActions={() => <TableActions type="approval" />}
        />
      </>
    ),
    mess: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <MessContent />
      </>
    ),
    facilities: (
      <>
        {commonHeader}
        <FeatureGrid actions={activeModule.actions} />
        <FacilitiesContent />
      </>
    ),
  };

  return (
    <motion.section
      className="hostel-glass-card hostel-module-panel"
      key={activeModule.id}
      variants={panelMotion}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {contentMap[activeModule.id]}
    </motion.section>
  );
}

export default function HostelManagement({ activeModuleId, searchTerm }) {
  const activeModule = hostelModules.find((module) => module.id === activeModuleId) || hostelModules[0];

  return (
    <div className="hostel-page">
      <section className="hostel-page-header">
        <div>
          <p className="hostel-eyebrow-dark">Hostel Administration</p>
          <h2>{activeModule.title}</h2>
          <p className="hostel-section-copy">{activeModule.description}</p>
        </div>
        <button className="hostel-primary-button" type="button">
          <Plus size={16} /> {activeModule.actions[0]}
        </button>
      </section>

      <section className="hostel-stats-grid" aria-label="Hostel statistics">
        {statisticsCards.map((card, index) => (
          <StatCard card={card} index={index} key={card.id} />
        ))}
      </section>

      <AnimatePresence mode="wait">
        <ModuleContent activeModule={activeModule} searchTerm={searchTerm} />
      </AnimatePresence>
    </div>
  );
}
