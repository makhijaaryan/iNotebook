import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const host = "https://i-notebook-cyubzfkyg-makhijaaryan.vercel.app"
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()

        console.log(json)
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Login successful!", "success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials(credentials => ({ ...credentials, [e.target.name]: e.target.value }))
    }

    return (
        <div className='mt-5'>
            <h2 className='mb-5 text-center'>iNotebook - Login</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
                <p className='mt-3 mb-5'>New user? <Link to='/signup'>Sign up here</Link></p>
            </form>
        </div>
    )
}

export default Login
