// src/components/StaffTable.jsx
import "./StaffTable.css";

export default function StaffTable({ data, onRegister, onEdit, onDelete }) {
  return (
    <div className="table-card">
      <div className="table-card-header">
        <h2>Faculty & Staff Directory</h2>
        <button className="register-btn" onClick={onRegister}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Register Staff
        </button>
      </div>
      <div className="table-responsive">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Degree</th>
              <th className="subject-column">Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No staff members listed. Add new records from the form.</td>
              </tr>
            ) : (
              data.map((staff, idx) => (
                <tr key={staff.id || idx} className="table-row">
                  <td className="font-semibold">{staff.name}</td>
                  <td>{staff.experience}</td>
                  <td>{staff.qualification}</td>
                  <td className="subject-cell">{staff.subject}</td>
                  <td>
                    <div className="staff-actions" aria-label={`Actions for ${staff.name}`}>
                      <button
                        className="staff-icon-btn edit"
                        onClick={() => onEdit(staff)}
                        aria-label={`Edit ${staff.name}`}
                        title="Edit"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </button>
                      <button
                        className="staff-icon-btn delete"
                        onClick={() => onDelete(staff)}
                        aria-label={`Delete ${staff.name}`}
                        title="Delete"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v5" />
                          <path d="M14 11v5" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
