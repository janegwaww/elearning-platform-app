import React from "react";
import ProfileIndex from "../ProfileChildens/ProfileIndex";
import MsgCenter from "../ProfileChildens/MsgCenter";
import CreateCenter from "../ProfileChildens/CreateCenter";
import Dynamic from '../ProfileChildens/Dynamic';
const return_run = (prveProps, nextPropa) => {
  
};
const return_dom = (num) => {
  if (!num) {
    return <ProfileIndex />;
  }
  switch (num) {
    case 1:
      // 默认页
      return <ProfileIndex />;

    case 2:
      // 消息中心
      return <MsgCenter />;
    case 3:
      // 创作中心
      return <CreateCenter />;
    case 4:
      // 动态
      return <Dynamic />;

    default:
      return <ProfileIndex />;
  }
};
const PageRouter = (props) => {
  return return_dom(props.num);
};

export default React.memo(PageRouter, return_run);
