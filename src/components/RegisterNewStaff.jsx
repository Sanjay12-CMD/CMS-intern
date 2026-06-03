import { useState } from "react";

const initialForm = {
  fullName: "",
  department: "",
  degree: "",
  subject: "",
  status: "Active"
};

const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry"];
const statuses = ["Active", "Inactive"];

export default function RegisterNewStaff({ onCancel = () => {} }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!String(value).trim()) {
        nextErrors[key] = "This field is required";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const requestConfirmation = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleSubmit = () => {
    const payload = {
      name: formData.fullName.trim(),
      department: formData.department.trim(),
      degree: formData.degree.trim(),
      subject: formData.subject.trim(),
      status: formData.status
    };

    console.log("Registered staff payload:", payload);
    setFormData(initialForm);
    setErrors({});
    setShowConfirmModal(false);
  };

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-white/60 bg-white/75 p-6 shadow-2xl shadow-violet-200/40 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            Staff Directory
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Register New Staff
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add a faculty member with their department, degree, subject, and status.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border border-violet-100 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={requestConfirmation} className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Full Name"
          error={errors.fullName}
          className="md:col-span-2"
        >
          <input
            value={formData.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Dr. Sarah Jenkins"
            className={fieldClass(errors.fullName)}
          />
        </FormField>

        <FormField label="Department" error={errors.department}>
          <select
            value={formData.department}
            onChange={(event) => updateField("department", event.target.value)}
            className={fieldClass(errors.department)}
          >
            <option value="">Select department</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Degree" error={errors.degree}>
          <input
            value={formData.degree}
            onChange={(event) => updateField("degree", event.target.value)}
            placeholder="Ph.D. in Computer Science"
            className={fieldClass(errors.degree)}
          />
        </FormField>

        <FormField label="Subject" error={errors.subject}>
          <input
            value={formData.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            placeholder="Data Structures"
            className={fieldClass(errors.subject)}
          />
        </FormField>

        <FormField label="Status" error={errors.status}>
          <select
            value={formData.status}
            onChange={(event) => updateField("status", event.target.value)}
            className={fieldClass(errors.status)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </FormField>

        <div className="flex flex-col-reverse gap-3 md:col-span-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-violet-100 bg-white/70 px-5 py-3 text-sm font-bold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300/50 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-300/60"
          >
            Register Staff
          </button>
        </div>
      </form>

      {showConfirmModal && (
        <ConfirmationModal
          data={formData}
          onConfirm={handleSubmit}
          onEdit={() => setShowConfirmModal(false)}
        />
      )}
    </section>
  );
}

function FormField({ label, error, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label} <span className="text-red-500">*</span>
      </span>
      {children}
      {error && <span className="mt-2 block text-xs font-semibold text-red-500">{error}</span>}
    </label>
  );
}

function ConfirmationModal({ data, onConfirm, onEdit }) {
  const rows = [
    ["Full Name", data.fullName],
    ["Department", data.department],
    ["Degree", data.degree],
    ["Subject", data.subject],
    ["Status", data.status]
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
          Confirm Details
        </p>
        <h3 className="mt-1 text-xl font-bold text-slate-900">
          Review staff information
        </h3>

        <div className="mt-5 overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/50">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[130px_1fr] gap-3 border-b border-violet-100 px-4 py-3 last:border-b-0"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {label}
              </span>
              <span className="text-sm font-semibold text-slate-900">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-2xl border border-violet-100 bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            Go Back & Edit
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300/50 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-300/60"
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
}

function fieldClass(hasError) {
  return [
    "h-12 w-full rounded-2xl border bg-white/80 px-4 text-sm font-semibold text-slate-800 outline-none transition",
    "placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100",
    hasError ? "border-red-300 ring-4 ring-red-50" : "border-violet-100"
  ].join(" ");
}
