
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Auth from './Auth';
import OnboardingFlow from '../components/OnboardingFlow';
import Dashboard from '../components/Dashboard';
import { UserProfile } from '../types/user';

const Index = () => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowOnboarding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard userProfile={userProfile} />;
};

export default Index;
