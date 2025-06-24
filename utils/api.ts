export async function fetchWithTokenRefresh(url: string, options: RequestInit) {
  let res = await fetch(url, { ...options, credentials: 'include' });

  if (res.status === 401) {
    // 토큰 갱신 시도
    const refreshRes = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      // 원래 요청 재시도
      return fetch(url, { ...options, credentials: 'include' });
    }
  }
  return res;
}
