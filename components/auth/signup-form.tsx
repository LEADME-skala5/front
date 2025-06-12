'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import Link from 'next/link';

export function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    password: '',
    teamsEmail: '',
    slackEmail: '',
    localDirectory: '',
    department: '',
    division: '',
    organization: '',
    position: '',
    careerLevel: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = [
      'name',
      'userId',
      'password',
      'teamsEmail',
      'slackEmail',
      'localDirectory',
      'department',
      'division',
      'organization',
      'position',
      'careerLevel',
    ];

    requiredFields.forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key] = `${key} is required`;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.teamsEmail && !emailRegex.test(formData.teamsEmail)) {
      newErrors.teamsEmail = 'Please enter a valid email address';
    }
    if (formData.slackEmail && !emailRegex.test(formData.slackEmail)) {
      newErrors.slackEmail = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const departmentMap: Record<string, number> = {
    engineering: 1,
    product: 2,
    design: 3,
    marketing: 4,
    sales: 5,
    hr: 6,
    finance: 7,
  };

  const divisionMap: Record<string, number> = {
    technology: 1,
    business: 2,
    operations: 3,
    strategy: 4,
  };

  const organizationMap: Record<string, number> = {
    'team-alpha': 1,
    'team-beta': 2,
    'team-gamma': 3,
    'team-delta': 4,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const payload = {
      name: formData.name,
      employeeNumber: formData.userId,
      password: formData.password,
      teamsEmail: formData.teamsEmail,
      slackEmail: formData.slackEmail,
      localPath: formData.localDirectory,
      departmentId: departmentMap[formData.department],
      divisionId: divisionMap[formData.division],
      organizationId: organizationMap[formData.organization],
      isManager: ['manager', 'director'].includes(formData.position),
      careerLevel: formData.careerLevel,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.text();
        console.error('Server Error:', data);
        throw new Error(data);
      }

      router.push('/login');
    } catch (err) {
      alert('회원가입에 실패했습니다. 콘솔 로그를 확인해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* User ID */}
            <div className="space-y-2">
              <Label htmlFor="userId">User ID *</Label>
              <Input
                id="userId"
                type="text"
                value={formData.userId}
                onChange={(e) => handleInputChange('userId', e.target.value)}
                placeholder="Choose a user ID"
                className={errors.userId ? 'border-red-500' : ''}
              />
              {errors.userId && <p className="text-sm text-red-500">{errors.userId}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a password"
                  className={errors.password ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Teams Email */}
            <div className="space-y-2">
              <Label htmlFor="teamsEmail">Teams Email *</Label>
              <Input
                id="teamsEmail"
                type="email"
                value={formData.teamsEmail}
                onChange={(e) => handleInputChange('teamsEmail', e.target.value)}
                placeholder="your.name@company.com"
                className={errors.teamsEmail ? 'border-red-500' : ''}
              />
              {errors.teamsEmail && <p className="text-sm text-red-500">{errors.teamsEmail}</p>}
            </div>

            {/* Slack Email */}
            <div className="space-y-2">
              <Label htmlFor="slackEmail">Slack Email *</Label>
              <Input
                id="slackEmail"
                type="email"
                value={formData.slackEmail}
                onChange={(e) => handleInputChange('slackEmail', e.target.value)}
                placeholder="your.name@company.com"
                className={errors.slackEmail ? 'border-red-500' : ''}
              />
              {errors.slackEmail && <p className="text-sm text-red-500">{errors.slackEmail}</p>}
            </div>

            {/* Local Directory Path */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="localDirectory">Local Directory Path *</Label>
              <Input
                id="localDirectory"
                type="text"
                value={formData.localDirectory}
                onChange={(e) => handleInputChange('localDirectory', e.target.value)}
                placeholder="C:\Users\YourName\Documents"
                className={errors.localDirectory ? 'border-red-500' : ''}
              />
              {errors.localDirectory && (
                <p className="text-sm text-red-500">{errors.localDirectory}</p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Department (부문) *</Label>
              <Select onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
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
              {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
            </div>

            {/* Division */}
            <div className="space-y-2">
              <Label htmlFor="division">Division (본부) *</Label>
              <Select onValueChange={(value) => handleInputChange('division', value)}>
                <SelectTrigger className={errors.division ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology Division</SelectItem>
                  <SelectItem value="business">Business Division</SelectItem>
                  <SelectItem value="operations">Operations Division</SelectItem>
                  <SelectItem value="strategy">Strategy Division</SelectItem>
                </SelectContent>
              </Select>
              {errors.division && <p className="text-sm text-red-500">{errors.division}</p>}
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <Label htmlFor="organization">Organization (조직) *</Label>
              <Select onValueChange={(value) => handleInputChange('organization', value)}>
                <SelectTrigger className={errors.organization ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team-alpha">Team Alpha</SelectItem>
                  <SelectItem value="team-beta">Team Beta</SelectItem>
                  <SelectItem value="team-gamma">Team Gamma</SelectItem>
                  <SelectItem value="team-delta">Team Delta</SelectItem>
                </SelectContent>
              </Select>
              {errors.organization && <p className="text-sm text-red-500">{errors.organization}</p>}
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label htmlFor="position">Position (직위) *</Label>
              <Select onValueChange={(value) => handleInputChange('position', value)}>
                <SelectTrigger className={errors.position ? 'border-red-500' : ''}>
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
              {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
            </div>

            {/* Career Level */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="careerLevel">Career Level (커리어레벨) *</Label>
              <Select onValueChange={(value) => handleInputChange('careerLevel', value)}>
                <SelectTrigger className={errors.careerLevel ? 'border-red-500' : ''}>
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
              {errors.careerLevel && <p className="text-sm text-red-500">{errors.careerLevel}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
