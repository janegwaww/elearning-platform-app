import React from "react";
import {  navigate } from "@reach/router";
import { Nav} from "../../components/ProfileNav";
import '../../components/settings.css';

const Setings = (props) => {
  
  const { children } = props;
  const [num, setNum] = React.useState(0);
  React.useEffect(() => {
    let _router = props["*"];
    if (_router == "safety") {
      setNum(1);
    } else if (_router == "help") {
      setNum(2);
    } else {
      setNum(0);
    }
  },[]);
  return (
    <div className="all-height view-scroll bg-white profile-padding">
      <nav>
        <Nav
          list={["基本设置", "安全中心", "帮助/反馈"]}
          parent={props}
          _inx = {num}
          onEvent={(num) => {
            if (num == 1) {
              navigate(`/users/profile/settings`);
              setNum(0)
            } else if (num == 2) {
              navigate(`/users/profile/settings/safety`);
              setNum(1)
            } else {
              navigate(`/users/profile/settings/help`);
              setNum(2)
            }
          }}
        />
      </nav>
      <div className="profile-top">{children}</div>
    </div>
  );
};
export default Setings;