import { Link } from "react-router-dom";

function Setting() {
  const ButtonB = (icon, text, path) => {
    return (
      <Link
        to={path}
        style={{
          textDecoration: "none",
          width: "45%",
          height: "125px",
          margin: "10px",
          background: "#111827",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <i className={icon} style={{ fontSize: "30px", marginRight: "10px" }} />
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            margin: 0,
            padding: 0,
          }}
        >
          {text}
        </p>
      </Link>
    );
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <center>
        <p style={{ color: "black", fontWeight: "bold", fontSize: "40px" }}>
          Setting
        </p>
      </center>
      <div
        style={{
          padding: "25px",
          width: "100%",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {ButtonB("fas fa-key", "Change Password", "change-password")}
        {ButtonB("fas fa-check", "Verify Email Address", "/verifyemail")}
      </div>
    </div>
  );
}
export default Setting;
