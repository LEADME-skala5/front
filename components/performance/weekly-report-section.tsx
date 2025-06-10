'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit, Save, X, Bot, Send, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function WeeklyReportSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [reportSections, setReportSections] = useState({
    whatWasDone: `• Completed performance metrics dashboard implementation
• Reviewed and updated team goal tracking system
• Conducted quarterly performance review meetings
• Updated documentation for performance evaluation process
• Fixed issues in goal progress calculation
• Attended leadership development workshop
• Prepared materials for upcoming performance reviews`,

    whatsNext: `• Implement automated performance report generation
• Set up peer feedback collection system
• Begin work on 360-degree feedback integration
• Schedule individual development planning sessions
• Research performance analytics tools
• Plan team performance calibration meetings
• Prepare annual performance review templates`,

    issues: `• Delayed feedback from some team members affecting review timelines
• Performance data integration issues with HR systems
• Limited availability of senior reviewers during peak review period
• Inconsistent goal setting across different departments
• Technical issues with performance tracking dashboard
• Budget constraints for performance management tool upgrades`,
  });

  const [editedSections, setEditedSections] = useState({
    whatWasDone: '',
    whatsNext: '',
    issues: '',
  });

  // Chatbot state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I can help you update your performance report. Try commands like 'Add [item] to what was done' or 'Add [item] to what's next'.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleEdit = () => {
    setEditedSections({
      whatWasDone: reportSections.whatWasDone,
      whatsNext: reportSections.whatsNext,
      issues: reportSections.issues,
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    setReportSections(editedSections);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedSections({
      whatWasDone: '',
      whatsNext: '',
      issues: '',
    });
  };

  const handleChatbotSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Process chatbot commands
    setTimeout(() => {
      const command = input.toLowerCase();
      let botResponse = 'I understand you want to update the report. ';
      let updated = false;

      // Parse commands to update report sections
      if (command.includes('add') && command.includes('what was done')) {
        const match =
          command.match(/add ['"](.+?)['"] to what was done/i) ||
          command.match(/add (.+?) to what was done/i);
        if (match) {
          const newItem = `• ${match[1]}`;
          setReportSections((prev) => ({
            ...prev,
            whatWasDone: prev.whatWasDone + '\n' + newItem,
          }));
          botResponse = `Added "${match[1]}" to the "What was done" section.`;
          updated = true;
        }
      } else if (command.includes('add') && command.includes("what's next")) {
        const match =
          command.match(/add ['"](.+?)['"] to what's next/i) ||
          command.match(/add (.+?) to what's next/i);
        if (match) {
          const newItem = `• ${match[1]}`;
          setReportSections((prev) => ({
            ...prev,
            whatsNext: prev.whatsNext + '\n' + newItem,
          }));
          botResponse = `Added "${match[1]}" to the "What's next" section.`;
          updated = true;
        }
      } else if (command.includes('add') && command.includes('issues')) {
        const match =
          command.match(/add ['"](.+?)['"] to issues/i) || command.match(/add (.+?) to issues/i);
        if (match) {
          const newItem = `• ${match[1]}`;
          setReportSections((prev) => ({
            ...prev,
            issues: prev.issues + '\n' + newItem,
          }));
          botResponse = `Added "${match[1]}" to the "Issues" section.`;
          updated = true;
        }
      }

      if (!updated) {
        botResponse =
          "I can help you update your performance report. Try commands like:\n• 'Add [item] to what was done'\n• 'Add [item] to what's next'\n• 'Add [item] to issues'";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="space-y-6">
      {/* Weekly Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Performance Weekly Report</CardTitle>
            {!isEditing ? (
              <Button onClick={handleEdit} size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Weekly Report Sections */}
      <div className="space-y-6">
        {/* What was done */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What was done (한 일)</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editedSections.whatWasDone}
                onChange={(e) =>
                  setEditedSections((prev) => ({ ...prev, whatWasDone: e.target.value }))
                }
                className="min-h-[150px] font-mono text-sm"
                placeholder="Enter what was accomplished this week..."
              />
            ) : (
              <div className="whitespace-pre-line text-sm leading-relaxed">
                {reportSections.whatWasDone}
              </div>
            )}
          </CardContent>
        </Card>

        {/* What's next */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What's next (할 일)</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editedSections.whatsNext}
                onChange={(e) =>
                  setEditedSections((prev) => ({ ...prev, whatsNext: e.target.value }))
                }
                className="min-h-[150px] font-mono text-sm"
                placeholder="Enter what's planned for next week..."
              />
            ) : (
              <div className="whitespace-pre-line text-sm leading-relaxed">
                {reportSections.whatsNext}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Issues (이슈 사항)</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editedSections.issues}
                onChange={(e) => setEditedSections((prev) => ({ ...prev, issues: e.target.value }))}
                className="min-h-[150px] font-mono text-sm"
                placeholder="Enter any issues or blockers..."
              />
            ) : (
              <div className="whitespace-pre-line text-sm leading-relaxed">
                {reportSections.issues}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chatbot Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Performance Report Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[400px]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Try: 'Add completed team calibration to what was done'"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatbotSend()}
                  className="flex-1"
                />
                <Button onClick={handleChatbotSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
