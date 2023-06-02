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
          background: "#7367F0",
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
        <p style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}>
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
        {ButtonB("fas fa-key", "Verify Email Address", "verify-email")}
        {ButtonB("fas fa-key", "Verify Account", "verify-account")}
      </div>
    </div>
  );
}
export default Setting;
