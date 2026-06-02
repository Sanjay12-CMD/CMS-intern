export const hostelModules = [
  {
    id: "students",
    title: "Student Registration",
    description: "Manage student hostel profiles, admission details, guardians, and room-ready records.",
    actions: ["Add Student", "View Student Details", "Edit Student Information", "Delete Student Record", "Search Student"],
  },
  {
    id: "rooms",
    title: "Room Allocation",
    description: "Allocate, change, vacate, and audit every room with live occupancy visibility.",
    actions: ["Allocate Room", "Change Room", "Vacate Room", "Room Availability", "Occupancy Status"],
  },
  {
    id: "fees",
    title: "Fees Management",
    description: "Handle hostel fee collection, due tracking, payment history, and receipts.",
    actions: ["Hostel Fee Collection", "Due Fees Tracking", "Payment History", "Receipt Generation"],
  },
  {
    id: "attendance",
    title: "Attendance Management",
    description: "Capture daily attendance and review student presence reports with percentages.",
    actions: ["Daily Attendance", "Student Presence Report", "Attendance Percentage"],
  },
  {
    id: "leave",
    title: "Leave Management",
    description: "Process leave requests, approvals, rejections, and complete leave history.",
    actions: ["Leave Request Form", "Approve / Reject Leave", "Leave History"],
  },
  {
    id: "complaints",
    title: "Complaints Management",
    description: "Register complaints, track service ownership, and update resolution statuses.",
    actions: ["Register Complaint", "Complaint Tracking", "Status Updates"],
  },
  {
    id: "visitors",
    title: "Visitor Management",
    description: "Manage visitor entry, pass approval, identity checks, and exit logs.",
    actions: ["Visitor Entry", "Visitor Pass", "Visitor Approval"],
  },
  {
    id: "mess",
    title: "Mess Management",
    description: "Plan daily menus, meal attendance, feedback, and nutrition information.",
    actions: ["Daily Menu", "Meal Attendance", "Food Feedback", "Nutrition Information"],
  },
  {
    id: "facilities",
    title: "Hostel Facilities",
    description: "Monitor study room, laundry, Wi-Fi, gym, security, and medical support services.",
    actions: ["Study Room", "Laundry", "Wi-Fi", "Gym", "Security", "Medical Support"],
  },
];

export const statisticsCards = [
  { id: "students", label: "Total Students", value: "1,248", trend: "+8.4% this term", icon: "users" },
  { id: "rooms", label: "Occupied Rooms", value: "326", trend: "91% occupancy", icon: "bed" },
  { id: "fees", label: "Pending Fees", value: "Rs. 2.8L", trend: "42 dues", icon: "wallet" },
  { id: "complaints", label: "Active Complaints", value: "18", trend: "-12% this week", icon: "alert" },
];

export const studentsData = [
  { id: "HS-1001", name: "Aarav Sharma", course: "B.Tech CSE", room: "A-204", guardian: "Ramesh Sharma", status: "Active" },
  { id: "HS-1002", name: "Meera Iyer", course: "B.E ECE", room: "B-118", guardian: "Kavita Iyer", status: "Active" },
  { id: "HS-1003", name: "Nisha Verma", course: "B.Tech IT", room: "C-302", guardian: "Arun Verma", status: "Pending" },
  { id: "HS-1004", name: "Rahul Nair", course: "B.E Mechanical", room: "A-111", guardian: "Deepa Nair", status: "Active" },
  { id: "HS-1005", name: "Farhan Ali", course: "B.Tech AI&DS", room: "D-021", guardian: "Sameer Ali", status: "Active" },
];

export const roomsData = [
  { block: "A Block", room: "A-204", type: "Triple Sharing", capacity: 3, occupied: 3, status: "Full" },
  { block: "B Block", room: "B-118", type: "Double Sharing", capacity: 2, occupied: 1, status: "Available" },
  { block: "C Block", room: "C-302", type: "Single", capacity: 1, occupied: 1, status: "Full" },
  { block: "D Block", room: "D-021", type: "Triple Sharing", capacity: 3, occupied: 2, status: "Available" },
];

export const feesData = [
  { receipt: "RC-5412", student: "Aarav Sharma", amount: "Rs. 45,000", dueDate: "05 Jun 2026", status: "Paid" },
  { receipt: "RC-5413", student: "Meera Iyer", amount: "Rs. 42,000", dueDate: "09 Jun 2026", status: "Pending" },
  { receipt: "RC-5414", student: "Nisha Verma", amount: "Rs. 48,500", dueDate: "12 Jun 2026", status: "Overdue" },
  { receipt: "RC-5415", student: "Rahul Nair", amount: "Rs. 40,000", dueDate: "16 Jun 2026", status: "Paid" },
];

