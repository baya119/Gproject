import React from 'react'
import { Link } from 'react-router-dom'

import '../../src/App'

export default function ForgetPasswordPage() {
    return (
        <div className="text-center m-5-auto">
            <div class="form-container">
	<p class="title">Reset your password</p>
    <h5>Enter your email address and we will send you a new password</h5>
	<form class="form">
		<div class="input-group">
			<label for="username">Email address</label>
			<input type="text" name="username" id="username" placeholder=""></input>
        </div>
		
		<button class="sign">Send password reset email</button>
	</form>
	

</div>
        </div>
    )
}
