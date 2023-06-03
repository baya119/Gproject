import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../componets/RegisterPage.css";

import '../../src/App'
import api from '../api';

export default function SignUpPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Perform form validation
        if (!name || !email || !password1) {
          // Handle validation errors
          return;
        }
      
        // Make an API request to register the user
        api.post('/organization-register/', {
            email: email,
            password1: password1,
            password2: password2,
            name: name,
        })
          .then((response) => {
            window.location.href = '/success';
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
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Company Name</label><br/>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="first_name" required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} name="password" required />
                </p>
                <p>
                    <label>Confirm Password</label><br/>
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}  id="confirm_password" required></input>
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit"><Link to="/verifyemail">Register</Link></button>
                </p>
            </form>
            <footer>
                <p><Link to="/home">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
