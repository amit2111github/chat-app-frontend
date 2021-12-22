import React from "react";
import "../../style/massenger.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUserFriends,
  faCommentAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { isSignedIn } from "../../apicaller/auth";

const Messenger = (props) => {
  let {
    chats,
    showChatModal,
    setShowChatModal,
    showChatNotPeople,
    setShowChatNotPeople,
    peopleOnCall,
    handleChangeMessage,
    message,
    handleSubmitMessage,
  } = props;
  const formatDate = (timestamp) => {
    return moment(timestamp).format("h:mm A");
  };
  const { user } = isSignedIn();

  return (
    <>
      {showChatModal && (
        <div className="messenger-container" style={{ zIndex: 1000 }}>
          <div className="messenger-header">
            <h3>Meeting details</h3>
            <FontAwesomeIcon
              className="icon"
              icon={faTimes}
              onClick={() => setShowChatModal(!showChatModal)}
            />
          </div>

          <div className="messenger-header-tabs">
            <div
              className={!showChatNotPeople ? "tab active" : "tab"}
              onClick={() => setShowChatNotPeople(false)}
            >
              <FontAwesomeIcon className="icon" icon={faUserFriends} />
              <p>People ({peopleOnCall.length})</p>
            </div>
            <div
              className={showChatNotPeople ? "tab active" : "tab"}
              onClick={() => setShowChatNotPeople(true)}
            >
              <FontAwesomeIcon className="icon" icon={faCommentAlt} />
              <p>Chat</p>
            </div>
          </div>

          {showChatNotPeople && (
            <div className="chat-section">
              {chats.map((item) => (
                <div key={item.time} className="chat-block">
                  <div className="msg">
                    <p className="sender">{item.message}</p>
                    {item.user.name === user.name ? "you " : item.user.name}
                    <small>{formatDate(item.time)}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!showChatNotPeople && (
            <div className="chat-section">
              {peopleOnCall.map((item, index) => (
                <div key={item.time} className="mb-2">
                  <div key={index} className="text-success">
                    <h5 className="text-success">
                      {item._id === user._id ? "you" : item.name}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="send-msg-section">
            <input
              placeholder="Send a message to everyone"
              value={message}
              onChange={handleChangeMessage}
              onKeyDown={handleChangeMessage}
            />
            <FontAwesomeIcon
              className="icon"
              icon={faPaperPlane}
              onClick={handleSubmitMessage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Messenger;
