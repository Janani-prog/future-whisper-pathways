
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '../types/user';
import { TrendingUp, Heart, DollarSign, Briefcase, Target, ChevronRight, Calendar, Trophy, Zap, Star, MapPin, Users } from 'lucide-react';

interface LifePathVisualizationProps {
  userProfile: UserProfile;
}

const LifePathVisualization: React.FC<LifePathVisualizationProps> = ({ userProfile }) => {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'balanced' | 'ambitious'>('balanced');
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<Set<number>>(new Set());

  const scenarios = {
    conservative: {
      name: 'Steady & Secure',
      description: 'Focus on stability and gradual growth',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      milestones: [
        { age: userProfile.age + 2, event: `Master your ${userProfile.currentCareer} skills`, category: 'career', icon: Briefcase },
        { age: userProfile.age + 4, event: 'Build substantial emergency fund', category: 'financial', icon: DollarSign },
        { age: userProfile.age + 6, event: 'Deepen existing relationships', category: 'personal', icon: Heart },
        { age: userProfile.age + 8, event: 'Achieve work-life balance', category: 'personal', icon: Target },
        { age: userProfile.age + 10, event: 'Secure comfortable retirement plan', category: 'financial', icon: Trophy },
      ]
    },
    balanced: {
      name: 'Growth & Balance',
      description: 'Pursue opportunities while maintaining stability',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      milestones: [
        { age: userProfile.age + 2, event: `Expand beyond ${userProfile.currentCareer}`, category: 'career', icon: TrendingUp },
        { age: userProfile.age + 3, event: 'Take strategic career leap', category: 'career', icon: Zap },
        { age: userProfile.age + 5, event: 'Build meaningful relationships', category: 'personal', icon: Users },
        { age: userProfile.age + 7, event: 'Diversify income streams', category: 'financial', icon: DollarSign },
        { age: userProfile.age + 10, event: 'Achieve leadership position', category: 'career', icon: Star },
      ]
    },
    ambitious: {
      name: 'Bold & Transformative',
      description: 'Take calculated risks for maximum growth',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      milestones: [
        { age: userProfile.age + 1, event: `Revolutionize ${userProfile.currentCareer} field`, category: 'career', icon: Zap },
        { age: userProfile.age + 3, event: 'Launch innovative venture', category: 'career', icon: Briefcase },
        { age: userProfile.age + 5, event: 'Build wealth through investments', category: 'financial', icon: TrendingUp },
        { age: userProfile.age + 7, event: 'Become industry thought leader', category: 'career', icon: Star },
        { age: userProfile.age + 10, event: 'Achieve financial independence', category: 'financial', icon: Trophy },
      ]
    }
  };

  const lifeAreas = [
    { 
      name: 'Career', 
      icon: Briefcase, 
      current: 60, 
      future: 85, 
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600',
      description: `Growing in ${userProfile.currentCareer}`
    },
    { 
      name: 'Relationships', 
      icon: Heart, 
      current: 70, 
      future: 90, 
      color: 'bg-red-500',
      gradient: 'from-red-400 to-red-600',
      description: `Currently ${userProfile.relationshipStatus}`
    },
    { 
      name: 'Health', 
      icon: Target, 
      current: 65, 
      future: 80, 
      color: 'bg-green-500',
      gradient: 'from-green-400 to-green-600',
      description: 'Physical and mental wellness'
    },
    { 
      name: 'Finances', 
      icon: DollarSign, 
      current: 45, 
      future: 85, 
      color: 'bg-yellow-500',
      gradient: 'from-yellow-400 to-yellow-600',
      description: 'Building wealth and security'
    },
    { 
      name: 'Personal Growth', 
      icon: TrendingUp, 
      current: 55, 
      future: 95, 
      color: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-600',
      description: 'Continuous learning and development'
    },
  ];

  const toggleMilestone = (index: number) => {
    const newCompleted = new Set(completedMilestones);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedMilestones(newCompleted);
  };

  const currentScenario = scenarios[selectedScenario];

  return (
    <div className="space-y-8">
      {/* Header with Personal Greeting */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Future Path, {userProfile.name}
        </h1>
        <p className="text-slate-600 text-lg">
          From {userProfile.location} • Age {userProfile.age} • {userProfile.currentCareer}
        </p>
      </div>

      {/* Scenario Selection */}
      <Card className="bg-white/95 backdrop-blur-lg border-slate-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-blue-600" />
            Choose Your Journey
          </CardTitle>
          <p className="text-slate-600">Each path is tailored to your current situation and goals</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <div
                key={key}
                onClick={() => setSelectedScenario(key as any)}
                className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedScenario === key
                    ? `bg-gradient-to-br ${scenario.color} text-white shadow-2xl`
                    : `${scenario.bgColor} ${scenario.borderColor} border-2 hover:shadow-lg`
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-bold text-lg ${selectedScenario === key ? 'text-white' : scenario.textColor}`}>
                    {scenario.name}
                  </h3>
                  {selectedScenario === key && (
                    <Star className="w-6 h-6 text-yellow-300 fill-current" />
                  )}
                </div>
                <p className={`text-sm ${selectedScenario === key ? 'text-white/90' : 'text-slate-600'}`}>
                  {scenario.description}
                </p>
                {selectedScenario === key && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Life Areas Progress */}
      <Card className="bg-white/95 backdrop-blur-lg border-slate-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
            Life Areas Growth Projection
          </CardTitle>
          <p className="text-slate-600">Your personalized growth trajectory across key life dimensions</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {lifeAreas.map((area, index) => {
              const Icon = area.icon;
              const isActive = activeArea === area.name;
              
              return (
                <div 
                  key={area.name} 
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    isActive ? 'bg-gradient-to-br ' + area.gradient + ' text-white shadow-lg transform scale-105' : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                  onMouseEnter={() => setActiveArea(area.name)}
                  onMouseLeave={() => setActiveArea(null)}
                >
                  <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    isActive ? 'bg-white/20' : area.color
                  }`}>
                    <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-white'}`} />
                  </div>
                  
                  <h3 className={`font-semibold text-center mb-2 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {area.name}
                  </h3>
                  
                  <p className={`text-xs text-center mb-4 ${isActive ? 'text-white/80' : 'text-slate-600'}`}>
                    {area.description}
                  </p>
                  
                  {/* Progress visualization */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className={isActive ? 'text-white/80' : 'text-slate-600'}>Now</span>
                      <span className={`font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>{area.current}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${isActive ? 'bg-white/20' : 'bg-slate-200'}`}>
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          isActive ? 'bg-white' : area.color
                        }`}
                        style={{ width: `${area.current}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className={isActive ? 'text-white/80' : 'text-slate-600'}>Future</span>
                      <span className={`font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>{area.future}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${isActive ? 'bg-white/20' : 'bg-slate-200'}`}>
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          isActive ? 'bg-white' : area.color
                        } opacity-70`}
                        style={{ width: `${area.future}%` }}
                      />
                    </div>
                    
                    <div className={`text-center text-xs font-medium ${isActive ? 'text-white' : 'text-green-600'}`}>
                      +{area.future - area.current}% growth
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Timeline */}
      <Card className="bg-white/95 backdrop-blur-lg border-slate-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-purple-600" />
            Your {currentScenario.name} Timeline
          </CardTitle>
          <p className="text-slate-600">Interactive milestones - click to mark as completed</p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-8 top-4 bottom-4 w-1 bg-gradient-to-b ${currentScenario.color} rounded-full`}></div>
            
            <div className="space-y-8">
              {currentScenario.milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isCompleted = completedMilestones.has(index);
                
                return (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-6 cursor-pointer transition-all duration-300 hover:transform hover:translate-x-2 ${
                      isCompleted ? 'opacity-75' : ''
                    }`}
                    onClick={() => toggleMilestone(index)}
                  >
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-500 shadow-lg' 
                        : `bg-gradient-to-r ${currentScenario.color} shadow-md hover:shadow-lg`
                    }`}>
                      {isCompleted ? (
                        <span className="text-white text-sm font-bold">✓</span>
                      ) : (
                        <Icon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {milestone.event}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span className={`text-sm font-bold px-3 py-1 rounded-full ${currentScenario.bgColor} ${currentScenario.textColor}`}>
                            Age {milestone.age}
                          </span>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isCompleted ? 'rotate-90 text-green-500' : 'text-slate-400'}`} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          milestone.category === 'career' ? 'bg-blue-100 text-blue-700' :
                          milestone.category === 'financial' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {milestone.category}
                        </span>
                        
                        <span className="text-xs text-slate-500">
                          {milestone.age - userProfile.age} years from now
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Your Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-blue-900">
                  Starting at age {userProfile.age} gives you {40 - userProfile.age}+ productive years
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-blue-900">
                  Experience in {userProfile.currentCareer} as foundation
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-blue-900">
                  {userProfile.location} location opportunities
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-orange-900 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Focus Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-orange-900">
                  Leverage {currentScenario.name.toLowerCase()} approach
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-orange-900">
                  Build on {userProfile.relationshipStatus.toLowerCase()} status
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-orange-900">
                  Continuous skill development priority
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LifePathVisualization;
