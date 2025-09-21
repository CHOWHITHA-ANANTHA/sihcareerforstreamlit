// Mock data for the application
const COURSES = [
  {
    id: 'engineering-computer',
    name: 'Computer Science Engineering',
    description: 'Study of computer systems, programming, and software development',
    duration: '4 years',
    eligibility: '12th with Physics, Chemistry, Mathematics (PCM)',
    careerProspects: ['Software Developer', 'Data Scientist', 'AI/ML Engineer', 'Cybersecurity Specialist', 'Product Manager'],
    streams: ['Science'],
    category: 'Engineering'
  },
  {
    id: 'medicine-mbbs',
    name: 'Bachelor of Medicine (MBBS)',
    description: 'Comprehensive medical education leading to medical practice',
    duration: '5.5 years',
    eligibility: '12th with Physics, Chemistry, Biology (PCB)',
    careerProspects: ['Doctor', 'Surgeon', 'Medical Researcher', 'Public Health Official', 'Medical Consultant'],
    streams: ['Science'],
    category: 'Medical'
  },
  {
    id: 'commerce-ca',
    name: 'Chartered Accountancy (CA)',
    description: 'Professional accounting and financial management course',
    duration: '4-5 years',
    eligibility: '12th with any stream',
    careerProspects: ['Chartered Accountant', 'Financial Advisor', 'Tax Consultant', 'Auditor', 'Finance Manager'],
    streams: ['Commerce', 'Science', 'Arts'],
    category: 'Finance'
  },
  {
    id: 'arts-psychology',
    name: 'Bachelor of Arts in Psychology',
    description: 'Study of human behavior and mental processes',
    duration: '3 years',
    eligibility: '12th with any stream',
    careerProspects: ['Psychologist', 'Counselor', 'HR Specialist', 'Research Analyst', 'Social Worker'],
    streams: ['Arts', 'Science', 'Commerce'],
    category: 'Social Sciences'
  },
  {
    id: 'law-llb',
    name: 'Bachelor of Law (LLB)',
    description: 'Study of legal principles and judicial processes',
    duration: '3-5 years',
    eligibility: '12th with any stream or Graduation',
    careerProspects: ['Lawyer', 'Judge', 'Legal Advisor', 'Corporate Counsel', 'Legal Journalist'],
    streams: ['Arts', 'Science', 'Commerce'],
    category: 'Law'
  },
  {
    id: 'design-nid',
    name: 'Design Programs',
    description: 'Creative design education in various disciplines',
    duration: '4 years',
    eligibility: '12th with any stream',
    careerProspects: ['Product Designer', 'UI/UX Designer', 'Graphic Designer', 'Fashion Designer', 'Industrial Designer'],
    streams: ['Arts', 'Science', 'Commerce'],
    category: 'Design'
  }
];

const COLLEGES = [
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi',
    type: 'Government',
    courses: ['engineering-computer', 'design-nid'],
    ranking: 1,
    fees: '₹2.5 lakhs/year',
    admissionProcess: 'JEE Advanced',
    scholarships: ['merit-scholarship', 'sc-st-scholarship', 'ews-scholarship']
  },
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences Delhi',
    location: 'New Delhi',
    type: 'Government',
    courses: ['medicine-mbbs'],
    ranking: 1,
    fees: '₹1.5 lakhs/year',
    admissionProcess: 'NEET',
    scholarships: ['merit-scholarship', 'sc-st-scholarship', 'girl-child-scholarship']
  },
  {
    id: 'du',
    name: 'University of Delhi',
    location: 'New Delhi',
    type: 'Government',
    courses: ['arts-psychology', 'commerce-ca'],
    ranking: 5,
    fees: '₹50,000/year',
    admissionProcess: 'CUET',
    scholarships: ['merit-scholarship', 'minority-scholarship', 'obc-scholarship']
  },
  {
    id: 'nlsiu',
    name: 'National Law School of India University',
    location: 'Bangalore',
    type: 'Government',
    courses: ['law-llb'],
    ranking: 1,
    fees: '₹3 lakhs/year',
    admissionProcess: 'CLAT',
    scholarships: ['merit-scholarship', 'need-based-scholarship']
  }
];

