import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import timediff from "timediff";
import {
  getFriend,
  getAllMessage,
  isSignedIn,
  sendMessage,
  deleteMessage,
  getContactList,
  setItemInLocalStorageForChat,
} from "../apicaller/auth";
import { io } from "socket.io-client";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "../style/chatpage.css";
import { SOCKET_URL } from "../backend";

const ChatPage = ({ history }) => {
  const myref = React.useRef("");
  const [socket, setSocket] = useState("");
  const [contacts, setContacts] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const preloadingContact = async () => {
    const data = await getContactList(user._id, token);
    data.map((friend) => {
      delete friend.encry_password;
      delete friend.salt;
      delete friend.contacts;
      return friend;
    });
    setContacts(data);
  };
  useEffect(() => {
    preloadingContact();

    if (!myref || myref !== undefined) myref.current.focus();
  }, []);

  useEffect(() => {
    const temp_socket = io(SOCKET_URL || "http://localhost:8000", {
      query: {
        id: user._id,
      },
    });
    setSocket(temp_socket);
  }, []);
  const { user, token } = isSignedIn();

  const [secondUser, setSecondUser] = useState(getFriend());
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);
  const handleDeleteMessage = async (msgId, msgIndex) => {
    const data = await deleteMessage(msgId, user._id, token);
    if (data.error) {
      alert(data.error);
      return;
    }
    let newMessageArray = [...messages];
    newMessageArray.splice(msgIndex, 1);
    setMessages(newMessageArray);
  };
  const handleChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (description.length <= 0) return;
    if (!socket || socket == undefined || socket === null) return;
    setMessages([
      ...messages,
      {
        description,
        sender: user._id,
        receiver: secondUser._id,
        isdeleted: false,
      },
    ]);
    socket.emit("chat", {
      description,
      sender: user._id,
      receiver: secondUser._id,
    });

    const data = await sendMessage(
      user._id,
      token,
      description,
      user._id,
      secondUser._id
    );
    setDescription("");
  };
  const getTimeString = (time) => {
    return time.years
      ? time.years + " years"
      : false || time.months
      ? time.months + " months"
      : false || time.weeks
      ? time.weeks + " weeks"
      : false || time.days
      ? time.days + " days"
      : false || time.hours
      ? time.hours + " hours"
      : false || time.minutes
      ? time.minutes + " minutes"
      : false || time.seconds
      ? time.seconds + " seconds"
      : "just now";
  };
  useEffect(() => {
    if (!socket || socket === undefined || socket === null) return;
    socket.on("receive", (payload) => {
      setMessages([...messages, payload]);
    });
  });

  const preloading = async (userId, token, to) => {
    let data = await getAllMessage(userId, token, to);
    setMessages(data);
  };
  useEffect(() => {
    setSecondUser(getFriend());
  }, [history.location.pathname]);
  useEffect(() => {
    preloading(user._id, token, secondUser._id);
  }, [secondUser]);
  const handleStartVideoVChat = async (friend) => {
    await setItemInLocalStorageForChat(friend);
    history.push(`/videocall/${friend._id}`);
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="row app-one" style={{ overflow: "hidden" }}>
        <div className="col-sm-4 side" style={{ overflow: "hidden" }}>
          <div className="side-one" style={{ overflow: "auto" }}>
            <div className="row heading">
              <div className="col-sm-1 col-xs-2 heading-compose  pull-right">
                <a href="/user/dashboard">
                  <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                </a>
              </div>
              <div className="col-sm-7 col-xs-3 heading-avatar">
                <div className="heading-avatar-icon">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="userimage"
                  />
                </div>
              </div>
              <div className="col-sm-3 col-xs-1  heading-dot  pull-right">
                <i
                  className="fa fa-ellipsis-v fa-2x  pull-right"
                  aria-hidden="true"
                ></i>
              </div>
            </div>

            <div className="row searchBox">
              <div className="col-sm-12 searchBox-inner">
                <div className="form-group has-feedback">
                  <input
                    id="searchText"
                    type="text"
                    className="form-control"
                    name="searchText"
                    placeholder="Search"
                  />
                  <span className="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
              </div>
            </div>
            {contacts.map((user) => (
              <div
                style={{
                  backgroundColor: user._id === secondUser._id ? "#dbd9d3" : "",
                }}
                className="row sideBar-body"
                onClick={() => {
                  setItemInLocalStorageForChat(user);
                  history.push(`/userchatPage/${user._id}`);
                  myref.current.focus();
                }}
              >
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt="userimage"
                    />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">{user.name}</span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">today</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-sm-8 conversation" style={{ overflow: "hidden" }}>
          <div className="row heading">
            <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
              <div className="heading-avatar-icon">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                  alt="userimage"
                />
              </div>
            </div>
            <div className="col-sm-9 col-xs-7 heading-name">
              <a className="heading-name-meta" href>
                {secondUser.name}
              </a>
              <span className="heading-online">Online</span>
            </div>
            <div className="col-sm-1 col-xs-1">
              <i
                onClick={() => handleStartVideoVChat(secondUser)}
                className="fa fa-video-camera"
                style={{ fontSize: "30px", color: "green" }}
              ></i>
            </div>
          </div>
          {showEmojiPicker && (
            <div
              className="col-8 offset-2 mb-3"
              style={{ position: "absolute" }}
            >
              <Picker
                onSelect={(e) =>
                  setDescription((oldValue) => oldValue + e.native)
                }
              />
            </div>
          )}
          <div>
            <div style={{ overflow: "auto", height: "450px" }}>
              {messages.length > 0 &&
                messages.map((msg, index) => {
                  let classstyle =
                    msg.sender === user._id ? "sender" : "receiver";
                  let classstyle1 =
                    msg.sender === user._id
                      ? "message-main-receiver"
                      : "message-main-sender";
                  const time = getTimeString(
                    timediff(msg.createdAt, new Date(), { returnZeros: false })
                  );
                  return (
                    <div className="row message-body" key={uuidv4()}>
                      <div className={classstyle1 + "col-sm-12"}>
                        <div className={classstyle}>
                          {msg.sender === isSignedIn().user._id && (
                            <button
                              className="message-time pull-right btn btn-sm text-danger"
                              onClick={() =>
                                handleDeleteMessage(msg._id, index)
                              }
                            >
                              X
                            </button>
                          )}
                          <div className="message-text">{msg.description}</div>

                          <span className="message-time pull-right">
                            {time} ago
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              className="row reply"
              style={{
                width: "inherit",
                height: "60px",
                marginTop: "30px",
                position: "relative",
                bottom: "0",
                zIndex: "1000",
              }}
            >
              <div className="col-sm-1 col-xs-1 reply-emojis">
                <i
                  onClick={(e) => setShowEmojiPicker(!showEmojiPicker)}
                  className="fa fa-smile-o fa-2x"
                ></i>
              </div>

              <div className="col-sm-1 col-xs-1 reply-recording">
                <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
              </div>
              <div className="col-sm-9 col-xs-9 reply-main rounded">
                <input
                  ref={myref}
                  placeholder="Type a message"
                  className="form-control rounde"
                  rows="1"
                  id="comment"
                  onChange={handleChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSubmit(event);
                  }}
                  value={description}
                  name="description"
                />
              </div>
              <div className="col-sm-1 col-xs-1 reply-send">
                <button
                  className="btn btn-small btn-grey"
                  style={{ marginTop: "-10px" }}
                  onClick={handleSubmit}
                >
                  <i
                    className="fa fa-send fa-2x"
                    aria-hidden="true"
                    tabIndex="2"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
