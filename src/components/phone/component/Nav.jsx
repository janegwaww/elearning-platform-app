import React from "react";
import style from "./style.module.css";
import { Grid } from "@material-ui/core";
import { get_data } from "../../../assets/js/request";
import { navigate } from "@reach/router";

export const HeadNav = () => (
  <div className={`box box-align-center box-between `}>
    <div className={`box box-align-center fn-color-565663 ${style.fn16}`}>
      <div
        style={{ marginRight: "3em" }}
        onClick={() => {
          navigate("/phone");
        }}
      >
        首页
      </div>
      <div>加盟学者</div>
    </div>
    <div
      className={style.btn}
      onClick={() => {
        navigate(`/video`);
        window.history.go();
      }}
    >
      投稿
    </div>
  </div>
);
export const ItemNav = (props) => {
  const [navArr, setNavArr] = React.useState(props.navArr);
  const btn_click = (ev) => {
    let _data = ev.target.dataset;
    if (JSON.stringify(_data) == "{}") {
      _data = ev.target.parentNode.dataset;
    }

    props.onEvent && props.onEvent(parseInt(_data.inx), _data.type);
  };
  React.useEffect(() => {
    // get_data({
    //   extra_data: {},
    //   model_action: "get_category",
    //   model_name: "category",
    //   model_type: "",
    // })
    //   .then((res) => {
    //     if (res.err == 0) {
    //       setNavArr(res.result_data);
    //     }
    //   })
    //   .catch((err) => {
    //     alert("网络错误");
    //   });
  }, []);
  return (
    <div className="all-width">
      <div
        className={`all-width box box-align-center text-center  ${style.itemnav}`}
      >
        {navArr &&
          navArr.length > 0 &&
          navArr.map((op, inx) => (
            <div
              onClick={btn_click}
              data-inx={inx + 1}
              key={op.id}
              data-type={op.id}
              className={props.nowpage == op.id ? "fn-color-007CFF" : ""}
            >
              <img
                src={props.nowpage == op.id ? op.web_click_icon : op.web_icon}
                alt=""
                title={op.name}
              />
              <p className={`view-nowrap ${style.fn14}`}>{op.name}</p>
            </div>
          ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          width: 80,
          height: 4,
          borderRadius: 7,
        }}
        className="box"
      >
        <div style={{ width: "50%" }} className="all-height bg-007CFF"></div>
        <div style={{ width: "50%" }} className="all-height bg-F2F2F5"></div>
      </div>
    </div>
  );
};
export const Nav = (props) => {
  const [nowInx, setNowInx] = React.useState(1);
  const btn_click = (ev) => {
    let _data = ev.target.dataset;
    if (JSON.stringify(_data) == "{}") {
      _data = ev.target.parentNode.dataset;
    }
    setNowInx(_data.inx);
    props.onEvent && props.onEvent(parseInt(_data.inx));
  };
  return (
    <div className={`${style.fn14} `}>
      <div className={`box box-align-center ${style.nav}`}>
        <div
          className={nowInx == 1 ? "fn-color-007CFF" : ""}
          data-inx="1"
          onClick={btn_click}
        >
          全部模态
          {nowInx == 1 && (
            <span
              style={{
                height: 2,
                position: "absolute",
                bottom: 0,
                width: "100%",
                left: 0,
              }}
              className="bg-007CFF"
            ></span>
          )}
        </div>
        <div
          data-inx="2"
          className={nowInx == 2 ? "fn-color-007CFF" : ""}
          onClick={btn_click}
        >
          视频模态
          {nowInx == 2 && (
            <span
              style={{
                height: 2,
                position: "absolute",
                bottom: 0,
                width: "100%",
                left: 0,
              }}
              className="bg-007CFF"
            ></span>
          )}
        </div>
        <div
          data-inx="3"
          className={nowInx == 3 ? "fn-color-007CFF" : ""}
          onClick={btn_click}
        >
          文本模态
          {nowInx == 3 && (
            <span
              style={{
                height: 2,
                position: "absolute",
                bottom: 0,
                width: "100%",
                left: 0,
              }}
              className="bg-007CFF"
            ></span>
          )}
        </div>
        <div data-inx="4" onClick={btn_click}>
          更多…
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
};

export const NewNav = (props) => {
  const [nowInx, setNowInx] = React.useState(1);
  const btn_click = (ev) => {
    let _data = ev.target.dataset;
    if (JSON.stringify(_data) == "{}") {
      _data = ev.target.parentNode.dataset;
    }
    setNowInx(_data.inx);
    props.onEvent && props.onEvent(parseInt(_data.inx));
  };
  return (
    <div className={`${style.fn14} `}>
      <div className={`box box-align-center ${style.nav}`}>
        {props.list &&
          props.list.map((va, inx) => (
            <div
              className={nowInx == inx+1 ? "fn-color-007CFF" : ""}
              data-inx={inx + 1}
              key={va}
              onClick={btn_click}
              
            >
              {va}
              {nowInx == inx+1 && (
                <span
                  style={{
                    height: 2,
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    left: 0,
                  }}
                  className="bg-007CFF"
                ></span>
              )}
            </div>
          ))}
      </div>
      <div className="line"></div>
    </div>
  );
};
