const students = [
  { id: "KAMP2026001", name: "Aarav Kumar", dept: "CSE", year: "3rd Year", category: "Day Scholar", image: "" },
  { id: "KAMP2026002", name: "Nila Raj", dept: "AI & DS", year: "2nd Year", category: "Hostel Student", image: "" },
  { id: "KAMP2026003", name: "Vikram S", dept: "ECE", year: "4th Year", category: "Scholarship Student", image: "" },
  { id: "KAMP2026004", name: "Meera Joseph", dept: "IT", year: "1st Year", category: "Day Scholar", image: "" },
  { id: "KAMP2026005", name: "Sanjay Patel", dept: "EEE", year: "2nd Year", category: "Day Scholar", image: "" }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const studentRows = $("#studentRows");
const studentSearch = $("#studentSearch");
const studentFilter = $("#studentFilter");
const studentModal = $("#studentModal");
const studentForm = $("#studentForm");
const studentError = $("#studentError");
const successToast = $("#successToast");
const profileUpload = $("#profileUpload");
const profilePreview = $("#profilePreview");
const leaveSuccessPopup = $("#leaveSuccessPopup");
const paymentDetailPage = $("#paymentDetailPage");
const paymentSuccessPage = $("#paymentSuccessPage");
let uploadedImage = "";
let latestReceipt = null;
let currentStudent = students[0];

const semesterFees = {
  "1": { name: "Semester 1", amount: 42000, due: "30 Jun 2026", status: "Pending" },
  "2": { name: "Semester 2", amount: 43500, due: "30 Nov 2026", status: "Pending" },
  "3": { name: "Semester 3", amount: 45000, due: "30 Jun 2027", status: "Pending" },
  "4": { name: "Semester 4", amount: 45500, due: "30 Nov 2027", status: "Pending" },
  "5": { name: "Semester 5", amount: 47000, due: "30 Jun 2028", status: "Pending" },
  "6": { name: "Semester 6", amount: 48000, due: "30 Nov 2028", status: "Pending" },
  "7": { name: "Semester 7", amount: 49500, due: "30 Jun 2029", status: "Pending" },
  "8": { name: "Semester 8", amount: 50000, due: "30 Nov 2029", status: "Pending" }
};

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function renderStudents() {
  const query = studentSearch.value.trim().toLowerCase();
  const filter = studentFilter.value;

  const visible = students.filter((student) => {
    const searchable = [student.id, student.name, student.dept, student.year, student.category].join(" ").toLowerCase();
    return searchable.includes(query) && (filter === "All" || student.dept === filter);
  });

  studentRows.innerHTML = visible.length
    ? visible
        .map((student) => {
          const avatar = student.image
            ? `<img class="avatar" src="${student.image}" alt="${student.name}" />`
            : `<div class="avatar default-avatar" aria-hidden="true"><span class="avatar-icon">👤</span><span class="avatar-initials">${initials(student.name)}</span></div>`;

          return `
            <tr>
              <td>${avatar}</td>
              <td>${student.id}</td>
              <td><strong>${student.name}</strong></td>
              <td>${student.dept}</td>
              <td>${student.year}</td>
              <td>${student.category}</td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="6" style="text-align:center; padding:28px; color:var(--muted); font-weight:800;">No student records match the current search.</td></tr>`;
}

function showPage(pageId, activeItem) {
  $$(".page-view").forEach((page) => page.classList.toggle("active", page.id === pageId));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item === activeItem));
}

function openStudentModal() {
  studentModal.classList.add("open");
  studentModal.setAttribute("aria-hidden", "false");
  studentError.textContent = "";
  setTimeout(() => $("#studentId").focus(), 80);
}

function closeStudentModal() {
  studentModal.classList.remove("open");
  studentModal.setAttribute("aria-hidden", "true");
  studentForm.reset();
  uploadedImage = "";
  profilePreview.removeAttribute("src");
  profilePreview.style.display = "none";
}

function showToast(message) {
  successToast.textContent = message;
  successToast.classList.add("show");
  window.setTimeout(() => successToast.classList.remove("show"), 2400);
}

function validateRequired(form) {
  const missing = [...form.querySelectorAll("[required]")].some((field) => !field.value.trim());
  if (missing) return "Please complete all required fields.";

  const from = $("#fromDate");
  const to = $("#toDate");
  if (form.id === "leaveForm" && from.value && to.value && new Date(to.value) < new Date(from.value)) {
    return "To Date must be the same as or later than From Date.";
  }

  return "";
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

const leaveFormModal = $("#leaveFormModal");
const openLeaveRegisterBtn = $("#openLeaveRegisterBtn");

function openLeaveModal() {
  if (currentStudent) {
    $("#leaveName").value = currentStudent.name || "";
    $("#leaveRegNo").value = currentStudent.id || "";
    $("#leaveDept").value = currentStudent.dept || "";
    $("#leaveYear").value = currentStudent.year || "";
  }
  leaveFormModal.classList.add("open");
  leaveFormModal.setAttribute("aria-hidden", "false");
}

function closeLeaveModal() {
  leaveFormModal.classList.remove("open");
  leaveFormModal.setAttribute("aria-hidden", "true");
  $("#leaveForm").reset();
  $("#leaveError").textContent = "";
}

$$(".nav-item").forEach((item) => {
  item.addEventListener("click", () => showPage(item.dataset.page, item));
});

$$("[data-open-student]").forEach((button) => button.addEventListener("click", openStudentModal));
$$(".close-modal").forEach((button) => button.addEventListener("click", closeStudentModal));

studentModal.addEventListener("click", (event) => {
  if (event.target === studentModal) closeStudentModal();
});

if (openLeaveRegisterBtn) {
  openLeaveRegisterBtn.addEventListener("click", openLeaveModal);
}

$$(".close-leave-modal").forEach((button) => {
  button.addEventListener("click", closeLeaveModal);
});

leaveFormModal.addEventListener("click", (event) => {
  if (event.target === leaveFormModal) closeLeaveModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (studentModal.classList.contains("open")) closeStudentModal();
    if (leaveFormModal.classList.contains("open")) closeLeaveModal();
    if (leaveSuccessPopup.classList.contains("open")) closeLeaveSuccess();
    if (paymentDetailPage.classList.contains("open")) closePaymentDetail();
    if (paymentSuccessPage.classList.contains("open")) closePaymentSuccess();
  }
});

studentSearch.addEventListener("input", renderStudents);
studentFilter.addEventListener("change", renderStudents);

profileUpload.addEventListener("change", () => {
  const file = profileUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage = reader.result;
    profilePreview.src = uploadedImage;
    profilePreview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = validateRequired(studentForm);
  if (message) {
    studentError.textContent = message;
    return;
  }

  students.unshift({
    id: $("#studentId").value.trim(),
    name: $("#studentName").value.trim(),
    dept: $("#studentDept").value,
    year: $("#studentYear").value,
    category: $("#studentCategory").value,
    image: uploadedImage
  });

  renderStudents();
  closeStudentModal();
  showToast("Student saved successfully");
});

function openPaymentBox() {
  // paymentDetailPage.classList.add("open");
  // paymentDetailPage.setAttribute("aria-hidden", "false");
  
  // Set default payment method
  $$('input[name="paymentMethod"]').forEach((input, index) => {
    if (index === 0) input.checked = true;
  });
}

function closePaymentDetail() {
  // paymentDetailPage.classList.remove("open");
  // paymentDetailPage.setAttribute("aria-hidden", "true");
}

function closePaymentSuccess() {
  // paymentSuccessPage.classList.remove("open");
  // paymentSuccessPage.setAttribute("aria-hidden", "true");
}

// Fee Categories Data
const feeCategories = {
  semester: {
    name: "Semester Fee",
    total: 45500,
    paid: 28000,
    pending: 17500,
    dueDate: "30 Jun 2026",
    description: "Regular semester tuition and academic fees",
    details: {
      "Tuition Fee": 25000,
      "Lab Fee": 8000,
      "Registration Fee": 5000,
      "Misc Charges": 7500
    }
  },
  transport: {
    name: "Transport Fee",
    total: 12000,
    paid: 0,
    pending: 12000,
    dueDate: "30 Jun 2026",
    description: "Bus route and transportation charges",
    busRoute: "Route #12 (North)",
    details: {
      "Monthly Pass": 12000
    }
  },
  examination: {
    name: "Examination Fee",
    total: 8000,
    paid: 0,
    pending: 8000,
    dueDate: "15 Jun 2026",
    description: "Regular semester exam registration fees",
    examType: "Regular",
    details: {
      "Exam Registration": 8000
    }
  }
};

// Payment modal management
const paymentModal = $("#paymentModal");
const paymentSuccessModal = $("#paymentSuccessModal");
let currentFeeType = null;
let currentPaymentAmount = null;

function openPaymentModal(feeType, amount) {
  currentFeeType = feeType;
  currentPaymentAmount = amount;
  
  const feeInfo = feeCategories[feeType];
  
  // Update modal with student and payment info
  $("#modalStudentName").textContent = currentStudent.name;
  $("#modalStudentReg").textContent = currentStudent.id;
  $("#modalFeeType").textContent = feeInfo.name;
  $("#modalAmount").textContent = `₹${amount.toLocaleString("en-IN")}`;
  
  // Reset payment method selection
  $$('input[name="paymentMethod"]').forEach((input, index) => {
    input.checked = index === 0;
  });
  
  paymentModal.classList.add("open");
  paymentModal.setAttribute("aria-hidden", "false");
  
  // Focus on modal
  setTimeout(() => {
    paymentModal.querySelector(".modal-header h2").focus();
  }, 200);
}

function closePaymentModal() {
  paymentModal.classList.remove("open");
  paymentModal.setAttribute("aria-hidden", "true");
  currentFeeType = null;
  currentPaymentAmount = null;
}

function closePaymentSuccessModal() {
  paymentSuccessModal.classList.remove("open");
  paymentSuccessModal.setAttribute("aria-hidden", "true");
}

// Event Listeners for Pay Now Buttons
$$(".pay-now-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const feeType = btn.dataset.feeType;
    const amount = parseInt(btn.dataset.amount);
    openPaymentModal(feeType, amount);
  });
});

