import React from "react";
import "../style/Widgets.css";

const Widgets = () => {

    return (
        <div className="widgets col-4">
            <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCodingTreeFoundation&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="380"
                height="100%"
                style={{ border: "none", overflow: "hidden", paddingLeft: "10px" }}
                scrolling="no"
                frameborder="0"
                allowTransparency="true"
                allow="encrypted-media"
                title="bang on"

            ></iframe>
        </div>
    );
}

export default Widgets;
