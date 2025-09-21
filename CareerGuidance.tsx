import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { classLevels } from './mockData';
import { 
  ArrowLeft, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award, 
  Brain,
  ChevronRight
} from 'lucide-react';

interface CareerGuidanceProps {
  user: User;
  onNavigate: (page: string, data?: any) => void;
}

export function CareerGuidance({ user, onNavigate }: CareerGuidanceProps) {
  const getPersonalizedMessage = (classLevel: any) => {
    const messages = {
      female: "💪 Women are leading in every field today! You have unlimited potential.",
      sc: "🎯 Special provisions and scholarships are available to support your journey.",
      st: "🌟 Your unique perspective and heritage are valuable assets in any career.",
      obc: "📈 Enhanced opportunities and reservations can accelerate your success.",
      ews: "💡 Merit-based scholarships and fee waivers can make quality education accessible."
    };

    const userMessages = [];
    if (user.gender === 'female') userMessages.push(messages.female);
    if (user.caste !== 'general') userMessages.push(messages[user.caste as keyof typeof messages]);
    
    return userMessages.length > 0 ? userMessages[0] : "🚀 The future belongs to those who prepare for it today!";
  };

  const getStreamBenefits = (stream: string) => {
    const benefits = {
      'Science': [
        'Access to prestigious engineering and medical colleges',
        'High-paying technical careers',
        'Innovation and research opportunities',
        'Global career prospects'
      ],
      'Commerce': [
        'Strong foundation in business and finance',
        'Entrepreneurship opportunities',
        'Management and leadership roles',
        'Financial planning expertise'
      ],
      'Arts': [
        'Creative and analytical thinking development',
        'Social sciences and humanities expertise',
        'Civil services and administrative roles',
        'Media, journalism, and communication careers'
      ]
    };
    return benefits[stream as keyof typeof benefits] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl text-gray-800">Career Guidance</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Motivational Header */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl mb-2">Your Career Journey Starts Here, {user.name}!</h2>
            <p className="text-amber-100 mb-4">{getPersonalizedMessage(classLevels[0])}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Personalized for {user.gender} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{user.caste.toUpperCase()} category benefits available</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Selection */}
        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Choose Your Current Level
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classLevels.map((level) => (
              <Card 
                key={level.id} 
                className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-all cursor-pointer group hover:border-amber-300"
                onClick={() => onNavigate('class-detail', { class: level.id })}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-800 group-hover:text-amber-700 transition-colors">
                      {level.name}
                    </CardTitle>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{level.description}</p>
                  
                  {/* Show stream benefits for 12th class cards */}
                  {level.id.includes('12th') && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Key Benefits:</h4>
                      {getStreamBenefits(level.id.includes('science') ? 'Science' : 
                                       level.id.includes('commerce') ? 'Commerce' : 'Arts').slice(0, 2).map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                          <TrendingUp className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                      Explore Paths
                    </Badge>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-600" />
                Discover Your Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Take our AI-powered personality and interest assessment to discover careers that match your strengths and passions.
              </p>
              <Button 
                onClick={() => onNavigate('quiz')}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Brain className="w-4 h-4 mr-2" />
                Take Interest Quiz
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                Scholarships for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Explore scholarships specifically available for {user.gender} students from {user.caste.toUpperCase()} category in {user.location}.
              </p>
              <Button 
                onClick={() => onNavigate('dashboard')}
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Award className="w-4 h-4 mr-2" />
                View Scholarships
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}