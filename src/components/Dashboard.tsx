
import React, { useState } from 'react';
import { UserProfile } from '../types/user';
import EditProfileDialog from './EditProfileDialog';
import GoalTracker from './GoalTracker';
import LifeBalanceChart from './LifeBalanceChart';
import ReflectionJournal from './ReflectionJournal';
import ResourceLibrary from './ResourceLibrary';
import ThemeToggle from './ThemeToggle';

interface DashboardProps {
  userProfile: UserProfile | null;
  onProfileUpdate: (updatedProfile: UserProfile) => void;
}

const Dashboard = ({ userProfile, onProfileUpdate }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {userProfile?.name || 'Friend'}!
            </h1>
            <p className="text-purple-200 text-lg">
              Continue your journey of self-discovery and growth
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <EditProfileDialog 
              userProfile={userProfile} 
              onProfileUpdate={onProfileUpdate} 
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex mb-6 bg-white bg-opacity-10 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'overview'
                ? 'bg-white text-purple-900 font-medium'
                : 'text-white hover:bg-white hover:bg-opacity-20'
            }`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'goals'
                ? 'bg-white text-purple-900 font-medium'
                : 'text-white hover:bg-white hover:bg-opacity-20'
            }`}
            onClick={() => handleTabChange('goals')}
          >
            Goals
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'journal'
                ? 'bg-white text-purple-900 font-medium'
                : 'text-white hover:bg-white hover:bg-opacity-20'
            }`}
            onClick={() => handleTabChange('journal')}
          >
            Journal
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'resources'
                ? 'bg-white text-purple-900 font-medium'
                : 'text-white hover:bg-white hover:bg-opacity-20'
            }`}
            onClick={() => handleTabChange('resources')}
          >
            Resources
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-5">
                <h2 className="text-xl font-bold mb-4">Life Balance</h2>
                <LifeBalanceChart userProfile={userProfile} />
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-5">
                <h2 className="text-xl font-bold mb-4">Current Goals</h2>
                <GoalTracker goals={userProfile?.goals || []} />
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Goal Tracking</h2>
              <GoalTracker goals={userProfile?.goals || []} expanded={true} />
            </div>
          )}

          {activeTab === 'journal' && userProfile && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Reflection Journal</h2>
              <ReflectionJournal userProfile={userProfile} />
            </div>
          )}

          {activeTab === 'resources' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Resource Library</h2>
              <ResourceLibrary userProfile={userProfile} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
