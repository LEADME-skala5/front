import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('Cookie') || '', // 쿠키 전달
      },
      credentials: 'include',
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      return NextResponse.json({ error: errorData.message || '토큰 갱신 실패' }, { status: 401 });
    }

    const data = await backendRes.json();
    const newAccessToken = data.accessToken;

    // 응답 객체 생성
    const response = NextResponse.json({ success: true });

    // 새 액세스 토큰 설정
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1시간
      sameSite: 'strict',
      path: '/',
    });

    // 리프레시 토큰 업데이트 (필요시)
    const refreshTokenCookie = backendRes.headers.get('Set-Cookie');
    if (refreshTokenCookie) {
      response.headers.append('Set-Cookie', refreshTokenCookie);
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: '토큰 갱신 실패' }, { status: 500 });
  }
}
