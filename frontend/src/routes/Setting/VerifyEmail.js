import React from "react";

import { Button } from "react-bootstrap";

export default function VerifyEmail() {
  return (
    <div className="text-center" style={{ marginTop: "10px" }}>
      <center>
        <p style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}>
          Verify Email Address
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
        <div
          style={{
            width: "50%",
            margin: "5px 20px 5px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            style={{
              width: "100%",
              height: "40px",
              margin: "5px -20px 5px 20px",
            }}
            placeholder={"Enter email address"}
          />
          <Button style={{ width: "125px", height: "40px" }}>Get Code</Button>
        </div>
        <div
          style={{
            width: "50%",
            margin: "5px 20px 5px 20px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <input
            style={{
              width: "40%",
              height: "40px",
              margin: "5px 20px 5px 20px",
            }}
            placeholder={"Enter code"}
          />
        </div>
      </div>
      <Button style={{ padding: "5px 20px 5px 20px" }}>Verify</Button>
    </div>
  );
}
