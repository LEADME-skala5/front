'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, ChevronRight, ChevronLeft } from 'lucide-react';

interface Peer {
  userId: number;
  name: string;
  task: Task[];
}

interface Task {
  taskId: number;
  taskName: string;
}

interface PeerEvaluationKeyword {
  id: string;
  keyword: string;
  isPositive: boolean;
}

interface Teammate {
  id: string;
  name: string;
  project: string;
}

export function PeerEvaluation({
  initialKeywords,
  peers,
}: {
  initialKeywords: PeerEvaluationKeyword[];
  peers: Peer[];
}) {
  const MIN_SELECTED_KEYWORD_COUNT = 5;
  const router = useRouter();
  const [currentTeammateIndex, setCurrentTeammateIndex] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState<{
    [teammateId: string]: string[];
  }>({});
  const [showValidation, setShowValidation] = useState(false);

  // Convert peers to teammate format
  const teammates: Teammate[] = peers.map((peer) => ({
    id: peer.userId.toString(),
    name: peer.name,
    project: peer.task.map((t) => t.taskName).join(' • '),
  }));

  const currentTeammate = teammates[currentTeammateIndex];
  const currentSelections = selectedKeywords[currentTeammate?.id] || [];

  useEffect(() => {
    // Load saved evaluations from localStorage
    const saved = localStorage.getItem('peerEvaluations');
    if (saved) {
      setSelectedKeywords(JSON.parse(saved));
    }
  }, []);

  const toggleKeyword = (keywordId: string) => {
    const teammateId = currentTeammate.id;
    const current = selectedKeywords[teammateId] || [];

    let updated: string[];
    if (current.includes(keywordId)) {
      updated = current.filter((id) => id !== keywordId);
    } else if (current.length < MIN_SELECTED_KEYWORD_COUNT) {
      updated = [...current, keywordId];
    } else {
      return; // Don't allow more than 5 selections
    }

    const newSelections = {
      ...selectedKeywords,
      [teammateId]: updated,
    };

    setSelectedKeywords(newSelections);
    localStorage.setItem('peerEvaluations', JSON.stringify(newSelections));
    setShowValidation(false);
  };

  const handleNext = () => {
    if (currentSelections.length !== MIN_SELECTED_KEYWORD_COUNT) {
      setShowValidation(true);
      return;
    }

    if (currentTeammateIndex < teammates.length - 1) {
      setCurrentTeammateIndex(currentTeammateIndex + 1);
      setShowValidation(false);
    } else {
      // All teammates evaluated, go to contribution page
      router.push('/evaluation/contribution');
    }
  };

  const handlePrevious = () => {
    if (currentTeammateIndex > 0) {
      setCurrentTeammateIndex(currentTeammateIndex - 1);
      setShowValidation(false);
    }
  };

  const getKeywordsByCategory = (isPositive: boolean) => {
    return initialKeywords.filter((keyword) => keyword.isPositive === isPositive);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6" />
        <h1 className="text-3xl font-bold"> 동료 평가 </h1>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          평가 진행 중 {currentTeammateIndex + 1} of {teammates.length}
        </div>
        <div className="flex gap-2">
          {teammates.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentTeammateIndex
                  ? 'bg-primary'
                  : index < currentTeammateIndex
                    ? 'bg-green-500'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-xl">{currentTeammate.name}</h2>
              <p className="text-sm text-muted-foreground">{currentTeammate.project}</p>
            </div>
            <Badge variant="outline">선택된 키워드 {currentSelections.length}/5</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {showValidation && (
            <Alert variant="destructive">
              <AlertDescription>적어도 5개 이상의 키워드를 선택해주세요</AlertDescription>
            </Alert>
          )}

          {/* Positive Keywords */}
          <div>
            <h3 className="font-medium mb-3 text-green-700">칭찬할 부분</h3>
            <div className="flex flex-wrap gap-2">
              {getKeywordsByCategory(true).map((keyword) => (
                <Button
                  key={keyword.id}
                  variant={currentSelections.includes(keyword.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleKeyword(keyword.id)}
                  className={
                    currentSelections.includes(keyword.id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'hover:bg-green-50 hover:border-green-300'
                  }
                >
                  {keyword.keyword}
                </Button>
              ))}
            </div>
          </div>

          {/* Negative Keywords */}
          <div>
            <h3 className="font-medium mb-3 text-orange-700">개선이 필요한 부분</h3>
            <div className="flex flex-wrap gap-2">
              {getKeywordsByCategory(false).map((keyword) => (
                <Button
                  key={keyword.id}
                  variant={currentSelections.includes(keyword.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleKeyword(keyword.id)}
                  className={
                    currentSelections.includes(keyword.id)
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'hover:bg-orange-50 hover:border-orange-300'
                  }
                >
                  {keyword.keyword}
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentTeammateIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              이전 평가
            </Button>

            <Button onClick={handleNext} disabled={currentSelections.length !== 5}>
              {currentTeammateIndex === teammates.length - 1 ? '평가 완료' : '다음 평가'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
