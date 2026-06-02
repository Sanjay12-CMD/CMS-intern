import { useState } from "react";

const initialFormData = {
  name: "",
  department: "",
  degree: "",
  subject: "",
  status: "Active"
};

export default function RegisterForm({
  onAddStaff,
  onClose,
  onSubmit,
  onCancel,
  initialStaff = null
}) {
  const [formData, setFormData] = useState(
    initialStaff
      ? {
          name: initialStaff.name || "",
          department: initialStaff.department || initialStaff.experience || "",
          degree: initialStaff.degree || initialStaff.qualification || "",
          subject: initialStaff.subject || "",
          status: initialStaff.status || "Active"
        }
      : initialFormData
  );

  const closeModal = onClose || onCancel || (() => {});
  const saveStaff = onAddStaff || onSubmit || (() => {});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const department = formData.department.trim();
    const degree = formData.degree.trim();
    const subject = formData.subject.trim();

    if (!name || !department || !degree || !subject) {
      alert("Please fill in Name, Department, Degree, and Subject.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to add this staff member?");
    if (!confirmed) return;

    const newStaff = {
      ...(initialStaff || {}),
      name,
      department,
      degree,
      subject,
      status: formData.status
    };

    saveStaff(newStaff);
    setFormData(initialFormData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          aria-label="Close register staff modal"
        >
          X
        </button>

        <div className="mb-6 pr-12">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            Staff Directory
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Register Staff
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Manually enter staff details to add them to the dashboard list.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Name
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. Sarah Jenkins"
              className="h-12 w-full rounded-2xl border border-violet-100 bg-white/80 px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Department
            </span>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Computer Science"
              className="h-12 w-full rounded-2xl border border-violet-100 bg-white/80 px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Degree
            </span>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Ph.D. in Computer Science"
              className="h-12 w-full rounded-2xl border border-violet-100 bg-white/80 px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Subject
            </span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Data Structures"
              className="h-12 w-full rounded-2xl border border-violet-100 bg-white/80 px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Status
            </span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-violet-100 bg-white/80 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 md:max-w-xs"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>

          <div className="flex flex-col-reverse gap-3 pt-2 md:col-span-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-2xl border border-violet-100 bg-white/80 px-5 py-3 text-sm font-bold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300/50 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-300/60"
            >
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
