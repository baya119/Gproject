import LoggedInNavBar from "../componets/LoggedInNavBar";
import Footer from "../componets/Footer";
import SideBar from "../componets/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../App";

function Base() {
  const [state, setState] = useState({ clicked: false, showModal: false });
  const handleClick = () => {
    setState({
      clicked: !state.clicked,
      showModal: state.clicked,
    });
  };
  const handleClose = () =>
    setState({ clicked: state.clicked, showModal: false });
  const handleShow = () =>
    setState({ clicked: state.clicked, showModal: true });

  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <LoggedInNavBar
        handleShow={handleShow}
        handleClick={handleClick}
        state={state}
      />
      <div className={"main-container"}>
        <SideBar handleShow={handleShow} state={state} />
        <div
          className={
            "content " + (state.clicked ? "content-side-v" : "content-side-h")
          }
        >
          <Outlet />
        </div>
      </div>
      <Footer />

      <Modal show={state.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i
              className={"fas fa-user-circle"}
              style={{ fontSize: "30px", marginRight: "20px" }}
            />
            <div>Are you sure?</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setIsAuthenticated(false);
              navigate("/login");
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Base;