export const attendanceData = [
  { date: "01 Jun 2026", present: 1192, absent: 56, percentage: "95.5%" },
  { date: "31 May 2026", present: 1204, absent: 44, percentage: "96.4%" },
  { date: "30 May 2026", present: 1176, absent: 72, percentage: "94.2%" },
  { date: "29 May 2026", present: 1188, absent: 60, percentage: "95.1%" },
];

export const leaveData = [
  { id: "LV-201", student: "Meera Iyer", type: "Medical", from: "03 Jun", to: "05 Jun", status: "Pending" },
  { id: "LV-202", student: "Rahul Nair", type: "Home Visit", from: "06 Jun", to: "08 Jun", status: "Approved" },
  { id: "LV-203", student: "Nisha Verma", type: "Event", from: "02 Jun", to: "02 Jun", status: "Rejected" },
  { id: "LV-204", student: "Aarav Sharma", type: "Personal", from: "10 Jun", to: "12 Jun", status: "Pending" },
];

export const complaintsData = [
  { ticket: "CP-901", category: "Wi-Fi", raisedBy: "Aarav Sharma", priority: "High", status: "In Progress" },
  { ticket: "CP-902", category: "Laundry", raisedBy: "Meera Iyer", priority: "Medium", status: "Open" },
  { ticket: "CP-903", category: "Electrical", raisedBy: "Rahul Nair", priority: "High", status: "Resolved" },
  { ticket: "CP-904", category: "Room Service", raisedBy: "Nisha Verma", priority: "Low", status: "Open" },
];

export const visitorsData = [
  { pass: "VP-311", visitor: "Ramesh Sharma", student: "Aarav Sharma", time: "10:15 AM", status: "Approved" },
  { pass: "VP-312", visitor: "Kavita Iyer", student: "Meera Iyer", time: "11:40 AM", status: "Waiting" },
  { pass: "VP-313", visitor: "Arun Verma", student: "Nisha Verma", time: "01:25 PM", status: "Exited" },
  { pass: "VP-314", visitor: "Deepa Nair", student: "Rahul Nair", time: "03:05 PM", status: "Approved" },
];

export const messMenu = [
  { meal: "Breakfast", menu: "Idli, sambar, fruit bowl", attendance: "1,028 served", nutrition: "Balanced carbs and protein" },
  { meal: "Lunch", menu: "Rice, dal, paneer curry, salad", attendance: "1,144 served", nutrition: "High protein vegetarian meal" },
  { meal: "Snacks", menu: "Tea, poha, sprouts", attendance: "862 served", nutrition: "Light evening energy" },
  { meal: "Dinner", menu: "Chapati, veg pulao, curd", attendance: "1,096 planned", nutrition: "Comfort meal with probiotics" },
];

export const facilitiesData = [
  {
    name: "Study Room",
    icon: "study",
    status: "Available",
    availability: "38 seats free",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    description: "Quiet reading spaces designed for focused preparation, group study, and late-evening academic work.",
  },
  {
    name: "Laundry",
    icon: "laundry",
    status: "Available",
    availability: "Slots open",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=900&q=80",
    description: "Scheduled laundry support with organized pickup, washing, drying, and delivery tracking.",
  },
  {
    name: "Wi-Fi",
    icon: "wifi",
    status: "Online",
    availability: "98% uptime",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    description: "High-speed internet coverage for academic research, online classes, and digital services.",
  },
  {
    name: "Gym",
    icon: "gym",
    status: "Open",
    availability: "6 AM - 9 PM",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    description: "Fitness area with cardio equipment, strength training zones, and monitored student access.",
  },
  {
    name: "Security",
    icon: "security",
    status: "Active",
    availability: "Live watch",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80",
    description: "Round-the-clock guard supervision, CCTV monitoring, visitor control, and emergency response support.",
  },
  {
    name: "Medical Support",
    icon: "medical",
    status: "Available",
    availability: "On-call support",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
    description: "First-aid access, medical assistance coordination, emergency contacts, and wellness support.",
  },
];

export const occupancyStats = [
  { label: "Total Rooms", value: "358" },
  { label: "Available Beds", value: "74" },
  { label: "Maintenance Rooms", value: "12" },
];

export const paymentStats = [
  { label: "Collected", value: "Rs. 54.2L" },
  { label: "Pending", value: "Rs. 2.8L" },
  { label: "Overdue", value: "Rs. 86K" },
];

export const attendanceStats = [
  { label: "Today Present", value: "1,192" },
  { label: "Today Absent", value: "56" },
  { label: "Monthly Average", value: "95.3%" },
];
