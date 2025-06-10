'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Save, BarChart3 } from 'lucide-react';

interface Peer {
  userId: number;
  name: string;
  task: Task[];
}

interface Task {
  taskId: number;
  taskName: string;
}

interface ContributionData {
  [taskId: string]: {
    [userId: string]: number;
  };
}

interface ContributionEvaluationData {
  taskId: number;
  evaluatorUserId: number;
  targetUserId: number;
  score: number;
}

interface TaskMember {
  userId: number;
  isCurrentUser?: boolean;
  name: string;
}

interface TaskData {
  taskId: number;
  taskName: string;
  members: TaskMember[];
}

interface CurrentUser {
  userId: number;
  name: string;
}

// Mock current user data -
// TODO: Replace with actual state management (Zustand, Redux, etc.)
const mockCurrentUser: CurrentUser = {
  userId: 1,
  name: '나',
};

export function ContributionEvaluation({ peers }: { peers: Peer[] }) {
  const router = useRouter();
  const [contributions, setContributions] = useState<ContributionData>({});
  const [validationErrors, setValidationErrors] = useState<{
    [taskId: string]: string;
  }>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current user - TODO: Replace with actual state management
  const getCurrentUser = (): CurrentUser => {
    // In real app, this would come from Zustand, Redux, or Context
    return mockCurrentUser;
  };

  const currentUser = getCurrentUser();

  // Transform peers data to tasks with members (including current user)
  const tasks = useMemo((): TaskData[] => {
    const taskMap = new Map<number, TaskData>();

    // First, add tasks from peers
    peers.forEach((peer) => {
      peer.task.forEach((task) => {
        if (!taskMap.has(task.taskId)) {
          taskMap.set(task.taskId, {
            taskId: task.taskId,
            taskName: task.taskName,
            members: [],
          });
        }

        const taskData = taskMap.get(task.taskId)!;
        if (!taskData.members.find((m) => m.userId === peer.userId)) {
          taskData.members.push({
            userId: peer.userId,
            name: peer.name,
            isCurrentUser: false,
          });
        }
      });
    });

    // Add current user to the beginning of each task's members array
    taskMap.forEach((taskData) => {
      // Remove current user if already exists (just in case)
      taskData.members = taskData.members.filter((m) => m.userId !== currentUser.userId);

      // Add current user at the beginning
      taskData.members.unshift({
        userId: currentUser.userId,
        name: currentUser.name,
        isCurrentUser: true,
      });
    });

    return Array.from(taskMap.values());
  }, [peers, currentUser]);

  useEffect(() => {
    // Load saved contributions from localStorage
    const saved = localStorage.getItem('contributionEvaluations');
    if (saved) {
      setContributions(JSON.parse(saved));
    } else {
      // Initialize with default values
      const initialContributions: ContributionData = {};
      tasks.forEach((task) => {
        initialContributions[task.taskId.toString()] = {};
        const defaultValue = Math.floor(100 / task.members.length);
        task.members.forEach((member, index) => {
          initialContributions[task.taskId.toString()][member.userId.toString()] =
            index === 0 ? 100 - defaultValue * (task.members.length - 1) : defaultValue;
        });
      });
      setContributions(initialContributions);
    }
  }, [tasks]);

  const updateContribution = (taskId: string, userId: string, value: number) => {
    const newContributions = {
      ...contributions,
      [taskId]: {
        ...contributions[taskId],
        [userId]: value,
      },
    };

    setContributions(newContributions);
    localStorage.setItem('contributionEvaluations', JSON.stringify(newContributions));

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
    return Object.values(taskContributions).reduce((sum, value) => sum + value, 0);
  };

  const validateContributions = () => {
    const errors: { [taskId: string]: string } = {};

    tasks.forEach((task) => {
      const total = getTaskTotal(task.taskId.toString());
      if (Math.abs(total - 100) > 0.1) {
        errors[task.taskId.toString()] = `Total must equal 100% (currently ${total.toFixed(1)}%)`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const prepareApiData = (): ContributionEvaluationData[] => {
    const apiData: ContributionEvaluationData[] = [];

    tasks.forEach((task) => {
      const taskContributions = contributions[task.taskId.toString()] || {};

      task.members.forEach((member) => {
        const score = taskContributions[member.userId.toString()] || 0;
        apiData.push({
          taskId: task.taskId,
          evaluatorUserId: currentUser.userId,
          targetUserId: member.userId,
          score: Math.round(score), // Round to integer
        });
      });
    });

    return apiData;
  };

  const submitEvaluations = async (apiData: ContributionEvaluationData[]) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contribution-evaluation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit evaluations');
      }

      return true;
    } catch (error) {
      console.error('Error submitting evaluations:', error);
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateContributions()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const apiData = prepareApiData();

      // Submit to API
      const success = await submitEvaluations(apiData);

      if (success) {
        // Save to localStorage as backup
        localStorage.setItem('contributionEvaluations', JSON.stringify(contributions));
        setIsSaved(true);

        // Show success message and redirect
        setTimeout(() => {
          setIsSaved(false);
          router.push('/performance');
        }, 2000);
      } else {
        // Handle error - you might want to show an error toast here
        console.error('Failed to submit evaluations');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    router.push('/evaluation/peer');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-6 w-6" />
        <h1 className="text-3xl font-bold">기여도 평가</h1>
      </div>

      <div className="space-y-6">
        {tasks.map((task) => {
          const taskContributions = contributions[task.taskId.toString()] || {};
          const total = getTaskTotal(task.taskId.toString());
          const hasError = validationErrors[task.taskId.toString()];

          return (
            <Card key={task.taskId} className={hasError ? 'border-red-300' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{task.taskName}</span>
                  <span
                    className={`text-sm ${
                      Math.abs(total - 100) < 0.1 ? 'text-green-600' : 'text-red-600'
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
                    const value = taskContributions[member.userId.toString()] || 0;

                    return (
                      <div key={member.userId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label
                            className={`font-medium ${
                              member.isCurrentUser ? 'text-blue-600 font-semibold' : ''
                            }`}
                          >
                            {member.name}
                            {member.isCurrentUser && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                본인
                              </span>
                            )}
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={value}
                              onChange={(e) =>
                                updateContribution(
                                  task.taskId.toString(),
                                  member.userId.toString(),
                                  Number(e.target.value)
                                )
                              }
                              className={`w-20 text-center ${
                                member.isCurrentUser ? 'border-blue-300 focus:border-blue-500' : ''
                              }`}
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <Slider
                          value={[value]}
                          max={100}
                          step={1}
                          className={`w-full pointer-events-none opacity-75 ${
                            member.isCurrentUser ? 'opacity-90' : ''
                          }`}
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
                          ? 'bg-green-500'
                          : total > 100
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
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
          disabled={Object.keys(validationErrors).length > 0 || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Save className="mr-2 h-4 w-4 animate-spin" />
              제출 중...
            </>
          ) : isSaved ? (
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
