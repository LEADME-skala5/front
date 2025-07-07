'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, EyeOff, Save } from 'lucide-react';

export function ProfileSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '권채영',
    userId: 'SK091',
    password: 'hashed_password_91',
    teamsEmail: 'user091@skala.co.kr',
    slackEmail: 'user091@skala.co.kr',
    localDirectory: 'C:\\Users\\user091\\Documents',
    department: 'ESG전략담당',
    division: 'ESG전략담당',
    organization: 'ESG팀',
    position: '팀장',
    careerLevel: 'CL4',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 원래 값 복구하고 싶다면 초기값 백업해서 관리 필요
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>프로필 설정</CardTitle>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>프로필 수정</Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                저장
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                취소
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" />
            <AvatarFallback>HD</AvatarFallback>
          </Avatar>
          {isEditing && <Button variant="outline">사진 변경</Button>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* 사번 */}
          <div className="space-y-2">
            <Label htmlFor="userId">사번</Label>
            <Input
              id="userId"
              value={formData.userId}
              onChange={(e) => handleInputChange('userId', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={!isEditing}
              />
              {isEditing && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          {/* Teams 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="teamsEmail">Teams 이메일</Label>
            <Input
              id="teamsEmail"
              type="email"
              value={formData.teamsEmail}
              onChange={(e) => handleInputChange('teamsEmail', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* Slack 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="slackEmail">Slack 이메일</Label>
            <Input
              id="slackEmail"
              type="email"
              value={formData.slackEmail}
              onChange={(e) => handleInputChange('slackEmail', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* 로컬 경로 */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="localDirectory">로컬 파일 경로</Label>
            <Input
              id="localDirectory"
              value={formData.localDirectory}
              onChange={(e) => handleInputChange('localDirectory', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* 부문 */}
          <div className="space-y-2">
            <Label htmlFor="department">부문</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('department', value)}
                value={formData.department}
              >
                <SelectTrigger>
                  <SelectValue placeholder="부문을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="at-service">AT서비스부문</SelectItem>
                  <SelectItem value="Strategic-business">금융/전략사업부문</SelectItem>
                  <SelectItem value="manufacturing">제조서비스부문</SelectItem>
                  <SelectItem value="cloud">Cloud부문</SelectItem>
                  <SelectItem value="strategic-plan">전략기획부문</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.department} disabled />
            )}
          </div>

          {/* 본부 */}
          <div className="space-y-2">
            <Label htmlFor="division">본부</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('division', value)}
                value={formData.division}
              >
                <SelectTrigger>
                  <SelectValue placeholder="본부를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="at-2">AT서비스2본부</SelectItem>
                  <SelectItem value="manufacturing">제조서비스1본부</SelectItem>
                  <SelectItem value="cloud">Cloud사업본부</SelectItem>
                  <SelectItem value="esg">ESG전략담당</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.division} disabled />
            )}
          </div>

          {/* 조직 */}
          <div className="space-y-2">
            <Label htmlFor="organization">조직</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('organization', value)}
                value={formData.organization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="조직을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work-force-1">Workforce1팀</SelectItem>
                  <SelectItem value="strategy-4">전략개발4팀</SelectItem>
                  <SelectItem value="dt-service-3">DT서비스3팀</SelectItem>
                  <SelectItem value="cloud-3">Cloud개발3팀</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.organization} disabled />
            )}
          </div>

          {/* 직위 */}
          <div className="space-y-2">
            <Label htmlFor="position">직위</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('position', value)}
                value={formData.position}
              >
                <SelectTrigger>
                  <SelectValue placeholder="직위를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">매니저</SelectItem>
                  <SelectItem value="manager2">팀장</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.position} disabled />
            )}
          </div>

          {/* 커리어레벨 */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="careerLevel">커리어레벨</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('careerLevel', value)}
                value={formData.careerLevel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="커리어레벨을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cl1">CL1</SelectItem>
                  <SelectItem value="cl2">CL2</SelectItem>
                  <SelectItem value="cl3">CL3</SelectItem>
                  <SelectItem value="cl4">CL4</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.careerLevel} disabled />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
