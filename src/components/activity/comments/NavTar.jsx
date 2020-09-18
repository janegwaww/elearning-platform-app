import React from "react";

import "./navtar.css";
import { navigate } from "@reach/router";
import { is_phone } from "../../../assets/js/totls";
const NavTar = (props) => {
  const [isPhone, setIsPhone] = React.useState(false);
  const [lists, setLists] = React.useState([
    { title: "首页", page: "/" },
    { title: "关于知擎杯", page: "activityabout" },
    { title: "赛事详情", page: "activitydetail" },
    { title: "全部作品", page: "activityallworks" },
  ]);
  const btn_page = (ev) => {
    let _data = ev.target.dataset;
    if (JSON.stringify(_data) == "{}") {
      _data = ev.target.parentNode.dataset;
    }
    if (props.inx == _data.id) return;

    let _url = "/activity/";
    if (_data.id == 2) {
      _url = _url + "activityabout";
    } else if (_data.id == 3) {
      _url = _url + "activitydetail";
    } else if (_data.id == 4) {
      _url = _url + "activityallworks";
    }
    navigate(`${_url}`);
  };
  React.useEffect(() => {
    setIsPhone(() => is_phone());
  }, []);
  return (
    <div
      className="all-width contestcar"
      style={{ backgroundColor: "#fcf800" }}
    >
      <div
        className="navtar text-center "
        style={{
          width: isPhone ? "calc(100% - 0.1em)" : "calc(100% - 0.05em)",
        }}
      >
        <div className="box box-align-center all-height contestcar">
          {lists.map((v, inx) => (
            <div className="box-flex " key={v.title}>
              <div>
                <span
                  className={props.inx == inx + 1 ? "acti" : ""}
                  style={{
                    fontSize:
                      isPhone && props.inx == inx + 1
                        ? "2em"
                        : !isPhone && props.inx == inx + 1
                        ? "1.33em"
                        : "inherit",
                  }}
                  key={v.title}
                  data-page={v.page}
                  data-id={inx + 1}
                  onClick={btn_page}
                >
                  {v.title}
                  <span></span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavTar;
