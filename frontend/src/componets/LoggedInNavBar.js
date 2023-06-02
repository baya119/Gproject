import "./NavbarStyles.css";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { useNavigate } from "react-router-dom";

function getOptions(handleShow, goToProfile) {
  return (
    <div style={{ marginRight: "40px", zIndex: 1000 }}>
      <div
        className={"col-bar"}
        style={{
          width: "150px",
          background: "gray",
          borderRadius: 10,
          padding: "10px 0 10px 0",
        }}
      >
        <div
          className={`sidebar-item-b`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            goToProfile();
          }}
        >
          <div className={`sidebar-item-icon`}>
            <i className={`fas fa-user-circle`}> </i>
          </div>
          <div className={`sidebar-item-text`}>Profile</div>
        </div>
        <div
          style={{
            width: "100%",
            background: "white",
            height: "2px",
            margin: "5px 0px 5px 0px",
          }}
        ></div>
        <div
          className={`sidebar-item-b`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleShow();
          }}
        >
          <div className={`sidebar-item-icon`}>
            <i className={`fas fa-user-circle`}> </i>
          </div>
          <div className={`sidebar-item-text`}>Logout</div>
        </div>
      </div>
    </div>
  );
}

function LoggedInNavBar({ state, handleClick, handleShow }) {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile", { replace: true });
    setShowA(false);
    setShowB(false);
  };
  const logoutModal = () => {
    handleShow();
    setShowA(false);
    setShowB(false);
  };

  return (
    <nav className="NavbarItems">
      <h1 className="logo">
        encharet <i className=""></i>
      </h1>

      <div className={"row-bar"}>
        <Popover
          isOpen={showA}
          positions={["bottom", "left"]}
          content={getOptions(logoutModal, goToProfile)}
        >
          <div
            onClick={() => setShowA(!showA)}
            className={"profile-circle hide-profile"}
          >
            <img src={"/the_dog.jpg"} alt={"Profile"} />
          </div>
        </Popover>

        <div className="row-bar flex-b-764">
          <Popover
            isOpen={showB}
            positions={["bottom", "left"]}
            content={getOptions(logoutModal, goToProfile)}
          >
            <div onClick={() => setShowB(!showB)} className={"profile-circle"}>
              <img src={"/the_dog.jpg"} alt={"Profile"} />
            </div>
          </Popover>
          <i
            onClick={handleClick}
            className={state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </div>
    </nav>
  );
}
export default LoggedInNavBar;
