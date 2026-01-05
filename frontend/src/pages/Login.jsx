import { useState } from "react";

const BACKEND_URL = "http://localhost:3000";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
  if (!email || !password) {
    alert("email and password are required.");
    return;
  }

  setLoading(true);

  try {
    const loginRes = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      throw new Error(loginData.error || "Login failed");
    }

    setUser({
      id: loginData.id,
      email: loginData.email,
      role: loginData.role,
    });

  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <h3>Login</h3>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "logging in..." : "login"}
      </button>
    </div>
  );
}

export default Login;
