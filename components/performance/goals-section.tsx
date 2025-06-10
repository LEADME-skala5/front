'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, TrendingUp } from 'lucide-react';

const goals = [
  {
    id: 1,
    title: 'Complete React Certification',
    category: 'Skills Development',
    progress: 75,
    status: 'on-track',
    dueDate: '2024-03-15',
    description: 'Finish online React course and pass certification exam',
  },
  {
    id: 2,
    title: 'Increase Team Productivity by 20%',
    category: 'Leadership',
    progress: 60,
    status: 'on-track',
    dueDate: '2024-02-28',
    description: 'Implement new workflow processes and tools',
  },
  {
    id: 3,
    title: 'Launch Mobile App Feature',
    category: 'Project Goals',
    progress: 90,
    status: 'on-track',
    dueDate: '2024-01-30',
    description: 'Complete development and testing of new mobile features',
  },
  {
    id: 4,
    title: 'Reduce Bug Reports by 30%',
    category: 'Productivity',
    progress: 45,
    status: 'at-risk',
    dueDate: '2024-04-01',
    description: 'Improve code quality and testing processes',
  },
];

const statusColors = {
  'on-track': 'bg-green-100 text-green-800',
  'at-risk': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  overdue: 'bg-red-100 text-red-800',
};

const categoryColors = {
  'Skills Development': 'bg-purple-100 text-purple-800',
  Leadership: 'bg-blue-100 text-blue-800',
  'Project Goals': 'bg-green-100 text-green-800',
  Productivity: 'bg-orange-100 text-orange-800',
};

export function GoalsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Current Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Due: {goal.dueDate}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge className={categoryColors[goal.category as keyof typeof categoryColors]}>
                    {goal.category}
                  </Badge>
                  <Badge className={statusColors[goal.status as keyof typeof statusColors]}>
                    {goal.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
