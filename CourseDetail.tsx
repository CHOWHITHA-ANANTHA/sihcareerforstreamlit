import { useState, useEffect } from 'react';
import { User, Course } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { colleges, scholarships } from './mockData';
import { 
  ArrowLeft, 
  Heart, 
  EyeOff, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Users,
  Award,
  Building,
  Star,
  MapPin,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CourseDetailProps {
  course: Course;
  user: User;
  onNavigate: (page: string, data?: any) => void;
}

export function CourseDetail({ course, user, onNavigate }: CourseDetailProps) {
  const [likedItems, setLikedItems] = useState({
    courses: [] as string[],
    colleges: [] as string[],
    scholarships: [] as string[]
  });

  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes_${user.name}`);
    if (savedLikes) {
      setLikedItems(JSON.parse(savedLikes));
    }
  }, [user.name]);

  const toggleLike = (type: 'courses' | 'colleges' | 'scholarships', id: string) => {
    const newLikes = { ...likedItems };
    if (newLikes[type].includes(id)) {
      newLikes[type] = newLikes[type].filter(item => item !== id);
      toast.success(`Removed from liked ${type}`);
    } else {
      newLikes[type].push(id);
      toast.success(`Added to liked ${type}`);
    }
    setLikedItems(newLikes);
    localStorage.setItem(`likes_${user.name}`, JSON.stringify(newLikes));
  };

  const getPersonalizedMessage = () => {
    const genderMessages = {
      female: `Great choice! Women are excelling in ${course.category} and bringing innovative perspectives to the field.`,
      male: `Excellent direction! ${course.category} offers tremendous growth opportunities and career satisfaction.`
    };

    const categoryMessages = {
      sc: 'You can benefit from SC category reservations in premier institutions and specialized scholarships.',
      st: 'ST category reservations and tribal area development programs can support your journey.',
      obc: 'OBC reservations and non-creamy layer benefits can enhance your admission prospects.',
      ews: 'EWS category benefits and income-based scholarships can make this education affordable.',
      general: 'Focus on merit-based selections and competitive exam preparation for the best opportunities.'
    };

    return `${genderMessages[user.gender as keyof typeof genderMessages]} ${categoryMessages[user.caste as keyof typeof categoryMessages]}`;
  };

  const relevantColleges = colleges.filter(college => 
    college.courses.includes(course.id)
  );

  const relevantScholarships = scholarships.filter(scholarship => {
    const isGenderMatch = scholarship.targetGroups.includes('all') || 
                         scholarship.targetGroups.includes(user.gender);
    const isCasteMatch = scholarship.targetGroups.includes('all') || 
                        scholarship.targetGroups.includes(user.caste);
    return isGenderMatch && isCasteMatch;
  }).slice(0, 4);

  const isCourseLiked = likedItems.courses.includes(course.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="hover:bg-amber-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl text-gray-800">Course Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={isCourseLiked ? "default" : "outline"}
              size="sm"
              onClick={() => toggleLike('courses', course.id)}
              className={isCourseLiked ? "bg-red-500 hover:bg-red-600" : "border-amber-200 hover:bg-amber-50"}
            >
              <Heart className={`w-4 h-4 mr-2 ${isCourseLiked ? 'fill-current' : ''}`} />
              {isCourseLiked ? 'Liked' : 'Like'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Course Overview */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl mb-2">{course.name}</h2>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 mb-4">
                  {course.category}
                </Badge>
                <p className="text-amber-100 mb-4">{course.description}</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-amber-100">{getPersonalizedMessage()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Course Details */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Clock className="w-5 h-5 text-amber-600" />
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl text-amber-600">{course.duration}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <BookOpen className="w-5 h-5 text-amber-600" />
                Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{course.eligibility}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Users className="w-5 h-5 text-amber-600" />
                Streams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {course.streams.map((stream) => (
                  <Badge key={stream} variant="outline" className="border-amber-300 text-amber-700">
                    {stream}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Prospects */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              Career Prospects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.careerProspects.map((career, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <Star className="w-4 h-4 text-amber-600" />
                  <span className="text-gray-700">{career}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Colleges Offering This Course */}
        {relevantColleges.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-gray-800 flex items-center gap-2">
                <Building className="w-6 h-6 text-amber-600" />
                Colleges Offering This Course
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {relevantColleges.map((college) => {
                const isCollegeLiked = likedItems.colleges.includes(college.id);
                return (
                  <Card key={college.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-800">{college.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                              {college.type}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">Rank #{college.ranking}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike('colleges', college.id)}
                          className={isCollegeLiked ? "text-red-500" : "text-gray-400"}
                        >
                          <Heart className={`w-4 h-4 ${isCollegeLiked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{college.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <span>{college.fees}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Admission:</strong> {college.admissionProcess}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => onNavigate('college-detail', { college })}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        View College Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Relevant Scholarships */}
        {relevantScholarships.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-gray-800 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-600" />
                Scholarships for You
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {relevantScholarships.map((scholarship) => {
                const isScholarshipLiked = likedItems.scholarships.includes(scholarship.id);
                return (
                  <Card key={scholarship.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-800">{scholarship.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="border-amber-300 text-amber-700">
                              {scholarship.category}
                            </Badge>
                            {scholarship.targetGroups.includes(user.gender) && (
                              <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                                For {user.gender}
                              </Badge>
                            )}
                            {scholarship.targetGroups.includes(user.caste) && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {user.caste.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike('scholarships', scholarship.id)}
                          className={isScholarshipLiked ? "text-red-500" : "text-gray-400"}
                        >
                          <Heart className={`w-4 h-4 ${isScholarshipLiked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">By: {scholarship.provider}</p>
                        <p className="font-medium text-green-600">{scholarship.amount}</p>
                        <p className="text-xs text-gray-500">Deadline: {scholarship.applicationDeadline}</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => onNavigate('scholarship-detail', { scholarship })}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        View Scholarship Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}