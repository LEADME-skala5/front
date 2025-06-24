import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employeeNumber: body.userId,
        password: body.password,
      }),
      credentials: 'include', // 쿠키 전송 필수
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      return NextResponse.json({ error: errorData.message || '로그인 실패' }, { status: 401 });
    }

    const data = await backendRes.json();
    const accessToken = data.accessToken;

    // 백엔드에서 설정한 refreshToken 쿠키를 그대로 전달
    const refreshTokenCookie = backendRes.headers.get('Set-Cookie');
    const response = NextResponse.json({ user: data.user });

    if (refreshTokenCookie) {
      response.headers.append('Set-Cookie', refreshTokenCookie);
    }

    // 액세스 토큰 저장 (선택사항)
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1시간
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: '로그인 실패' }, { status: 401 });
  }
}
