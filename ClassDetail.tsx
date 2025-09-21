import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { courses, scholarships } from './mockData';
import { 
  ArrowLeft, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award, 
  Brain,
  ChevronRight,
  Star,
  Clock,
  Target,
  Lightbulb
} from 'lucide-react';

interface ClassDetailProps {
  user: User;
  classLevel: string;
  onNavigate: (page: string, data?: any) => void;
}

export function ClassDetail({ user, classLevel, onNavigate }: ClassDetailProps) {
  const getClassInfo = () => {
    const classMap = {
      '10th': {
        title: 'Class 10th - Stream Selection',
        description: 'Choose your path for 11th and 12th grade',
        nextSteps: ['Science Stream', 'Commerce Stream', 'Arts Stream'],
        benefits: [
          'Foundation for higher education',
          'Multiple career pathways',
          'Skill development opportunities',
          'Early career awareness'
        ]
      },
      '12th-science': {
        title: 'Class 12th - Science Stream',
        description: 'Physics, Chemistry, Mathematics/Biology',
        nextSteps: ['Engineering', 'Medical', 'Pure Sciences', 'Research'],
        benefits: [
          'Access to premier engineering colleges (IITs, NITs)',
          'Medical education opportunities (AIIMS, Medical Colleges)',
          'High-demand technical careers',
          'Innovation and research fields',
          'Global career opportunities'
        ]
      },
      '12th-commerce': {
        title: 'Class 12th - Commerce Stream',
        description: 'Accountancy, Business Studies, Economics',
        nextSteps: ['CA/CS/CMA', 'BBA/MBA', 'Economics', 'Banking & Finance'],
        benefits: [
          'Strong business and finance foundation',
          'Entrepreneurship opportunities',
          'Management career paths',
          'Banking and financial services',
          'Government services (IAS, IES)'
        ]
      },
      '12th-arts': {
        title: 'Class 12th - Arts Stream',
        description: 'History, Geography, Political Science, Psychology',
        nextSteps: ['Civil Services', 'Law', 'Journalism', 'Psychology'],
        benefits: [
          'Civil services preparation (IAS, IPS, IFS)',
          'Legal education and practice',
          'Media and communication careers',
          'Social work and development',
          'Creative and analytical thinking'
        ]
      },
      'graduate': {
        title: 'Graduate Level',
        description: 'Post Bachelor\'s degree opportunities',
        nextSteps: ['Master\'s Programs', 'Professional Courses', 'Jobs', 'Entrepreneurship'],
        benefits: [
          'Specialized master\'s programs',
          'Professional certifications',
          'Industry experience',
          'Leadership development',
          'Global opportunities'
        ]
      },
      'postgraduate': {
        title: 'Post Graduate Level',
        description: 'Advanced career and research opportunities',
        nextSteps: ['PhD/Research', 'Senior Roles', 'Teaching', 'Consulting'],
        benefits: [
          'Research and development roles',
          'Senior management positions',
          'Academic careers',
          'Consulting opportunities',
          'Industry expertise'
        ]
      }
    };
    return classMap[classLevel as keyof typeof classMap] || classMap['10th'];
  };

  const getPersonalizedMessage = () => {
    const baseMessages = {
      female: "💪 Women leaders are excelling in every field. Your potential is unlimited!",
      sc: "🎯 Special opportunities and scholarships await to support your ambitions.",
      st: "🌟 Your unique background is a strength that will enrich any field you choose.",
      obc: "📈 Enhanced opportunities through reservations can accelerate your success.",
      ews: "💡 Merit-based support and scholarships make quality education accessible."
    };

    if (user.gender === 'female' && user.caste !== 'general') {
      return `${baseMessages.female} Plus, ${baseMessages[user.caste as keyof typeof baseMessages]?.toLowerCase()}`;
    }
    
    return baseMessages[user.gender as keyof typeof baseMessages] || 
           baseMessages[user.caste as keyof typeof baseMessages] || 
           "🚀 Your journey to success starts with the right choices today!";
  };

  const getRelevantCourses = () => {
    const streamMap = {
      '12th-science': ['Science'],
      '12th-commerce': ['Commerce'],
      '12th-arts': ['Arts'],
      'graduate': ['Science', 'Commerce', 'Arts'],
      'postgraduate': ['Science', 'Commerce', 'Arts'],
      '10th': ['Science', 'Commerce', 'Arts']
    };
    
    const relevantStreams = streamMap[classLevel as keyof typeof streamMap] || [];
    return courses.filter(course => 
      course.streams.some(stream => relevantStreams.includes(stream))
    ).slice(0, 6);
  };

  const getRelevantScholarships = () => {
    return scholarships.filter(scholarship => {
      const isGenderMatch = scholarship.targetGroups.includes('all') || 
                           scholarship.targetGroups.includes(user.gender);
      const isCasteMatch = scholarship.targetGroups.includes('all') || 
                          scholarship.targetGroups.includes(user.caste);
      return isGenderMatch && isCasteMatch;
    }).slice(0, 4);
  };

  const classInfo = getClassInfo();
  const relevantCourses = getRelevantCourses();
  const relevantScholarships = getRelevantScholarships();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('career-guidance')}
            className="hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl text-gray-800">{classInfo.title}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Personalized Header */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl mb-2">{classInfo.title}</h2>
            <p className="text-amber-100 mb-4">{classInfo.description}</p>
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="text-amber-100">{getPersonalizedMessage()}</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Tailored for {user.gender} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{user.caste.toUpperCase()} category support</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-600" />
            Benefits of This Path
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classInfo.benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-600" />
                Discover Your Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Take our personalized quiz to find the best career paths based on your interests and aptitude.
              </p>
              <Button 
                onClick={() => onNavigate('quiz', { class: classLevel })}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Brain className="w-4 h-4 mr-2" />
                Take Career Quiz
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {classInfo.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => onNavigate('dashboard')}
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explore All Options
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Relevant Courses */}
        {relevantCourses.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              Recommended Courses for You
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantCourses.map((course) => (
                <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">{course.name}</CardTitle>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 w-fit">
                      {course.category}
                    </Badge>
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
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Relevant Scholarships */}
        {relevantScholarships.length > 0 && (
          <div>
            <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-600" />
              Scholarships Available for You
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relevantScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">{scholarship.name}</CardTitle>
                    <div className="flex items-center gap-2">
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
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}