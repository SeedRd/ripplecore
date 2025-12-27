const BACKEND_URL = 'http://localhost:3000';

export async function authHandler(url, options = {}) {
  const res = await fetch(`${BACKEND_URL}/${url}`, {
    credentials: 'include',
    ...options,
  });

  if (res.status === 444) {
    window.location.href = '/login';
    alert('unauthenticated.');
    return;
  }

  if (res.status === 445) {
    alert('unauthorised action taken.');
    return;
  }

  return res.json();
}
