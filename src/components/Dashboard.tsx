
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ConversationInterface from './ConversationInterface';
import LifePathVisualization from './LifePathVisualization';
import ReflectionJournal from './ReflectionJournal';
import { UserProfile } from '../types/user';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Target, FileText, User, LogOut } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('conversation');
  const { signOut } = useAuth();

  if (!userProfile) return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Future You</h1>
                <p className="text-slate-600 text-sm">Welcome back, {userProfile.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Your Future Self</p>
                <p className="text-slate-900 font-semibold text-lg">Age {userProfile.age + 10}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-white/80 backdrop-blur-lg shadow-sm border border-slate-200/60 rounded-xl p-1">
            <TabsTrigger 
              value="conversation" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Chat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="visualization" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Life Path</span>
            </TabsTrigger>
            <TabsTrigger 
              value="journal" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Journal</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="conversation" className="space-y-6 mt-0">
              <ConversationInterface userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="visualization" className="space-y-6 mt-0">
              <LifePathVisualization userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="journal" className="space-y-6 mt-0">
              <ReflectionJournal userProfile={userProfile} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
