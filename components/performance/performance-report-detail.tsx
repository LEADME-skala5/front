"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Download,
  Share,
  Star,
  TrendingUp,
  Target,
  Users,
  FileText,
  MessageSquare,
} from "lucide-react";

interface PerformanceReportDetailProps {
  reportId: number;
}

// Updated reportData with modern content structure
const reportData: { [key: number]: any } = {
  1: {
    id: 1,
    type: "year-end",
    title: "2023 Annual Performance Report",
    employee: {
      name: "박준호",
      position: "Senior PM",
      department: "Product Management",
      period: "2023-01-01 ~ 2023-12-31",
      evaluator: "Director of Product & Performance AI",
    },
    finalScore: 4.6,
    skValues: [
      {
        category: "User Focus",
        score: 4.5,
        summary:
          "Consistently demonstrates user-centered thinking across all initiatives",
      },
      {
        category: "Passionate",
        score: 4.7,
        summary:
          "Shows exceptional enthusiasm for product development and team success",
      },
      {
        category: "Professional",
        score: 4.6,
        summary:
          "Maintains high standards of expertise and continues skill development",
      },
      {
        category: "Proactive",
        score: 4.8,
        summary:
          "Takes initiative in identifying opportunities and addressing challenges",
      },
      {
        category: "People",
        score: 4.4,
        summary:
          "Builds strong relationships across teams and manages stakeholder expectations",
      },
    ],
    quarterlyPerformance: [
      {
        quarter: "Q1",
        rating: "2nd",
        summary:
          "Successfully launched new platform features with positive user feedback",
      },
      {
        quarter: "Q2",
        rating: "3rd",
        summary:
          "Led cross-functional initiative to improve system performance",
      },
      {
        quarter: "Q3",
        rating: "1st",
        summary:
          "Achieved 100% of quarterly OKRs with exceptional stakeholder satisfaction",
      },
      {
        quarter: "Q4",
        rating: "2nd",
        summary:
          "Completed annual strategy planning with clear execution roadmap",
      },
    ],
    achievements: [
      "Led successful product strategy resulting in 25% user growth",
      "Implemented new development processes improving team efficiency by 30%",
      "Mentored 2 junior PMs and contributed to hiring 3 new team members",
    ],
    peerFeedback: [
      {
        type: "positive",
        keywords: [
          "Strategic thinking",
          "Leadership",
          "Accountability",
          "Organization",
          "Communication",
        ],
      },
      {
        type: "negative",
        keywords: [
          "Technical depth",
          "Documentation thoroughness",
          "Meeting efficiency",
        ],
      },
    ],
    growthSuggestions: [
      "Enhance technical knowledge in key platform areas",
      "Develop more structured documentation processes",
      "Improve meeting facilitation and time management skills",
    ],
    finalComment:
      "박준호 has been a cornerstone of the Product Management team throughout 2023, consistently driving strategic initiatives and delivering exceptional results.",
  },
  2: {
    id: 2,
    type: "quarterly",
    title: "Q3 2023 Feedback Report",
    employee: {
      name: "홍길동",
      position: "Senior Developer",
      department: "Product Development",
      period: "2023-07-01 ~ 2023-09-30",
      evaluator: "Team Lead & Performance AI",
    },
    finalScore: 4.5,
    teamGoals: [
      {
        goal: "Platform Stability",
        achievement: "Assigned",
        contribution: "Critical contributor (high impact)",
      },
      {
        goal: "Customer Experience",
        achievement: "Assigned",
        contribution: "High level contribution",
      },
      {
        goal: "Internal Process Improvement",
        achievement: "Assigned",
        contribution: "Steady performance on assigned tasks",
      },
      {
        goal: "New Feature Development",
        achievement: "Not assigned",
        contribution: "-",
      },
    ],
    achievements: [
      "Achieved 0 downtime incidents (prevented 3 potential issues) → 100% SLA maintained",
      "Customer satisfaction rating of 4.7/5 → Highest rating from client stakeholders",
      "Documented 2 critical issues and solutions → Added to team training materials",
    ],
    peerFeedback: [
      {
        type: "positive",
        keywords: [
          "Trustworthy",
          "Initiative",
          "Team cohesion",
          "Responsibility",
          "Organization",
        ],
      },
      {
        type: "negative",
        keywords: [
          "Expression",
          "Conciseness",
          "Summarization",
          "Communication",
        ],
      },
    ],
    workAttitude: [
      "Proactively improved incident response protocols and implemented them team-wide",
      "Consistently provides comprehensive updates in weekly meetings",
    ],
    growthSuggestions: [
      "Focus on more concise communication with external stakeholders",
      "Develop presentation skills for better message delivery",
      "Expand into strategic thinking through targeted training",
    ],
    finalComment:
      "홍길동 has been a core contributor to team objectives, demonstrating high performance in delivering results with strong potential for leadership roles.",
  },
};

export function PerformanceReportDetail({
  reportId,
}: PerformanceReportDetailProps) {
  const router = useRouter();
  const report = reportData[reportId];

  if (!report) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
        <p className="text-gray-600 mt-2">
          The requested performance report could not be found.
        </p>
        <Button onClick={() => router.push("/performance")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Performance
        </Button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/performance")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Performance
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
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {getInitials(report.employee.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-gray-900">
                {report.title}
              </CardTitle>
              <p className="text-lg text-gray-600">
                {report.employee.name} - {report.employee.position}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{report.employee.department}</span>
                <span>{report.employee.period}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Evaluator: {report.employee.evaluator}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  {report.finalScore.toFixed(1)}
                </span>
                <span className="text-gray-500">/5.0</span>
              </div>
              <p className="text-sm text-gray-600">Overall Score</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Metrics */}
      {report.skValues && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Performance Evaluation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {report.skValues.map((item: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {item.category}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="font-bold text-primary">
                        {item.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{item.summary}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Goals & Quarterly Performance */}
      <div className="grid grid-cols-1 gap-6">
        {report.teamGoals && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center w-full justify-start gap-2">
                <Target className="h-5 w-5 text-primary" />
                Team Goals Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.teamGoals.map((goal: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{goal.goal}</h4>
                      <Badge
                        variant={
                          goal.achievement === "Assigned"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {goal.achievement}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{goal.contribution}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {report.quarterlyPerformance && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Quarterly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.quarterlyPerformance.map(
                  (quarter: any, index: number) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">
                          {quarter.quarter}
                        </h4>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary"
                        >
                          {quarter.rating}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{quarter.summary}</p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Key Achievements */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Key Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.achievements.map((achievement: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{achievement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Peer Feedback */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Peer Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.peerFeedback.map((feedback: any, index: number) => (
              <div key={index}>
                <h4 className="font-medium text-gray-900 mb-2 capitalize">
                  {feedback.type === "positive"
                    ? "Strengths"
                    : "Areas for Improvement"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {feedback.keywords.map(
                    (keyword: string, keyIndex: number) => (
                      <Badge
                        key={keyIndex}
                        variant="secondary"
                        className={
                          feedback.type === "positive"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                        }
                      >
                        {keyword}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work Attitude & Growth Suggestions */}
      <div className="grid grid-cols-1 gap-6">
        {report.workAttitude && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Work Attitude
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.workAttitude.map((attitude: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{attitude}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Growth Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.growthSuggestions.map(
                (suggestion: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Final Comments */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Final Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-gray-700 leading-relaxed">
              {report.finalComment}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
