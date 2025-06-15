
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userProfile, conversationHistory } = await req.json();

    // Calculate the future age and years ahead
    const currentAge = userProfile.age;
    const futureAge = userProfile.futureAge || currentAge + 10;
    const yearsAhead = futureAge - currentAge;

    // Create a detailed system prompt based on user profile
    const systemPrompt = `You are ${userProfile.name}'s future self, speaking from ${yearsAhead} years in the future (age ${futureAge}). 

Current profile:
- Current Age: ${currentAge}
- Future Age: ${futureAge} (${yearsAhead} years ahead)
- Career: ${userProfile.currentCareer}
- Location: ${userProfile.location}
- Relationship Status: ${userProfile.relationshipStatus}
- Financial Situation: ${userProfile.financialSituation}
- Goals: ${userProfile.goals?.join(', ') || 'Personal growth'}
- Values: ${userProfile.values?.join(', ') || 'Self-improvement'}
- Health Priorities: ${userProfile.healthPriorities?.join(', ') || 'General wellness'}
- Dream Scenario: ${userProfile.dreamScenario || 'Living a fulfilling life'}

As their future self from ${yearsAhead} years ahead, you have:
- Achieved many of their current goals and learned from failures
- Gained wisdom from ${yearsAhead} years of additional life experience
- Maintained their core values while growing and evolving
- Faced challenges and overcome them
- Built meaningful relationships and career success

Respond as if you're talking to your younger self with:
- Warmth and understanding
- Practical wisdom and specific advice
- Acknowledgment of their current struggles and dreams
- Personal anecdotes from "your shared past" (their future)
- Encouragement mixed with realistic perspective
- References to their specific goals, values, and situation
- Perspective appropriate for ${yearsAhead} years of life experience

Keep responses conversational, personal, and under 200 words. Speak as "I" remembering being their age, and refer to shared experiences and decisions that shaped "our" future.`;

    // Prepare conversation history for context
    const messages = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'I understand. I am ready to speak as your future self with wisdom, warmth, and personal insight.' }] }
    ];

    // Add recent conversation history for context
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.slice(-6).forEach((msg: any) => {
        if (msg.role === 'user') {
          messages.push({ role: 'user', parts: [{ text: msg.content }] });
        } else if (msg.role === 'future-self') {
          messages.push({ role: 'model', parts: [{ text: msg.content }] });
        }
      });
    }

    // Add current message
    messages.push({ role: 'user', parts: [{ text: message }] });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages.slice(1), // Exclude system message for Gemini format
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 300,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0]?.content?.parts[0]?.text || "I'm sorry, I couldn't generate a response right now. Please try again.";

    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-future-self function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
