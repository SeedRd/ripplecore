const BACKEND_URL = "http://localhost:3000";

export async function authHandler(path, options = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    credentials: "include", // kuch kuch toh h dekhna h ye.
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (res.status === 444) {
    throw new Error("UNAUTHENTICATED");
  }

  if (res.status === 445) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Request failed');
  }

  return res.json();
}

