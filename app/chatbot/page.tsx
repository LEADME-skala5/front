"use client"

import { useSearchParams } from "next/navigation"
import { ChatInterface } from "@/components/chatbot/chat-interface"

export default function ChatbotPage() {
  const searchParams = useSearchParams()
  const room = searchParams.get("room") || "general"

  const getRoomTitle = (roomId: string) => {
    const roomTitles: { [key: string]: string } = {
      general: "General Chat",
      productivity: "Productivity Tips",
      "project-help": "Project Help",
      "task-management": "Task Management",
    }
    return roomTitles[roomId] || "General Chat"
  }

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            Current room: <span className="font-medium">{getRoomTitle(room)}</span>
          </p>
        </div>
      </div>

      <div className="h-[calc(100vh-200px)]">
        <ChatInterface roomId={room} />
      </div>
    </div>
  )
}
