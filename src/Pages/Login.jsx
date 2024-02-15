import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthDataProvider } from '../Providers/AuthProvider';


const Login = () => {
  // const API = import.meta.env.VITE_BASE_URL
  const {API, setUser, setToken} = useAuthDataProvider()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password_hash: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${API}/users/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
          console.log(res, "res")
            if(res.user.user_id){
                const { user, token } = res
                setUser(user)
                setToken(token)
                setFormData(() => ({
                    username: '',
                    password_hash: ''
                }))
                navigate('/tasks');
            } else {
                console.log(res)
            }
        })
        .catch(err => console.log(err))

    
  };

  return (
    <form 
    className='signUpForm grid'
    onSubmit={handleLogin}>
      <label className='signUpForm_label'>Username:
        <input 
        type="text"
        placeholder="Enter your username"
        id="username"
        value={formData.username}
        onChange={handleInputChange}/>
      </label>

      <label className='signUpForm_label'> Password:
        <input 
        type="password"
        placeholder="Enter your password"
        id="password_hash"
        value={formData.password_hash}
        onChange={handleInputChange}/>
      </label>

      <input type='submit' />
    </form>
  );
};

export default Login;