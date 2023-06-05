import React from "react";

import { Button } from "react-bootstrap";

export default function CreateBids() {
  const inputStyle = {
    width: "100%",
    height: "40px",
    margin: "5px 0 5px 20px",
    borderRadius: "5px",
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
    <div
      className="text-center"
      style={{ marginTop: "10px", marginBottom: "30px" }}
    >
      <center>
        <p style={{ color: "Black", fontWeight: "bold", fontSize: "40px", margin: "20px 0px 0px 0px" }}>
          Create Bids
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
        {wrapInput(<input style={inputStyle} placeholder={"Title"} />)}
        {wrapInput(
          <input type={"date"} style={inputStyle} placeholder={"Deadline"} />
        )}

        {wrapInput(
          <textarea style={inputStyle} placeholder={"Description"} />
        )}

        <div
          style={{
            width: "50%",
            margin: "5px 20px 5px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label for="myfile">Attach File </label>
          <input type="file" class="btn" name="myfile" multiple></input>
        </div>
      </div>
      <Button style={{ padding: "5px 20px 5px 20px" }}>Verify</Button>
    </div>
  );
}
