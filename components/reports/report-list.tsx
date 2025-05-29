"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Calendar } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Weekly Productivity Report",
    type: "Weekly",
    date: "2024-01-15",
    status: "completed",
    size: "1.2 MB",
  },
  {
    id: 2,
    title: "Project Alpha Summary",
    type: "Project",
    date: "2024-01-12",
    status: "completed",
    size: "2.8 MB",
  },
  {
    id: 3,
    title: "Monthly Performance Review",
    type: "Monthly",
    date: "2024-01-01",
    status: "completed",
    size: "3.1 MB",
  },
  {
    id: 4,
    title: "Task Completion Analysis",
    type: "Weekly",
    date: "2024-01-08",
    status: "completed",
    size: "1.8 MB",
  },
]

const typeColors = {
  Weekly: "bg-blue-100 text-blue-800",
  Monthly: "bg-green-100 text-green-800",
  Project: "bg-purple-100 text-purple-800",
}

export function ReportList() {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{report.date}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={typeColors[report.type as keyof typeof typeColors]}>{report.type}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
