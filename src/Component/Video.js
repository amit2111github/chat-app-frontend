import React, { useState, useRef, useEffect } from "react";
import Peer from "peerjs";
import "../style/video.css";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../backend";
import { isSignedIn, getFriend } from "../apicaller/auth";
import Camera from "./videocomponent/Camera";
import Option from "./videocomponent/Option";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Messenger from "./videocomponent/Massenger";
import MessangerHeader from "./videocomponent/MessangerHeader";

console.log(SOCKET_URL);
const Video = () => {
  const [message, setMessage] = useState("");
  const [peer, setPeer] = useState(false);
  const [stream, setStream] = useState(null);
  const [socket, setSocket] = useState("");
  const [friendStream, setFriendStream] = useState(null);
  const [callAccepted, setcallAccepted] = useState(false);
  const [inComingCall, setInComingCall] = useState(null);
  const [callComing, setCallComing] = useState(false);
  const [callIsActive, setCallIsActive] = useState(false);
  const [myVideoStatus, setmyVideoStatus] = useState(true);
  const [myAudioStatus, setMyAudioStatus] = useState(true);
  const [showChatModal, setShowChatModal] = useState(false);
  const [callComingModal, setCallComingModal] = useState(false);
  const [userMicStatus, setUserMicStatus] = useState(true);
  const [userVideoStatus, setUserVideoStatus] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [persononCall, setPersonOnCall] = useState(false);
  const [personWhoIsCalling, setPersonWhoIsCalling] = useState(false);
  const [chats, setChats] = useState([]);
  const [showChatNotPeople, setShowChatNotPeople] = useState(true);
  const [peopleOnCall, setPeopleOnCall] = useState([]);
  const myVideoRef = useRef();
  const friendVideoRef = useRef();
  const dummyRef = useRef();
  const secondUser = getFriend();

  const { user } = isSignedIn();

  // useEffect

  // socket connection
  useEffect(() => {
    const temp_socket = io(SOCKET_URL || "http://localhost:3000", {
      query: {
        id: user._id,
      },
    });
    setSocket(temp_socket);
  }, []);

  // stream setting
  useEffect(() => {
    let tempPeer = new Peer(user._id);
    setPeer(tempPeer);
    window.navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        console.log(stream);
        setStream(stream);
        myVideoRef.current.srcObject = stream;
      })
      .catch((err) => console.log(err + " dangit"));
  }, []);

  useEffect(() => {
    if (!peer) return;
    peer.on("open", (id) => {
      // console.log("My peer ID is: " + id);
    });

    if (socket) {
      socket.on("callComing", (payload) => {
        console.log("call coming");
        setPersonWhoIsCalling(payload.callBy);
        setPersonOnCall(payload.callBy);
        setCallComingModal(true);
        setCallComing(true);
      });
      socket.on("callrejected", (payload) => {
        // alert("Call Rejected");
        // console.log("callRejected");
      });
      socket.on("callaccepted", (payload) => {
        setPeopleOnCall([user, persononCall]);
      });
      socket.on("callended", ({ endTo, endBy }) => {
        setcallAccepted(false);
        setFriendStream(null);
        setCallIsActive(false);
        setPersonWhoIsCalling(false);
        setPeopleOnCall([]);
      });
      socket.on("audioChanged", (payload) => {
        setUserMicStatus(payload.audioStatus);
      });
      socket.on("videoChanged", (payload) => {
        console.log("here for ", payload.videoStatus);
        setUserVideoStatus(payload.videoStatus);
      });

      // messages
      socket.on("message", (payload) => {
        setChats([...chats, payload]);
      });
    }
    peer.on("call", (call) => {
      setCallComing(true);
      setInComingCall(call);
    });
  });

  const handleFullScreen = (event) => {
    const elem = event.target;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };
  const updateVideo = (event) => {
    setmyVideoStatus((currentStatus) => {
      socket.emit("videoChanged", {
        videoStatus: !currentStatus,
        userTo: persononCall,
      });
      setStream((stream) => {
        stream.getVideoTracks()[0].enabled = !currentStatus;
        return stream;
      });
      return !currentStatus;
    });
  };
  const updateAudio = (event) => {
    setMyAudioStatus((currentStatus) => {
      socket.emit("audioChanged", {
        audioStatus: !currentStatus,
        userTo: persononCall,
      });
      setStream((stream) => {
        stream.getAudioTracks()[0].enabled = !currentStatus;
        return stream;
      });
      return !currentStatus;
    });
  };
  const handleSendMessage = () => {
    if (chatMessage.length > 0) {
      //TODO: need to emit via socket
      setChatMessage("");
    }
  };
  const endCall = () => {
    if (inComingCall) inComingCall.close();
    setCallIsActive(false);
    setInComingCall(null);
    setFriendStream(null);
    setcallAccepted(false);

    const endTo =
      user._id === personWhoIsCalling._id ? secondUser : personWhoIsCalling;
    socket.emit("callended", { endBy: user, endTo: endTo });
    setPersonWhoIsCalling(false);
    setPersonOnCall(false);
    setPeopleOnCall([]);
  };

  const makeCall = (event) => {
    console.log("make call");
    const callRequest = peer.call(secondUser._id, stream);
    console.log(callRequest);
    setPersonOnCall(secondUser);
    callRequest.on("stream", (friendVide) => {
      setcallAccepted(true);
      setFriendStream(friendVide);
      setCallIsActive(true);
      friendVideoRef.current.srcObject = friendVide;
    });
    setPersonWhoIsCalling(user);
    socket.emit("callmaking", { callTo: secondUser, callBy: user });
    console.log("call  made");
  };

  const answerCall = () => {
    setCallComing(false);
    if (!inComingCall) return;
    inComingCall.answer(stream);
    inComingCall.on("stream", (userVideoStream) => {
      setcallAccepted(true);
      setCallIsActive(true);
      setFriendStream(userVideoStream);
      friendVideoRef.current.srcObject = userVideoStream;
    });
    setPeopleOnCall([user, persononCall]);
    socket.emit("callaccepted", { callBy: personWhoIsCalling, callTo: user });
  };
  const rejectCall = () => {
    setCallComingModal(false);
    setCallComing(false);
    setInComingCall(null);
    socket.emit("callrejected", { callBy: personWhoIsCalling, callTo: user });
    setPersonWhoIsCalling(false);
  };

  const handleChangeMessage = (event) => {
    if (event.key === "Enter") {
      handleSubmitMessage();
      return;
    }
    setMessage(event.target.value);
  };
  const handleSubmitMessage = (event) => {
    if (message.length < 0) return;
    console.log("onsumit");
    socket.emit("message", {
      message,
      user,
      userTo: persononCall,
      time: new Date(),
    });
    setChats([
      ...chats,
      { message, user, userTo: persononCall, time: new Date() },
    ]);
    setMessage("");
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: "#202124", width: "100%", height: "100vh" }}
    >
      <div>
        <Messenger
          showChatModal={showChatModal}
          setShowChatModal={setShowChatModal}
          showChatNotPeople={showChatNotPeople}
          setShowChatNotPeople={setShowChatNotPeople}
          peopleOnCall={peopleOnCall}
          message={message}
          handleChangeMessage={handleChangeMessage}
          handleSubmitMessage={handleSubmitMessage}
          chats={chats}
        />
        <MessangerHeader
          showChatModal={showChatModal}
          setShowChatModal={setShowChatModal}
          setShowChatNotPeople={setShowChatNotPeople}
        />
        <Camera
          stream={stream}
          callAccepted={callAccepted}
          callIsActive={callIsActive}
          myVideoStatus={myVideoStatus}
          myAudioStatus={myAudioStatus}
          handleFullScreen={handleFullScreen}
          ref={{ myVideoRef, friendVideoRef, dummyRef }}
          updateVideo={updateVideo}
          updateAudio={updateAudio}
          showChatModal={showChatModal}
          setShowChatModal={setShowChatModal}
          chats={chats}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          handleSendMessage={handleSendMessage}
          userMicStatus={userMicStatus}
          userVideoStatus={userVideoStatus}
          persononCall={persononCall}
          makeCall={makeCall}
          endCall={endCall}
        />

        <Option
          callAccepted={callAccepted}
          callIsActive={callIsActive}
          endCall={endCall}
          makeCall={makeCall}
          inComingCall={inComingCall}
          callComingModal={callComingModal}
          setCallComingModal={setCallComingModal}
          persononCall={persononCall}
          answerCall={answerCall}
          rejectCall={rejectCall}
          callComing={callComing}
        />
      </div>
    </div>
  );
};

export default Video;
