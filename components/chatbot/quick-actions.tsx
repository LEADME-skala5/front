"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, FileText, Calendar, TrendingUp, Lightbulb, Clock } from "lucide-react"

const quickActions = [
  {
    title: "Create Task",
    description: "Add a new task to your list",
    icon: CheckSquare,
    action: "Help me create a new task",
  },
  {
    title: "Generate Report",
    description: "Create a productivity report",
    icon: FileText,
    action: "Generate a weekly productivity report",
  },
  {
    title: "Schedule Review",
    description: "Plan your day or week",
    icon: Calendar,
    action: "Help me plan my schedule for tomorrow",
  },
  {
    title: "Productivity Tips",
    description: "Get personalized advice",
    icon: TrendingUp,
    action: "Give me productivity tips for today",
  },
  {
    title: "Ideas & Brainstorm",
    description: "Brainstorm solutions",
    icon: Lightbulb,
    action: "Help me brainstorm ideas for my project",
  },
  {
    title: "Time Management",
    description: "Optimize your time",
    icon: Clock,
    action: "How can I better manage my time?",
  },
]

export function QuickActions() {
  const handleQuickAction = (action: string) => {
    // This would typically send the action to the chat interface
    console.log("Quick action:", action)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => handleQuickAction(action.action)}
            >
              <div className="flex items-start gap-3">
                <action.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
