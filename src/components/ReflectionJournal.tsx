
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile } from '../types/user';
import { PlusCircle, BookOpen, Calendar, Heart } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  prompt: string;
  content: string;
  mood: 'positive' | 'neutral' | 'reflective' | 'challenging';
}

interface ReflectionJournalProps {
  userProfile: UserProfile;
}

const ReflectionJournal: React.FC<ReflectionJournalProps> = ({ userProfile }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date(),
      prompt: "What decision are you facing that your future self would want you to consider carefully?",
      content: "",
      mood: 'reflective'
    }
  ]);
  const [selectedEntry, setSelectedEntry] = useState<string>('1');
  const [currentContent, setCurrentContent] = useState('');

  const reflectionPrompts = [
    "What decision are you facing that your future self would want you to consider carefully?",
    "If you met yourself 10 years from now, what would you want to ask them?",
    "What habits are you building today that will compound over time?",
    "What relationships deserve more of your attention and energy?",
    "What fears are holding you back from pursuing your dreams?",
    "How do you want to be remembered by the people who matter most?",
    "What would you regret not trying if you looked back 20 years from now?",
    "What brings you the most joy and fulfillment in your daily life?",
    "What advice would you give to someone facing the same challenges you are?",
    "How have you grown in the past year, and where do you want to grow next?"
  ];

  const addNewEntry = (prompt: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      prompt,
      content: '',
      mood: 'reflective'
    };
    setEntries(prev => [newEntry, ...prev]);
    setSelectedEntry(newEntry.id);
    setCurrentContent('');
  };

  const saveEntry = () => {
    setEntries(prev => prev.map(entry => 
      entry.id === selectedEntry 
        ? { ...entry, content: currentContent }
        : entry
    ));
  };

  const selectedEntryData = entries.find(e => e.id === selectedEntry);

  React.useEffect(() => {
    if (selectedEntryData) {
      setCurrentContent(selectedEntryData.content);
    }
  }, [selectedEntry, selectedEntryData]);

  const insightfulQuestions = [
    `Given your goal of "${userProfile.goals?.[0] || 'personal growth'}", what small action could you take today?`,
    `Your future self values ${userProfile.values?.[0] || 'growth'}. How can you honor this value this week?`,
    `What would someone who has achieved your dream life advise you to focus on right now?`,
    `If you had unlimited confidence, what would you do differently in your current situation?`
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Journal Entries List */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Journal Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedEntry === entry.id
                    ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70">
                    {entry.date.toLocaleDateString()}
                  </span>
                  <Heart className={`w-4 h-4 ${entry.content ? 'text-red-400' : 'text-white/30'}`} />
                </div>
                <p className="text-sm text-white line-clamp-2">
                  {entry.prompt}
                </p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">New Reflection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {reflectionPrompts.slice(0, 3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => addNewEntry(prompt)}
                className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs transition-colors"
              >
                {prompt}
              </button>
            ))}
            <Button
              onClick={() => addNewEntry(reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)])}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-sm"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Random Prompt
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Writing Area */}
      <div className="lg:col-span-2 space-y-4">
        {selectedEntryData && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  <span className="text-white text-sm">
                    {selectedEntryData.date.toLocaleDateString()}
                  </span>
                </div>
                <Button
                  onClick={saveEntry}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-sm"
                >
                  Save Entry
                </Button>
              </div>
              <CardTitle className="text-white text-lg mt-3">
                {selectedEntryData.prompt}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                placeholder="Write your thoughts, feelings, and reflections here..."
                className="bg-white/10 border-white/20 text-white min-h-[300px] resize-none"
              />
            </CardContent>
          </Card>
        )}

        {/* Personalized Insights */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Personalized Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insightfulQuestions.map((question, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                <p className="text-white text-sm">{question}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reflection Stats */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Your Reflection Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{entries.length}</div>
                <div className="text-white/70 text-sm">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {entries.filter(e => e.content.length > 0).length}
                </div>
                <div className="text-white/70 text-sm">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">7</div>
                <div className="text-white/70 text-sm">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(entries.reduce((acc, e) => acc + e.content.length, 0) / entries.length) || 0}
                </div>
                <div className="text-white/70 text-sm">Avg Words</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReflectionJournal;
