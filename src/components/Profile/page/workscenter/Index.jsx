import React from "react";
import { Nav } from "../../components/ProfileNav";

import { navigate } from "@reach/router";

const WorksCenter = (props) => {
  const { children } = props;
  const [num, setNum] = React.useState(0);
  React.useState(() => {
    let _router = props["*"];
   
    if (_router == "serise" ||_router== "seriesdetail") {
      setNum(1);
    } else if (_router == "draft") {
      setNum(2);
    } else {
      setNum(0);
    }
  }, []);
  return (
    <section className="bg-white profile-padding all-height ">
      <main>
        <div>
          <Nav
            list={["普通", "系列", "草稿箱"]}
              parent={props}
              _inx={num}
            onEvent={(num) => {
              console.log(num);
              if (num == 1) {
                navigate(`/users/profile/workscenter`);
                setNum(0);
              } else if (num == 2) {
                navigate(`/users/profile/workscenter/series`);
                setNum(1);
              } else {
                navigate(`/users/profile/workscenter/draft`);
                setNum(2);
              }
            }}
          />
        </div>
        <div className="profile-top">{children}</div>
      </main>
    </section>
  );
};
export default WorksCenter;
