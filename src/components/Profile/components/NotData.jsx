import React from "react";

const NotData = (props) => (
  <div className="profile-top all-width all-height view-overflow text-center">
    <img src={props.src} style={{ width: 490, height: 293 ,maxWidth:'100%'}} />
    <div className="fn-color-6f fn-size-16 profile-top-20">{props.content}</div>
  </div>
);
export default NotData;