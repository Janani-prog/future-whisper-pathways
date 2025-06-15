
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserProfile } from '../types/user';
import { BookOpen, Video, Headphones, ExternalLink, Star } from 'lucide-react';

interface ResourceLibraryProps {
  userProfile: UserProfile | null;
}

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast' | 'book';
  category: string;
  rating: number;
  description: string;
  url: string;
  duration?: string;
}

const ResourceLibrary: React.FC<ResourceLibraryProps> = ({ userProfile }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'The Power of Now',
      type: 'book',
      category: 'mindfulness',
      rating: 4.8,
      description: 'A guide to spiritual enlightenment through present-moment awareness',
      url: '#',
    },
    {
      id: '2',
      title: 'How to Build Confidence',
      type: 'video',
      category: 'personal-growth',
      rating: 4.6,
      description: 'Practical strategies for building unshakeable confidence',
      url: '#',
      duration: '15 min',
    },
    {
      id: '3',
      title: 'Career Transition Success',
      type: 'podcast',
      category: 'career',
      rating: 4.7,
      description: 'Real stories and advice for making successful career changes',
      url: '#',
      duration: '45 min',
    },
    {
      id: '4',
      title: 'Building Meaningful Relationships',
      type: 'article',
      category: 'relationships',
      rating: 4.5,
      description: 'Science-backed strategies for deeper connections',
      url: '#',
      duration: '8 min read',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'personal-growth', name: 'Personal Growth' },
    { id: 'career', name: 'Career' },
    { id: 'relationships', name: 'Relationships' },
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'podcast': return <Headphones className="w-4 h-4" />;
      case 'article': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'podcast': return 'bg-green-100 text-green-800';
      case 'article': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="text-sm"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Personalized Recommendations */}
      {userProfile && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 text-sm mb-3">
              Based on your goals and interests, we recommend focusing on career development and personal growth resources.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Career Growth</Badge>
              <Badge variant="secondary">Leadership Skills</Badge>
              <Badge variant="secondary">Work-Life Balance</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="bg-white/95 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(resource.type)}>
                    {getTypeIcon(resource.type)}
                    <span className="ml-1 capitalize">{resource.type}</span>
                  </Badge>
                  {resource.duration && (
                    <span className="text-xs text-slate-500">{resource.duration}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-slate-700">{resource.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg text-slate-800">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm mb-4">{resource.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center space-x-2"
              >
                <span>Access Resource</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No resources found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ResourceLibrary;
