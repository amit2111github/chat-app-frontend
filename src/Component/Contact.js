import React, { useState, useEffect } from "react";
import {
  getContactList,
  isSignedIn,
  setItemInLocalStorageForChat,
  deleteContact,
} from "../apicaller/auth";
import Footer from "./Footer";
import Menu from "./Menu";
import "../index.css";

const Contact = ({ history }) => {
  const { user, token } = isSignedIn();
  const [contacts, setContacts] = useState([]);
  const preloading = async () => {
    const data = await getContactList(user._id, token);
    data.map((friend) => {
      delete friend.encry_password;
      delete friend.salt;
      delete friend.contacts;
      return friend;
    });
    setContacts(data);
  };
  const handleStartChat = async (event, secondUser) => {
    event.preventDefault();
    await setItemInLocalStorageForChat(secondUser);
    history.push(`/userchatPage/${secondUser._id}`);
  };
  const handleStartVideoVChat = async (event, secondUser) => {
    event.preventDefault();
    await setItemInLocalStorageForChat(secondUser);
    history.push(`/videocall/${secondUser._id}`);
  };
  const handleDelete = async (event, friend) => {
    event.stopPropagation();
    await deleteContact(user._id, token, friend.email);
    preloading();
  };

  useEffect(() => {
    preloading();
  }, []);

  return (
    <>
      <div style={{ overflow: "auto", backgroundColor: "#f0de6e" }}>
        <Menu />
        <div className="logo_section" style={{ height: "100px" }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="logo">
                  <a href="logo">
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

        <h3 className="text-center mt-4" style={{ fontFamily: "cursive" }}>
          FRIEND LIST
        </h3>
        <div
          className="container-sm border mb-2 border-dark rounded mt-4"
          style={{ backgroundColor: "#d9d4c7" }}
        >
          {contacts.map((user, index) => {
            return (
              <div key={index} className="mt-1 mb-2 rounded bg-muted">
                <div className="row">
                  <div className="col-2">
                    <img
                      alt="logo"
                      style={{
                        width: "80px",
                        height: "80px",
                        marginLeft: "40px",
                      }}
                      className="rounded-circle img-responsive"
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                    />
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <h6 className="col-2 col-2 text-center mt-4">
                        {user.name}
                      </h6>
                      <h6 className="col-sm-3 col-xs-3 mt-4">{user.email}</h6>
                      <div className="col-sm-2 col-xs-2">
                        <button
                          className="btn btn-md rounded btn-primary m-3"
                          onClick={(event) => {
                            handleStartChat(event, user);
                          }}
                        >
                          Chat
                        </button>
                      </div>
                      <div className="col-sm-2 col-xs-2">
                        <button
                          className="mt-3"
                          style={{ backgroundColor: "#d9d4c7" }}
                          onClick={(event) => {
                            handleStartVideoVChat(event, user);
                          }}
                        >
                          <i
                            className="fa fa-video-camera"
                            style={{ fontSize: "40px", color: "blue" }}
                          ></i>
                        </button>
                      </div>
                      <div className="col-sm-3">
                        <button
                          className="btn btn-md rounded btn-danger m-3 flow-right"
                          onClick={(event) => handleDelete(event, user)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
