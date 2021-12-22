import React from "react";
import { Link } from "react-router-dom";
import { isSignedIn } from "../apicaller/auth";
import Footer from "./Footer";
import Menu from "./Menu";
import { Badge } from "react-bootstrap";

const userLeftSide = () => {
  return (
    <div className="card border border-none">
      <h4
        className="card-header bg-dark text-white text-center col-12"
        style={{ marginTop: "-10px" }}
      >
        User Navigation
      </h4>
      <ul className="list-group col-12" style={{ marginBottom: "-10px" }}>
        <li className="list-group-item">
          <Link
            to="/user/createContact"
            className="nav-link text-success"
            style={{ textDecoration: "none" }}
          >
            Create Contact
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/user/contactpage"
            className="nav-link text-success"
            style={{ textDecoration: "none" }}
          >
            All contacts
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to="/Chat"
            className="nav-link text-success"
            style={{ textDecoration: "none" }}
          >
            Chat
          </Link>
        </li>
      </ul>
    </div>
  );
};
const userRightSide = () => {
  const { user } = isSignedIn();
  const { email, name } = user;
  return (
    <div className="card mb-4 border border-none">
      <h4
        className="card-header bg-dark text-white text-center col-12"
        style={{ marginTop: "-10px" }}
      >
        User Information
      </h4>
      <ul className="list-group col-12" style={{ marginBottom: "-10px" }}>
        <li className="list-group-item">
          <Badge bg="success">Name </Badge>
          {" " + name}
        </li>
        <li className="list-group-item">
          <Badge bg="success">Email </Badge>
          {" " + email}
        </li>
        <li className="list-group-item">
          <Badge bg="danger">User Area </Badge>
        </li>
      </ul>
    </div>
  );
};
const UserDashboard = () => {
  return (
    <>
      <div style={{ overflow: "auto", backgroundColor: "#f0de6e" }}>
        <Menu />
        <div className="logo_section" style={{ height: "100px" }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="logo">
                  <a href>
                    <img
                      alt="logo"
                      style={{ maxwidth: "100%" }}
                      src="https://fontmeme.com/permalink/211220/293d7532b26cd531b84fcc2c6d4fa661.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row container " style={{ height: "300px" }}>
          <div className="col-4 offset-1">{userLeftSide()}</div>
          <div className="col-7 ml-1">{userRightSide()}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default UserDashboard;
