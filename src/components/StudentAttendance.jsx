import { useMemo, useState } from "react";
import "./StaffPages.css";

const initialStudents = [
  { roll: "CS-101", name: "Aarav Sharma", status: "Present", attended: 46, total: 50 },
  { roll: "CS-102", name: "Diya Patel", status: "Absent", attended: 34, total: 50 },
  { roll: "CS-103", name: "Kabir Menon", status: "Present", attended: 41, total: 50 },
  { roll: "CS-104", name: "Ananya Rao", status: "Leave", attended: 29, total: 50 },
  { roll: "CS-105", name: "Ishan Verma", status: "Present", attended: 38, total: 50 },
  { roll: "CS-106", name: "Meera Nair", status: "Absent", attended: 25, total: 50 }
];

export default function StudentAttendance() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [selectedClass, setSelectedClass] = useState("B.Sc Computer Science");
  const [selectedSection, setSelectedSection] = useState("A");
  const [attendanceDate, setAttendanceDate] = useState("2026-06-01");
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    roll: "",
    name: "",
    percentage: "",
    status: "Present"
  });

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.roll.toLowerCase().includes(query)
    );
  }, [search, students]);

  const summary = useMemo(
    () => ({
      total: students.length,
      present: students.filter((student) => student.status === "Present").length,
      absent: students.filter((student) => student.status === "Absent").length,
      leave: students.filter((student) => student.status === "Leave").length
    }),
    [students]
  );

  const updateStatus = (roll, status) => {
    setStudents((current) =>
      current.map((student) =>
        student.roll === roll ? { ...student, status } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents((current) =>
      current.map((student) => ({ ...student, status: "Present" }))
    );
  };

  const updateNewStudent = (field, value) => {
    setNewStudent((current) => ({ ...current, [field]: value }));
  };

  const resetNewStudentForm = () => {
    setNewStudent({
      roll: "",
      name: "",
      percentage: "",
      status: "Present"
    });
  };

  const addStudentToRoster = (event) => {
    event.preventDefault();

    const roll = newStudent.roll.trim().toUpperCase();
    const name = newStudent.name.trim();
    const percentage = Math.min(100, Math.max(0, Number(newStudent.percentage) || 0));

    if (!roll || !name) {
      setToast("Roll Number and Student Name are required");
      setTimeout(() => setToast(""), 2400);
      return;
    }

    if (students.some((student) => student.roll.toLowerCase() === roll.toLowerCase())) {
      setToast("A student with this roll number already exists");
      setTimeout(() => setToast(""), 2400);
      return;
    }

    setStudents((current) => [
      ...current,
      {
        roll,
        name,
        status: newStudent.status,
        attended: percentage,
        total: 100
      }
    ]);
    resetNewStudentForm();
    setShowAddStudent(false);
    setToast("Student added to roster");
    setTimeout(() => setToast(""), 2400);
  };

  const saveAttendance = () => {
    const hasUnmarkedStudent = students.some((student) => !student.status);
    if (hasUnmarkedStudent) {
      setToast("Please select attendance status for every student");
      setTimeout(() => setToast(""), 2400);
      return;
    }

    setShowConfirmSave(true);
  };

  const confirmSaveAttendance = () => {
    const payload = {
      className: selectedClass,
      section: selectedSection,
      date: attendanceDate,
      summary,
      students: students.map((student) => {
        const updatedTotal = student.total + 1;
        const updatedAttended =
          student.status === "Present" ? student.attended + 1 : student.attended;

        return {
          rollNumber: student.roll,
          studentName: student.name,
          status: student.status,
          attendancePercentage: Math.round((updatedAttended / updatedTotal) * 100)
        };
      })
    };

    console.log("Saved attendance payload:", payload);
    setAttendanceLogs((current) => [...current, payload]);
    setStudents((current) =>
      current.map((student) => ({
        ...student,
        total: student.total + 1,
        attended: student.status === "Present" ? student.attended + 1 : student.attended
      }))
    );
    setShowConfirmSave(false);
    setToast("Attendance saved successfully");
    setTimeout(() => setToast(""), 2400);
  };

  const getAttendancePercentage = (student) =>
    Math.round((student.attended / student.total) * 100);

  const getPercentageClass = (percentage) => {
    if (percentage >= 75) return "percentage-good";
    if (percentage >= 60) return "percentage-warning";
    return "percentage-danger";
  };

  return (
    <section className="staff-page staff-attendance-layout">
      <div className="staff-profile-bar">
        <div>
          <p className="eyebrow">Staff Workspace</p>
          <h1>Student Attendance Management</h1>
        </div>
        <div className="staff-profile">
          <span className="avatar">SP</span>
          <div>
            <strong>Staff Portal</strong>
            <span>Computer Science</span>
          </div>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total Students</span>
          <strong>{summary.total}</strong>
        </div>
        <div className="summary-card present">
          <span>Present Count</span>
          <strong>{summary.present}</strong>
        </div>
        <div className="summary-card absent">
          <span>Absent Count</span>
          <strong>{summary.absent}</strong>
        </div>
        <div className="summary-card leave">
          <span>Leave Count</span>
          <strong>{summary.leave}</strong>
        </div>
      </div>

      <div className="erp-card">
        <div className="filters-grid">
          <label>
            <span>Class</span>
            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
            >
              <option>B.Sc Computer Science</option>
              <option>B.Com</option>
              <option>B.A English</option>
              <option>BBA</option>
            </select>
          </label>
          <label>
            <span>Section</span>
            <select
              value={selectedSection}
              onChange={(event) => setSelectedSection(event.target.value)}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </label>
          <label>
            <span>Date</span>
            <input
              type="date"
              value={attendanceDate}
              onChange={(event) => setAttendanceDate(event.target.value)}
            />
          </label>
          <label>
            <span>Search Student</span>
            <input
              type="search"
              placeholder="Search by name or roll"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="action-row">
          <button className="outline-action" onClick={() => setShowAddStudent(true)}>
            + Add Student
          </button>
          <button className="secondary-action" onClick={markAllPresent}>
            Mark All Present
          </button>
          <button className="primary-action" onClick={saveAttendance}>
            Save Attendance
          </button>
        </div>

        <div className="erp-table-wrap">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Attendance %</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const percentage = getAttendancePercentage(student);

                return (
                  <tr key={student.roll}>
                    <td>{student.roll}</td>
                    <td className="student-name">{student.name}</td>
                    <td>
                      <span className={`attendance-percentage ${getPercentageClass(percentage)}`}>
                        {percentage}%
                      </span>
                    </td>
                    <td>
                      <div className="status-options">
                        {["Present", "Absent", "Leave"].map((status) => (
                          <button
                            key={status}
                            className={`status-pill ${student.status === status ? "selected" : ""} ${status.toLowerCase()}`}
                            onClick={() => updateStatus(student.roll, status)}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAddStudent && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <form className="erp-modal compact-modal" onSubmit={addStudentToRoster}>
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Class Roster</p>
                <h2>Add New Student to Class</h2>
              </div>
              <button
                type="button"
                className="icon-close"
                onClick={() => {
                  resetNewStudentForm();
                  setShowAddStudent(false);
                }}
                aria-label="Close add student modal"
              >
                x
              </button>
            </div>

            <label>
              <span>Roll Number</span>
              <input
                type="text"
                placeholder="CS-103"
                value={newStudent.roll}
                onChange={(event) => updateNewStudent("roll", event.target.value)}
              />
            </label>
            <label>
              <span>Student Name</span>
              <input
                type="text"
                placeholder="Amit Sharma"
                value={newStudent.name}
                onChange={(event) => updateNewStudent("name", event.target.value)}
              />
            </label>
            <label>
              <span>Starting Attendance Percentage (%)</span>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="95"
                value={newStudent.percentage}
                onChange={(event) => updateNewStudent("percentage", event.target.value)}
              />
            </label>
            <label>
              <span>Initial Status</span>
              <select
                value={newStudent.status}
                onChange={(event) => updateNewStudent("status", event.target.value)}
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Leave</option>
              </select>
            </label>

            <div className="modal-actions">
              <button
                type="button"
                className="ghost-action"
                onClick={() => {
                  resetNewStudentForm();
                  setShowAddStudent(false);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Add to Roster
              </button>
            </div>
          </form>
        </div>
      )}

      {showConfirmSave && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="erp-modal compact-modal attendance-confirm-modal">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Confirm Attendance</p>
                <h2>Save Today's Attendance</h2>
              </div>
              <button
                type="button"
                className="icon-close"
                onClick={() => setShowConfirmSave(false)}
                aria-label="Close confirmation"
              >
                x
              </button>
            </div>
            <p className="confirm-message">
              Are you sure you want to save today's attendance for{" "}
              <strong>{selectedClass}</strong> - Section{" "}
              <strong>{selectedSection}</strong>?
            </p>
            <div className="confirmation-mini-grid">
              <span>Present<strong>{summary.present}</strong></span>
              <span>Absent<strong>{summary.absent}</strong></span>
              <span>Leave<strong>{summary.leave}</strong></span>
              <span>Saved Logs<strong>{attendanceLogs.length}</strong></span>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="ghost-action"
                onClick={() => setShowConfirmSave(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary-action"
                onClick={confirmSaveAttendance}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="page-toast">{toast}</div>}
    </section>
  );
}
