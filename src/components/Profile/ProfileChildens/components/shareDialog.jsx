import React from "react";
import { IconButton } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PublicDialog from "../../../../assets/template/PublicDialog";
import { get_data } from "../../../../assets/js/request";
import qq from "../../../../assets/img/qq.png";
import wx from "../../../../assets/img/wx.png";
import wb from "../../../../assets/img/wb.png";
import qqz from "../../../../assets/img/qqz.png";
import CustomModal from "../../../../assets/js/CustomModal";

// 分享弹窗
const input_use = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    padding: "0 !important",
    height: 40,
    backgroundColor: "#F2F2F5",
    borderRadius: "20px !important",
    boxShadow: "none !important",
    marginTop: 20,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    paddingLeft: 20,
  },
  iconButton: {
    padding: "12px 20px",
    backgroundColor: "#007CFF",
    color: "white",
    fontSize: 14,
    borderRadius: "0 20px 20px 0",
    "&:hover": {
      backgroundColor: "#007CFF",
    },
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const ShareDialog = (props) => {
  const input_class = input_use();
  const btn_share = (ev) => {
    console.log(props);
    ev.preventDefault();
    ev.stopPropagation();
    let _type = ev.target.dataset.type;
    let _id, _title, _url;
    if (props.info.type == "series") {
      _url = "http://kengine.haetek.com/series/?sid=" + props.info.series_id;
      _id = props.info.series_id;
      _title = props.info.series_title || props.info.title;
    } else {
      _url = "http://kengine.haetek.com/watch/?vid=" + props.info.video_id;
      _id = props.info.video_id;
      _title = props.info.title||props.info.video_title;
    }
    let _data = {
      model_name: "user",
      model_action: "share",
      extra_data: {
        url: _url,
        title: _title,
        pics: props.info.image_path,
        summary: props.info.description,
        desc: "说点什么呗", //暂不写
        type: _type, //"wechat"/"microblog"/ “q_Zone”,
        source: props.info.type, // "video",
        share_id: _id,
      },
    };
    console.log(_data);
    get_data(_data).then((res) => {
      if (res.err === 0 && res.errmsg == "OK") {
        let _new_url = res.result_data[0].url;
        new CustomModal().alert("正在为您跳转页面,请稍后...", "success", 2000);
        setTimeout(() => {
            props.onEvent&&props.onEvent();
          window.open(_new_url);
        }, 2000);
      }
    });
  };

  return (
    <PublicDialog
      open={props.isShare}
      title="分享"
      not_show={true}
      onEvent={(msg) => {
        props.onEvent && props.onEvent();
        if (msg.cancel) {
          props.onEvent && props.onEvent();
          //   setIsShare(false)
        }
      }}
    >
      {/*分享*/}
      <div>
        <div className="box box-center">
          <img
            src={wx}
            style={{ width: 36, height: 36, margin: 20 }}
            data-type="wechat"
            onClick={btn_share}
          />
          <img
            src={qq}
            style={{ width: 36, height: 36, margin: 20 }}
            data-type="qq"
            onClick={btn_share}
          />
          <img
            src={qqz}
            style={{ width: 36, height: 36, margin: 20 }}
            data-type="qZone"
            onClick={btn_share}
          />
          <img
            src={wb}
            style={{ width: 36, height: 36, margin: 20 }}
            data-type="microblog"
            onClick={btn_share}
          />
        </div>
        <div>
          <Paper component="form" className={input_class.root}>
            <InputBase
              className={input_class.input}
              placeholder="Search Google Maps"
              value={
                props.info.type == "series"
                  ? "http://kengine.haetek.com/series/?sid=" +
                    props.info.series_id
                  : "http://kengine.haetek.com/watch/?vid=" +
                    props.info.video_id
              }
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="submit"
              className={input_class.iconButton}
              aria-label="search"
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                let _input =
                  ev.target.parentNode.parentNode.childNodes[0].childNodes[0];
                let _url = "";
                if (props.info.type == "series") {
                  _url =
                    "http://kengine.haetek.com/series/?sid=" +
                    props.info.series_id;
                } else {
                  _url =
                    "http://kengine.haetek.com/watch/?vid=" +
                    props.info.video_id;
                }
                _input.value = _url;
                _input.select(); // 选中文本
                document.execCommand("copy"); // 执行浏览器复制命令
                new CustomModal().alert("复制成功", "success", 3000);
              }}
            >
              复制地址
            </IconButton>
          </Paper>
        </div>
      </div>
    </PublicDialog>
  );
};
