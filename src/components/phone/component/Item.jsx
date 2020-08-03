import React from "react";
import style from "./style.module.css";
import { get_date } from "../../../assets/js/totls";
import { navigate } from "@reach/router";
import { PlayCircleOutline } from "@material-ui/icons";
const Item = (props) => {
  return (
    <div
      className={`view-overflow all-height ${style.item}`}
      onClick={() => {
        if (props.info.type == "document" || props.info.file_type == "pdf") {
          navigate(`/document/?did=${props.info.file_id}`);
          window.history.go();
        } else {
          navigate(`/phoneplay?vid=${props.info.video_id}`);
          window.history.go();
        }
      }}
    >
      <div
        className="all-width bg-all view-overflow"
        style={{ minHeight: "8em", marginBottom: 5, height: "auto",backgroundImage:'url('+ props.info.image_path+')'}}
      >
        <img src={props.info.image_path} style={{height:'auto',width:'100%',minHeight: "8em"}} />
        {props.info.video_time && (
          <span
            className={`fn-color-white ${style.fn12}`}
            style={{
              position: "absolute",
              right: 2,
              bottom: 3,
              display: "inline-block",
              padding: "0.2em 0.5em",
              borderRadius: "0.4em",
              backgroundColor: "rgba(0,0,0,.48)",
            }}
          >
            {props.info.video_time} {/**共7集*/}
          </span>
        )}
      </div>
      {props.info.type == "document" ? (
        <div
          className="box box-between all-height"
          style={{ flexDirection: "column", padding: "1em",height:'calc(100% - 10em)' }}
        >
          <div style={{ marginBottom: "1em" }}>
            <p className="textview-overflow two">{props.info.file_name}123</p>
          </div>
          <div>{get_date(props.info.time, "/", 8)}&nbsp;&nbsp;发布</div>
        </div>
      ) : (
        <div
          className="box box-between all-height"
          style={{ flexDirection: "column", padding: "1em"}}
        >
          <div style={{ marginBottom: "1em" }}>
            <p className="textview-overflow two">
              {/** <span
              style={{
                backgroundColor: "#F86B6B",
                borderRadius: "1.5em",
                fontSize: "1.2em",
                display: "inline-block",
                padding: "0.1em 0.8em",
              }}
            >
              付费
            </span> */}
              {props.info.title ||
                props.info.file_name ||
                props.info.video_title}
            </p>
          </div>
          {props.info.headshot ? (
            <div className="box ">
              <div
                className="bg-not "
                style={{
                  width: "2em",
                  height: "2em",
                  borderRadius: "50%",
                  marginRight: "1em",
                  backgroundImage: "url(" + props.info.headshot + ")",
                }}
              ></div>

              <p>{props.info.user_name}</p>
            </div>
          ) : props.info.pay_counts ? (
            <div>{props.info.pay_counts}&nbsp;&nbsp;购买</div>
          ) : (
            <div className="fn-color-878791">
              <PlayCircleOutline style={{ height: "2em", width: "2em" }} />&nbsp;&nbsp;
              {props.info.view_counts} 观看
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Item;
