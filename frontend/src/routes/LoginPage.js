import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import "../componets/Login.css";


import '../../src/App'
import api from '../api';

export default function SignInPage() {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Perform form validation
        if (!email || !password) {
          // Handle validation errors
          return;
        }
      
        // Make an API request to register the user
        api.post('/login/', {
            email: email,
            password: password,
        })
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            api.defaults.headers['Authorization'] = localStorage.getItem('authToken');
            window.location.href = '/ongoing';
          })
          .catch(error => {
            if (error.response && error.response.status === 400) {
              const errors = error.response.data;
              console.log(errors);
            } else {
              // Handle other non-validation errors
            }
          });
      };
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username or Email Address</label><br/>
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an Account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}