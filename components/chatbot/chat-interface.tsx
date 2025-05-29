"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Mic, Paperclip } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatInterfaceProps {
  roomId?: string
}

export function ChatInterface({ roomId = "general" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  // Initialize messages based on room
  useEffect(() => {
    const roomMessages: { [key: string]: Message[] } = {
      general: [
        {
          id: 1,
          text: "Welcome to the General Chat! I'm here to help with any work-related questions you might have.",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      productivity: [
        {
          id: 1,
          text: "Welcome to Productivity Tips! I can help you optimize your workflow and boost your efficiency. What would you like to improve today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      "project-help": [
        {
          id: 1,
          text: "Welcome to Project Help! I'm here to assist with project planning, management, and execution. How can I help with your current project?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      "task-management": [
        {
          id: 1,
          text: "Welcome to Task Management! I can help you organize, prioritize, and track your tasks effectively. What's on your task list today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
    }

    setMessages(roomMessages[roomId] || roomMessages.general)
  }, [roomId])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response based on room
    setTimeout(() => {
      const roomResponses: { [key: string]: string[] } = {
        general: [
          "I can help you with various work-related tasks. What would you like to focus on?",
          "That's a great question! Let me provide some guidance on that topic.",
          "I understand what you're looking for. Here are some suggestions to help you.",
        ],
        productivity: [
          "Here's a productivity tip: Try the Pomodoro Technique - work for 25 minutes, then take a 5-minute break.",
          "To boost productivity, consider time-blocking your calendar and batching similar tasks together.",
          "One effective strategy is to tackle your most challenging task first thing in the morning when your energy is highest.",
        ],
        "project-help": [
          "For successful project management, start by clearly defining your project scope and objectives.",
          "Consider breaking your project into smaller, manageable milestones with specific deadlines.",
          "Regular check-ins with stakeholders can help keep your project on track and address issues early.",
        ],
        "task-management": [
          "Try prioritizing your tasks using the Eisenhower Matrix: urgent/important, important/not urgent, etc.",
          "Consider using the Getting Things Done (GTD) methodology to capture and organize all your tasks.",
          "Set specific, measurable deadlines for each task to maintain accountability and momentum.",
        ],
      }

      const responses = roomResponses[roomId] || roomResponses.general
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInput("")
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant - {roomId.charAt(0).toUpperCase() + roomId.slice(1).replace("-", " ")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.sender === "user" && (
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
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
