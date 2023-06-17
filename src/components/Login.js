import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('auth-token', json.authToken)
            navigate("/")
            props.showAlert("Logged in Successfully ", "success")
        }
        else {
            props.showAlert("Invalid details", "danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3'>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" ><MdEmail style={{ "marginRight": "3px" }} />Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" ><RiLockPasswordFill style={{ "marginRight": "3px", "marginBottom": "3px" }} />Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
