import { LoginForm } from '@/components/auth/login-form';
import LogoOnly from '@/components/auth/LogoOnly';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <LogoOnly />
          <h1 className="mt-6 text-5xl font-bold text-gray-900">로그인</h1>
          <p className="mt-2 text-base text-gray-600">성과관리 SKore의 로그인 페이지입니다</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
