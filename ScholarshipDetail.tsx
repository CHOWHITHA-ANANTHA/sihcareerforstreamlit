import { useState, useEffect } from 'react';
import { User, Scholarship } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  Heart, 
  Award, 
  Calendar, 
  DollarSign, 
  Users,
  CheckCircle,
  Clock,
  Building,
  AlertTriangle,
  FileText,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ScholarshipDetailProps {
  scholarship: Scholarship;
  user: User;
  onNavigate: (page: string, data?: any) => void;
}

export function ScholarshipDetail({ scholarship, user, onNavigate }: ScholarshipDetailProps) {
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

  const toggleLike = () => {
    const newLikes = { ...likedItems };
    if (newLikes.scholarships.includes(scholarship.id)) {
      newLikes.scholarships = newLikes.scholarships.filter(item => item !== scholarship.id);
      toast.success('Removed from liked scholarships');
    } else {
      newLikes.scholarships.push(scholarship.id);
      toast.success('Added to liked scholarships');
    }
    setLikedItems(newLikes);
    localStorage.setItem(`likes_${user.name}`, JSON.stringify(newLikes));
  };

  const getEligibilityStatus = () => {
    const matches = [];
    const issues = [];

    // Check gender eligibility
    if (scholarship.targetGroups.includes('all') || scholarship.targetGroups.includes(user.gender)) {
      matches.push(`✓ Gender: ${user.gender} students eligible`);
    } else if (scholarship.targetGroups.includes('female') && user.gender !== 'female') {
      issues.push('✗ This scholarship is specifically for female students');
    }

    // Check category eligibility
    if (scholarship.targetGroups.includes('all') || scholarship.targetGroups.includes(user.caste)) {
      matches.push(`✓ Category: ${user.caste.toUpperCase()} students eligible`);
    } else {
      const requiredCategories = scholarship.targetGroups.filter(group => 
        ['sc', 'st', 'obc', 'ews', 'minority'].includes(group)
      );
      if (requiredCategories.length > 0) {
        issues.push(`✗ This scholarship is for ${requiredCategories.join(', ').toUpperCase()} category students only`);
      }
    }

    return { matches, issues };
  };

  const getPersonalizedMessage = () => {
    const eligibilityStatus = getEligibilityStatus();
    
    if (eligibilityStatus.issues.length === 0) {
      return `Great news! You meet the basic eligibility criteria for this scholarship. Make sure to check additional requirements like income limits and academic performance.`;
    } else {
      return `This scholarship has specific eligibility requirements that may not match your profile. However, explore similar scholarships that might be available for your category.`;
    }
  };

  const getApplicationTips = () => {
    const tips = [
      "Gather all required documents in advance",
      "Fill out the application form carefully and completely",
      "Submit before the deadline to avoid last-minute issues",
      "Keep copies of all submitted documents for your records"
    ];

    if (user.caste !== 'general') {
      tips.push("Ensure your caste certificate is valid and up to date");
    }

    if (user.gender === 'female') {
      tips.push("Look for additional women-specific scholarships you might be eligible for");
    }

    return tips;
  };

  const isScholarshipLiked = likedItems.scholarships.includes(scholarship.id);
  const eligibilityStatus = getEligibilityStatus();
  const isEligible = eligibilityStatus.issues.length === 0;

  // Calculate days until deadline
  const deadlineDate = new Date(scholarship.applicationDeadline);
  const today = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

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
            <h1 className="text-xl text-gray-800">Scholarship Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={isScholarshipLiked ? "default" : "outline"}
              size="sm"
              onClick={toggleLike}
              className={isScholarshipLiked ? "bg-red-500 hover:bg-red-600" : "border-amber-200 hover:bg-amber-50"}
            >
              <Heart className={`w-4 h-4 mr-2 ${isScholarshipLiked ? 'fill-current' : ''}`} />
              {isScholarshipLiked ? 'Liked' : 'Like'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Scholarship Overview */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl mb-2">{scholarship.name}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {scholarship.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span>{scholarship.provider}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-amber-100 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-xl">{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {scholarship.applicationDeadline}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-amber-100">{getPersonalizedMessage()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Deadline Alert */}
        <Alert className={`mb-8 ${daysUntilDeadline <= 30 ? 'border-orange-200 bg-orange-50' : 'border-blue-200 bg-blue-50'}`}>
          <AlertTriangle className={`w-4 h-4 ${daysUntilDeadline <= 30 ? 'text-orange-600' : 'text-blue-600'}`} />
          <AlertDescription className={daysUntilDeadline <= 30 ? 'text-orange-800' : 'text-blue-800'}>
            {daysUntilDeadline > 0 ? (
              <>
                <strong>Application deadline in {daysUntilDeadline} days</strong> - {scholarship.applicationDeadline}
                {daysUntilDeadline <= 30 && " Don't delay, start your application soon!"}
              </>
            ) : (
              <>
                <strong>Application deadline has passed</strong> - Look for similar scholarships with future deadlines
              </>
            )}
          </AlertDescription>
        </Alert>

        {/* Eligibility Status */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Users className="w-5 h-5 text-amber-600" />
              Your Eligibility Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Matching Criteria */}
              {eligibilityStatus.matches.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Matching Criteria
                  </h4>
                  <div className="space-y-2">
                    {eligibilityStatus.matches.map((match, index) => (
                      <p key={index} className="text-sm text-green-600">{match}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Issues */}
              {eligibilityStatus.issues.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Eligibility Issues
                  </h4>
                  <div className="space-y-2">
                    {eligibilityStatus.issues.map((issue, index) => (
                      <p key={index} className="text-sm text-red-600">{issue}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isEligible && (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>You appear to be eligible!</strong> Review the detailed requirements below and prepare your application.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Detailed Requirements */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <FileText className="w-5 h-5 text-amber-600" />
              Detailed Eligibility Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scholarship.eligibility.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-amber-800">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{requirement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Tips */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <CheckCircle className="w-5 h-5 text-amber-600" />
              Application Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {getApplicationTips().map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isEligible && daysUntilDeadline > 0 && (
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={() => toast.success("Application process will be available soon!")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Start Application
            </Button>
          )}
          
          <Button 
            size="lg"
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
            onClick={() => onNavigate('dashboard')}
          >
            <Award className="w-4 h-4 mr-2" />
            Find More Scholarships
          </Button>
        </div>
      </main>
    </div>
  );
}