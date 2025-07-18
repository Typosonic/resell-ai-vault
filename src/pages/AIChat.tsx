
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAutomation } from '@/hooks/useAutomations';
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
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response - replace with actual API call later
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getSimulatedResponse(newMessage, automation),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getSimulatedResponse = (userMessage: string, automation: any) => {
    const message = userMessage.toLowerCase();
    
    if (automation) {
      if (message.includes('how') || message.includes('setup') || message.includes('implement')) {
        return `To implement the "${automation.title}" automation, you'll need to follow these general steps:\n\n1. Download the automation files\n2. Review the documentation included\n3. Configure the settings for your specific use case\n4. Test the automation in a safe environment\n5. Deploy to production\n\nThis automation is rated ${automation.difficulty} level, so ${automation.difficulty === 'beginner' ? 'it should be straightforward to set up' : automation.difficulty === 'intermediate' ? 'you may need some technical knowledge' : 'advanced technical skills are recommended'}.\n\nWould you like more specific guidance on any of these steps?`;
      }
      
      if (message.includes('what') || message.includes('does') || message.includes('purpose')) {
        return `The "${automation.title}" is designed for ${automation.category.toLowerCase()} purposes. Here's what it does:\n\n${automation.description}\n\nKey features include:\n• Automated workflow processing\n• Integration capabilities\n• Customizable settings\n• Performance monitoring\n\nThis automation has been downloaded ${automation.downloads} times and has a ${automation.rating}/5 rating from users.\n\nWould you like to know more about specific features or implementation details?`;
      }
    }
    
    if (message.includes('recommend') || message.includes('suggest') || message.includes('best')) {
      return "I'd be happy to recommend automations! To give you the best suggestions, could you tell me:\n\n• What type of business or use case you have?\n• What processes you'd like to automate?\n• Your technical experience level?\n• Any specific tools or platforms you're using?\n\nWith this information, I can recommend the most suitable automations from our library.";
    }
    
    if (message.includes('help') || message.includes('guide') || message.includes('tutorial')) {
      return "I'm here to help! I can assist you with:\n\n🔧 **Implementation guidance** - Step-by-step setup instructions\n📊 **Automation selection** - Finding the right tools for your needs\n🛠️ **Troubleshooting** - Solving common issues\n💡 **Best practices** - Tips for optimal performance\n🔗 **Integration help** - Connecting with your existing tools\n\nWhat specific area would you like help with?";
    }
    
    return "That's a great question! While I'm still learning and don't have access to live AI yet, I'm designed to help you with automation questions. In the full version, I'll be able to provide detailed answers about:\n\n• How to set up specific automations\n• Troubleshooting common issues\n• Recommending the best automations for your needs\n• Integration guidance\n\nFor now, you can explore our automation library and download the ones that interest you. Is there anything specific about automations you'd like to discuss?";
  };

  const quickQuestions = [
    "How do I get started with automations?",
    "Which automation is best for marketing?",
    "How difficult is it to implement?",
    "Can you recommend automations for my business?",
  ];

  return (
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
              <Badge variant="secondary">{automation.category}</Badge>
              <Badge className="bg-purple-100 text-purple-800">
                {automation.difficulty}
              </Badge>
            </div>
            <p className="text-purple-800 text-sm">{automation.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Chat Container */}
      <Card className="h-[500px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center">
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
          <div className="px-4 py-2 border-t border-gray-100">
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
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything about automations..."
              disabled={isTyping}
              className="flex-1"
            />
            <Button type="submit" disabled={isTyping || !newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
          space: 2px;
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
  );
}
