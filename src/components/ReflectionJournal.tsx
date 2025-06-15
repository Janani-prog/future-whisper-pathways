
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile } from '../types/user';
import { PlusCircle, BookOpen, Calendar, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<string>('');
  const [currentContent, setCurrentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

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

  // Load journal entries from database
  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('journal_entries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching journal entries:', error);
          toast({
            title: "Error",
            description: "Failed to load journal entries",
            variant: "destructive",
          });
          return;
        }

        const formattedEntries: JournalEntry[] = data.map(entry => ({
          id: entry.id,
          date: new Date(entry.created_at),
          prompt: entry.prompt,
          content: entry.content || '',
          mood: (entry.mood as 'positive' | 'neutral' | 'reflective' | 'challenging') || 'reflective'
        }));

        setEntries(formattedEntries);
        
        // Select first entry if available
        if (formattedEntries.length > 0) {
          setSelectedEntry(formattedEntries[0].id);
          setCurrentContent(formattedEntries[0].content);
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [user, toast]);

  const addNewEntry = async (prompt: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: user.id,
          prompt,
          content: '',
          mood: 'reflective'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating journal entry:', error);
        toast({
          title: "Error",
          description: "Failed to create journal entry",
          variant: "destructive",
        });
        return;
      }

      const newEntry: JournalEntry = {
        id: data.id,
        date: new Date(data.created_at),
        prompt: data.prompt,
        content: data.content || '',
        mood: (data.mood as 'positive' | 'neutral' | 'reflective' | 'challenging') || 'reflective'
      };

      setEntries(prev => [newEntry, ...prev]);
      setSelectedEntry(newEntry.id);
      setCurrentContent('');

      toast({
        title: "Success",
        description: "New journal entry created!",
      });
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  const saveEntry = async () => {
    if (!user || !selectedEntry) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({
          content: currentContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedEntry);

      if (error) {
        console.error('Error updating journal entry:', error);
        toast({
          title: "Error",
          description: "Failed to save journal entry",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      setEntries(prev => prev.map(entry => 
        entry.id === selectedEntry 
          ? { ...entry, content: currentContent }
          : entry
      ));

      toast({
        title: "Success",
        description: "Journal entry saved!",
      });
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEntrySelect = (entryId: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (entry) {
      setSelectedEntry(entryId);
      setCurrentContent(entry.content);
    }
  };

  const selectedEntryData = entries.find(e => e.id === selectedEntry);

  const insightfulQuestions = [
    `Given your goal of "${userProfile.goals?.[0] || 'personal growth'}", what small action could you take today?`,
    `Your future self values ${userProfile.values?.[0] || 'growth'}. How can you honor this value this week?`,
    `What would someone who has achieved your dream life advise you to focus on right now?`,
    `If you had unlimited confidence, what would you do differently in your current situation?`
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading journal entries...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Journal Entries List */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Journal Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleEntrySelect(entry.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedEntry === entry.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">
                    {entry.date.toLocaleDateString()}
                  </span>
                  <Heart className={`w-4 h-4 ${entry.content ? 'text-red-500' : 'text-slate-300'}`} />
                </div>
                <p className="text-sm text-slate-700 line-clamp-2">
                  {entry.prompt}
                </p>
              </button>
            ))}
            {entries.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-4">
                No journal entries yet. Create your first one below!
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 text-sm">New Reflection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {reflectionPrompts.slice(0, 3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => addNewEntry(prompt)}
                className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs transition-colors"
              >
                {prompt}
              </button>
            ))}
            <Button
              onClick={() => addNewEntry(reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)])}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Random Prompt
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Writing Area */}
      <div className="lg:col-span-2 space-y-4">
        {selectedEntryData ? (
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 text-sm">
                    {selectedEntryData.date.toLocaleDateString()}
                  </span>
                </div>
                <Button
                  onClick={saveEntry}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  {saving ? 'Saving...' : 'Save Entry'}
                </Button>
              </div>
              <CardTitle className="text-slate-800 text-lg mt-3">
                {selectedEntryData.prompt}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                placeholder="Write your thoughts, feelings, and reflections here..."
                className="bg-white border-slate-200 text-slate-800 min-h-[300px] resize-none placeholder:text-slate-400"
              />
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm">
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Select a journal entry to start writing</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personalized Insights */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Personalized Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insightfulQuestions.map((question, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <p className="text-slate-700 text-sm">{question}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reflection Stats */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Your Reflection Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
                <div className="text-slate-600 text-sm">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {entries.filter(e => e.content.length > 0).length}
                </div>
                <div className="text-slate-600 text-sm">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {entries.length > 0 ? Math.ceil((Date.now() - new Date(Math.min(...entries.map(e => e.date.getTime()))).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                </div>
                <div className="text-slate-600 text-sm">Days Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {entries.length > 0 ? Math.round(entries.reduce((acc, e) => acc + e.content.split(' ').length, 0) / entries.length) : 0}
                </div>
                <div className="text-slate-600 text-sm">Avg Words</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReflectionJournal;
