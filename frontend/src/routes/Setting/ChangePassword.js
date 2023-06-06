import React from "react";

import { Button } from "react-bootstrap";

export default function ChangePassword() {
  return (
    <div className="text-center" style={{ marginTop: "10px" }}>
      <center>
        <p style={{ color: "Black", fontWeight: "bold", fontSize: "40px", padding: "20px 0px 0px 0px",}}>
          Change Password
        </p>
      </center>
      <div
        style={{
          padding: "25px",
          width: "100%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
      <div class="input-group">
			  <label for="oldpassword">Old Password</label>
			  <input type="password" name="oldpassword" id="pass" placeholder=""></input>
		  </div>
      <br/>
		  <div class="input-group">
			  <label for="newpassword">New Password</label>
			  <input type="password" name="password" id="password" placeholder=""></input>
			</div>
      <br/>
      <div class="input-group">
        <label for="newpassword">Confirm Password</label>
			  <input type="password" name="password" id="password" placeholder=""></input>
			</div>
      </div>
      <Button style={{ padding: "5px 20px 5px 20px" }}>Change</Button>
    </div>
  );
}
