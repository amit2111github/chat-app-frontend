import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { faCommentAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../../style/MessangerHeader.css";

const MessangerHeader = (props) => {
  const { showChatModal, setShowChatModal, setShowChatNotPeople } = props;
  let interval = null;
  const formatDate = (timestamp) => {
    return moment(timestamp).format("h:mm A");
  };
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {!showChatModal && (
        <div className="frame-header" style={{ zIndex: 2 }}>
          <div
            className="header-items icon-block"
            onClick={() => {
              setShowChatModal(!showChatModal);
              setShowChatNotPeople(true);
            }}
          >
            <FontAwesomeIcon className="icon" icon={faCommentAlt} />

            <span className="alert-circle-icon"></span>
          </div>
          <div className="header-items date-block">{currentTime}</div>
          <div className="header-items icon-block">
            <FontAwesomeIcon className="icon profile" icon={faUserCircle} />
          </div>
        </div>
      )}
    </>
  );
};

export default MessangerHeader;
