import { useState, useEffect } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { courses, colleges, scholarships } from './mockData';
import { 
  Heart, 
  Search, 
  Brain, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  LogOut, 
  User as UserIcon,
  MapPin,
  Settings,
  Star
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DashboardProps {
  user: User;
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

export function Dashboard({ user, onNavigate, onLogout }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
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

  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    return `${timeGreeting}, ${user.name}!`;
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Every expert was once a beginner. Keep going! 🌟",
      "Your dreams are valid. Work towards them every day! 💪",
      "Success is not final, failure is not fatal. Keep learning! 📚",
      "Believe in yourself and take the next step! ✨",
      "Your future starts with the choices you make today! 🚀"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredScholarships = scholarships.filter(scholarship => 
    scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const likedCourses = courses.filter(course => likedItems.courses.includes(course.id));
  const likedColleges = colleges.filter(college => likedItems.colleges.includes(college.id));
  const likedScholarships = scholarships.filter(scholarship => likedItems.scholarships.includes(scholarship.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl text-gray-800">Career Guide</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <UserIcon className="w-4 h-4" />
              <span>{user.name}</span>
              <span>•</span>
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onLogout}
              className="border-amber-200 hover:bg-amber-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-2">{getPersonalizedGreeting()}</h2>
              <p className="text-amber-100 mb-4">{getMotivationalMessage()}</p>
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => onNavigate('career-guidance')}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Career Guidance
                </Button>
                <Button 
                  onClick={() => onNavigate('quiz')}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
                <Button 
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                  onClick={() => toast.success("Profile editing coming soon!")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/50 border border-amber-200">
            <TabsTrigger value="search" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Search className="w-4 h-4 mr-2" />
              Search & Explore
            </TabsTrigger>
            <TabsTrigger value="liked" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Liked Items
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search courses, colleges, scholarships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
            </div>

            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="mb-6 bg-white/50 border border-amber-200">
                <TabsTrigger value="courses">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Courses ({filteredCourses.length})
                </TabsTrigger>
                <TabsTrigger value="colleges">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Colleges ({filteredColleges.length})
                </TabsTrigger>
                <TabsTrigger value="scholarships">
                  <Trophy className="w-4 h-4 mr-2" />
                  Scholarships ({filteredScholarships.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="courses">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-gray-800">{course.name}</CardTitle>
                            <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-800">
                              {course.category}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button 
                            size="sm" 
                            onClick={() => onNavigate('course-detail', { course })}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                          >
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="colleges">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredColleges.map((college) => (
                    <Card key={college.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-800">{college.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                            {college.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">Rank #{college.ranking}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-2">📍 {college.location}</p>
                        <p className="text-gray-600 text-sm mb-4">💰 {college.fees}</p>
                        <Button 
                          size="sm" 
                          onClick={() => onNavigate('college-detail', { college })}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="scholarships">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredScholarships.map((scholarship) => (
                    <Card key={scholarship.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-800">{scholarship.name}</CardTitle>
                        <Badge variant="outline" className="border-amber-300 text-amber-700 w-fit">
                          {scholarship.category}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-2">By: {scholarship.provider}</p>
                        <p className="font-medium text-green-600 mb-2">{scholarship.amount}</p>
                        <p className="text-xs text-gray-500 mb-4">Deadline: {scholarship.applicationDeadline}</p>
                        <Button 
                          size="sm" 
                          onClick={() => onNavigate('scholarship-detail', { scholarship })}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="liked" className="mt-6">
            {likedCourses.length === 0 && likedColleges.length === 0 && likedScholarships.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg text-gray-600 mb-2">No liked items yet</h3>
                  <p className="text-gray-500 mb-4">Start exploring and save your favorite courses, colleges, and scholarships!</p>
                  <Button onClick={() => onNavigate('career-guidance')} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    Explore Now
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {likedCourses.length > 0 && (
                  <div>
                    <h3 className="text-lg text-gray-800 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Liked Courses ({likedCourses.length})
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {likedCourses.map((course) => (
                        <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-amber-200">
                          <CardHeader>
                            <CardTitle className="text-lg text-gray-800">{course.name}</CardTitle>
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800 w-fit">
                              {course.category}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <Button 
                              size="sm" 
                              onClick={() => onNavigate('course-detail', { course })}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {likedColleges.length > 0 && (
                  <div>
                    <h3 className="text-lg text-gray-800 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Liked Colleges ({likedColleges.length})
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {likedColleges.map((college) => (
                        <Card key={college.id} className="bg-white/80 backdrop-blur-sm border-amber-200">
                          <CardHeader>
                            <CardTitle className="text-lg text-gray-800">{college.name}</CardTitle>
                            <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                              {college.type}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <Button 
                              size="sm" 
                              onClick={() => onNavigate('college-detail', { college })}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {likedScholarships.length > 0 && (
                  <div>
                    <h3 className="text-lg text-gray-800 mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Liked Scholarships ({likedScholarships.length})
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {likedScholarships.map((scholarship) => (
                        <Card key={scholarship.id} className="bg-white/80 backdrop-blur-sm border-amber-200">
                          <CardHeader>
                            <CardTitle className="text-lg text-gray-800">{scholarship.name}</CardTitle>
                            <Badge variant="outline" className="border-amber-300 text-amber-700 w-fit">
                              {scholarship.category}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <Button 
                              size="sm" 
                              onClick={() => onNavigate('scholarship-detail', { scholarship })}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}