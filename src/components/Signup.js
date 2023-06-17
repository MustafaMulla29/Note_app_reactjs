import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { MdDriveFileRenameOutline } from "react-icons/md"

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('auth-token', json.authToken)
            props.showAlert("Accouct Created Successfully ", "success")
            navigate("/")

        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-3'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label"><MdDriveFileRenameOutline style={{ "marginRight": "3px" }} /> Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email1" className="form-label"><MdEmail style={{ "marginRight": "3px" }} />Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"> <RiLockPasswordFill style={{ "marginRight": "3px" }} />Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"><RiLockPasswordFill style={{ "marginRight": "3px" }} />Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
