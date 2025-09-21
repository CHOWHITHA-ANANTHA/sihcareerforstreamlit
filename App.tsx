import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { CareerGuidance } from './components/CareerGuidance';
import { Quiz } from './components/Quiz';
import { CourseDetail } from './components/CourseDetail';
import { CollegeDetail } from './components/CollegeDetail';
import { ScholarshipDetail } from './components/ScholarshipDetail';
import { ClassDetail } from './components/ClassDetail';
import { Toaster } from './components/ui/sonner';

export type User = {
  name: string;
  location: string;
  gender: string;
  caste: string;
};

export type Course = {
  id: string;
  name: string;
  description: string;
  duration: string;
  eligibility: string;
  careerProspects: string[];
  streams: string[];
  category: string;
};

export type College = {
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private';
  courses: string[];
  ranking: number;
  fees: string;
  admissionProcess: string;
  scholarships: string[];
};

export type Scholarship = {
  id: string;
  name: string;
  provider: string;
  amount: string;
  eligibility: string[];
  applicationDeadline: string;
  category: string;
  targetGroups: string[];
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [quizResults, setQuizResults] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('login');
  };

  const navigate = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) {
      if (data.course) setSelectedCourse(data.course);
      if (data.college) setSelectedCollege(data.college);
      if (data.scholarship) setSelectedScholarship(data.scholarship);
      if (data.class) setSelectedClass(data.class);
      if (data.quizResults) setQuizResults(data.quizResults);
    }
  };

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Toaster />
      {currentPage === 'dashboard' && (
        <Dashboard 
          user={user} 
          onNavigate={navigate} 
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'career-guidance' && (
        <CareerGuidance 
          user={user} 
          onNavigate={navigate}
        />
      )}
      {currentPage === 'class-detail' && (
        <ClassDetail
          user={user}
          classLevel={selectedClass}
          onNavigate={navigate}
        />
      )}
      {currentPage === 'quiz' && (
        <Quiz 
          user={user} 
          onNavigate={navigate}
          classLevel={selectedClass}
        />
      )}
      {currentPage === 'course-detail' && selectedCourse && (
        <CourseDetail 
          course={selectedCourse}
          user={user}
          onNavigate={navigate}
        />
      )}
      {currentPage === 'college-detail' && selectedCollege && (
        <CollegeDetail 
          college={selectedCollege}
          user={user}
          onNavigate={navigate}
        />
      )}
      {currentPage === 'scholarship-detail' && selectedScholarship && (
        <ScholarshipDetail 
          scholarship={selectedScholarship}
          user={user}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}