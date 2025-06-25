export async function fetchWithTokenRefresh(url: string, options: RequestInit) {
  let res = await fetch(url, { ...options, credentials: 'include' });

  if (res.status === 401) {
    //토큰 갱신 시도
    const refreshRes = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      const newAccessToken = data.accessToken;

      //새 accessToken을 Authorization 헤더에 넣기
      const updatedHeaders = {
        ...(options.headers || {}),
        Authorization: `Bearer ${newAccessToken}`,
      };

      //원래 요청 재시도
      return fetch(url, {
        ...options,
        headers: updatedHeaders,
        credentials: 'include',
      });
    }
  }

  return res;
}
