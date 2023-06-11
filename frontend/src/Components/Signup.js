import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({email: "", name: "",  password: "", confirm_password: ""})

    const navigate = useNavigate();

    const handleSubmit= async () =>{
        const host = "http://localhost:5000"
        const {name, email, password, confirm_password} = credentials;
        if(password!==confirm_password){
            document.getElementById('passCheck').innerHTML="Signup Unsuccessful! Passwords need to match!";
        }
        else{
            document.getElementById('passCheck').innerHTML="";
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",      
                },
                body: JSON.stringify({ name, email, password }),
              });
            const json = await response.json()
            
            console.log(json)
            if (json.success){
                //Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/");
            }
            else{
                alert("Invalid credentials")
            }
        }
    }
        


    const onChange = (e) =>{
        setCredentials(note =>({...note, [e.target.name]: e.target.value}))
    }

    return (
        <div className='container'>

            <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name"  name="name" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  name="email" onChange={onChange} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm_password" name="confirm_password" onChange={onChange} minLength={5} required/>
                </div>
                <p className="text-danger" id="passCheck"></p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
