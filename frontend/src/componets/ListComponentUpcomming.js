import { Component, useContext } from "react";
import "./SideBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Button } from "react-bootstrap";
import moment from "moment";

class ListItem extends Component {
  render() {
    return (
      <div
        style={{
          padding: "5px 0px 0px 0px",
          width: "100%",
          height: "250px",
          background: "#111827",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          margin: "10px 0 10px 0",
        }}
      >
        <div style={{ width: "25%", maxWidth: "200px" }}>
          <img
            style={{ width: "75%", height: "auto", borderRadius: "10px" }}
            src={this.props.data.image}
            alt={"image"}
          />
        </div>
        <div
          style={{
            padding: "10px",
            width: "70%",
            height: "200px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", textAlign: "left", fontWeight: "bold" }}>
            {this.props.data.header}
          </div>
          <div style={{ width: "100%", textAlign: "left" }}>
            <div>{this.props.data.subheader}</div>
            <div>
              <strong>Deadline: </strong>
              {moment(this.props.data.deadline).format("DD, MMM YYYY")}
            </div>
          </div>
          <Link to={`detail/${this.props.data.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </div>
    );
  }
}

function ListComponent({ items, createVisible = false, path = "" }) {
  return (
    <div style={{ padding: "0 50px 0 50px" }}>
      <div style={{ width: "100%", height: "75px" }}>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <input
            placeholder={"Search bids"}
            style={{ width: "70%", marginRight: "-10px", height: "40px" }}
          />
          <Button style={{ width: "30%", height: "40px" }}>Search</Button>
        </div>
      </div>

      {createVisible && (
        <Link to={path} style={{ width: "100%", height: "75px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Button style={{ width: "225px", height: "40px" }}>
              {" "}
              <i
                className={"fas fa-add"}
                style={{ marginRight: "10px" }}
              />{" "}
              Create Bids
            </Button>
          </div>
        </Link>
      )}

      <div style={{ height: "100%", overflow: "auto" }}>
        {items.map((data) => {
          return <ListItem data={data} />;
        })}
      </div>
    </div>
  );
}

export default ListComponent;
