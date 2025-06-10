'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, Target } from 'lucide-react';

interface EvaluationCriteria {
  id: string;
  title: string;
  description: string;
  selected: boolean;
}

export function EvaluationSetup() {
  const [prompt, setPrompt] = useState('');
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const generateCriteria = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setShowValidation(false);

    // Simulate AI generation with mock data
    setTimeout(() => {
      const mockCriteria: EvaluationCriteria[] = [
        {
          id: '1',
          title: 'Technical Excellence',
          description: 'Demonstrates strong technical skills and delivers high-quality code',
          selected: false,
        },
        {
          id: '2',
          title: 'Collaboration & Communication',
          description: 'Works effectively with team members and communicates clearly',
          selected: false,
        },
        {
          id: '3',
          title: 'Problem Solving',
          description: 'Identifies issues proactively and develops effective solutions',
          selected: false,
        },
        {
          id: '4',
          title: 'Initiative & Leadership',
          description: 'Takes ownership of tasks and guides others when needed',
          selected: false,
        },
        {
          id: '5',
          title: 'Adaptability',
          description: 'Adjusts well to changing requirements and learns new technologies',
          selected: false,
        },
        {
          id: '6',
          title: 'Time Management',
          description: 'Meets deadlines consistently and manages workload effectively',
          selected: false,
        },
        {
          id: '7',
          title: 'Innovation',
          description: 'Brings creative ideas and improves existing processes',
          selected: false,
        },
        {
          id: '8',
          title: 'Mentoring',
          description: 'Helps junior team members grow and develop their skills',
          selected: false,
        },
      ];

      setCriteria(mockCriteria);
      setIsGenerating(false);
    }, 2000);
  };

  const toggleCriteria = (id: string) => {
    setCriteria((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
    setShowValidation(false);
  };

  const getSelectedCount = () => criteria.filter((item) => item.selected).length;

  const handleSave = () => {
    const selectedCount = getSelectedCount();
    if (selectedCount < 3) {
      setShowValidation(true);
      return;
    }

    // Save to mock state
    const selectedCriteria = criteria.filter((item) => item.selected);
    localStorage.setItem('evaluationCriteria', JSON.stringify(selectedCriteria));
    localStorage.setItem('evaluationPrompt', prompt);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-6 w-6" />
        <h1 className="text-3xl font-bold">성과 관리 기준 설정</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>성과 관리 기준을 설정해주세요</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              이번 분기의 평가를 어떤 방식으로 하실 건지 상세히 적어주세요.
            </label>
            <Textarea
              placeholder="예시) 나는 얼마나 성실한지를 기준으로 평가하고 싶어
             or 원하는 구체적인 기준이 있다면 추가적으로 적어주세요"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <Button
            onClick={generateCriteria}
            disabled={!prompt.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                평가기준 생성중 ...
              </>
            ) : (
              '평가기준 생성'
            )}
          </Button>
        </CardContent>
      </Card>

      {criteria.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>다음 중 원하는 평가 기준을 골라주세요</CardTitle>
            <p className="text-sm text-muted-foreground">
              3가지 이상 골라야 평가가 가능합니다. 선택: {getSelectedCount()}/{criteria.length}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {showValidation && (
              <Alert variant="destructive">
                <AlertDescription>3가지 이상 선택해주셔야 저장이 가능합니다.</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {criteria.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    item.selected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleCriteria(item.id)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox checked={item.selected} onChange={() => toggleCriteria(item.id)} />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSave} disabled={getSelectedCount() < 3}>
                {isSaved ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    정상적으로 저장되었습니다
                  </>
                ) : (
                  '평가 기준 제출'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
