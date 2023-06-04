import React from 'react'
import "../componets/RegisterPage.css";
import Footer1 from "../componets/Footer2";

import '../App'

export default function VerifyEmailPage() {
    return (
        <div>
            <div className="text-center m-5-auto">
            <h2>Verify Email Address</h2>
            <h5>Enter your email address</h5>
            <form action="/login">
                <p>
                    <label id="reset_pass_lbl">Email address</label><br/>
                    <input type="email" name="email" required />
                    <button id="sub_btn" type="submit">Get Code</button>
                    <label id="reset_pass_lbl">Enter Verification code</label><br/>
                    <input type="text" name="code" required /><button id="sub_btn" type="submit">Submit</button>
                </p>
            </form>
        </div>
        <Footer1/>
        </div>
        
        
    )
}