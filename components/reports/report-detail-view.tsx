"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Download, Share, Calendar, User, Edit, Save, X, Bot, Send, Paperclip } from "lucide-react"

interface ReportDetailProps {
  reportId: number
}

// Mock weekly report data
const initialReportData: { [key: number]: any } = {
  1: {
    id: 1,
    title: "Weekly Productivity Report",
    type: "Weekly",
    date: "2024-01-15",
    author: "John Doe",
    period: "January 8-14, 2024",
    sections: {
      whatWasDone: `• Completed user authentication module implementation
• Reviewed and merged 5 pull requests from team members
• Conducted code review session with junior developers
• Updated project documentation for API endpoints
• Fixed 3 critical bugs in the payment processing system
• Attended weekly team standup meetings
• Prepared presentation for stakeholder review meeting`,

      whatsNext: `• Implement user profile management features
• Set up automated testing pipeline for CI/CD
• Begin work on notification system integration
• Schedule one-on-one meetings with team members
• Research new frontend framework options
• Plan sprint retrospective for next week
• Prepare quarterly performance review materials`,

      issues: `• Database connection timeout issues affecting user login
• Third-party API rate limiting causing delays in data sync
• Team member availability reduced due to sick leave
• Deployment pipeline failing intermittently on staging environment
• Client feedback on UI/UX changes still pending approval
• Budget constraints may impact planned infrastructure upgrades`,
    },
  },
  2: {
    id: 2,
    title: "Project Alpha Summary",
    type: "Weekly",
    date: "2024-01-12",
    author: "Sarah Johnson",
    period: "January 5-11, 2024",
    sections: {
      whatWasDone: `• Finalized project requirements with stakeholders
• Completed initial system architecture design
• Set up development environment and repositories
• Conducted team kickoff meeting and role assignments
• Created project timeline and milestone definitions
• Established communication protocols and tools
• Reviewed and approved technical specifications`,

      whatsNext: `• Begin development of core application features
• Set up monitoring and logging infrastructure
• Implement user authentication and authorization
• Create database schema and initial migrations
• Establish code review and quality assurance processes
• Schedule regular client check-in meetings
• Plan first sprint demo for stakeholders`,

      issues: `• Delayed approval on final budget allocation
• Unclear requirements for third-party integrations
• Resource allocation conflicts with other projects
• Potential security compliance requirements not yet defined
• Client availability limited for requirement clarifications
• Technical dependencies on external vendor deliverables`,
    },
  },
  3: {
    id: 3,
    title: "Monthly Performance Review",
    type: "Weekly",
    date: "2024-01-01",
    author: "Michael Chen",
    period: "December 25-31, 2023",
    sections: {
      whatWasDone: `• Completed year-end performance evaluations for team
• Finalized Q4 project deliverables and documentation
• Conducted retrospective meetings with all project teams
• Prepared annual performance reports for management
• Organized team holiday celebration and recognition ceremony
• Updated project portfolios and case studies
• Reviewed and archived completed project materials`,

      whatsNext: `• Plan Q1 objectives and key results (OKRs)
• Schedule individual development planning sessions
• Implement feedback from year-end reviews
• Begin recruitment process for new team members
• Set up training programs for skill development
• Plan team building activities for new quarter
• Establish new project priorities and resource allocation`,

      issues: `• Year-end budget reconciliation showing minor overruns
• Some team members requesting role changes or promotions
• Delayed feedback from senior management on strategic direction
• Uncertainty about organizational restructuring plans
• Limited budget for professional development in Q1
• Potential changes to team composition affecting project continuity`,
    },
  },
  4: {
    id: 4,
    title: "Task Completion Analysis",
    type: "Weekly",
    date: "2024-01-08",
    author: "System Generated",
    period: "January 1-7, 2024",
    sections: {
      whatWasDone: `• Analyzed task completion patterns from previous quarter
• Generated automated reports for team productivity metrics
• Identified bottlenecks in current workflow processes
• Documented best practices from high-performing team members
• Created dashboard for real-time task tracking
• Implemented new task categorization system
• Conducted training session on productivity tools`,

      whatsNext: `• Roll out new task management system to all teams
• Create personalized productivity recommendations
• Implement automated workflow optimization suggestions
• Schedule follow-up training sessions for advanced features
• Develop integration with existing project management tools
• Plan quarterly review of task completion methodologies
• Create benchmarking system for team performance comparison`,

      issues: `• Resistance to change from some team members
• Integration challenges with legacy project management systems
• Data quality issues in historical task completion records
• Limited user adoption of new productivity tracking tools
• Inconsistent task categorization across different teams
• Performance impact of new monitoring systems on existing infrastructure`,
    },
  },
}

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  file?: File
}

