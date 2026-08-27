export type JobStatus =
  | "new"
  | "accepted"
  | "en_route"
  | "arrived"
  | "start_pending"
  | "active"
  | "completion_pending"
  | "completed"
  | "rejected";

export const STATUS_LABEL: Record<JobStatus, string> = {
  new: "New Request",
  accepted: "Accepted",
  en_route: "En Route",
  arrived: "Arrived",
  start_pending: "Start Verification Pending",
  active: "Active",
  completion_pending: "Completion Pending",
  completed: "Completed",
  rejected: "Rejected",
};

export type Job = {
  id: string;
  service: string;
  category: string;
  customer: string;
  area: string;
  address: string;
  city: string;
  distanceKm: number;
  when: string;
  durationMins: number;
  earnings: number;
  description: string;
  instructions: string;
  tasks: string[];
  payment: string;
};

export const JOBS: Job[] = [
  {
    id: "JOB-4821",
    service: "Electrical Repair",
    category: "Electrical",
    customer: "Rohan Deshmukh",
    area: "Kothrud",
    address: "Flat 402, Shreeji Residency, Paud Road, Kothrud",
    city: "Pune, Maharashtra",
    distanceKm: 2.4,
    when: "Today, 3:00 PM",
    durationMins: 90,
    earnings: 850,
    description:
      "Two ceiling fan regulators are not working and the bedroom MCB trips frequently. Requires inspection of the main distribution board.",
    instructions: "Please ring the bell twice. Society entry requires ID at the main gate.",
    tasks: ["Inspect distribution board", "Replace 2 fan regulators", "Test all bedroom points"],
    payment: "UPI after completion • Apna Gig protected",
  },
  {
    id: "JOB-4822",
    service: "Deep Home Cleaning",
    category: "Cleaning",
    customer: "Sneha Iyer",
    area: "Baner",
    address: "B-14, Silver Oak Society, Baner Road",
    city: "Pune, Maharashtra",
    distanceKm: 4.1,
    when: "Today, 5:30 PM",
    durationMins: 180,
    earnings: 1250,
    description: "2BHK deep cleaning including kitchen degreasing and bathroom scrubbing.",
    instructions: "Please carry your own cleaning machine. Water and power available.",
    tasks: ["Kitchen degreasing", "2 bathrooms deep scrub", "Floor and window cleaning"],
    payment: "Cash or UPI • Apna Gig protected",
  },
  {
    id: "JOB-4823",
    service: "Tap & Pipe Fitting",
    category: "Plumbing",
    customer: "Imran Shaikh",
    area: "Viman Nagar",
    address: "Row House 7, Clover Park, Viman Nagar",
    city: "Pune, Maharashtra",
    distanceKm: 6.8,
    when: "Tomorrow, 10:00 AM",
    durationMins: 60,
    earnings: 540,
    description: "Kitchen sink tap leaking and washbasin drain pipe needs replacement.",
    instructions: "Parking available inside the society.",
    tasks: ["Replace kitchen tap", "Fix washbasin drain", "Leak test"],
    payment: "UPI after completion • Apna Gig protected",
  },
  {
    id: "JOB-4824",
    service: "AC Servicing",
    category: "Appliance Repair",
    customer: "Meera Kulkarni",
    area: "Wakad",
    address: "A-901, Pristine Prolife, Wakad",
    city: "Pune, Maharashtra",
    distanceKm: 8.2,
    when: "Tomorrow, 12:30 PM",
    durationMins: 75,
    earnings: 720,
    description: "Split AC not cooling properly, needs jet service and gas pressure check.",
    instructions: "Lift access available till 9th floor.",
    tasks: ["Jet service indoor unit", "Clean outdoor unit", "Gas pressure check"],
    payment: "UPI after completion • Apna Gig protected",
  },
  {
    id: "JOB-4825",
    service: "Wall Painting",
    category: "Painting",
    customer: "Ajay Pawar",
    area: "Hadapsar",
    address: "Shop 3, Magarpatta Link Road, Hadapsar",
    city: "Pune, Maharashtra",
    distanceKm: 11.5,
    when: "Sat, 9:00 AM",
    durationMins: 300,
    earnings: 2100,
    description: "Single room repainting, 2 coats emulsion. Material provided by customer.",
    instructions: "Shutter opens at 8:45 AM.",
    tasks: ["Surface putty touch-up", "Primer coat", "2 coats emulsion"],
    payment: "50% advance • Apna Gig protected",
  },
];

export const CATEGORIES = [
  "All",
  "Electrical",
  "Plumbing",
  "Cleaning",
  "Appliance Repair",
  "Painting",
];

export const DEMAND = [
  { name: "Home Cleaning", jobs: 42, trend: 18, level: "High" },
  { name: "Plumbing", jobs: 31, trend: 12, level: "High" },
  { name: "Electrical Services", jobs: 27, trend: 9, level: "Medium" },
  { name: "Appliance Repair", jobs: 19, trend: -4, level: "Medium" },
  { name: "Painting", jobs: 11, trend: 24, level: "Seasonal" },
];

export const MONTHLY_DEMAND = [
  { month: "Apr", value: 48 },
  { month: "May", value: 62 },
  { month: "Jun", value: 55 },
  { month: "Jul", value: 71 },
  { month: "Aug", value: 84 },
];

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
