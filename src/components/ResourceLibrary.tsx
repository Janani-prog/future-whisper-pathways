
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Users, Target, Heart, Briefcase } from 'lucide-react';
import { UserProfile } from '../types/user';

interface ResourceLibraryProps {
  userProfile: UserProfile | null;
}

const ResourceLibrary = ({ userProfile }: ResourceLibraryProps) => {
  const resourceCategories = [
    {
      title: "Personal Development",
      icon: <Target className="w-5 h-5" />,
      resources: [
        { title: "The 7 Habits of Highly Effective People", type: "Book", description: "Transform your mindset and achieve lasting success" },
        { title: "Goal Setting Workshop", type: "Video", description: "Learn how to set and achieve meaningful goals" },
        { title: "Daily Reflection Journal", type: "Tool", description: "Track your progress and insights" }
      ]
    },
    {
      title: "Career Growth",
      icon: <Briefcase className="w-5 h-5" />,
      resources: [
        { title: "Career Transition Guide", type: "Article", description: "Navigate career changes with confidence" },
        { title: "Networking Strategies", type: "Video", description: "Build meaningful professional relationships" },
        { title: "Skills Assessment Tool", type: "Tool", description: "Identify your strengths and growth areas" }
      ]
    },
    {
      title: "Relationships & Social",
      icon: <Heart className="w-5 h-5" />,
      resources: [
        { title: "Communication Masterclass", type: "Course", description: "Improve your interpersonal skills" },
        { title: "Building Healthy Boundaries", type: "Article", description: "Learn to protect your energy and time" },
        { title: "Relationship Assessment", type: "Tool", description: "Evaluate your key relationships" }
      ]
    },
    {
      title: "Learning & Education",
      icon: <BookOpen className="w-5 h-5" />,
      resources: [
        { title: "Learning How to Learn", type: "Course", description: "Master effective learning techniques" },
        { title: "Critical Thinking Skills", type: "Book", description: "Enhance your decision-making abilities" },
        { title: "Study Planner", type: "Tool", description: "Organize your learning journey" }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video": return <Play className="w-4 h-4" />;
      case "Book": return <BookOpen className="w-4 h-4" />;
      case "Course": return <Users className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-lg text-gray-200">
          Discover curated resources to support your personal growth journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resourceCategories.map((category, index) => (
          <Card key={index} className="bg-white bg-opacity-20 border-white border-opacity-30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {category.icon}
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.resources.map((resource, resourceIndex) => (
                  <div key={resourceIndex} className="bg-white bg-opacity-10 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getTypeIcon(resource.type)}
                          <h4 className="font-medium text-white text-sm">{resource.title}</h4>
                          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-gray-300 text-xs">{resource.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30"
                    >
                      Access Resource
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-300 mb-4">
          Want personalized resource recommendations based on your goals?
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Get Personalized Recommendations
        </Button>
      </div>
    </div>
  );
};

export default ResourceLibrary;
