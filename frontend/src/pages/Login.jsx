import { useState } from 'react'

const Login = ({ onLogin }) => {

    const BACKEND_URL = 'http://localhost:3000';

    const [cred, setCred] = useState({
        email: '',
        password: ''
    });

    const submit = async () => {
        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(cred)
        });

        if (res.ok) {
            onLogin();
        } else {
            alert('login failed.');
        };
    };

    return (
        <>
            <h2>Login</h2>
            <form>
                <input placeholder="Email" onChange={(e) => setCred({...form, email: e.target.value})} />
                <input type="password" placeholder="Password" onChange={(e) => setCred({...form, password: e.target.value})} />
                <button onClick={submit}>LOG-IN</button>
            </form>
        </>
    )
}

export default Login;
