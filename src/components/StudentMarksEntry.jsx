import { useMemo, useState } from "react";
import logo from "../assets/clg logo.jpeg";
import "./StaffPages.css";

const initialMarks = [
  { roll: "CS-101", name: "Aarav Sharma", marks: 88 },
  { roll: "CS-102", name: "Diya Patel", marks: 72 },
  { roll: "CS-103", name: "Kabir Menon", marks: 94 },
  { roll: "CS-104", name: "Ananya Rao", marks: 61 },
  { roll: "CS-105", name: "Ishan Verma", marks: 45 },
  { roll: "CS-106", name: "Meera Nair", marks: 29 }
];

const maxMarks = 100;

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

function getResult(percentage) {
  return percentage >= 50 ? "Pass" : "Fail";
}

function getStudentReport(student) {
  const percentage = Math.round((student.marks / maxMarks) * 100);
  return {
    ...student,
    total: maxMarks,
    percentage,
    grade: getGrade(percentage),
    result: getResult(percentage)
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function StudentMarksEntry() {
  const [students, setStudents] = useState(initialMarks);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedRoll, setSelectedRoll] = useState(initialMarks[0].roll);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [toast, setToast] = useState("");
  const [filters, setFilters] = useState({
    className: "B.Sc Computer Science",
    section: "A",
    subject: "Data Structures",
    examType: "Semester Exam"
  });
  const [newStudent, setNewStudent] = useState({
    roll: "",
    name: "",
    marks: ""
  });

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    const searched = query
      ? students.filter(
          (student) =>
            student.name.toLowerCase().includes(query) ||
            student.roll.toLowerCase().includes(query)
        )
      : students;

    return [...searched].sort((a, b) => {
      if (sortOrder === "highest") return b.marks - a.marks;
      if (sortOrder === "lowest") return a.marks - b.marks;
      return 0;
    });
  }, [search, sortOrder, students]);

  const selectedStudent = useMemo(() => {
    return (
      students.find((student) => student.roll === selectedRoll) ||
      filteredStudents[0] ||
      students[0]
    );
  }, [filteredStudents, selectedRoll, students]);

  const report = selectedStudent ? getStudentReport(selectedStudent) : null;
  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2400);
  };

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const updateMarks = (roll, value) => {
    const nextValue = Math.min(maxMarks, Math.max(0, Number(value) || 0));
    setStudents((current) =>
      current.map((student) =>
        student.roll === roll ? { ...student, marks: nextValue } : student
      )
    );
  };

  const addStudent = (event) => {
    event.preventDefault();
    const roll = newStudent.roll.trim().toUpperCase();
    const name = newStudent.name.trim();
    const marks = Math.min(maxMarks, Math.max(0, Number(newStudent.marks)));

    if (!roll || !name || Number.isNaN(marks)) {
      notify("Please enter all required student fields.");
      return;
    }

    if (students.some((student) => student.roll.toLowerCase() === roll.toLowerCase())) {
      notify("Roll number already exists.");
      return;
    }

    setStudents((current) => [...current, { roll, name, marks }]);
    setSelectedRoll(roll);
    setNewStudent({ roll: "", name: "", marks: "" });
    setShowAddModal(false);
    notify("Student added successfully.");
  };

  const exportCsv = () => {
    const header = ["Roll Number", "Student Name", "Marks", "Total Marks", "Percentage", "Grade"];
    const rows = students.map((student) => {
      const studentReport = getStudentReport(student);
      return [
        studentReport.roll,
        studentReport.name,
        studentReport.marks,
        studentReport.total,
        `${studentReport.percentage}%`,
        studentReport.grade
      ];
    });
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "student-marks-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify("Excel export downloaded.");
  };

  const openPrintableReport = () => {
    if (!report) return;
    const html = `
      <!doctype html>
      <html>
        <head>
          <title>${escapeHtml(report.name)} Report Card</title>
          <style>
            body { font-family: Arial, sans-serif; color: #1f2937; margin: 32px; }
            .sheet { border: 1px solid #ddd6fe; border-radius: 18px; padding: 28px; }
            .head { align-items: center; border-bottom: 2px solid #8b5cf6; display: flex; gap: 16px; padding-bottom: 16px; }
            img { border-radius: 12px; height: 72px; width: 72px; object-fit: cover; }
            h1 { color: #6d28d9; font-size: 28px; margin: 0; }
            h2 { font-size: 18px; margin: 6px 0 0; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 24px; }
            .item { background: #f5f3ff; border-radius: 12px; padding: 12px; }
            .label { color: #6b6375; display: block; font-size: 12px; font-weight: 700; margin-bottom: 4px; text-transform: uppercase; }
            .value { font-size: 16px; font-weight: 800; }
            .signatures { display: flex; justify-content: space-between; margin-top: 56px; }
            .signature { border-top: 1px solid #6b6375; padding-top: 10px; text-align: center; width: 210px; }
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="head">
              <img src="${logo}" alt="College Logo" />
              <div>
                <h1>KAMP College</h1>
                <h2>Student Marksheet / Report Card</h2>
              </div>
            </div>
            <div class="grid">
              <div class="item"><span class="label">Student Name</span><span class="value">${escapeHtml(report.name)}</span></div>
              <div class="item"><span class="label">Roll Number</span><span class="value">${escapeHtml(report.roll)}</span></div>
              <div class="item"><span class="label">Department</span><span class="value">${escapeHtml(filters.className)}</span></div>
              <div class="item"><span class="label">Section</span><span class="value">${escapeHtml(filters.section)}</span></div>
              <div class="item"><span class="label">Subject Name</span><span class="value">${escapeHtml(filters.subject)}</span></div>
              <div class="item"><span class="label">Exam Type</span><span class="value">${escapeHtml(filters.examType)}</span></div>
              <div class="item"><span class="label">Marks Obtained</span><span class="value">${report.marks}</span></div>
              <div class="item"><span class="label">Total Marks</span><span class="value">${report.total}</span></div>
              <div class="item"><span class="label">Percentage</span><span class="value">${report.percentage}%</span></div>
              <div class="item"><span class="label">Grade</span><span class="value">${report.grade}</span></div>
              <div class="item"><span class="label">Result</span><span class="value">${report.result}</span></div>
              <div class="item"><span class="label">Date of Issue</span><span class="value">${issueDate}</span></div>
            </div>
            <div class="signatures">
              <div class="signature">Staff Signature</div>
              <div class="signature">Principal Signature</div>
            </div>
          </div>
          <script>window.onload = () => window.print();</script>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <section className="staff-page staff-marks-entry-layout">
      <div className="staff-profile-bar">
        <div>
          <p className="eyebrow">Staff Workspace</p>
          <h1>Student Marks Entry</h1>
        </div>
        <div className="staff-profile">
          <span className="avatar">SP</span>
          <div>
            <strong>Staff Portal</strong>
            <span>Exam Cell Access</span>
          </div>
        </div>
      </div>

      <div className="summary-grid marks-summary">
        <div className="summary-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>
        <div className="summary-card present">
          <span>Average Marks</span>
          <strong>
            {Math.round(
              students.reduce((total, student) => total + student.marks, 0) /
                students.length
            )}
          </strong>
        </div>
        <div className="summary-card absent">
          <span>Fail Count</span>
          <strong>{students.filter((student) => student.marks < 50).length}</strong>
        </div>
        <div className="summary-card leave">
          <span>Max Marks</span>
          <strong>{maxMarks}</strong>
        </div>
      </div>

      <div className="erp-card">
        <div className="filters-grid marks-filters">
          <label>
            <span>Class</span>
            <select
              value={filters.className}
              onChange={(event) => updateFilter("className", event.target.value)}
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
              value={filters.section}
              onChange={(event) => updateFilter("section", event.target.value)}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </label>
          <label>
            <span>Subject</span>
            <select
              value={filters.subject}
              onChange={(event) => updateFilter("subject", event.target.value)}
            >
              <option>Data Structures</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>English</option>
            </select>
          </label>
          <label>
            <span>Exam Type</span>
            <select
              value={filters.examType}
              onChange={(event) => updateFilter("examType", event.target.value)}
            >
              <option>Semester Exam</option>
              <option>Internal Assessment</option>
              <option>Practical Exam</option>
              <option>Unit Test</option>
            </select>
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
          <label>
            <span>Sort Students</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="default">Default Order</option>
              <option value="highest">Highest Marks</option>
              <option value="lowest">Lowest Marks</option>
            </select>
          </label>
        </div>

        <div className="action-row marks-actions">
          <button className="primary-action" onClick={() => setShowAddModal(true)}>
            Add Student
          </button>
          <button className="primary-action" onClick={() => notify("Marks saved successfully.")}>
            Save Marks
          </button>
          <button className="secondary-action" onClick={() => notify("Marks Updated Successfully.")}>
            Update Marks
          </button>
          <button
            className="secondary-action"
            onClick={() => {
              setShowReportModal(true);
              notify("Report card generated.");
            }}
            disabled={!selectedStudent}
          >
            Generate Report Card
          </button>
          <button className="ghost-action" onClick={exportCsv}>
            Export Excel
          </button>
        </div>

        <div className="selected-student-strip">
          Selected student: <strong>{selectedStudent?.name || "No student selected"}</strong>
        </div>

        <div className="erp-table-wrap">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Marks Entry Field</th>
                <th>Total Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const studentReport = getStudentReport(student);

                return (
                  <tr
                    key={student.roll}
                    className={selectedRoll === student.roll ? "selected-row" : ""}
                    onClick={() => setSelectedRoll(student.roll)}
                  >
                    <td>{student.roll}</td>
                    <td className="student-name">{student.name}</td>
                    <td>
                      <input
                        className="marks-input"
                        type="number"
                        min="0"
                        max={maxMarks}
                        value={student.marks}
                        onChange={(event) => updateMarks(student.roll, event.target.value)}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </td>
                    <td>{studentReport.total}</td>
                    <td>{studentReport.percentage}%</td>
                    <td>
                      <span className={`grade-badge ${studentReport.grade === "F" ? "fail" : ""}`}>
                        {studentReport.grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <form className="erp-modal compact-modal" onSubmit={addStudent}>
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Marks Management</p>
                <h2>Add Student</h2>
              </div>
              <button type="button" className="icon-close" onClick={() => setShowAddModal(false)}>
                x
              </button>
            </div>
            <label>
              <span>Roll Number</span>
              <input
                required
                value={newStudent.roll}
                onChange={(event) =>
                  setNewStudent((current) => ({ ...current, roll: event.target.value }))
                }
              />
            </label>
            <label>
              <span>Student Name</span>
              <input
                required
                value={newStudent.name}
                onChange={(event) =>
                  setNewStudent((current) => ({ ...current, name: event.target.value }))
                }
              />
            </label>
            <label>
              <span>Marks Obtained</span>
              <input
                required
                type="number"
                min="0"
                max={maxMarks}
                value={newStudent.marks}
                onChange={(event) =>
                  setNewStudent((current) => ({ ...current, marks: event.target.value }))
                }
              />
            </label>
            <div className="modal-actions">
              <button type="button" className="ghost-action" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Add Student
              </button>
            </div>
          </form>
        </div>
      )}

      {showReportModal && report && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="erp-modal report-modal">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Preview Report Card</p>
                <h2>{report.name}</h2>
              </div>
              <button type="button" className="icon-close" onClick={() => setShowReportModal(false)}>
                x
              </button>
            </div>
            <div className="report-card">
              <div className="report-header">
                <img src={logo} alt="College Logo" />
                <div>
                  <h3>KAMP College</h3>
                  <p>Student Marksheet / Report Card</p>
                </div>
              </div>
              <div className="report-grid">
                <span>Student Name<strong>{report.name}</strong></span>
                <span>Roll Number<strong>{report.roll}</strong></span>
                <span>Department<strong>{filters.className}</strong></span>
                <span>Section<strong>{filters.section}</strong></span>
                <span>Subject Name<strong>{filters.subject}</strong></span>
                <span>Exam Type<strong>{filters.examType}</strong></span>
                <span>Marks Obtained<strong>{report.marks}</strong></span>
                <span>Total Marks<strong>{report.total}</strong></span>
                <span>Percentage<strong>{report.percentage}%</strong></span>
                <span>Grade<strong>{report.grade}</strong></span>
                <span>Result<strong>{report.result}</strong></span>
                <span>Date of Issue<strong>{issueDate}</strong></span>
              </div>
              <div className="signature-row">
                <span>Staff Signature</span>
                <span>Principal Signature</span>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="secondary-action" onClick={openPrintableReport}>
                Download PDF
              </button>
              <button type="button" className="primary-action" onClick={openPrintableReport}>
                Print Report Card
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="page-toast">{toast}</div>}
    </section>
  );
}
