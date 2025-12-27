import { useState } from 'react'

const Signup = () => {
    const BACKEND_URL = 'http://localhost:3000'

    const [form, setForm] = useState({
        user_id : '',
        email: '',
        password: ''
    });

    const submit = async () => {
        await fetch(`${BACKEND_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form)
        })
    }

  return (
    <>
    <h2>Sign-Up for RippleCore</h2>
    <form>
        <input type="text" placeholder='enter your registration number.' onChange={(e)=>{setForm({...form, user_id:e.target.value})}}/>
        <input type="text" placeholder='enter institute email.' onChange={(e)=>{setForm({...form, email:e.target.value})}}/>
        <input type="password" placeholder='create a password.' onChange={(e)=>{setForm({...form, password:e.target.value})}}/>
        <button onClick={submit}>SUBMIT</button>
    </form>
    </>
  )
}

export default Signup;
