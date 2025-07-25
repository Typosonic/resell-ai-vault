
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAutomation } from '@/hooks/useAutomations';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Send,
  Bot,
  User,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChat() {
  const [searchParams] = useSearchParams();
  const automationId = searchParams.get('automation');
  const { automation } = useAutomation(automationId || '');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: automationId 
        ? `Hi! I'm here to help you understand and implement the "${automation?.title}" automation. What would you like to know?`
        : "Hello! I'm your AI automation assistant. I can help you understand how different automations work, suggest the best ones for your needs, and guide you through implementation. What can I help you with today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);

    try {
      // Create context for the AI based on current automation and conversation
      let context = "You are an AI assistant specialized in helping users with automation workflows and business processes.";
      
      if (automation) {
        context += ` The user is currently asking about the "${automation.title}" automation, which is ${automation.description}. This automation is categorized as ${automation.category} and has a ${automation.difficulty} difficulty level.`;
      }

      // Add recent conversation context
      const recentMessages = messages.slice(-5).map(msg => 
        `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');
      
      if (recentMessages) {
        context += `\n\nRecent conversation:\n${recentMessages}`;
      }

      const { data, error } = await supabase.functions.invoke('generate-workflow', {
        body: {
          problemDescription: currentMessage,
          businessType: automation?.category || 'general',
          complexity: automation?.difficulty || 'intermediate',
          context: context,
          isChat: true
        }
      });

      if (error) {
        throw error;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data?.response || "I'm sorry, I couldn't process that request. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "How do I get started with automations?",
    "Which automation is best for marketing?",
    "How difficult is it to implement?",
    "Can you recommend automations for my business?",
  ];

  return (
    <div className="member-portal">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Sparkles className="mr-3 h-8 w-8 text-purple-600" />
            AI Learning Assistant
          </h1>
          <p className="text-gray-600">
            Get personalized help with automations and implementation guidance
          </p>
        </div>

        {/* Context Card - if automation is selected */}
        {automation && (
          <Card className="mb-6 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-900">
                Currently discussing: {automation.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">{automation.category}</Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  {automation.difficulty}
                </Badge>
              </div>
              <p className="text-purple-800 text-sm">{automation.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Chat Container */}
        <Card className="h-[500px] flex flex-col bg-white border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center text-gray-900">
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat with AI Assistant
            </CardTitle>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && (
                      <Bot className="h-5 w-5 mt-0.5 text-purple-600" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-5 w-5 mt-0.5 text-purple-100" />
                    )}
                    <div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-purple-600" />
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Quick questions to get started:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask me anything about automations..."
                disabled={isTyping}
                className="flex-1 bg-white border-gray-300"
              />
              <Button type="submit" disabled={isTyping || !newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>

        <style>{`
          .typing-indicator {
            display: flex;
            align-items: center;
            gap: 2px;
          }
          .typing-indicator span {
            height: 4px;
            width: 4px;
            background-color: #9333ea;
            border-radius: 50%;
            animation: typing 1.4s infinite ease-in-out;
            margin-right: 2px;
          }
          .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
          .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
          @keyframes typing {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