export function ReportDetailView({ reportId }: ReportDetailProps) {
  const router = useRouter()
  const [reportData, setReportData] = useState(initialReportData)
  const [isEditing, setIsEditing] = useState(false)
  const [editedSections, setEditedSections] = useState({
    whatWasDone: "",
    whatsNext: "",
    issues: "",
  })

  // Chatbot state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I can help you update your weekly report. Try commands like 'Add [item] to what was done' or 'Remove [item] from issues'.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const report = reportData[reportId]

  if (!report) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
        <p className="text-gray-600 mt-2">The requested report could not be found.</p>
        <Button onClick={() => router.push("/reports")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Archive
        </Button>
      </div>
    )
  }

  const typeColors = {
    Weekly: "bg-blue-100 text-blue-800",
    Monthly: "bg-green-100 text-green-800",
    Project: "bg-purple-100 text-purple-800",
  }

  const handleEdit = () => {
    setEditedSections({
      whatWasDone: report.sections.whatWasDone,
      whatsNext: report.sections.whatsNext,
      issues: report.sections.issues,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    setReportData((prev) => ({
      ...prev,
      [reportId]: {
        ...prev[reportId],
        sections: editedSections,
      },
    }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedSections({
      whatWasDone: "",
      whatsNext: "",
      issues: "",
    })
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAttachedFile(file)
    }
  }

  const removeFile = () => {
    setAttachedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleChatbotSend = () => {
    if (!input.trim() && !attachedFile) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input || (attachedFile ? `Uploaded file: ${attachedFile.name}` : ""),
      sender: "user",
      timestamp: new Date(),
      file: attachedFile || undefined,
    }

    setMessages((prev) => [...prev, userMessage])

    // Process chatbot commands
    setTimeout(() => {
      const command = input.toLowerCase()
      let botResponse = "I understand you want to update the report. "
      let updated = false

      if (attachedFile) {
        botResponse = `I can see you've uploaded "${attachedFile.name}". I can help you analyze this file and extract relevant information for your report. What would you like me to do with it?`
      } else {
        // Parse commands to update report sections
        if (command.includes("add") && command.includes("what was done")) {
          const match =
            command.match(/add ['"](.+?)['"] to what was done/i) || command.match(/add (.+?) to what was done/i)
          if (match) {
            const newItem = `• ${match[1]}`
            setReportData((prev) => ({
              ...prev,
              [reportId]: {
                ...prev[reportId],
                sections: {
                  ...prev[reportId].sections,
                  whatWasDone: prev[reportId].sections.whatWasDone + "\n" + newItem,
                },
              },
            }))
            botResponse = `Added "${match[1]}" to the "What was done" section.`
            updated = true
          }
        } else if (command.includes("add") && command.includes("what's next")) {
          const match = command.match(/add ['"](.+?)['"] to what's next/i) || command.match(/add (.+?) to what's next/i)
          if (match) {
            const newItem = `• ${match[1]}`
            setReportData((prev) => ({
              ...prev,
              [reportId]: {
                ...prev[reportId],
                sections: {
                  ...prev[reportId].sections,
                  whatsNext: prev[reportId].sections.whatsNext + "\n" + newItem,
                },
              },
            }))
            botResponse = `Added "${match[1]}" to the "What's next" section.`
            updated = true
          }
        } else if (command.includes("add") && command.includes("issues")) {
          const match = command.match(/add ['"](.+?)['"] to issues/i) || command.match(/add (.+?) to issues/i)
          if (match) {
            const newItem = `• ${match[1]}`
            setReportData((prev) => ({
              ...prev,
              [reportId]: {
                ...prev[reportId],
                sections: {
                  ...prev[reportId].sections,
                  issues: prev[reportId].sections.issues + "\n" + newItem,
                },
              },
            }))
            botResponse = `Added "${match[1]}" to the "Issues" section.`
            updated = true
          }
        }

        if (!updated) {
          botResponse =
            "I can help you update your report. Try commands like:\n• 'Add [item] to what was done'\n• 'Add [item] to what's next'\n• 'Add [item] to issues'"
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInput("")
    setAttachedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/reports")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Archive
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{report.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{report.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{report.author}</span>
                </div>
                <span>Period: {report.period}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={typeColors[report.type as keyof typeof typeColors]}>{report.type}</Badge>
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
                onChange={(e) => setEditedSections((prev) => ({ ...prev, whatWasDone: e.target.value }))}
                className="min-h-[150px] font-mono text-sm"
                placeholder="Enter what was accomplished this week..."
              />
            ) : (
              <div className="whitespace-pre-line text-sm leading-relaxed">{report.sections.whatWasDone}</div>
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
                onChange={(e) => setEditedSections((prev) => ({ ...prev, whatsNext: e.target.value }))}
                className="min-h-[150px] font-mono text-sm"
                placeholder="Enter what's planned for next week..."
              />
            ) : (
              <div className="whitespace-pre-line text-sm leading-relaxed">{report.sections.whatsNext}</div>
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
              <div className="whitespace-pre-line text-sm leading-relaxed">{report.sections.issues}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chatbot Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Report Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[400px]">
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
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      {message.file && (
                        <div className="mt-2 p-2 bg-white/10 rounded text-xs">
                          📎 {message.file.name} ({(message.file.size / 1024).toFixed(1)} KB)
                        </div>
                      )}
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

            {/* File attachment preview */}
            {attachedFile && (
              <div className="mx-4 mb-2 p-2 bg-muted rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Paperclip className="h-4 w-4" />
                  <span>{attachedFile.name}</span>
                  <span className="text-muted-foreground">({(attachedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()} title="Attach file">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Try: 'Add completed user testing to what was done'"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleChatbotSend()}
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
  )
}
