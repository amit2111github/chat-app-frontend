import React from "react";
import { Avatar } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { ExpandMoreOutlined } from "@material-ui/icons";
import "../style/SidebarRow.css";
import "../style/Sidebar.css";
import { isSignedIn } from "../apicaller/auth";
const SidebarRow = ({ src, Icon, title, onClick }) => {
    return (
        <div className="sidebarRow" onClick={onClick}>
            {src && <Avatar src={src} />}
            {Icon && <Icon />}
            <h4>{title}</h4>
        </div>
    );
};
const Sidebar = ({ history }) => {
    const { user } = isSignedIn();
    if (isSignedIn()) user.photoURL = user.name[0];
    return (
        <div className="sidebar col-2">
            {isSignedIn() && (
                <SidebarRow src={user.photoURL} title={user.displayName} />
            )}
            <SidebarRow
                Icon={LocalHospitalIcon}
                title="COVID-19 Information Center"
            />
            <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
            <SidebarRow
                Icon={PeopleIcon}
                title="Friends"
                onClick={() => history.push("/user/contactpage")}
            />
            <SidebarRow
                Icon={ChatIcon}
                title="Messanger"
                onClick={() => history.push("/Chat")}
            />
            <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
            <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
            <SidebarRow Icon={ExpandMoreOutlined} title="Marketplace" />
        </div>
    );
};
export default Sidebar;
