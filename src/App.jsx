import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import StaffDirectory from "./components/StaffDirectory";
import StudentAttendance from "./components/StudentAttendance";
import StudentMarksEntry from "./components/StudentMarksEntry";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/staff" element={<StaffDirectory />} />
        <Route path="/staff/attendance" element={<StudentAttendance />} />
        <Route path="/staff/marks" element={<StudentMarksEntry />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