const SCHOLARSHIPS = [
  {
    id: 'merit-scholarship',
    name: 'National Merit Scholarship',
    provider: 'Government of India',
    amount: '₹12,000/year',
    eligibility: ['Top 10% in 12th boards', 'Family income < ₹6 lakhs'],
    applicationDeadline: '31st October 2025',
    category: 'Merit-based',
    targetGroups: ['all']
  },
  {
    id: 'sc-st-scholarship',
    name: 'Post Matric Scholarship for SC/ST',
    provider: 'Ministry of Social Justice',
    amount: '₹2-5 lakhs/year',
    eligibility: ['SC/ST category', 'Family income < ₹2.5 lakhs'],
    applicationDeadline: '30th November 2025',
    category: 'Category-based',
    targetGroups: ['sc', 'st']
  },
  {
    id: 'obc-scholarship',
    name: 'Post Matric Scholarship for OBC',
    provider: 'Ministry of Social Justice',
    amount: '₹1-3 lakhs/year',
    eligibility: ['OBC category', 'Family income < ₹8 lakhs'],
    applicationDeadline: '30th November 2025',
    category: 'Category-based',
    targetGroups: ['obc']
  },
  {
    id: 'girl-child-scholarship',
    name: 'Pragati Scholarship for Girls',
    provider: 'AICTE',
    amount: '₹50,000/year',
    eligibility: ['Female students', 'Technical courses', 'Family income < ₹8 lakhs'],
    applicationDeadline: '15th December 2025',
    category: 'Gender-based',
    targetGroups: ['female']
  },
  {
    id: 'ews-scholarship',
    name: 'EWS Merit Scholarship',
    provider: 'Government of India',
    amount: '₹20,000/year',
    eligibility: ['EWS category', 'Merit-based selection'],
    applicationDeadline: '31st October 2025',
    category: 'Category-based',
    targetGroups: ['ews']
  },
  {
    id: 'minority-scholarship',
    name: 'Merit-cum-Means Scholarship for Minorities',
    provider: 'Ministry of Minority Affairs',
    amount: '₹20,000/year',
    eligibility: ['Minority community', 'Family income < ₹2.5 lakhs'],
    applicationDeadline: '30th September 2025',
    category: 'Community-based',
    targetGroups: ['minority']
  },
  {
    id: 'need-based-scholarship',
    name: 'Need-Based Financial Aid',
    provider: 'Various Institutions',
    amount: '₹10,000-1 lakh/year',
    eligibility: ['Financial need demonstration', 'Academic merit'],
    applicationDeadline: 'Institution specific',
    category: 'Need-based',
    targetGroups: ['all']
  }
];