// Modal Close Buttons
$("#closePaymentModal").addEventListener("click", closePaymentModal);
$("#cancelPaymentBtn").addEventListener("click", closePaymentModal);
$("#backToFeesBtn").addEventListener("click", closePaymentSuccessModal);

paymentModal.addEventListener("click", (event) => {
  if (event.target === paymentModal) closePaymentModal();
});

paymentSuccessModal.addEventListener("click", (event) => {
  if (event.target === paymentSuccessModal) closePaymentSuccessModal();
});

// Confirm Payment Button
$("#confirmPaymentBtn").addEventListener("click", () => {
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
  
  if (!selectedMethod) {
    alert("Please select a payment method");
    return;
  }
  
  const btn = $("#confirmPaymentBtn");
  btn.disabled = true;
  btn.textContent = "Processing...";
  
  // Simulate payment processing
  setTimeout(() => {
    const transactionId = `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const feeInfo = feeCategories[currentFeeType];
    const now = new Date();
    const dateTime = now.toLocaleDateString("en-IN") + ", " + now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    
    // Update success modal
    $("#successTransactionId").textContent = transactionId;
    $("#successAmount").textContent = `₹${currentPaymentAmount.toLocaleString("en-IN")}`;
    $("#successFeeType").textContent = feeInfo.name;
    $("#successMethod").textContent = selectedMethod.value.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
    $("#successDateTime").textContent = dateTime;
    
    // Add to payment history
    const receiptId = `RCPT-${Math.floor(3000 + Math.random() * 900)}`;
    const paymentDate = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const methodTag = selectedMethod.value.charAt(0).toUpperCase() + selectedMethod.value.slice(1);
    
    const historyRow = `
      <tr>
        <td><strong>${receiptId}</strong></td>
        <td>${feeInfo.name}</td>
        <td>₹${currentPaymentAmount.toLocaleString("en-IN")}</td>
        <td>${paymentDate}</td>
        <td><span class="payment-method-tag">${methodTag}</span></td>
        <td><button class="download-receipt-btn" type="button" title="Download receipt">📥</button></td>
      </tr>
    `;
    
    $("#paymentHistoryRows").insertAdjacentHTML("afterbegin", historyRow);
    
    // Close payment modal and show success
    closePaymentModal();
    btn.disabled = false;
    btn.textContent = "Confirm Payment";
    
    paymentSuccessModal.classList.add("open");
    paymentSuccessModal.setAttribute("aria-hidden", "false");
    
    showToast("Payment successful!");
  }, 2000);
});

// Download receipt
$("#downloadReceiptBtn").addEventListener("click", () => {
  const transactionId = $("#successTransactionId").textContent;
  const studentName = $("#modalStudentName").textContent;
  const studentId = $("#modalStudentReg").textContent;
  const amount = $("#successAmount").textContent;
  const feeType = $("#successFeeType").textContent;
  const dateTime = $("#successDateTime").textContent;
  const method = $("#successMethod").textContent;
  
  let receiptContent = `
KAMP COLLEGE OF ENGINEERING AND TECHNOLOGY
================================================

PAYMENT RECEIPT

Receipt ID: ${transactionId}
Date & Time: ${dateTime}

Student Details:
Name: ${studentName}
Register Number: ${studentId}

Payment Details:
Fee Type: ${feeType}
Amount Paid: ${amount}
Payment Method: ${method}
Payment Status: PAID

Thank you for your payment!
================================================
  `;
  
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(receiptContent));
  element.setAttribute("download", `receipt_${transactionId}.txt`);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  
  showToast("Receipt downloaded!");
});

// Add event listeners to download buttons in history table
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("download-receipt-btn")) {
    showToast("Receipt downloaded!");
  }
});

const openPaymentBoxBtn = $("#openPaymentBox");
if (openPaymentBoxBtn) {
  openPaymentBoxBtn.addEventListener("click", () => {
    // This is the old "Pay Fees" button - we can remove this if needed
    // openPaymentDetail("4"); // Default to Semester 4
  });
}

const closePaymentDetailBtn = $("#closePaymentDetail");
if (closePaymentDetailBtn) {
  closePaymentDetailBtn.addEventListener("click", closePaymentDetail);
}
if (paymentDetailPage) {
  paymentDetailPage.addEventListener("click", (event) => {
    if (event.target === paymentDetailPage) closePaymentDetail();
  });
}

if (paymentSuccessPage) {
  paymentSuccessPage.addEventListener("click", (event) => {
    if (event.target === paymentSuccessPage) closePaymentSuccess();
  });
}

// Payment method selection
$$(".payment-method-card").forEach((card) => {
  card.addEventListener("click", () => {
    $$(".payment-method-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    const input = card.querySelector("input");
    if (input) input.checked = true;
  });
});

// Process payment (old function - keeping for compatibility)
if ($("#processPaymentBtn")) {
  $("#processPaymentBtn").addEventListener("click", () => {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    const paymentBtn = $("#processPaymentBtn");
    const spinner = $("#paymentSpinner");
    const processing = $("#paymentProcessing");

    paymentBtn.disabled = true;
    spinner.style.display = "inline-block";
    processing.style.display = "grid";

    setTimeout(() => {
      const transactionId = `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      const amount = parseInt($("#paymentTotalAmount").textContent.replace(/[^0-9]/g, ""));
      const now = new Date();
      const dateTime = now.toLocaleDateString("en-IN") + ", " + now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });

      if ($("#transactionId")) $("#transactionId").textContent = transactionId;
      if ($("#successAmountPaid")) $("#successAmountPaid").textContent = `₹${amount.toLocaleString("en-IN")}`;
      if ($("#successDateTime")) $("#successDateTime").textContent = dateTime;
      if ($("#successPaymentMethod")) $("#successPaymentMethod").textContent = selectedMethod.value.toUpperCase().replace(/(\w)/, (g) => g.toUpperCase());

      closePaymentDetail();
      paymentBtn.disabled = false;
      spinner.style.display = "none";
      processing.style.display = "none";

      if (paymentSuccessPage) {
        paymentSuccessPage.classList.add("open");
        paymentSuccessPage.setAttribute("aria-hidden", "false");
      }

      showToast("Payment successful!");
    }, 2000);
  });
}

