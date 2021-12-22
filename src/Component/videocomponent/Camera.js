import React from "react";
import { isSignedIn } from "../../apicaller/auth";
import "../../style/camera.css";
import videoOn from "../../assest/videoOn.svg";
import videoOff from "../../assest/videoOff.svg";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Camera = React.forwardRef((props, ref) => {
  const {
    stream,
    callAccepted,
    callIsActive,
    myVideoStatus,
    handleFullScreen,
    updateVideo,
    updateAudio,
    myAudioStatus,
    userVideoStatus,
    userMicStatus,
    endCall,
    makeCall,
    persononCall,
  } = props;

  const { myVideoRef, friendVideoRef } = ref;
  const { user } = isSignedIn();
  return (
    <div className="grid">
      {callAccepted && callIsActive && friendVideoRef && (
        <div
          className="card2"
          style={{ textAlign: "center", marginTop: "20px" }}
          id="video2"
        >
          <div style={{ height: "2rem" }}>
            <h3>{userVideoStatus && persononCall.name}</h3>
          </div>

          <div className="video-avatar-container">
            <video
              playsInline
              ref={friendVideoRef}
              onClick={handleFullScreen}
              autoPlay
              className="video-active"
              style={{
                opacity: `${userVideoStatus ? "1" : "0"}`,
              }}
            />

            <Avatar
              style={{
                backgroundColor: "#116",
                position: "absolute",
                opacity: `${userVideoStatus ? "-1" : "2"}`,
              }}
              size={98}
              icon={!persononCall.name && <UserOutlined />}
            >
              {persononCall.name}
            </Avatar>
          </div>
          <div className="iconsDiv">
            <div className="icons" tabIndex="0">
              <i
                className={`fa fa-microphone${userMicStatus ? "" : "-slash"}`}
                style={{ transform: "scaleX(-1)" }}
                aria-label={`${userMicStatus ? "mic on" : "mic off"}`}
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
      )}
      {stream ? (
        <div
          style={{ textAlign: "center", marginTop: "20px" }}
          className="card"
          id={callAccepted && callIsActive ? "video1" : "video3"}
        >
          <div style={{ height: "2rem" }}>
            <h3>{myVideoStatus && user.name}</h3>
          </div>
          <div className="video-avatar-container">
            <video
              playsInline
              muted
              onClick={handleFullScreen}
              ref={myVideoRef}
              autoPlay
              className="video-active"
              style={{
                opacity: `${myVideoStatus ? "1" : "0"}`,
              }}
            />

            <Avatar
              style={{
                backgroundColor: "#116",
                position: "absolute",
                opacity: `${myVideoStatus ? "-1" : "2"}`,
              }}
              size={98}
              icon={!user.name && <UserOutlined />}
            >
              {user.name}
            </Avatar>
          </div>

          <div className="iconsDiv">
            <div className="icons" onClick={updateAudio} tabIndex="0">
              <i
                className={`fa fa-microphone${myAudioStatus ? "" : "-slash"}`}
                style={{ transform: "scaleX(-1)" }}
                aria-label={`${myAudioStatus ? "mic on" : "mic off"}`}
                aria-hidden="true"
              ></i>
            </div>

            {stream && !callAccepted && !callIsActive && (
              <div className="icons" onClick={makeCall}>
                <FontAwesomeIcon style={{ color: "green" }} icon={faPhone} />
              </div>
            )}
            {stream && callAccepted && callIsActive && (
              <div className="icons" onClick={endCall}>
                <FontAwesomeIcon style={{ color: "red" }} icon={faPhone} />
              </div>
            )}

            <div className="icons" onClick={() => updateVideo()} tabIndex="0">
              {myVideoStatus ? (
                <img src={videoOn} alt="video on icon" />
              ) : (
                <img src={videoOff} alt="video off icon" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
});

export default Camera;
