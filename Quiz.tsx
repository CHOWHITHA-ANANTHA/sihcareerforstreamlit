import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { courses } from './mockData';
import { 
  ArrowLeft, 
  Brain, 
  CheckCircle, 
  BookOpen,
  TrendingUp,
  Star,
  ChevronRight
} from 'lucide-react';

interface QuizProps {
  user: User;
  classLevel?: string;
  onNavigate: (page: string, data?: any) => void;
}

const quizQuestions = [
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

export function Quiz({ user, classLevel, onNavigate }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores = { science: 0, commerce: 0, arts: 0 };
    
    Object.entries(answers).forEach(([questionIndex, selectedValue]) => {
      const question = quizQuestions[parseInt(questionIndex)];
      const option = question.options.find(opt => opt.value === selectedValue);
      if (option) {
        scores.science += option.weight.science;
        scores.commerce += option.weight.commerce;
        scores.arts += option.weight.arts;
      }
    });

    const maxScore = Math.max(scores.science, scores.commerce, scores.arts);
    const primaryStream = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'science';
    
    const streamRecommendations = {
      science: {
        title: 'Science Stream',
        description: 'You show strong analytical and problem-solving abilities!',
        careers: ['Engineering', 'Medicine', 'Research', 'Technology', 'Data Science'],
        courses: courses.filter(c => c.streams.includes('Science')),
        color: 'from-blue-500 to-cyan-500'
      },
      commerce: {
        title: 'Commerce Stream', 
        description: 'You have excellent business acumen and leadership potential!',
        careers: ['Business Management', 'Finance', 'Accounting', 'Entrepreneurship', 'Economics'],
        courses: courses.filter(c => c.streams.includes('Commerce')),
        color: 'from-green-500 to-emerald-500'
      },
      arts: {
        title: 'Arts/Humanities Stream',
        description: 'You possess creative thinking and strong social awareness!',
        careers: ['Civil Services', 'Law', 'Psychology', 'Journalism', 'Social Work'],
        courses: courses.filter(c => c.streams.includes('Arts')),
        color: 'from-purple-500 to-pink-500'
      }
    };

    const recommendation = streamRecommendations[primaryStream as keyof typeof streamRecommendations];
    
    setResults({
      primaryStream,
      recommendation,
      scores,
      personalizedMessage: getPersonalizedMessage(recommendation.title)
    });
    
    setShowResults(true);
  };

  const getPersonalizedMessage = (streamTitle: string) => {
    const genderMessages = {
      female: `As a woman in ${streamTitle.toLowerCase()}, you're entering fields where female leadership is increasingly valued and sought after.`,
      male: `Your aptitude for ${streamTitle.toLowerCase()} aligns well with current industry demands and growth opportunities.`
    };

    const categoryMessages = {
      sc: 'Special reservations and scholarships in premier institutions will support your journey.',
      st: 'Dedicated support systems and quotas ensure excellent opportunities in top institutions.',
      obc: 'Enhanced opportunities through OBC reservations can accelerate your career growth.',
      ews: 'Economic support and merit-based scholarships make quality education accessible.',
      general: 'Merit-based opportunities and competitive exams will be your path to success.'
    };

    return `${genderMessages[user.gender as keyof typeof genderMessages]} ${categoryMessages[user.caste as keyof typeof categoryMessages]}`;
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="hover:bg-amber-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl text-gray-800">Quiz Results</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Results Header */}
          <Card className={`bg-gradient-to-r ${results.recommendation.color} text-white border-0 mb-8`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8" />
                <h2 className="text-2xl">Quiz Complete!</h2>
              </div>
              <h3 className="text-xl mb-2">Recommended: {results.recommendation.title}</h3>
              <p className="text-white/90 mb-4">{results.recommendation.description}</p>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-white/95">{results.personalizedMessage}</p>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                Your Aptitude Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(results.scores).map(([stream, score]) => (
                  <div key={stream} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="capitalize font-medium">{stream}</span>
                      <span className="text-sm text-gray-600">{score}/18</span>
                    </div>
                    <Progress value={(score as number / 18) * 100} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Suggestions */}
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-600" />
                Suggested Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.recommendation.careers.map((career: string, index: number) => (
                  <Badge key={index} variant="secondary" className="p-3 bg-amber-100 text-amber-800 justify-center">
                    {career}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <div className="mb-8">
            <h3 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              Recommended Courses for You
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.recommendation.courses.slice(0, 6).map((course: any) => (
                <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">{course.name}</CardTitle>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 w-fit">
                      {course.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    <Button 
                      size="sm" 
                      onClick={() => onNavigate('course-detail', { course })}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      Explore Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => onNavigate('dashboard')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              size="lg"
            >
              Continue Exploring
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate(classLevel ? 'class-detail' : 'dashboard', classLevel ? { class: classLevel } : undefined)}
            className="hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl text-gray-800">Career Interest Quiz</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-gray-800">Question {currentQuestion + 1} of {quizQuestions.length}</h2>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-600" />
              {quizQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={answers[currentQuestion] || ''} 
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {quizQuestions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="border-amber-200 hover:bg-amber-50"
          >
            Previous
          </Button>
          <Button 
            onClick={nextQuestion}
            disabled={!answers[currentQuestion]}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Motivational Box */}
        <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 mt-8">
          <CardContent className="p-4 text-center">
            <p className="text-amber-800 text-sm">
              💡 <strong>Remember, {user.name}:</strong> This quiz helps identify your interests, but every path can lead to success with dedication and the right support!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}