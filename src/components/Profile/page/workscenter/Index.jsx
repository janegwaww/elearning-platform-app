import React from "react";
import { Nav } from "../../components/ProfileNav";

import { navigate } from "@reach/router";

const WorksCenter = (props) => {
  const { children } = props;
  const [num, setNum] = React.useState(0);
  const [lists, setLists] = React.useState(["普通", "系列",'文本','系列文本', "草稿箱"]);
  const [url,setUrl] = React.useState('');
  React.useEffect(() => {
    let _router = props["*"];
    if (_router.split("/")) {
      _router = _router.split("/")[0];
    }
   
    if (_router == "document") {
      setNum(2);
      // setUrl(_router);
      // setLists((old) => {
      //   let _new = JSON.parse(JSON.stringify(lists));
      //   _new.push("文本");
      //   return _new;
      // });
    } else if (_router == "seriesdoc") {
      setNum(3);
      // setUrl(_router);
      // setLists((old) => {
      //   let _new = JSON.parse(JSON.stringify(lists));
      //   _new.push("系列文本");
      //   return _new;
      // });
    } else if (_router == "series" || _router == "seriesdetail") {
      setNum(1);
    } else if (_router == "draft") {
      setNum(4);
    } else {
      setNum(0);
    }
  }, []);
  return (
    <section className="bg-white profile-padding all-height ">
      <main>
        <div>
          <Nav
            list={lists}
            parent={props}
            _inx={num}
            onEvent={(num) => {
              if (num == 1) {
                navigate(`/users/profile/workscenter`);
                setNum(0);
              } else if (num == 2) {
                navigate(`/users/profile/workscenter/series`);
                setNum(1);
              } else if(num==3){
                navigate(`/users/profile/workscenter/document`);
                setNum(2);
              }
              else if(num==4) {
                navigate(`/users/profile/workscenter/seriesdoc`);
                setNum(3);
              }else{
                navigate(`/users/profile/workscenter/draft`);
                setNum(4);
               
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
