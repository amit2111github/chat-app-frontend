import React from "react";
import Phone from "../../assest/phone.gif";
import { Button, Modal } from "antd";
import * as classes from "../../style/Options.module.css";
import { PhoneOutlined } from "@ant-design/icons";
import Footer from "../Footer";

const Option = (props) => {
  const {
    callAccepted,
    callComingModal,
    setCallComingModal,
    persononCall,
    answerCall,
    callComing,
    rejectCall,
  } = props;

  return (
    <>
      <div style={{ marginBottom: "75px" }}>
        {callComing && !callAccepted && (
          <>
            <Modal
              title="Incoming Call"
              visible={callComingModal}
              onOk={() => setCallComingModal(false)}
              footer={null}
            >
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h3>
                  {persononCall.name} is calling you:
                  <img
                    src={Phone}
                    alt="phone ringing"
                    className={classes.phone}
                    style={{ display: "inline-block" }}
                  />
                </h3>
              </div>
              <div className={classes.btnDiv}>
                <Button
                  variant="contained"
                  className={classes.answer}
                  color="#29bb89"
                  icon={<PhoneOutlined />}
                  onClick={answerCall}
                  tabIndex="0"
                >
                  Answer
                </Button>
                <Button
                  variant="contained"
                  className={classes.decline}
                  icon={<PhoneOutlined />}
                  onClick={rejectCall}
                  tabIndex="0"
                >
                  Decline
                </Button>
              </div>
            </Modal>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Option;
