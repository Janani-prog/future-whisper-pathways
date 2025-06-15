
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Auth from './Auth';
import OnboardingFlow from '../components/OnboardingFlow';
import Dashboard from '../components/Dashboard';
import { UserProfile } from '../types/user';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch user profile from Supabase when user is authenticated
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setProfileLoading(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          setProfileLoading(false);
          return;
        }

        if (profile && profile.age) {
          // User has completed onboarding, convert to UserProfile format
          const userProfileData: UserProfile = {
            name: profile.name || '',
            age: profile.age,
            currentCareer: profile.current_career || '',
            location: profile.location || '',
            relationshipStatus: profile.relationship_status || '',
            goals: [], // These would need to be stored separately or in JSON
            values: [],
            financialSituation: '',
            healthPriorities: [],
            dreamScenario: ''
          };
          setUserProfile(userProfileData);
          setShowOnboarding(false);
        } else {
          // User hasn't completed onboarding yet
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleOnboardingComplete = async (profile: UserProfile) => {
    if (!user) return;

    try {
      // Update the profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          age: profile.age,
          current_career: profile.currentCareer,
          location: profile.location,
          relationship_status: profile.relationshipStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        return;
      }

      setUserProfile(profile);
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (loading || profileLoading) {
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
