// loginAction.ts 수정
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function loginAction({ userId, password }: { userId: string; password: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employeeNumber: userId, password }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  redirect('/dashboard');
}
