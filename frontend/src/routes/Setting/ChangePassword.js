import React from "react";

import { Button } from "react-bootstrap";

export default function ChangePassword() {
  return (
    <div className="text-center" style={{ marginTop: "10px" }}>
      <center>
        <p style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}>
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
        <input
          style={{ width: "50%", margin: "5px 20px 5px 20px" }}
          placeholder={"old password"}
        />
        <input
          style={{ width: "50%", margin: "5px 20px 5px 20px" }}
          placeholder={"new password"}
        />
        <input
          style={{ width: "50%", margin: "5px 20px 5px 20px" }}
          placeholder={"confirm password"}
        />
      </div>
      <Button style={{ padding: "5px 20px 5px 20px" }}>Change</Button>
    </div>
  );
}
