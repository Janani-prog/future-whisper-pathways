
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile } from '../types/user';
import { ArrowRight, Sparkles, Target, Heart } from 'lucide-react';

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
      title: "Welcome to Your Future",
      description: "Let's create your AI future self mentor",
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      title: "About You",
      description: "Tell us about your current situation",
      icon: <Target className="w-8 h-8" />,
    },
    {
      title: "Your Dreams",
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-sm">Step {step + 1} of {steps.length}</span>
            <span className="text-white/70 text-sm">{Math.round(((step + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-fit">
              {steps[step].icon}
            </div>
            <CardTitle className="text-2xl font-bold">{steps[step].title}</CardTitle>
            <CardDescription className="text-white/70">{steps[step].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 0 && (
              <div className="text-center space-y-4">
                <p className="text-lg leading-relaxed">
                  Imagine having a conversation with the wisest version of yourself. 
                  Your future self has lived through the decisions you're facing today 
                  and can guide you toward your best possible life.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold">Clear Direction</h3>
                    <p className="text-sm text-white/70">Make decisions with confidence</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold">Personal Growth</h3>
                    <p className="text-sm text-white/70">Unlock your potential</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold">Life Planning</h3>
                    <p className="text-sm text-white/70">Design your ideal future</p>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={profile.name || ''}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Your Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age || ''}
                      onChange={(e) => updateProfile({ age: parseInt(e.target.value) })}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Enter your age"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="career">Current Career/Field</Label>
                  <Input
                    id="career"
                    value={profile.currentCareer || ''}
                    onChange={(e) => updateProfile({ currentCareer: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="What do you do for work?"
                  />
                </div>

                <div>
                  <Label>What matters most to you? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['Family', 'Career Growth', 'Financial Security', 'Health', 'Creativity', 'Adventure', 'Learning', 'Helping Others'].map((value) => (
                      <button
                        key={value}
                        onClick={() => updateProfile({ values: toggleArrayItem(profile.values || [], value) })}
                        className={`p-2 rounded-lg text-sm transition-all ${
                          profile.values?.includes(value)
                            ? 'bg-yellow-400 text-black'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Where do you live?</Label>
                  <Input
                    id="location"
                    value={profile.location || ''}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>What are your top 3 goals for the next 5-10 years?</Label>
                  <div className="space-y-2 mt-2">
                    {[0, 1, 2].map((index) => (
                      <Input
                        key={index}
                        value={profile.goals?.[index] || ''}
                        onChange={(e) => {
                          const newGoals = [...(profile.goals || [])];
                          newGoals[index] = e.target.value;
                          updateProfile({ goals: newGoals });
                        }}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder={`Goal ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="dreamScenario">Describe your ideal life 10 years from now</Label>
                  <Textarea
                    id="dreamScenario"
                    value={profile.dreamScenario || ''}
                    onChange={(e) => updateProfile({ dreamScenario: e.target.value })}
                    className="bg-white/10 border-white/20 text-white min-h-[100px]"
                    placeholder="Paint a picture of your dream life... Where are you living? What are you doing? Who are you with? How do you feel?"
                  />
                </div>

                <div>
                  <Label htmlFor="relationship">Current Relationship Status</Label>
                  <select
                    value={profile.relationshipStatus || ''}
                    onChange={(e) => updateProfile({ relationshipStatus: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white"
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
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
              disabled={step === 1 && (!profile.name || !profile.age)}
            >
              {step === steps.length - 1 ? 'Meet Your Future Self' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
