// DoctorAI.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { useSlideIn } from '@/utils/animations';
import type { Patient } from '@/utils/mockData';
import { getGemmaResponse } from "@/utils/gemma";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface DoctorAIProps {
  patient?: Patient | null;
}

export const DoctorAI: React.FC<DoctorAIProps> = ({ patient }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: patient
        ? `Ask me anything about ${patient.firstName} ${patient.lastName}'s medical information.`
        : "This chat is for general medical questions (e.g., 'How many diabetes patients are there?'). For patient-specific inquiries, please go to the patient page.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const slideInStyle = useSlideIn(100, 300, 'up');
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (patient) {
      setMessages([
        {
          id: Date.now().toString(),
          text: `Ask me anything about ${patient.firstName} ${patient.lastName}'s medical information.`,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  }, [patient]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendQuestion = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      console.log("Sending question for patient:", patient?.id);
      const aiResponse = await getGemmaResponse(question, patient?.id);
      console.log("AI Response from Gemini:", aiResponse);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error querying AI:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: "Error processing request.", sender: "ai", timestamp: new Date() },
      ]);
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendQuestion();
    }
  };

  return (
    <Card className="shadow-card h-[425px]" style={slideInStyle}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="w-9 h-8 rounded-md bg-medical-blue flex items-center justify-center">
            <Bot className="h-5 w-6 text-white" />
          </div>
          <span>Doctor AI Assistant</span>
        </CardTitle>
        <CardDescription>
          {patient
            ? `Ask questions about ${patient.firstName} ${patient.lastName}'s health records`
            : "Ask questions about your patients and their medical data"}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[600px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-medical-blue text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'ai' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.sender === 'ai' ? 'Doctor AI' : 'You'}
                  </span>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs font-medium">Doctor AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processing query...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about patient information..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendQuestion}
              disabled={isLoading || !question.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            <p>
              {patient
                ? `Try asking: "What's ${patient.firstName}'s blood pressure?" or "List ${patient.firstName}'s medications"`
                : "Try asking: \"Which patients are in critical condition?\" or \"List patients with diabetes\""}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorAI;
