"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Trash2 } from "lucide-react"

interface Task {
  id: number
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
  createdAt: Date
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review team performance reports",
      completed: false,
      priority: "high",
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "Update project documentation",
      completed: true,
      priority: "medium",
      createdAt: new Date(),
    },
    {
      id: 3,
      title: "Prepare for client meeting",
      completed: false,
      priority: "high",
      createdAt: new Date(),
    },
  ])

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "medium" | "low">("medium")
  const [showAddForm, setShowAddForm] = useState(false)

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      priority: newTaskPriority,
      createdAt: new Date(),
    }

    setTasks((prev) => [newTask, ...prev])
    setNewTaskTitle("")
    setNewTaskPriority("medium")
    setShowAddForm(false)
  }

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Tasks
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{today}</p>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {totalCount} completed
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add Task Form */}
          {showAddForm && (
            <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
              <Input
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
              />
              <div className="flex items-center gap-2">
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as "high" | "medium" | "low")}
                  className="px-3 py-1 border rounded text-sm"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <Button onClick={addTask} size="sm">
                  Add
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Task List */}
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
              <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </p>
              </div>
              <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
              <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No tasks for today. Add a task to get started!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
