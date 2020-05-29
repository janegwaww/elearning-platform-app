

import React from "react";
import ProfileIndex from "../ProfileChildens/ProfileIndex";

import MsgCenter from "../ProfileChildens/MsgCenter";
import CreateCenter from "../ProfileChildens/CreateCenter";
import Dynamic from '../ProfileChildens/Dynamic';
import SetPage from '../ProfileChildens/setingsCenter';
const return_run = (prveProps, nextPropa) => {
  
};
const return_dom = (parent,num) => {
  if (!num) {
    return <ProfileIndex parent={parent}/>;
  }
  switch (num) {
    case 1:
      // 默认页
      return <ProfileIndex parent={parent} />;

    case 2:
      // 消息中心
      return <MsgCenter parent={parent}/>;
    case 3:
      // 创作中心
      return <CreateCenter parent={parent}/>;
    case 4:
      // 动态
      return <Dynamic parent={parent}/>;
    case 5:
      return <SetPage parent={parent}/>;
    default:
      return <ProfileIndex parent={parent}/>;
  }
};
const PageRouter = (props) => {
 
  return return_dom(props.parent,props.num);
};

export default React.memo(PageRouter, return_run);
