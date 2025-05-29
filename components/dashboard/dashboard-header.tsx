"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your work overview.</p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
    </div>
  )
}
