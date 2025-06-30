'use server';

import { redirect } from 'next/navigation';

export async function loginAction({ userId, password }: { userId: string; password: string }) {
  console.log('🔍 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  console.log('🔍 요청 URL:', `${process.env.NEXT_PUBLIC_API_URL}/auth/login`);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employeeNumber: userId, password }),
    credentials: 'include',
  });

  // 🔍 기본 응답 정보
  console.log('🔍 Status:', res.status, res.statusText);
  console.log('🔍 Headers:', Object.fromEntries(res.headers.entries()));

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  console.log('🔍 Success Response:', data);

  redirect('/dashboard');
}
