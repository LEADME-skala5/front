"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Clock } from "lucide-react"

const chatHistory = [
  {
    id: 1,
    title: "Task Prioritization Help",
    lastMessage: "Thanks for the productivity tips!",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "Weekly Report Generation",
    lastMessage: "Generate my weekly report",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    title: "Project Planning Session",
    lastMessage: "Help me plan my project timeline",
    timestamp: "2 days ago",
  },
  {
    id: 4,
    title: "Time Management Tips",
    lastMessage: "How can I be more productive?",
    timestamp: "3 days ago",
  },
  {
    id: 5,
    title: "Meeting Preparation",
    lastMessage: "Prepare agenda for team meeting",
    timestamp: "1 week ago",
  },
]

export function ChatHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Conversations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-1 p-4">
            {chatHistory.map((chat) => (
              <Button key={chat.id} variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="flex items-start gap-3 w-full">
                  <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
