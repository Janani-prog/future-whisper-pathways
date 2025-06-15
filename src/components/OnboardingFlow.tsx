
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile } from '../types/user';
import { ArrowRight, Target, User, Heart } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    goals: [],
    values: [],
    healthPriorities: [],
  });

  const steps = [
    {
      title: "Welcome to Future You",
      description: "Let's create your AI future self mentor",
      icon: <Target className="w-8 h-8" />,
    },
    {
      title: "Tell Us About Yourself",
      description: "Share your current situation",
      icon: <User className="w-8 h-8" />,
    },
    {
      title: "Your Vision & Dreams",
      description: "What does your ideal future look like?",
      icon: <Heart className="w-8 h-8" />,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(profile as UserProfile);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-600 text-sm font-medium">Step {step + 1} of {steps.length}</span>
            <span className="text-slate-600 text-sm font-medium">{Math.round(((step + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center px-8 py-8">
            <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl w-fit shadow-lg">
              {steps[step].icon}
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900 mb-2">{steps[step].title}</CardTitle>
            <CardDescription className="text-slate-600 text-lg leading-relaxed">{steps[step].description}</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-8">
            {step === 0 && (
              <div className="text-center space-y-6">
                <p className="text-xl text-slate-700 leading-relaxed">
                  Connect with the wisest version of yourself. Your future self has lived through 
                  the decisions you're facing today and can guide you toward your best possible life.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">Clear Direction</h3>
                    <p className="text-slate-600">Make decisions with confidence and purpose</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="w-16 h-16 bg-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">Personal Growth</h3>
                    <p className="text-slate-600">Unlock your potential and transform your life</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <div className="w-16 h-16 bg-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">Life Planning</h3>
                    <p className="text-slate-600">Design and achieve your ideal future</p>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 font-medium">Your Name</Label>
                    <Input
                      id="name"
                      value={profile.name || ''}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-slate-700 font-medium">Your Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age || ''}
                      onChange={(e) => updateProfile({ age: parseInt(e.target.value) })}
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3"
                      placeholder="Enter your age"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="career" className="text-slate-700 font-medium">Current Career/Field</Label>
                  <Input
                    id="career"
                    value={profile.currentCareer || ''}
                    onChange={(e) => updateProfile({ currentCareer: e.target.value })}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3"
                    placeholder="What do you do for work?"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">What matters most to you? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Family', 'Career Growth', 'Financial Security', 'Health', 'Creativity', 'Adventure', 'Learning', 'Helping Others'].map((value) => (
                      <button
                        key={value}
                        onClick={() => updateProfile({ values: toggleArrayItem(profile.values || [], value) })}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          profile.values?.includes(value)
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-700 font-medium">Where do you live?</Label>
                  <Input
                    id="location"
                    value={profile.location || ''}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">What are your top 3 goals for the next 5-10 years?</Label>
                  <div className="space-y-3">
                    {[0, 1, 2].map((index) => (
                      <Input
                        key={index}
                        value={profile.goals?.[index] || ''}
                        onChange={(e) => {
                          const newGoals = [...(profile.goals || [])];
                          newGoals[index] = e.target.value;
                          updateProfile({ goals: newGoals });
                        }}
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3"
                        placeholder={`Goal ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dreamScenario" className="text-slate-700 font-medium">Describe your ideal life 10 years from now</Label>
                  <Textarea
                    id="dreamScenario"
                    value={profile.dreamScenario || ''}
                    onChange={(e) => updateProfile({ dreamScenario: e.target.value })}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 min-h-[120px]"
                    placeholder="Paint a picture of your dream life... Where are you living? What are you doing? Who are you with? How do you feel?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship" className="text-slate-700 font-medium">Current Relationship Status</Label>
                  <select
                    value={profile.relationshipStatus || ''}
                    onChange={(e) => updateProfile({ relationshipStatus: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 text-slate-700"
                  >
                    <option value="">Select status</option>
                    <option value="single">Single</option>
                    <option value="dating">Dating</option>
                    <option value="committed">In a committed relationship</option>
                    <option value="married">Married</option>
                    <option value="complicated">It's complicated</option>
                  </select>
                </div>
              </div>
            )}

            <Button 
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-200"
              disabled={step === 1 && (!profile.name || !profile.age)}
            >
              {step === steps.length - 1 ? 'Meet Your Future Self' : 'Continue'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
