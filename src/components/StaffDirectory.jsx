import { useState } from "react";
import StaffTable from "./StaffTable";
import RegisterForm from "./RegisterForm";
import "./Dashboard.css";

const initialStaff = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    experience: "Computer Science",
    qualification: "Ph.D. in Computer Science",
    section: "A",
    subject: "Data Structures",
    phone: "9876543210",
    email: "sarah.jenkins@kamp.edu",
    status: "Active"
  },
  {
    id: 2,
    name: "Prof. Michael Chang",
    experience: "Mathematics",
    qualification: "Ph.D. in Applied Mathematics",
    section: "B",
    subject: "Calculus",
    phone: "9876543211",
    email: "michael.chang@kamp.edu",
    status: "Active"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    experience: "Physics",
    qualification: "M.S. in Theoretical Physics",
    section: "C",
    subject: "Quantum Physics",
    phone: "9876543212",
    email: "emily.rodriguez@kamp.edu",
    status: "Active"
  },
  {
    id: 4,
    name: "Dr. David K. Pierce",
    experience: "Chemistry",
    qualification: "Ph.D. in Organic Chemistry",
    section: "",
    subject: "Organic Chemistry",
    phone: "9876543213",
    email: "david.pierce@kamp.edu",
    status: "Inactive"
  }
];

export default function StaffDirectory() {
  const [staffList, setStaffList] = useState(initialStaff);
  const [showRegister, setShowRegister] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast({ message, exiting: false });
    setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, exiting: true } : null));
    }, 2500);
    setTimeout(() => setToast(null), 3000);
  };

  const closeForm = () => {
    setShowRegister(false);
    setEditingStaff(null);
  };

  const handleRegister = () => {
    setEditingStaff(null);
    setShowRegister(true);
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setShowRegister(true);
  };

  const handleDelete = (staff) => {
    const confirmed = window.confirm(`Delete ${staff.name} from the staff directory?`);
    if (!confirmed) return;

    setStaffList((prev) => prev.filter((item) => item.id !== staff.id));
    showToast(`${staff.name} has been removed from the directory.`);
  };

  const handleToggleStatus = (id) => {
    setStaffList((prev) => {
      const next = prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
      );
      const changed = next.find((x) => x.id === id);
      if (changed) showToast(`${changed.name} is now ${changed.status}.`);
      return next;
    });
  };

  const handleRegisterSubmit = (staff) => {
    const staffRecord = {
      ...staff,
      experience: staff.department || staff.experience,
      qualification: staff.degree || staff.qualification
    };

    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((item) => (item.id === staffRecord.id ? staffRecord : item))
      );
      showToast(`${staffRecord.name} has been updated.`);
    } else {
      setStaffList((prev) => [...prev, { ...staffRecord, id: Date.now() }]);
      showToast(`${staffRecord.name} has been added to the directory.`);
    }

    closeForm();
  };

  return (
    <div className="dashboard-content-area staff-directory-layout">
      <StaffTable
        data={staffList}
        onRegister={handleRegister}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {showRegister && (
        <RegisterForm
          onSubmit={handleRegisterSubmit}
          onCancel={closeForm}
          initialStaff={editingStaff}
        />
      )}

      {toast && (
        <div className={`toast ${toast.exiting ? "toast-exit" : ""}`}>
          <div className="toast-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="toast-text">
            <strong>Staff Directory Updated</strong>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
