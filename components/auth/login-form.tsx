'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import LogoImage from '@/assets/skore_logo.svg';

export function LoginForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.userId.trim()) {
      newErrors.userId = '사번을 꼭 입력해주셔야 합니다.';
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자리 이상입니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // 클라이언트 컴포넌트에서 직접 API 호출
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeNumber: formData.userId, password: formData.password }),
        credentials: 'include', // 쿠키를 자동으로 저장하기 위해 필요
      });

      // 응답 검사
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인 실패');
      }

      // 성공 시 사용자 정보 저장
      const userData = await response.json();

      // Zustand 스토어에 사용자 정보 저장
      // setUser({
      //   id: userData.id || userData.userId,
      //   name: userData.name,
      //   role: userData.role || userData.position,
      //   // 기타 필요한 사용자 정보
      // });

      // 대시보드로 리다이렉트
      router.push('/dashboard');
      router.refresh(); // 페이지 갱신 (선택적)
    } catch (error: any) {
      setErrors({ general: error.message || '로그인 실패' });
      console.error('로그인 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          로그인
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="userId">사번 ID</Label>
            <Input
              id="userId"
              type="text"
              value={formData.userId}
              onChange={(e) => handleInputChange('userId', e.target.value)}
              placeholder="사번을 입력해주세요"
              className={errors.userId ? 'border-red-500' : ''}
            />
            {errors.userId && <p className="text-sm text-red-500">{errors.userId}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="비밀번호를 입력해주세요"
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '로그인하는 중' : '로그인'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              회원이 아니신가요?{' '}
              <Link href="/signup" className="text-blue-600 hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
