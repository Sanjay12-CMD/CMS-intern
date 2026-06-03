import React from 'react';
import { 
  User, 
  Calendar, 
  BookOpen, 
  FileText, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  GraduationCap 
} from 'lucide-react';
import './StudentDashboard.css';

export default function StudentDashboard({ currentUser }) {
  // Use mock student info if currentUser is undefined, else parse username
  const rollNumber = currentUser?.username || "22CS001";
  const name = "Sanjay Kumar";
  const email = currentUser?.username?.includes('@') ? currentUser.username : "sanjay.kumar@kampcollege.edu";
  const department = "B.E. Computer Science and Engineering";
  const semester = "Semester VI";
  const attendancePercentage = 88.5;

  const grades = [
    { code: "CS8601", subject: "Compiler Design", type: "Core", grade: "O", points: 10 },
    { code: "CS8602", subject: "Computer Networks", type: "Core", grade: "A+", points: 9 },
    { code: "CS8603", subject: "Artificial Intelligence", type: "Core", grade: "A", points: 8 },
    { code: "CS8611", subject: "Mobile App Development Lab", type: "Lab", grade: "O", points: 10 },
    { code: "MG8591", subject: "Principles of Management", type: "Elective", grade: "B+", points: 7 }
  ];

  const assignments = [
    { id: 1, title: "Compiler Design Lab - Exercise 4", dueDate: "June 05, 2026", status: "pending", priority: "high" },
    { id: 2, title: "Computer Networks Assignment 2", dueDate: "June 08, 2026", status: "pending", priority: "medium" },
    { id: 3, title: "Principles of Management Case Study", dueDate: "May 28, 2026", status: "submitted", priority: "low" },
    { id: 4, title: "Mobile App Development - Mini Project Code", dueDate: "May 25, 2026", status: "submitted", priority: "high" }
  ];

  const timetable = [
    { day: "Mon", periods: ["Compiler Design", "Computer Networks", "Lab: Mobile App Dev", "Lab: Mobile App Dev"] },
    { day: "Tue", periods: ["Artificial Intelligence", "Principles of Mgmt", "Compiler Design", "Seminar"] },
    { day: "Wed", periods: ["Computer Networks", "Compiler Design", "Lab: Networks", "Lab: Networks"] },
    { day: "Thu", periods: ["Principles of Mgmt", "Artificial Intelligence", "Library Hour", "Placement Training"] },
    { day: "Fri", periods: ["Mobile App Dev", "Computer Networks", "Artificial Intelligence", "Sports / Club"] }
  ];

  const announcements = [
    { id: 1, title: "End Semester Practical Exams Schedule", date: "June 01, 2026", desc: "Practical lab examinations will commence from June 12, 2026. Please check with your lab coordinators for batch timings." },
    { id: 2, title: "KAMP-HACKS 2026 Registration Open", date: "May 29, 2026", desc: "Register your teams for the annual 36-hour hackathon. Winners receive cash prizes and incubation support." },
    { id: 3, title: "Library Extended Hours notice", date: "May 25, 2026", desc: "The campus central library will remain open until 9:00 PM on weekdays in view of upcoming theory examinations." }
  ];

  return (
    <div className="dashboard-container bg-orbs animate-fade-in">
      {/* Welcome Banner Card */}
      <section className="welcome-banner glass-panel">
        <div className="welcome-banner-details">
          <div className="student-profile-avatar-lg">
            <GraduationCap size={36} />
          </div>
          <div>
            <h2 className="welcome-title">Welcome back, {name}!</h2>
            <p className="welcome-subtitle">Keep up the great work. You have no pending library penalties.</p>
          </div>
        </div>
        <div className="current-gpa-badge">
          <span className="gpa-label">CGPA</span>
          <span className="gpa-val">8.82 / 10</span>
        </div>
      </section>

      {/* Main Grid: Profile, Attendance, Grades, Assignments */}
      <div className="dashboard-grid">
        {/* Profile Card */}
        <div className="dashboard-card glass-panel">
          <div className="card-header-with-icon">
            <User size={18} className="card-icon" />
            <h3>Student Profile</h3>
          </div>
          <div className="profile-details-content">
            <div className="profile-detail-row">
              <span className="detail-label">Roll Number</span>
              <span className="detail-value">{rollNumber}</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-label">Degree</span>
              <span className="detail-value">B.E. (Hons.)</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-label">Department</span>
              <span className="detail-value">CSE</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-label">Current Term</span>
              <span className="detail-value">{semester}</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-label">Email ID</span>
              <span className="detail-value truncate-text" title={email}>{email}</span>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="dashboard-card glass-panel">
          <div className="card-header-with-icon">
            <Calendar size={18} className="card-icon" />
            <h3>Attendance Summary</h3>
          </div>
          <div className="attendance-content">
            <div className="attendance-radial-wrapper">
              <svg className="radial-svg" viewBox="0 0 100 100">
                <circle className="radial-bg" cx="50" cy="50" r="40"></circle>
                <circle 
                  className="radial-bar" 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  style={{ strokeDashoffset: 251.2 - (251.2 * attendancePercentage) / 100 }}
                ></circle>
              </svg>
              <div className="radial-label-inner">
                <span className="percentage-num">{attendancePercentage}%</span>
                <span className="percentage-desc">Overall</span>
              </div>
            </div>
            <div className="attendance-details-text">
              <p className="attendance-status-good">Excellent attendance status!</p>
              <p className="classes-ratio">Attended: 354 / 400 Classes</p>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="dashboard-card glass-panel grades-card">
          <div className="card-header-with-icon">
            <BookOpen size={18} className="card-icon" />
            <h3>Grades Tracker</h3>
          </div>
          <div className="grades-table-wrapper">
            <table className="grades-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Subject</th>
                  <th className="align-center">Grade</th>
                  <th className="align-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.code}>
                    <td className="grade-sub-code">{grade.code}</td>
                    <td className="grade-sub-title">{grade.subject}</td>
                    <td className="align-center"><span className={`grade-tag grade-${grade.grade.replace('+', 'plus')}`}>{grade.grade}</span></td>
                    <td className="align-center grade-points">{grade.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assignment Status */}
        <div className="dashboard-card glass-panel">
          <div className="card-header-with-icon">
            <FileText size={18} className="card-icon" />
            <h3>Assignments</h3>
          </div>
          <div className="assignment-list">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="assignment-item-row">
                <div className="assign-info">
                  <h4 className="assign-title">{assignment.title}</h4>
                  <div className="assign-due">
                    <Clock size={12} />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                </div>
                <div className="assign-badge-area">
                  {assignment.status === 'submitted' ? (
                    <span className="status-badge-submitted">
                      <CheckCircle2 size={12} />
                      <span>Submitted</span>
                    </span>
                  ) : (
                    <span className={`status-badge-pending priority-${assignment.priority}`}>
                      <AlertCircle size={12} />
                      <span>Pending</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Layout: Timetable and Announcements */}
      <div className="dashboard-split-layout">
        {/* Timetable Section */}
        <div className="dashboard-card glass-panel timetable-card">
          <div className="card-header-with-icon">
            <Calendar size={18} className="card-icon" />
            <h3>Weekly Timetable</h3>
          </div>
          <div className="timetable-wrapper">
            <table className="timetable-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th className="period-hdr">Period 1<br /><span className="period-time">09:00 - 10:15</span></th>
                  <th className="period-hdr">Period 2<br /><span className="period-time">10:30 - 11:45</span></th>
                  <th className="period-hdr">Period 3<br /><span className="period-time">12:30 - 01:45</span></th>
                  <th className="period-hdr">Period 4<br /><span className="period-time">02:00 - 03:15</span></th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((row) => (
                  <tr key={row.day}>
                    <td className="timetable-day-label">{row.day}</td>
                    {row.periods.map((period, idx) => (
                      <td 
                        key={idx} 
                        className={`timetable-subject-cell ${period.includes('Lab') ? 'lab-period' : ''}`}
                      >
                        {period}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="dashboard-card glass-panel announcements-card">
          <div className="card-header-with-icon">
            <Bell size={18} className="card-icon" />
            <h3>Notifications</h3>
          </div>
          <div className="announcements-list">
            {announcements.map((ann) => (
              <div key={ann.id} className="announcement-item">
                <div className="announcement-meta">
                  <span className="ann-date">{ann.date}</span>
                </div>
                <h4 className="ann-title">{ann.title}</h4>
                <p className="ann-desc">{ann.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
