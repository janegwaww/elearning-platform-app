import React from "react";
import { Menu, MenuItem, IconButton, Grid } from "@material-ui/core";
import { MoreHorizOutlined, AddCircle, MenuOutlined } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import PublicDialog from "../../../assets/template/PublicDialog";
import EditDialog from "./EditDialog";
<<<<<<< HEAD:src/components/Profile/components/ShareDialog.jsx
import { get_data } from "../../../assets/js/request";
import qq from "../../../assets/img/qq.png";
import wx from "../../../assets/img/wx.png";
import wb from "../../../assets/img/wb.png";
import qqz from "../../../assets/img/qqz.png";
import CustomModal from "../../../assets/js/CustomModal";
import fenxiang from "../../../assets/img/fenxiang.png";
import sore from "../../../assets/img/sore.png";
import bianmiao from "../../../assets/img/bianmiao.png";
import del from "../../../assets/img/del.png";
import yixi from "../../../assets/img/yixi.png";
import restbian from "../../../assets/img/restbian.png";
import download from "../../../assets/img/download.png";
import moveout from '../../../assets/img/moveout.png';
=======
import { get_data } from "../../../../assets/js/request";
import qq from "../../../../assets/img/qq.png";
import wx from "../../../../assets/img/wx.png";
import wb from "../../../../assets/img/wb.png";
import qqz from "../../../../assets/img/qqz.png";
import CustomModal from "../../../../assets/js/CustomModal";
import fenxiang from "../../../../assets/img/fenxiang.png";
import sore from "../../../../assets/img/sore.png";
import bianmiao from "../../../../assets/img/bianmiao.png";
import del from "../../../../assets/img/del.png";
import yixi from "../../../../assets/img/yixi.png";
import restbian from "../../../../assets/img/restbian.png";
import download from "../../../../assets/img/download.png";
import moveout from '../../../../assets/img/moveout.png';
>>>>>>> b0174b4be3e6c5f7771d2aa09846a50b4ccd9379:src/components/Profile/ProfileChildens/components/shareDialog.jsx
import userStyles from "./profileStyle";
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
  const [newimgurl, setNewimgurl] = React.useState(props.info.image_path);
  const [newTitle, setNewTitle] = React.useState(props.info.title || props.info.series_title);
  const [newdescription, setNewdescription] = React.useState(props.info.description);
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
        style={{ padding: 0 }}
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
            _disabled={!newTitle?true:false}
            onEvent={(res) => {
              if (res.cancel) {
                return;
              }
              if (res.confirm) {
                // if (!newimgurl && !newTitle && !newdescription) {
                //   return;
                // }

                let _data = {
                  model_name: "series",
                  model_action: "change_information",
                  extra_data: {
                    series_id: props.info.series_id,
                    image_path: newimgurl ,
                    title: newTitle ,
                    description: newdescription ,
                  },
                };

                get_data(_data).then((data) => {
                  
                  if (data.err == 0) {
                    new CustomModal().alert(data.errmsg, "success", 5000);
                    // if(props._type=='series'){
                    //   props.parent.update_data('series');
                    // }else{
                      props.parent.update_data(props.info.series_id);
                    // }
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
                        "url(" + newimgurl + ")",
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
                        "url(" + newimgurl  + ")",
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
                      newdescription 
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
              console.log(23)
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
                 
                  if (res.err === 0) {
                    new CustomModal().alert("更改成功", "success", 3000);
                   if(props._id){
                      props.parent.update_data(props._id);
                   }
                     
                    
                  } else {
                    new CustomModal().alert(res.errmsg, "error", 3000);
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
                      {op.video_title}
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

export const VideoMenu = (props) => {
  
  const [newimgurl, setNewimgurl] = React.useState(props.info.image_path);
  const [newTitle, setNewTitle] = React.useState(props.info.title||props.info.video_title);
  const [newdescription, setNewdescription] = React.useState(props.info.description);
  //移至系列
  const [seriesArr, setSeriesArr] = React.useState([]);
  const [seriesvalue, setSeriesvalue] = React.useState("");

  const [isShare, setIsShare] = React.useState(false); //分享
  const classes = userStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = (evt) => {
    // evt.stopPropagation();
    // evt.preventDefault();
    setAnchorEl(null);
  };
// console.log(props)
  return (
    <div className="text-right">
      <IconButton
        aria-label="more"
        aria-controls="series-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: 0 }}
      >
        <MoreHorizOutlined />
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        keepMounted
        id="series-menu"
        onClose={handleClose}
        className={classes.menulist}
      >
        <MenuItem onClick={handleClose} data-id="1">
          <EditDialog
            title="编辑描述"
            info={props.info}
            icon_img={bianmiao}
            _disabled ={!newTitle?true:false}
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
                let _data = {
                  model_name: "video",
                  model_action: "change_information",
                  extra_data: {
                    video_id: props.info.video_id,
                    image_path: newimgurl ,
                    title: newTitle ,
                    description: newdescription ,
                  },
                };
                get_data(_data).then((res) => {
                  if(res.err==0){
                    // if(props._type=='video'){
                    //   props.parent.update_data('video');
                    // }
                    // if(props._type=='series_detail'){
                      props.parent.update_data(props._id);
                    // }
                    new CustomModal().alert(res.errmsg, "success", 3000);
                    return
                  }
                  new CustomModal().alert(res.errmsg, "error", 3000);
                 
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
                            cursor: 'pointer'
                          }}
                          className="fn-color-007CFF"
                          onClick={() => {
                            document.getElementById("file-img").click();
                          }}
                        />
                      </span>
                      <p className="fn-color-878791">建议尺寸为295x190</p>
                    </div>
                  </div>
                  <p className="text-center">添加作品封面</p>
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
                  <p className="text-center">作品封面预览</p>
                </div>
              </div>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  视频名称
                </Grid>
                <Grid item xs={9}>
                  <input
                    type="text"
                    className={`all-width ${classes.textfield}`}
                    value={newTitle}
                    onChange={(ev) => {
                      setNewTitle(ev.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  视频描述
                </Grid>
                <Grid item xs={9}>
                  <textarea
                    className={`all-width ${classes.textfield}`}
                    rows={5}
                    value={newdescription}
                    onChange={(ev) => {
                      setNewdescription(ev.target.value);
                    }}
                  ></textarea>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
          </EditDialog>
        </MenuItem>
        <MenuItem
          onClick={() => {
            get_data({
              model_name: "series",
              model_action: "get_series",
              extra_data: {},
            }).then((res) => {
              if (res.err == 0) {
                setSeriesArr(res.result_data);
              }
            });
            handleClose();
          }}
          data-id="2"
        >
          <EditDialog
            title="移动至系列"
            icon_img={yixi}
            info={props.info}
            onChange={() => {}}
            onEvent={(res) => {
              if (res.confirm) {
                get_data({
                  model_name: "video",
                  model_action: "movie_video",
                  extra_data: {
                    video_id: [props.info.video_id],
                    series_id: seriesvalue,
                  },
                }).then((res) => {
                  if (res.err == 0 && res.errmsg == "OK") {
                    new CustomModal().alert("移动成功", "success", 3000);
                    props.parent.update_data("video");
                  }
                });
              }
              if (res.cancel) {
                setSeriesvalue("");
              }
            }}
          >
            <div style={{ padding: "0 10px" }}>
              {seriesArr &&
                seriesArr.map((option, inx) => (
                  <div
                    key={option._id}
                    className={`box box-between ${
                      seriesvalue == option._id ? "bg-F2F2F5" : ""
                    }`}
                    style={{ padding: "10px 20px" }}
                  >
                    <div>
                      <input
                        type="radio"
                        value={option._id}
                        id={"series_" + option._id}
                        onClick={(ev) => {
                          ev.stopPropagation();
                        }}
                        onChange={(ev) => {
                          setSeriesvalue(ev.target.value);
                        }}
                      />
                      <label
                        htmlFor={"series_" + option._id}
                        onClick={(ev) => {
                          ev.stopPropagation();
                        }}
                      >
                        {option.title}
                      </label>
                    </div>
                    <div>共{option.video_counts}集</div>
                  </div>
                ))}
            </div>
          </EditDialog>
        </MenuItem>
        <MenuItem onClick={handleClose} data-id="6">
          <Link
            color="inherit"
            underline="none"
            href={`/video/?sid=${props.info.video_id}`}
            target="_blank"
            rel="noopener norefferer"
          >
            <div className="text-center">
              <img src={restbian} />
            </div>
            <div>重新编辑</div>
          </Link>
        </MenuItem>
        
        <MenuItem
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setIsShare(true);
            handleClose();
          }}
          data-id="5"
        >
          <div>
            <img src={fenxiang} />
          </div>
          <div> 分享</div>
        </MenuItem>

        {props._type != "video" && (
        <MenuItem
        onClick={(ev) => {
          
          handleClose();
        }}
        data-id="6"
      >
        <EditDialog
        title="移出系列"
            icon_img={moveout}
            info={props.info}
            _type="del"
            onEvent={(msg)=>{
              
              console.log(props)
              if(msg.confirm){

                get_data({
                  "model_name": "video",
                  "model_action": "movie_video",
                  "extra_data": {
                  "video_id":[props.info.video_id],
                  "series_id":""
                  },
                  "model_type":"" 
                  }).then((res)=>{
                    if(res.err==0){
                      props.parent.get_series_datial(props._id);
                      new CustomModal().alert('移出成功','success',3000)
                    }
                  })
                
              }
            }}
        >
        <p>确认此视频移出该系列</p>
        </EditDialog>
      </MenuItem>
        )}


        <MenuItem
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            
            handleClose();
          }}
          data-id="5"
        >
        <EditDialog
        title="移出系列"
        _type="del"
        icon_img={moveout}
            onEvent={(msg) => {
              if (msg.confirm) {
                get_data({
                  model_name: "video",
                  model_action: "movie_video",
                  extra_data: {
                    video_id: [props.info.video_id],
                    series_id:'',
                  },
                }).then((res) => {
                  if (res.err == 0 && res.errmsg == "OK") {
                    new CustomModal().alert("移出成功", "success", 3000);
                    props.parent.update_data(props._id);
                  }
                });
              }
            }}
        
        >
        <p>确保定要移出本系列？</p>
        </EditDialog>
        </MenuItem>
        <MenuItem
          data-id="6"
          onClick={() => {
            handleClose();
          }}
        >
          <EditDialog
            title="删除作品"
            icon_img={del}
            info={props.info}
            _type="del"
            onEvent={(msg) => {
              if(msg.confirm){
                get_data({
                  model_name: "video",
                  model_action: "delete_video",
                  extra_data: {
                    video_id: [props.info.video_id],
                  },
                }).then((res) => {
                  if (res.err === 0) {
                    new CustomModal().alert("删除成功", "success", 5000);
                    // if(props._type=='video'){
                    //   props.parent.update_data('video')
                    // }
                    // if(props._type =='series_detail'){
                      props.parent.update_data(props._id)
                    // }
                  }
                });
              }
             
            }}
          >
            <p>上传作品不容易, 确定真的要删除该作品?</p>
          </EditDialog>
        </MenuItem>
      </Menu>
      <ShareDialog
        isShare={isShare}
        parent={props}
        info={props.info}
        onEvent={() => {
          setIsShare(false);
        }}
      />
    </div>
  );
};