const CLASS_LEVELS = [
  { id: '10th', name: 'Class 10th', description: 'Choose your stream for 11th & 12th' },
  { id: '12th-science', name: 'Class 12th - Science', description: 'Physics, Chemistry, Mathematics/Biology' },
  { id: '12th-commerce', name: 'Class 12th - Commerce', description: 'Accountancy, Business Studies, Economics' },
  { id: '12th-arts', name: 'Class 12th - Arts', description: 'History, Geography, Political Science, Psychology' },
  { id: 'graduate', name: 'Graduate', description: 'Completed Bachelor\'s degree' },
  { id: 'postgraduate', name: 'Post Graduate', description: 'Completed Master\'s degree' }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What type of activities do you enjoy most?",
    options: [
      { value: "analytical", text: "Solving complex problems and analyzing data", weight: { science: 3, commerce: 2, arts: 1 } },
      { value: "creative", text: "Creating, designing, or artistic expression", weight: { science: 1, commerce: 1, arts: 3 } },
      { value: "social", text: "Working with people and helping others", weight: { science: 1, commerce: 2, arts: 3 } },
      { value: "business", text: "Managing projects and leading teams", weight: { science: 2, commerce: 3, arts: 2 } }
    ]
  },
  {
    id: 2,
    question: "In school, which subjects interest you most?",
    options: [
      { value: "math_science", text: "Mathematics and Science", weight: { science: 3, commerce: 2, arts: 1 } },
      { value: "languages", text: "Languages and Literature", weight: { science: 1, commerce: 1, arts: 3 } },
      { value: "social_studies", text: "History and Social Studies", weight: { science: 1, commerce: 2, arts: 3 } },
      { value: "economics", text: "Economics and Business Studies", weight: { science: 1, commerce: 3, arts: 2 } }
    ]
  },
  {
    id: 3,
    question: "What motivates you most in your career choice?",
    options: [
      { value: "innovation", text: "Creating new technologies or solutions", weight: { science: 3, commerce: 1, arts: 2 } },
      { value: "financial", text: "Financial stability and growth", weight: { science: 2, commerce: 3, arts: 1 } },
      { value: "impact", text: "Making a positive impact on society", weight: { science: 2, commerce: 1, arts: 3 } },
      { value: "recognition", text: "Recognition and professional status", weight: { science: 2, commerce: 2, arts: 2 } }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to work?",
    options: [
      { value: "independent", text: "Independently with minimal supervision", weight: { science: 3, commerce: 2, arts: 2 } },
      { value: "team", text: "In collaborative teams", weight: { science: 2, commerce: 3, arts: 2 } },
      { value: "leadership", text: "Leading and managing others", weight: { science: 1, commerce: 3, arts: 2 } },
      { value: "mentorship", text: "Teaching and mentoring others", weight: { science: 2, commerce: 1, arts: 3 } }
    ]
  },
  {
    id: 5,
    question: "What type of environment energizes you?",
    options: [
      { value: "laboratory", text: "Research labs or technical facilities", weight: { science: 3, commerce: 1, arts: 1 } },
      { value: "office", text: "Corporate offices and meeting rooms", weight: { science: 1, commerce: 3, arts: 1 } },
      { value: "community", text: "Community centers and public spaces", weight: { science: 1, commerce: 1, arts: 3 } },
      { value: "varied", text: "Varied environments with travel", weight: { science: 2, commerce: 2, arts: 2 } }
    ]
  },
  {
    id: 6,
    question: "Which career outcome appeals to you most?",
    options: [
      { value: "research", text: "Contributing to scientific research", weight: { science: 3, commerce: 1, arts: 2 } },
      { value: "entrepreneurship", text: "Starting your own business", weight: { science: 2, commerce: 3, arts: 1 } },
      { value: "public_service", text: "Serving the public and community", weight: { science: 1, commerce: 2, arts: 3 } },
      { value: "global_impact", text: "Working on global challenges", weight: { science: 2, commerce: 2, arts: 2 } }
    ]
  }
];

// Helper functions to get data
function getCourseById(id) {
  return COURSES.find(course => course.id === id);
}

function getCollegeById(id) {
  return COLLEGES.find(college => college.id === id);
}

function getScholarshipById(id) {
  return SCHOLARSHIPS.find(scholarship => scholarship.id === id);
}

function filterCourses(query) {
  if (!query) return COURSES;
  return COURSES.filter(course => 
    course.name.toLowerCase().includes(query.toLowerCase()) ||
    course.description.toLowerCase().includes(query.toLowerCase())
  );
}

function filterColleges(query) {
  if (!query) return COLLEGES;
  return COLLEGES.filter(college => 
    college.name.toLowerCase().includes(query.toLowerCase()) ||
    college.location.toLowerCase().includes(query.toLowerCase())
  );
}

function filterScholarships(query) {
  if (!query) return SCHOLARSHIPS;
  return SCHOLARSHIPS.filter(scholarship => 
    scholarship.name.toLowerCase().includes(query.toLowerCase()) ||
    scholarship.provider.toLowerCase().includes(query.toLowerCase())
  );
}