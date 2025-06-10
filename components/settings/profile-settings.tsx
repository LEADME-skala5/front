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
  const [formData, setFormData] = useState({
    name: 'John Doe',
    userId: 'john.doe',
    password: 'password123',
    teamsEmail: 'john.doe@company.com',
    slackEmail: 'john.doe@company.com',
    localDirectory: 'C:\\Users\\JohnDoe\\Documents',
    department: 'engineering',
    division: 'technology',
    organization: 'team-alpha',
    position: 'senior',
    careerLevel: 'senior',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // In a real app, this would make an API call
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values if needed
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
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {isEditing && <Button variant="outline">Change Photo</Button>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* User ID */}
          <div className="space-y-2">
            <Label htmlFor="userId">사번</Label>
            <Input
              id="userId"
              value={formData.userId}
              onChange={(e) => handleInputChange('userId', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* Password */}
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

          {/* Teams Email */}
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

          {/* Slack Email */}
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

          {/* Local Directory Path */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="localDirectory">로컬 디렉토리 경로</Label>
            <Input
              id="localDirectory"
              value={formData.localDirectory}
              onChange={(e) => handleInputChange('localDirectory', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">부문</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('department', value)}
                value={formData.department}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.department} disabled />
            )}
          </div>

          {/* Division */}
          <div className="space-y-2">
            <Label htmlFor="division">본부</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('division', value)}
                value={formData.division}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology Division</SelectItem>
                  <SelectItem value="business">Business Division</SelectItem>
                  <SelectItem value="operations">Operations Division</SelectItem>
                  <SelectItem value="strategy">Strategy Division</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.division} disabled />
            )}
          </div>

          {/* Organization */}
          <div className="space-y-2">
            <Label htmlFor="organization">조직</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('organization', value)}
                value={formData.organization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team-alpha">Team Alpha</SelectItem>
                  <SelectItem value="team-beta">Team Beta</SelectItem>
                  <SelectItem value="team-gamma">Team Gamma</SelectItem>
                  <SelectItem value="team-delta">Team Delta</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.organization} disabled />
            )}
          </div>

          {/* Position */}
          <div className="space-y-2">
            <Label htmlFor="position">직위</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('position', value)}
                value={formData.position}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="associate">Associate</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={formData.position} disabled />
            )}
          </div>

          {/* Career Level */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="careerLevel">커리어레벨</Label>
            {isEditing ? (
              <Select
                onValueChange={(value) => handleInputChange('careerLevel', value)}
                value={formData.careerLevel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select career level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (신입)</SelectItem>
                  <SelectItem value="junior">Junior (주니어)</SelectItem>
                  <SelectItem value="mid">Mid Level (중급)</SelectItem>
                  <SelectItem value="senior">Senior Level (시니어)</SelectItem>
                  <SelectItem value="principal">Principal (프린시펄)</SelectItem>
                  <SelectItem value="executive">Executive (임원)</SelectItem>
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
