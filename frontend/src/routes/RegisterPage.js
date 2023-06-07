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
            <div class="form-container">
	<p class="title">Login</p>
	<form class="form" onSubmit={handleSubmit}>
		<div class="input-group">
            <label>Company Name</label><br/>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="first_name" required />
		</div>
        <div class="input-group">
            <label>Email address</label><br/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
		</div>
        <div class="input-group">
            <label>Password</label><br/>
            <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} name="password" required />
		</div>
        <div class="input-group">
            <label>Confirm Password</label><br/>
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}  id="confirm_password" required></input>
		</div>
		<p>
            <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
        </p>
        <button class="sign" type="submit"><Link to="/verifyemail">Sign Up</Link></button>
	</form>
    <p class="signup">
      <Link to="/home">Back to Homepage</Link>.
  </p>
</div>
        </div>
    )

}
