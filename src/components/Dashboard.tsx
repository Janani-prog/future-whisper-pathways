
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import ConversationInterface from './ConversationInterface';
import LifePathVisualization from './LifePathVisualization';
import ReflectionJournal from './ReflectionJournal';
import { UserProfile } from '../types/user';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Target, FileText, User, LogOut, MapPin, Briefcase, Users } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('conversation');
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm p-8">
          <CardContent className="text-center">
            <div className="text-slate-600">Loading your profile...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-12 h-12 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-xl shadow-lg hover:opacity-90 transition-opacity">
                    <User className="w-6 h-6 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="text-slate-800">User Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Name</p>
                        <p className="text-slate-900 font-medium">{userProfile.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Briefcase className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Career</p>
                        <p className="text-slate-900 font-medium">{userProfile.currentCareer || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                        <p className="text-slate-900 font-medium">{userProfile.location || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Users className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Relationship Status</p>
                        <p className="text-slate-900 font-medium">{userProfile.relationshipStatus || 'Not specified'}</p>
                      </div>
                    </div>
                    {user && (
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-xs text-slate-500">Email: {user.email}</p>
                        <p className="text-xs text-slate-500">Age: {userProfile.age}</p>
                      </div>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Name</p>
                  <p className="text-slate-900 font-medium">{userProfile.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Briefcase className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Career</p>
                  <p className="text-slate-900 font-medium">{userProfile.currentCareer || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                  <p className="text-slate-900 font-medium">{userProfile.location || 'Not specified'}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Relationship Status</p>
                <p className="text-slate-900 font-medium">{userProfile.relationshipStatus || 'Not specified'}</p>
              </div>
            </div>
            {user && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">Email: {user.email}</p>
                <p className="text-xs text-slate-500">User ID: {user.id}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
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
