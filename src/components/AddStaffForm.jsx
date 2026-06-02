// src/components/AddStaffForm.jsx
import { useState } from "react";
import "./AddStaffForm.css";

export default function AddStaffForm({ onAdd }) {
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !qualification.trim() || !experience) return;
    
    setLoading(true);
    setSuccess(false);

    // Simulate modern network API submission delay with loading spinners and success ticks
    setTimeout(() => {
      onAdd({
        name,
        qualification,
        experience,
        status,
      });
      setLoading(false);
      setSuccess(true);
      
      // Clear form inputs
      setName("");
      setQualification("");
      setExperience("");
      setStatus("Active");

      // Auto fade-out success notification banner
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1200);
  };

  return (
    <div className="form-card card-glow floating-effect">
      <div className="card-header-accent"></div>
      <h2>Add New Staff</h2>
      <form onSubmit={handleSubmit} className="add-staff-form">
        <label>
          Staff Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Dr. John Doe"
            required
            disabled={loading}
          />
        </label>
        <label>
          Qualification
          <input
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            placeholder="e.g. Ph.D. in Computer Science"
            required
            disabled={loading}
          />
        </label>
        <label>
          Years of Experience
          <input
            type="number"
            min="0"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g. 5"
            required
            disabled={loading}
          />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </label>

        <button type="submit" className={`add-button interactive-btn ${loading ? 'loading' : ''}`} disabled={loading}>
          {loading ? (
            <span className="spinner-wrapper">
              <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
              </svg>
              Saving...
            </span>
          ) : success ? (
            <span className="success-wrapper">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              Added!
            </span>
          ) : (
            "Add Staff"
          )}
        </button>
      </form>
    </div>
  );
}
