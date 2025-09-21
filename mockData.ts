import { Course, College, Scholarship } from '../App';

export const courses: Course[] = [
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

export const colleges: College[] = [
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

export const scholarships: Scholarship[] = [
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

export const classLevels = [
  { id: '10th', name: 'Class 10th', description: 'Choose your stream for 11th & 12th' },
  { id: '12th-science', name: 'Class 12th - Science', description: 'Physics, Chemistry, Mathematics/Biology' },
  { id: '12th-commerce', name: 'Class 12th - Commerce', description: 'Accountancy, Business Studies, Economics' },
  { id: '12th-arts', name: 'Class 12th - Arts', description: 'History, Geography, Political Science, Psychology' },
  { id: 'graduate', name: 'Graduate', description: 'Completed Bachelor\'s degree' },
  { id: 'postgraduate', name: 'Post Graduate', description: 'Completed Master\'s degree' }
];