import React from "react";
import { Menu, MenuItem, IconButton, Grid } from "@material-ui/core";
import { MoreHorizOutlined, AddCircle, MenuOutlined } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PublicDialog from "../../../../assets/template/PublicDialog";
import EditDialog from "./EditDialog";
import { get_data } from "../../../../assets/js/request";
import qq from "../../../../assets/img/qq.png";
import wx from "../../../../assets/img/wx.png";
import wb from "../../../../assets/img/wb.png";
import qqz from "../../../../assets/img/qqz.png";
import CustomModal from "../../../../assets/js/CustomModal";
import fenxiang from "../../../../assets/img/fenxiang.png";
import sore from "../../../../assets/img/sore.png";
import bianmiao from "../../../../assets/img/bianmiao.png";

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
    // console.log(props);
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
      _title = props.info.title || props.info.video_title;
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
    // console.log(_data);
    get_data(_data).then((res) => {
      if (res.err === 0 && res.errmsg == "OK") {
        let _new_url = res.result_data[0].url;
        new CustomModal().alert("正在为您跳转页面,请稍后...", "success", 2000);
        setTimeout(() => {
          props.onEvent && props.onEvent();
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

export const SericesMenu = (props) => {
  const [open, setOpen] = React.useState(null);
  const [isShare, setIsShare] = React.useState(false);
  const [newimgurl, setNewimgurl] = React.useState("");
  const [newTitle, setNewTitle] = React.useState("");
  const [newdescription, setNewdescription] = React.useState("");
  const [idArr, setIdArr] = React.useState(null);
  let draging = null;
  // let isDragid='';
  const handleClose = (evt) => {
    evt.stopPropagation();

    setOpen(null);
  };
  const handleClik = (evt) => {
    evt.stopPropagation();

    setOpen(evt.currentTarget);
  };
  // console.log(props);
  const _index = (el) => {
    var index = 0;
    if (!el || !el.parentNode) {
      return -1;
    }
    while (el && (el = el.previousElementSibling)) {
      index++;
    }
    return index;
  };
  return (
    <div className="text-right">
      <IconButton
        aria-label="more"
        aria-controls="series-detail-menu"
        aria-haspopup="true"
        onClick={handleClik}
        style={{padding:0}}
      >
        <MoreHorizOutlined />
      </IconButton>

      <Menu
        open={Boolean(open)}
        anchorEl={open}
        keepMounted
        id="series-detail-menu"
        onClick={handleClose}
        className="menulist"
      >
        <MenuItem onClick={handleClose}>
          <EditDialog
            title="编辑系列"
            info={props.info}
            icon_img={bianmiao}
            onChange={(res) => {
              if (res.url) {
                setNewimgurl(res.url);
              }
            }}
            onEvent={(res) => {
              if (res.cancel) {
                return;
              }
              if (res.confirm) {
                if (!newimgurl && !newTitle && !newdescription) {
                  return;
                }

                let _data = {
                  model_name: "series",
                  model_action: "change_information",
                  extra_data: {
                    series_id: props.info.series_id,
                    image_path: newimgurl || props.info.image_path,
                    title: newTitle || props.info.title,
                    description: newdescription || props.info.description,
                  },
                };

                get_data(_data).then((data) => {
                  if (data.err == 0) {
                    new CustomModal().alert(data.errmsg, "success", 5000);
                  } else {
                    new CustomModal().alert("修改失败", "error", 5000);
                  }
                });
              }
            }}
          >
            <div>
              <div className="box">
                <div>
                  <div
                    style={{
                      width: 295,
                      height: 190,
                      marginRight: 20,
                      borderRadius: 12,
                      backgroundImage:
                        "url(" + (newimgurl || props.info.image_path) + ")",
                      position: "relative",
                    }}
                    className="view-overflow bg-not text-center"
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(0,0,0,0.7)",
                        flexDirection: "column",
                      }}
                      className="all-width all-height box box-center "
                    >
                      <span
                        style={{
                          width: 35,
                          height: 35,
                          backgroundColor: "#fff",
                          display: "inline-block",
                          borderRadius: "50%",
                        }}
                      >
                        <AddCircle
                          style={{
                            width: 35,
                            height: 35,
                            transform: "scale(1.2)",
                          }}
                          className="fn-color-007CFF"
                          onClick={() => {
                            console.log(document.getElementById("file-img"));
                            document.getElementById("file-img").click();
                          }}
                        />
                      </span>
                      <p className="fn-color-878791">建议尺寸为295x190</p>
                    </div>
                  </div>
                  <p className="text-center">添加系列封面</p>
                </div>
                <div>
                  <div
                    style={{
                      width: 295,
                      height: 190,
                      borderRadius: 12,
                      backgroundImage:
                        "url(" + (newimgurl || props.info.image_path) + ")",
                    }}
                    className="view-overflow text-center bg-not"
                  ></div>
                  <p className="text-center">系列封面预览</p>
                </div>
              </div>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  系列名称
                </Grid>
                <Grid item xs={9}>
                  <input
                    type="text"
                    className="all-width textfield"
                    value={newTitle}
                    placeholder={props.info.title || props.info.series_title}
                    onChange={(ev) => {
                      setNewTitle(ev.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  系列描述
                </Grid>
                <Grid item xs={9}>
                  <textarea
                    className={`all-width textfield`}
                    rows={5}
                    value={
                      newdescription || props.info.description || "填写新的描述"
                    }
                    onChange={(ev) => {
                      setNewdescription(ev.target.value);

                      // setNewdescription(ev.target.value);${classes.textfield}
                    }}
                  ></textarea>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
          </EditDialog>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EditDialog
            icon_img={sore}
            title="排序"
            info={props.info}
            onEvent={(msg) => {
              if (msg.cancel) {
                return;
              }
              if (msg.confirm) {
                get_data({
                  model_name: "video",
                  model_action: "sort_video",
                  extra_data: {
                    video_id: idArr,
                  },
                }).then((res) => {
                  
                  if(res.err===0){
                    new CustomModal().alert('更改成功','success',3000)
                    if(props.parent.state.page_id==2){
                      props.parent.get_series_datial(props.info.series_id);
                    }else{
                      props.parent.update_data(props.parent.state.item_type);
                    }
                  }else{
                    new CustomModal().alert(res.errmsg,'error', 3000);
                  }
                
                });

              }
            }}
          >
            <ul
              className="profile-ul"
              onDrop={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                let _node_list = document.querySelectorAll(".profile-ul li");
                let _id_arr = [];
                _node_list.forEach((option) => {
                  _id_arr.push(option.dataset.id);
                  option.classList.remove("bg-F2F2F5");
                });
                setIdArr(_id_arr);
              }}
              onDragOver={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                var target = event.target;

                if (target.nodeName === "LI" && draging && target !== draging) {
                  if (_index(draging) < _index(target)) {
                    target.parentNode.insertBefore(draging, target.nextSibling);
                  } else {
                    target.parentNode.insertBefore(draging, target);
                  }
                }
              }}
            >
              {props.info.video_data &&
                props.info.video_data.map((op, inx) => (
                  <li
                    key={op.video_id}
                    className={`box box-align-center  }`}
                    draggable="true"
                    data-id={op.video_id}
                    style={{}}
                    id={op.video_id}
                    onDragStart={(evt) => {
                      evt.stopPropagation();
                      evt.dataTransfer.setData("move", evt.target.id);
                      draging = evt.target;
                      evt.target.classList.add("bg-F2F2F5");
                    }}
                  >
                    <div className="move-item">
                      <MenuOutlined />
                    </div>
                    <div className="fn-color-2C2C3B text-overflow">
                      {inx + 1} {op.video_title}
                    </div>
                  </li>
                ))}
            </ul>
          </EditDialog>
        </MenuItem>
        <MenuItem
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setIsShare(true);
            handleClose(ev);
          }}
        >
          <div>
            <img src={fenxiang} />
          </div>
          <div>分享</div>
        </MenuItem>
      </Menu>

      <ShareDialog
        isShare={isShare}
        parent={props.parent}
        info={props.info}
        onEvent={() => {
          setIsShare(false);
        }}
      />
    </div>
  );
};
