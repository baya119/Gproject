import React from 'react'
import "../componets/RegisterPage.css";
import Footer1 from "../componets/Footer2";

import '../App'

export default function SignUpPage() {

    return (
        <div className="text-center m-5-auto">
            <h2>Verify Account</h2>
            <h5>Verify your company by filling out the form</h5>
            <form action="/home">
                <p>
                    <label>Enter company name</label><br/>
                    <input type="text" name="company-name" required />
                </p>
                <p>
                    <label>Enter company tag or Field. Eg:- Construction, Computer supply</label><br/>
                    <input type="text" name="tag" required />
                </p>
                <p>
                    <label>Enter Licence number</label><br/>
                    <input type="text" name="licence" required />
                </p>
                <p>
                    <label>Enter Location</label><br/>
                    <input type="text" id="location" required></input>
                </p>
                <p>
                    <label>Enter Owner of the company</label><br/>
                    <input type="text" id="owner" required></input>
                </p>
                <p>
                    <label>Enter the amount of bureau that give the licence</label><br/>
                    <input type="text" id="amount" required></input>
                </p>
                <p>
                    <label>Enter Location of the Bureau</label><br/>
                    <input type="text" id="location1" required></input>
                </p>
                <p>
                
                    <label for="myfile">Attach Licence</label>
                    <input type="file" id="myfile" name="myfile" multiple></input>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Verify</button>
                </p>
            </form>
            <Footer1/>
        </div>
    )

}
