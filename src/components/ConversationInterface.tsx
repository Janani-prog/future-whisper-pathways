
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserProfile, ConversationMessage } from '../types/user';
import { Send, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ConversationInterfaceProps {
  userProfile: UserProfile;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({ userProfile }) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '1',
      role: 'future-self',
      content: `Hey ${userProfile.name}! It's so good to finally talk to you. I'm you, 10 years from now, and I have to say - you're about to make some amazing decisions that will shape our future. I remember being ${userProfile.age} and feeling ${userProfile.dreamScenario ? 'excited about my dreams' : 'uncertain about the path ahead'}. What's on your mind today?`,
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
      const { data, error } = await supabase.functions.invoke('chat-with-future-self', {
        body: {
          message: currentMessage,
          userProfile: userProfile,
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
      
      // Fallback response
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Chat Interface */}
      <div className="lg:col-span-3 flex flex-col">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
              Future You (Age {userProfile.age + 10})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your future self anything..."
                className="bg-white/10 border-white/20 text-white flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-4">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Conversation Starters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setCurrentMessage(question)}
                className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors"
                disabled={isTyping}
              >
                {question}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Your Future Self</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-white/80">
              <p><strong>Age:</strong> {userProfile.age + 10}</p>
              <p><strong>Values:</strong> {userProfile.values?.slice(0, 2).join(', ')}</p>
              <p><strong>Focus Area:</strong> {userProfile.goals?.[0] || 'Personal Growth'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConversationInterface;
