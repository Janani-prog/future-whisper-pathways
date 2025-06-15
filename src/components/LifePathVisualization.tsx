
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '../types/user';
import { TrendingUp, Heart, DollarSign, Briefcase, Target } from 'lucide-react';

interface LifePathVisualizationProps {
  userProfile: UserProfile;
}

const LifePathVisualization: React.FC<LifePathVisualizationProps> = ({ userProfile }) => {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'balanced' | 'ambitious'>('balanced');

  const scenarios = {
    conservative: {
      name: 'Steady & Secure',
      description: 'Focus on stability and gradual growth',
      color: 'from-blue-400 to-blue-600',
      milestones: [
        { age: userProfile.age + 2, event: 'Establish emergency fund', category: 'financial' },
        { age: userProfile.age + 4, event: 'Steady career progression', category: 'career' },
        { age: userProfile.age + 6, event: 'Strong relationships built', category: 'personal' },
        { age: userProfile.age + 8, event: 'Financial security achieved', category: 'financial' },
        { age: userProfile.age + 10, event: 'Balanced lifestyle mastered', category: 'personal' },
      ]
    },
    balanced: {
      name: 'Growth & Balance',
      description: 'Pursue opportunities while maintaining stability',
      color: 'from-green-400 to-green-600',
      milestones: [
        { age: userProfile.age + 2, event: 'Skill development & networking', category: 'career' },
        { age: userProfile.age + 3, event: 'First major career move', category: 'career' },
        { age: userProfile.age + 5, event: 'Significant relationship milestone', category: 'personal' },
        { age: userProfile.age + 7, event: 'Investment portfolio growing', category: 'financial' },
        { age: userProfile.age + 10, event: 'Leadership role achieved', category: 'career' },
      ]
    },
    ambitious: {
      name: 'Bold & Transformative',
      description: 'Take calculated risks for maximum growth',
      color: 'from-purple-400 to-purple-600',
      milestones: [
        { age: userProfile.age + 1, event: 'Major skill upgrade/education', category: 'career' },
        { age: userProfile.age + 3, event: 'Bold career pivot or startup', category: 'career' },
        { age: userProfile.age + 5, event: 'Significant income increase', category: 'financial' },
        { age: userProfile.age + 7, event: 'Industry recognition/expertise', category: 'career' },
        { age: userProfile.age + 10, event: 'Dream lifestyle achieved', category: 'personal' },
      ]
    }
  };

  const lifeAreas = [
    { name: 'Career', icon: Briefcase, current: 60, future: 85, color: 'bg-blue-500' },
    { name: 'Relationships', icon: Heart, current: 70, future: 90, color: 'bg-red-500' },
    { name: 'Health', icon: Target, current: 65, future: 80, color: 'bg-green-500' },
    { name: 'Finances', icon: DollarSign, current: 45, future: 85, color: 'bg-yellow-500' },
    { name: 'Personal Growth', icon: TrendingUp, current: 55, future: 95, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Scenario Selection */}
      <Card className="bg-white/95 backdrop-blur-lg border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900">Choose Your Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => setSelectedScenario(key as any)}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedScenario === key
                    ? `bg-gradient-to-r ${scenario.color} text-white shadow-lg`
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <h3 className="font-semibold mb-2">{scenario.name}</h3>
                <p className="text-sm opacity-90">{scenario.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Life Areas Progress */}
      <Card className="bg-white/95 backdrop-blur-lg border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900">Life Areas Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {lifeAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.name} className="text-center space-y-3">
                  <div className={`w-12 h-12 ${area.color} rounded-full mx-auto flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-slate-900 font-medium">{area.name}</h3>
                  
                  {/* Current vs Future Progress */}
                  <div className="space-y-2">
                    <div className="text-xs text-slate-600">Current: {area.current}%</div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`${area.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${area.current}%` }}
                      />
                    </div>
                    
                    <div className="text-xs text-slate-600">Future: {area.future}%</div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`${area.color} opacity-60 h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${area.future}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-white/95 backdrop-blur-lg border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900">Your {scenarios[selectedScenario].name} Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-500"></div>
            
            <div className="space-y-6">
              {scenarios[selectedScenario].milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full relative z-10 mt-1"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-slate-900 font-medium">{milestone.event}</h3>
                      <span className="text-blue-600 text-sm font-bold">Age {milestone.age}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        milestone.category === 'career' ? 'bg-blue-100 text-blue-700' :
                        milestone.category === 'financial' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {milestone.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Analysis */}
      <Card className="bg-white/95 backdrop-blur-lg border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900">Decision Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-slate-900 font-medium mb-3">Key Success Factors</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Consistent daily habits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Strong relationship network</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Continuous learning mindset</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Financial discipline</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-slate-900 font-medium mb-3">Potential Challenges</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Work-life balance maintenance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Economic market changes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Health maintenance priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Staying motivated long-term</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifePathVisualization;
