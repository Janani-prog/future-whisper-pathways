
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserProfile, ConversationMessage } from '../types/user';
import { Send, Sparkles, Clock, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ConversationInterfaceProps {
  userProfile: UserProfile & { futureAge?: number };
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({ userProfile }) => {
  const futureAge = userProfile.futureAge || userProfile.age + 10;
  const yearsAhead = futureAge - userProfile.age;
  
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '1',
      role: 'future-self',
      content: `Hey ${userProfile.name}! It's wonderful to finally connect with you. I'm you, ${yearsAhead} years from now, and I have to say - you're about to make some incredible decisions that will shape our amazing future. I remember being ${userProfile.age} and feeling ${userProfile.dreamScenario ? 'excited about my dreams' : 'uncertain about the path ahead'}. What's on your mind today?`,
      timestamp: new Date(),
      emotion: 'encouraging'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset conversation when future age changes
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'future-self',
        content: `Hey ${userProfile.name}! It's wonderful to finally connect with you. I'm you, ${yearsAhead} years from now, and I have to say - you're about to make some incredible decisions that will shape our amazing future. I remember being ${userProfile.age} and feeling ${userProfile.dreamScenario ? 'excited about my dreams' : 'uncertain about the path ahead'}. What's on your mind today?`,
        timestamp: new Date(),
        emotion: 'encouraging'
      }
    ]);
  }, [futureAge, userProfile.name, userProfile.age, yearsAhead, userProfile.dreamScenario]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isTyping) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Create modified user profile for the API call
      const modifiedProfile = {
        ...userProfile,
        age: futureAge // Use the future age for the API call
      };

      const { data, error } = await supabase.functions.invoke('chat-with-future-self', {
        body: {
          message: currentMessage,
          userProfile: modifiedProfile,
          conversationHistory: messages
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      const response: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'future-self',
        content: data.response,
        timestamp: new Date(),
        emotion: 'supportive'
      };

      setMessages(prev => [...prev, response]);
    } catch (error: any) {
      console.error('Error calling future self:', error);
      toast({
        title: "Connection Error",
        description: "Couldn't reach your future self. Please try again.",
        variant: "destructive"
      });
      
      const fallbackResponse: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'future-self',
        content: "I'm having trouble connecting right now, but I'm here for you. Please try asking me again.",
        timestamp: new Date(),
        emotion: 'supportive'
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What career advice do you have for me?",
    "What should I prioritize in my 20s/30s?",
    "What relationships matter most?",
    "What habits should I start now?",
    "What would you do differently?"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-250px)]">
      {/* Chat Interface */}
      <div className="lg:col-span-3 flex flex-col">
        <Card className="bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-xl flex-1 flex flex-col rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
            <CardTitle className="flex items-center text-xl font-semibold">
              <Sparkles className="w-5 h-5 mr-3 text-amber-300" />
              Future You (Age {futureAge})
              <div className="ml-auto flex items-center text-sm bg-white/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Online
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-50/50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-4 rounded-2xl shadow-sm ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-white border border-slate-200 text-slate-900 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className={`flex items-center mt-2 text-xs ${
                        message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-900 p-4 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-slate-500">Future You is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-6 bg-white border-t border-slate-200/60">
              <div className="flex space-x-3">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask your future self anything..."
                  className="flex-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card className="bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Conversation Starters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setCurrentMessage(question)}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 text-slate-700 hover:text-blue-700 text-sm transition-all duration-200 leading-relaxed"
                disabled={isTyping}
              >
                {question}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4">
            <CardTitle className="text-lg font-semibold">Your Future Self</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-600">Age</span>
                <span className="text-sm font-semibold text-slate-900">{futureAge} years old</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-600">Years Ahead</span>
                <span className="text-sm font-semibold text-slate-900">{yearsAhead} years</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-600 block mb-2">Core Values</span>
                <div className="flex flex-wrap gap-1">
                  {userProfile.values?.slice(0, 2).map((value, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-600 block mb-2">Focus Area</span>
                <span className="text-sm font-semibold text-slate-900">{userProfile.goals?.[0] || 'Personal Growth'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConversationInterface;
