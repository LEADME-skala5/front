"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Complete project proposal",
    status: "pending",
    priority: "high",
    dueDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Review team feedback",
    status: "completed",
    priority: "medium",
    dueDate: "2024-01-12",
  },
  {
    id: 3,
    title: "Update documentation",
    status: "overdue",
    priority: "low",
    dueDate: "2024-01-10",
  },
  {
    id: 4,
    title: "Prepare presentation",
    status: "pending",
    priority: "high",
    dueDate: "2024-01-18",
  },
]

const statusIcons = {
  completed: CheckCircle,
  pending: Clock,
  overdue: AlertCircle,
}

const statusColors = {
  completed: "text-green-600",
  pending: "text-yellow-600",
  overdue: "text-red-600",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function TaskList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => {
            const StatusIcon = statusIcons[task.status as keyof typeof statusIcons]
            return (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`h-5 w-5 ${statusColors[task.status as keyof typeof statusColors]}`} />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                    {task.priority}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
