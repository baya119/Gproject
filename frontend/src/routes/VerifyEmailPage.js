import React from 'react'
import "../componets/RegisterPage.css";


import '../App'

export default function VerifyEmailPage() {
    return (
        <div>
            <div class="form-container">
	<p class="title">Verify Email Address</p>
    <h8>Enter your email address</h8>
	<form class="form">
		<div class="input-group">
            <label id="reset_pass_lbl">Email address</label><br/>
            <input type="email" name="email" required />
            <button class="bn" type="submit">Get Code</button>
		</div>
		<div class="input-group">
            <label id="reset_pass_lbl">Enter Verification code</label><br/>
            <input type="text" name="code" required />
            <button class="bn" type="submit">Submit</button>
		</div>
		<button class="sign">Verify</button>
	</form>
</div>
        </div>
        
        
    )
}