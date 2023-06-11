import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const host = "http://localhost:5000"
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
            </form>
        </div>
    )
}

export default Login
