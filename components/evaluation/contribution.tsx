"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Save, BarChart3 } from "lucide-react";

interface Task {
  id: string;
  name: string;
  members: string[];
}

interface ContributionData {
  [taskId: string]: {
    [memberName: string]: number;
  };
}

const mockTasks: Task[] = [
  {
    id: "1",
    name: "User Authentication System",
    members: ["김민수", "이지영", "박준호", "You"],
  },
  {
    id: "2",
    name: "Dashboard UI Implementation",
    members: ["이지영", "최수진", "You"],
  },
  {
    id: "3",
    name: "API Integration",
    members: ["김민수", "박준호", "You"],
  },
];

export function ContributionEvaluation() {
  const router = useRouter();
  const [contributions, setContributions] = useState<ContributionData>({});
  const [validationErrors, setValidationErrors] = useState<{
    [taskId: string]: string;
  }>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load saved contributions from localStorage
    const saved = localStorage.getItem("contributionEvaluations");
    if (saved) {
      setContributions(JSON.parse(saved));
    } else {
      // Initialize with default values
      const initialContributions: ContributionData = {};
      mockTasks.forEach((task) => {
        initialContributions[task.id] = {};
        const defaultValue = Math.floor(100 / task.members.length);
        task.members.forEach((member, index) => {
          initialContributions[task.id][member] =
            index === 0
              ? 100 - defaultValue * (task.members.length - 1)
              : defaultValue;
        });
      });
      setContributions(initialContributions);
    }
  }, []);

  const updateContribution = (
    taskId: string,
    memberName: string,
    value: number
  ) => {
    const newContributions = {
      ...contributions,
      [taskId]: {
        ...contributions[taskId],
        [memberName]: value,
      },
    };

    setContributions(newContributions);
    localStorage.setItem(
      "contributionEvaluations",
      JSON.stringify(newContributions)
    );

    // Clear validation error for this task
    if (validationErrors[taskId]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[taskId];
        return updated;
      });
    }
  };

  const getTaskTotal = (taskId: string) => {
    const taskContributions = contributions[taskId] || {};
    return Object.values(taskContributions).reduce(
      (sum, value) => sum + value,
      0
    );
  };

  const validateContributions = () => {
    const errors: { [taskId: string]: string } = {};

    mockTasks.forEach((task) => {
      const total = getTaskTotal(task.id);
      if (Math.abs(total - 100) > 0.1) {
        errors[task.id] = `Total must equal 100% (currently ${total.toFixed(
          1
        )}%)`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateContributions()) {
      return;
    }

    // Save all evaluation data
    localStorage.setItem(
      "contributionEvaluations",
      JSON.stringify(contributions)
    );
    setIsSaved(true);

    // Show success message
    setTimeout(() => {
      setIsSaved(false);
      // In a real app, this would redirect to a success page or dashboard
      router.push("/performance");
    }, 2000);
  };

  const handlePrevious = () => {
    router.push("/evaluation/peer");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-6 w-6" />
        <h1 className="text-3xl font-bold">기여도 평가</h1>
      </div>

      <div className="space-y-6">
        {mockTasks.map((task) => {
          const taskContributions = contributions[task.id] || {};
          const total = getTaskTotal(task.id);
          const hasError = validationErrors[task.id];

          return (
            <Card key={task.id} className={hasError ? "border-red-300" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{task.name}</span>
                  <span
                    className={`text-sm ${
                      Math.abs(total - 100) < 0.1
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    총합: {total.toFixed(1)}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hasError && (
                  <Alert variant="destructive">
                    <AlertDescription>{hasError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  {task.members.map((member) => {
                    const value = taskContributions[member] || 0;

                    return (
                      <div key={member} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">{member}</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={value}
                              onChange={(e) =>
                                updateContribution(
                                  task.id,
                                  member,
                                  Number(e.target.value)
                                )
                              }
                              className="w-20 text-center"
                            />
                            <span className="text-sm text-muted-foreground">
                              %
                            </span>
                          </div>
                        </div>
                        <Slider
                          value={[value]}
                          max={100}
                          step={1}
                          className="w-full pointer-events-none opacity-75"
                          disabled
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Progress bar showing total */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>총 기여도 합계 </span>
                    <span>{total.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        Math.abs(total - 100) < 0.1
                          ? "bg-green-500"
                          : total > 100
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                      style={{ width: `${Math.min(total, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          동료 평가
        </Button>

        <Button
          onClick={handleSave}
          disabled={Object.keys(validationErrors).length > 0}
        >
          {isSaved ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              저장되었습니다
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              평가 저장
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
