
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConversationInterface from './ConversationInterface';
import LifePathVisualization from './LifePathVisualization';
import ReflectionJournal from './ReflectionJournal';
import { UserProfile } from '../types/user';
import { MessageSquare, Target, FileText, User } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('conversation');

  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Future You</h1>
              <p className="text-white/70">Hello, {userProfile.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white/70">Your Future Self</p>
                <p className="text-white font-semibold">Age {userProfile.age + 10}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-4 bg-white/10 backdrop-blur-lg">
            <TabsTrigger value="conversation" className="flex items-center space-x-2 data-[state=active]:bg-white/20">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="visualization" className="flex items-center space-x-2 data-[state=active]:bg-white/20">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Life Path</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center space-x-2 data-[state=active]:bg-white/20">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Journal</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="conversation" className="space-y-4">
              <ConversationInterface userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="visualization" className="space-y-4">
              <LifePathVisualization userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="journal" className="space-y-4">
              <ReflectionJournal userProfile={userProfile} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
