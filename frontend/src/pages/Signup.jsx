import { useState } from "react";

function Signup() {
  const [form, setForm] = useState({ role: "STUDENT" });

  const submit = async () => {
  if (!form.id || !form.name || !form.email || !form.password) {
    alert('all fields required.');
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'signup failed');
    }

    alert("Signup successful. Please login.");
  } catch (err) {
    alert(err.message);
  }
};

//
  return (
    <div>
      <h3>Signup</h3>
      <input placeholder="Id" onChange={e => setForm({ ...form, id: e.target.value })}/>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="STUDENT">Student</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button onClick={submit}>Signup</button>
    </div>
  );
}

export default Signup;//
