import React, { useState } from 'react';
import { 
  DEPARTMENTS_DATA,
  cseImg,
  itImg,
  eceImg,
  eeeImg,
  mechanicalImg,
  civilImg,
  aidsImg,
  aimlImg,
  cyberImg 
} from './department.js';
import './department.css';

export default function Department() {
  // State to manage the list of departments (initialized from DEPARTMENTS_DATA)
  const [departments, setDepartments] = useState(DEPARTMENTS_DATA);

  // State to track which department card has its details expanded.
  const [activeDeptId, setActiveDeptId] = useState(null);

  // State to manage the visibility of the Add Department Modal Dialog
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Controlled form states for adding a new department
  const [newName, setNewName] = useState('');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newDetailedInfo, setNewDetailedInfo] = useState('');
  const [selectedImageKey, setSelectedImageKey] = useState('cse'); // Default to CSE

  // Helper function to handle expanding/collapsing details
  const handleToggleDetails = (deptId) => {
    setActiveDeptId(prevId => prevId === deptId ? null : deptId);
  };

  // Form submit handler to manually add a new department
  const handleAddDepartment = (e) => {
    e.preventDefault();

    // Input validation checks
    if (!newName.trim() || !newShortDesc.trim() || !newDetailedInfo.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    // Map dropdown option value to the imported asset image
    const imageMap = {
      cse: cseImg,
      it: itImg,
      ece: eceImg,
      eee: eeeImg,
      mechanical: mechanicalImg,
      civil: civilImg,
      aids: aidsImg,
      aiml: aimlImg,
      cyber: cyberImg
    };

    // Create new department object
    const newDept = {
      id: Date.now().toString(), // Dynamic ID based on timestamp
      name: newName.trim(),
      image: imageMap[selectedImageKey] || cseImg,
      shortDescription: newShortDesc.trim(),
      detailedInfo: newDetailedInfo.trim()
    };

    // Add to departments state array
    setDepartments([...departments, newDept]);

    // Clear inputs and close modal dialog
    setNewName('');
    setNewShortDesc('');
    setNewDetailedInfo('');
    setSelectedImageKey('cse');
    setIsModalOpen(false);
  };

  return (
    <div className="departments-wrapper">
      
      {/* Showcase Header Section */}
      <div className="dept-showcase-header">
        <span className="dept-pre-title">ACADEMIC EXCELLENCE</span>
        <h2 className="dept-main-heading">Engineering Departments</h2>
        <div className="title-underline"></div>
        <p className="dept-lead-paragraph">
          Explore our world-class engineering programs designed to foster computational skills, advanced research, practical learning, and next-generation leadership.
        </p>
      </div>

      {/* Action Bar containing the "Add Department" trigger button */}
      <div className="dept-actions-bar">
        <button className="add-dept-trigger-btn" onClick={() => setIsModalOpen(true)}>
          <span className="add-plus-icon">+</span> Add Department
        </button>
      </div>

      {/* Grid of Department Cards */}
      <div className="departments-grid">
        {departments.map((dept) => {
          const isExpanded = activeDeptId === dept.id;
          return (
            <div key={dept.id} className="dept-card">
              
              {/* 1. Unique Engineering Image on Top */}
              <div className="dept-image-container">
                <img 
                  src={dept.image} 
                  alt={dept.name} 
                  className="dept-image" 
                  loading="lazy"
                />
              </div>

              {/* 2. Department Name */}
              <h3 className="dept-name">{dept.name}</h3>

              {/* 3. One-line Short Description */}
              <p className="dept-short-desc">{dept.shortDescription}</p>

              {/* 4. View Details Button */}
              <button 
                className={`view-details-btn ${isExpanded ? 'active' : ''}`}
                onClick={() => handleToggleDetails(dept.id)}
              >
                {isExpanded ? 'Hide Details' : 'View Details'}
              </button>

              {/* 5. Expandable Department Information */}
              {isExpanded && (
                <div className="dept-details-expanded">
                  <p>{dept.detailedInfo}</p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Add Department Popup Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Department</h3>
              <button className="modal-close-x" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleAddDepartment} className="modal-form">
              <div className="form-group">
                <label>Department Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Chemical Engineering" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Short Description (One-line)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Study of chemical processes and manufacturing." 
                  value={newShortDesc} 
                  onChange={(e) => setNewShortDesc(e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Detailed Information</label>
                <textarea 
                  placeholder="e.g. Chemical Engineering focuses on process design, industrial chemistry, fluid mechanics, and reactor technologies." 
                  value={newDetailedInfo} 
                  onChange={(e) => setNewDetailedInfo(e.target.value)} 
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Select Category / Image Preset</label>
                <select 
                  value={selectedImageKey} 
                  onChange={(e) => setSelectedImageKey(e.target.value)}
                  className="form-select"
                >
                  <option value="cse">Computer Science (Coding)</option>
                  <option value="it">Information Technology (Networking)</option>
                  <option value="ece">Electronics & Communication (Circuits)</option>
                  <option value="eee">Electrical & Electronics (Power Grid)</option>
                  <option value="mechanical">Mechanical (Gears & Machines)</option>
                  <option value="civil">Civil (Construction & Buildings)</option>
                  <option value="aids">Artificial Intelligence & Data Science</option>
                  <option value="aiml">Artificial Intelligence & Machine Learning</option>
                  <option value="cyber">Cyber Security (Secure Shield)</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
