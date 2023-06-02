import { Component, useContext } from "react";
import "./SideBar.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { UserContext } from "../App";

const routes = [
  {
    icon: "fa-calendar",
    name: "Upcoming",
    path: "/upcoming",
  },
  {
    icon: "fa-user-circle",
    name: "Profile",
    path: "/profile",
  },
  {
    icon: "fa-calendar",
    name: "Ongoing",
    path: "/ongoing",
  },
  {
    icon: "fa-calendar",
    name: "Closed",
    path: "/closed",
  },
  {
    icon: "fa-calendar",
    name: "Deposit",
    path: "/deposit",
  },
  {
    icon: "fa-calendar",
    name: "Withdrawal",
    path: "/withdrawal",
  },
  {
    icon: "fa-calendar",
    name: "Setting",
    path: "/setting",
  },
  {
    icon: "fa-calendar",
    name: "FAQ",
    path: "/faq",
  },
];

class SidebarItem extends Component {
  render() {
    let isPath = window.location.pathname
      .toLowerCase()
      .trim()
      .startsWith(this.props.data.path.toString().toLowerCase().trim());
    return (
      <Link to={this.props.data.path} style={{textDecoration: "none"}}>
        <div
          className={`sidebar-item ${
            this.props.state.clicked ? "ml-40" : "v-ml-40"
          } ${isPath ? " sidebar-item-active " : ""} mt-10`}
        >
          <div className={`sidebar-item-icon`}>
            <i className={`fas ${this.props.data.icon}`}> </i>
          </div>
          <div
            className={`sidebar-item-text ${
              this.props.state.clicked ? "" : "sidebar-d-none "
            }`}
          >
            {this.props.data.name}
          </div>
        </div>
      </Link>
    );
  }
}

class SidebarItemClick extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} style={{ cursor: "pointer" }}>
        <div
          className={`sidebar-item ${
            this.props.state.clicked ? "ml-40" : "v-ml-40"
          } mt-10`}
        >
          <div className={`sidebar-item-icon`}>
            <i className={`fas ${this.props.data.icon}`}> </i>
          </div>
          <div
            className={`sidebar-item-text ${
              this.props.state.clicked ? "" : "sidebar-d-none "
            }`}
          >
            {this.props.data.name}
          </div>
        </div>
      </div>
    );
  }
}

function SideBar({ state, handleClick, handleShow }) {

  return (
    <div
      className={
        `sidebar ` + (state.clicked ? `sidebar-visible` : `sidebar-hidden`)
      }
    >
      <div className={`p-20`}>
        <div className={`h-10p`}></div>
        <div>
          <div className="col-bar" onClick={handleClick}>
            <div
              className={` ${
                state.clicked ? "profile-circle-2" : "profile-circle"
              } `}
            >
              <img src={`/the_dog.jpg`} alt={`Profile`} />
            </div>
            <p
              className={`profile-name ${
                state.clicked ? "" : "sidebar-d-none "
              }`}
            >
              Abebe Kebede
            </p>
            <p className={`${state.clicked ? "sidebar-d-none" : "mt-10 "}`}></p>
            <p className={`${state.clicked ? "sidebar-d-none" : "mt-10 "}`}></p>
          </div>
          {routes.map((data) => {
            return <SidebarItem data={data} state={state} />;
          })}
          <SidebarItemClick
            data={{ icon: "fa-user", name: "Logout" }}
            state={state}
            onClick={() => {
              handleShow();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
