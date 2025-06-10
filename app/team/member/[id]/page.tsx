'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Calendar, Star, TrendingUp, Briefcase } from 'lucide-react';

// Mock detailed member data
const mockMemberDetails: { [key: string]: any } = {
  '1': {
    id: '1',
    name: '김민수',
    role: 'Senior Developer',
    email: 'kim.minsu@company.com',
    projects: ['Project Alpha', 'API Integration'],
    performanceScore: 4.5,
    lastEvaluationDate: '2024-01-15',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    achievements: [
      'Led successful migration to microservices architecture',
      'Mentored 3 junior developers',
      'Reduced API response time by 40%',
    ],
    recentFeedback: [
      {
        date: '2024-01-15',
        score: 4.5,
        comment: 'Excellent technical leadership and problem-solving skills.',
      },
      {
        date: '2023-12-15',
        score: 4.3,
        comment: 'Strong performance in project delivery and team collaboration.',
      },
      {
        date: '2023-11-15',
        score: 4.6,
        comment: 'Outstanding contribution to system optimization.',
      },
    ],
  },
  '2': {
    id: '2',
    name: '이지영',
    role: 'UI/UX Designer',
    email: 'lee.jiyoung@company.com',
    projects: ['Project Alpha', 'Dashboard UI'],
    performanceScore: 4.8,
    lastEvaluationDate: '2024-01-12',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
    achievements: [
      'Redesigned user interface increasing user satisfaction by 35%',
      'Conducted comprehensive user research for 3 major features',
      'Created design system adopted across all products',
    ],
    recentFeedback: [
      {
        date: '2024-01-12',
        score: 4.8,
        comment: 'Exceptional design thinking and user-centered approach.',
      },
      {
        date: '2023-12-12',
        score: 4.7,
        comment: 'Creative solutions and excellent stakeholder communication.',
      },
      {
        date: '2023-11-12',
        score: 4.9,
        comment: 'Outstanding design quality and attention to detail.',
      },
    ],
  },
};

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isTeamLead, setIsTeamLead] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const memberId = params?.id as string;
  const member = mockMemberDetails[memberId];

  useEffect(() => {
    // Check if user is team lead
    const userRole = localStorage.getItem('userRole') || 'member';
    if (userRole !== 'teamlead') {
      router.push('/dashboard');
      return;
    }
    setIsTeamLead(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  if (!isTeamLead || !member) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Member Not Found</h2>
        <p className="text-gray-600 mt-2">The requested team member could not be found.</p>
        <Button onClick={() => router.push('/team/overview')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          뒤로 가기
        </Button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/team/overview')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          뒤로 가기
        </Button>
      </div>

      {/* Member Profile */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarImage src={member.avatar || '/placeholder.svg'} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-gray-900">{member.name}</CardTitle>
              <p className="text-lg text-gray-600">{member.role}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Last evaluation: {new Date(member.lastEvaluationDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  {member.performanceScore.toFixed(1)}
                </span>
                <span className="text-gray-500">/5.0</span>
              </div>
              <p className="text-sm text-gray-600">Performance Score</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Projects */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              최근 프로젝트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {member.projects.map((project: string, index: number) => (
                <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-medium text-gray-900">{project}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Key Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {member.achievements.map((achievement: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{achievement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>최근 성과 관리 피드백</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {member.recentFeedback.map((feedback: any, index: number) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.date).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">{feedback.score.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-gray-700">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
