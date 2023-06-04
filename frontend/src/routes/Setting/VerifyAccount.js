import React from "react";

import { Button } from "react-bootstrap";

export default function VerifyAccount() {
  const inputStyle = {
    width: "100%",
    height: "40px",
    margin: "5px 0 5px 20px",
  };

  const wrapInput = (input) => {
    return (
      <div
        style={{
          width: "50%",
          margin: "5px 20px 5px 20px",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {input}
      </div>
    );
  };
  return (
    <div className="text-center" style={{ marginTop: "10px" , marginBottom: "30px" }}>
      <center>
        <p style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}>
          Verify Account
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
        {wrapInput(<input style={inputStyle} placeholder={"Enter company name"} />)}
        {wrapInput(<input style={inputStyle} placeholder={"Enter company tag, field"} />)}
          {wrapInput(<div style={{color: "white", margin: "0 0 0 25px"}}>Example:- Construction, Computer supply...</div>)}

        {wrapInput(<input style={inputStyle} placeholder={"Enter license number"} />)}
        {wrapInput(<input style={inputStyle} placeholder={"Enter location"} />)}
        {wrapInput(<input style={inputStyle} placeholder={"Enter owner of company"} />)}
        {wrapInput(<input style={inputStyle} placeholder={"Enter name of bureau that gave the license"} />)}
        {wrapInput(<input style={inputStyle} placeholder={"Enter location of bureau"} />)}

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
            placeholder={"Submit license here"}
          />
          <Button style={{ width: "125px", height: "40px" }}>Get Code</Button>
        </div>
      </div>
      <Button style={{ padding: "5px 20px 5px 20px" }}>Verify</Button>
    </div>
  );
}
