import { useState, useEffect } from 'react';
import { User, College } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { courses, scholarships } from './mockData';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  DollarSign, 
  Star, 
  Users,
  BookOpen,
  Award,
  Building,
  Clock,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CollegeDetailProps {
  college: College;
  user: User;
  onNavigate: (page: string, data?: any) => void;
}

export function CollegeDetail({ college, user, onNavigate }: CollegeDetailProps) {
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
    const typeMessages = {
      Government: "As a government institution, this college offers excellent value with subsidized fees and quality education backed by government standards.",
      Private: "This private institution provides modern facilities and industry-oriented programs with flexible learning approaches."
    };

    const locationMessage = college.location === user.location ? 
      " Being in your home state, you may also qualify for additional local scholarships and have lower accommodation costs." :
      " Though outside your state, this institution's reputation and opportunities may justify the additional investment.";

    const categoryMessage = user.caste !== 'general' ? 
      ` As a ${user.caste.toUpperCase()} category student, you can benefit from reserved seats and category-specific scholarships.` :
      " Focus on merit-based admissions and prepare thoroughly for competitive entrance exams.";

    return typeMessages[college.type] + locationMessage + categoryMessage;
  };

  const collegeCourses = courses.filter(course => 
    college.courses.includes(course.id)
  );

  const collegeScholarships = scholarships.filter(scholarship => 
    college.scholarships.includes(scholarship.id)
  );

  const additionalScholarships = scholarships.filter(scholarship => {
    if (college.scholarships.includes(scholarship.id)) return false;
    
    const isGenderMatch = scholarship.targetGroups.includes('all') || 
                         scholarship.targetGroups.includes(user.gender);
    const isCasteMatch = scholarship.targetGroups.includes('all') || 
                        scholarship.targetGroups.includes(user.caste);
    return isGenderMatch && isCasteMatch;
  }).slice(0, 3);

  const isCollegeLiked = likedItems.colleges.includes(college.id);

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
            <h1 className="text-xl text-gray-800">College Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={isCollegeLiked ? "default" : "outline"}
              size="sm"
              onClick={() => toggleLike('colleges', college.id)}
              className={isCollegeLiked ? "bg-red-500 hover:bg-red-600" : "border-amber-200 hover:bg-amber-50"}
            >
              <Heart className={`w-4 h-4 mr-2 ${isCollegeLiked ? 'fill-current' : ''}`} />
              {isCollegeLiked ? 'Liked' : 'Like'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* College Overview */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl mb-2">{college.name}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {college.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-300 fill-current" />
                    <span>Rank #{college.ranking}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-amber-100 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{college.fees}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-amber-100">{getPersonalizedMessage()}</p>
            </div>
          </CardContent>
        </Card>

        {/* College Information */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Building className="w-5 h-5 text-amber-600" />
                Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={college.type === 'Government' ? 'default' : 'secondary'} className="text-lg p-2">
                {college.type}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Star className="w-5 h-5 text-amber-600" />
                Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl text-amber-600">#{college.ranking}</p>
              <p className="text-sm text-gray-600">National Ranking</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Users className="w-5 h-5 text-amber-600" />
                Admission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{college.admissionProcess}</p>
            </CardContent>
          </Card>
        </div>

        {/* Courses Offered */}
        {collegeCourses.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              Courses Offered
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collegeCourses.map((course) => {
                const isCourseLiked = likedItems.courses.includes(course.id);
                return (
                  <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-800">{course.name}</CardTitle>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 mt-2 w-fit">
                            {course.category}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike('courses', course.id)}
                          className={isCourseLiked ? "text-red-500" : "text-gray-400"}
                        >
                          <Heart className={`w-4 h-4 ${isCourseLiked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => onNavigate('course-detail', { course })}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        >
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* College-Specific Scholarships */}
        {collegeScholarships.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-600" />
              Scholarships Available at This College
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {collegeScholarships.map((scholarship) => {
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
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Additional Scholarships */}
        {additionalScholarships.length > 0 && (
          <div>
            <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-600" />
              Other Scholarships You May Qualify For
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {additionalScholarships.map((scholarship) => {
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
                        Learn More
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