// Download receipt (old function - keeping for compatibility)
if ($("#downloadReceiptBtn")) {
  const existingListener = $("#downloadReceiptBtn").onclick;
  if (!existingListener) {
    $("#downloadReceiptBtn").addEventListener("click", () => {
      const transactionId = $("#transactionId")?.textContent || "TXN-0000000000";
      const studentName = $("#paymentStudentName")?.textContent || "Student";
      const studentId = $("#paymentStudentId")?.textContent || "ID";
      const amount = $("#successAmountPaid")?.textContent || "₹0";
      const dateTime = $("#successDateTime")?.textContent || "N/A";

      let receiptContent = `
KAMP COLLEGE OF ENGINEERING AND TECHNOLOGY
=====================================

PAYMENT RECEIPT

Receipt ID: ${transactionId}
Date & Time: ${dateTime}

Student Details:
Name: ${studentName}
Student ID: ${studentId}

Payment Details:
Amount Paid: ${amount}
Payment Status: PAID

Thank you for your payment!
      `;

      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(receiptContent));
      element.setAttribute("download", `receipt_${transactionId}.txt`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      showToast("Receipt downloaded!");
    });
  }
}

$("#leaveForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const errorNode = $("#leaveError");
  const message = validateRequired(form);

  if (message) {
    errorNode.textContent = message;
    return;
  }

  const leaveType = $("#leaveType").value;
  const from = $("#fromDate").value;
  const to = $("#toDate").value;
  const leaveId = `LV-${Math.floor(1100 + Math.random() * 800)}`;

  $("#leaveRows").insertAdjacentHTML(
    "afterbegin",
    `
      <tr>
        <td>${leaveId}</td>
        <td>${leaveType}</td>
        <td>${formatDate(from)}</td>
        <td>${formatDate(to)}</td>
        <td><span class="status-pill partial">Pending</span></td>
      </tr>
    `
  );

  closeLeaveModal();
  showToast("Leave Application Submitted Successfully");
});

function closeLeaveSuccess() {
  leaveSuccessPopup.classList.remove("open");
  leaveSuccessPopup.setAttribute("aria-hidden", "true");
}

$("#closeLeaveSuccess").addEventListener("click", closeLeaveSuccess);
leaveSuccessPopup.addEventListener("click", (event) => {
  if (event.target === leaveSuccessPopup) closeLeaveSuccess();
});

// Dark Mode Toggle via moon icon button in header
const darkModeToggle = $("#darkModeToggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    // Update aria-label for accessibility
    darkModeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  });
}

renderStudents();
