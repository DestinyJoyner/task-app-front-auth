import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap'

const Signup = ({ setUser, setToken }) => {
    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password_hash: '',
    })

    const handleInputChange = (event) => {
        const { id, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`${API}/users`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                if(res.user.user_id){
                    setUser(res.user)
                    setToken(res.token)
                    setFormData((prev) => ({
                        username: '',
                        email: '',
                        password_hash: ''
                    }))
                    navigate('/tasks');
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    return (
       <form 
       className='signUpForm grid'
       onSubmit={handleSubmit}>

        <label className='signUpForm_label'> Username:
            <input
            type="text"
            placeholder='Enter your username'
            id='username'
            value={formData.username}
            onChange={handleInputChange} />
        </label>

        <label className='signUpForm_label'>Email:
            <input
            type="text"
            placeholder='Enter your email'
            id='email'
            value={formData.email}
            onChange={handleInputChange} />
        </label>

        <label className='signUpForm_label'> Password:
            <input 
            type="password"
            placeholder='Enter your password'
            id='password_hashh'
            value={formData.passord_hash}
            onChange={handleInputChange}/>
        </label>

        <input type="submit" />

       </form>
    );
};

export default Signup;