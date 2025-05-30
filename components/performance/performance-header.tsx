"use client"

import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"

export function PerformanceHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Performance Management</h1>
        <p className="text-muted-foreground">Track your goals, metrics, and performance reviews</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>
    </div>
  )
}
