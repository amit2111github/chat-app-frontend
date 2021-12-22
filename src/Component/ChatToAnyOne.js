import React, { useEffect, useState } from 'react'
import { getContactList, isSignedIn, setItemInLocalStorageForChat } from "../apicaller/auth"
import "../style/chatpage.css";

const ChatToAnyOne = ({ history }) => {
    const { user, token } = isSignedIn();
    const [contact, setContact] = useState([]);
    const preLoadingContact = async () => {
        const data = await getContactList(user._id, token);
        data.map((friend) => {
            delete friend.encry_password;
            delete friend.salt;
            delete friend.contacts;
            return friend;
        });
        setContact(data);
    }
    useEffect(() => {
        preLoadingContact();
    }, [])
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
                        {contact.map((user) => (
                            <div
                                className="row sideBar-body"
                                onClick={() => {
                                    setItemInLocalStorageForChat(user);
                                    history.push(`/userchatPage/${user._id}`);
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
                <div className="col-sm-8 home" style={{ overflow: "hidden" }}>
                    <div className="home__img-wrapper">
                        <img className='home__img' src="https://res.cloudinary.com/dnd5dhyzv/image/upload/v1640179650/chatAppData/intro-connection-light_h53k52.jpg" alt="WebImage" />
                    </div>
                    <h1 className="home__title"> Keep your phone connected </h1>
                    <p className="home__text">
                        TIMA connects to your phone to sync messages. To reduce data usage,
                        connect your phone to Wi-Fi.
                    </p>
                    <p className="home__text">
                        <span>
                            WhatsApp is available for Mac.
                            <a
                                href
                                className="home__link"
                            >
                                Get it here
                            </a>
                            .
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ChatToAnyOne
