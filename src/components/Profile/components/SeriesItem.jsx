import React from "react";
import { Details, FavoriteBorder, Description } from "@material-ui/icons";

import { Tooltip, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

import { get_date } from "../../../assets/js/totls";
import { get_data } from "../../../assets/js/request";
import { ModalDialog } from "./Modal";

import CustomModal from "../../../assets/js/CustomModal";
import { navigate } from "@reach/router";
import LazyLoad from "react-lazyload";
import userStyles from "./profileStyle";
import del from "../../../assets/img/del.png";

import { ShareDialog, SericesMenu, VideoMenu, DocMenu } from "./ShareDialog";

// 系列横向item

const stop_run = (prevValue, nextValue) => {
  return false;
};

const return_html = (info, type) => {
  const classes = userStyles();
  let _html = null;
  if (type == "document" || type == "document_series") {
    let _url = "";
    if (info.type == "document") {
      _url = `/document/?did=${info.file_id}`;
    } else {
      _url = `/series/?dsid=${info.series_id}`;
    }

    _html = (
      <div>
        <Link color="inherit" underline="none" href={_url} target="_blank">
          <div className="box  fn-size-12">
            <div className="profile-item-img-box bg-all">
              {info && info.image_path && (
                <img
                  className="all-height "
                  src={info.image_path}
                  alt=""
                  style={{ width: "auto" }}
                />
              )}
              <span
                style={{
                  padding: "2px 4px",
                  borderRadius: "0px 0px 4px 4px",
                  color: "rgb(255, 255, 255)",
                  backgroundColor: "rgb(235, 186, 115)",
                  position: "absolute",
                  top: 0,
                  left: 18,
                }}
              >
                {type == "document" ? "文本" : "系列文本"}
              </span>
            </div>
            <div
              style={{ width: "calc(100% - 280px)", flexDirection: "column" }}
              className="box box-between"
            >
              <div>
                <Tooltip
                  title={info.file_name || info.series_title}
                  classes={{ tooltip: classes.noMaxWidth }}
                  placement="top-start"
                >
                  <Typography
                    className="text-overflow p"
                    style={{ fontSize: 16 }}
                  >
                    {/** 
                    {info.document_counts > 0 && (
                      <span className="fn-color-white fn-size-12 profile-sign">
                        <Description
                          style={{
                            width: 16,
                            height: 16,
                            transform: "translateY(-1px)",
                            verticalAlign: "middle",
                          }}
                        />
                        含课件
                      </span>
                    )}
*/}
                    {info.file_name || info.series_title}
                  </Typography>
                </Tooltip>

                <p className="fn-color-878791 all-width p">
                  {info
                    ? "发布于  " +
                      get_date(info.update_time || info.upload_time, ".", 9)
                    : ""}
                </p>
                <div className="all-width textview-overflow two ">
                  {info ? info.description : ""}
                </div>
              </div>
              <div className="alll-width">
                <div className="alll-width">
                  {info && info.state == -1 && (
                    <div>
                      <p className="fn-color-878791 p">未通过</p>
                    </div>
                  )}

                  {info && info.state == 1 && (
                    <div>
                      <p className="fn-color-007CFF p">审核中</p>
                    </div>
                  )}
                  {info && info.state >= 2 && (
                    <div>
                      <p className="fn-color-878791 p">已通过</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  } else if (type == "video") {
    _html = (
      <div>
        <Link
          color="inherit"
          underline="none"
          href={`/watch/?vid=${info.video_id}`}
          target="_blank"
        >
          <div className="box  fn-size-12">
            <div className="profile-item-img-box bg-all">
              {info && info.image_path && (
                <img
                  className="all-height "
                  src={info.image_path}
                  alt=""
                  style={{ width: "auto" }}
                />
              )}
              <p className="profile-time fn-color-white fn-size-12 p">
                {info.video_time}
              </p>
            </div>
            <div
              style={{ width: "calc(100% - 280px)", flexDirection: "column" }}
              className="box box-between"
            >
              <div>
                <Tooltip
                  title={info.title || info.series_title}
                  classes={{ tooltip: classes.noMaxWidth }}
                  placement="top-start"
                >
                  <Typography
                    className="text-overflow p"
                    style={{ fontSize: 16 }}
                  >
                    {info.document_counts > 0 && (
                      <span className="fn-color-white fn-size-12 profile-sign">
                        <Description
                          style={{
                            width: 16,
                            height: 16,
                            transform: "translateY(-1px)",
                            verticalAlign: "middle",
                          }}
                        />
                        含课件
                      </span>
                    )}

                    {info.title || info.series_title}
                  </Typography>
                </Tooltip>

                <p className="fn-color-878791 all-width p">
                  {info
                    ? "发布于  " +
                      get_date(info.update_time || info.upload_time, ".", 9)
                    : ""}
                </p>
                <div className="all-width textview-overflow two ">
                  {info ? info.description : ""}
                </div>
              </div>
              <div className="alll-width">
                <div className="alll-width">
                  {info && info.state == -1 && (
                    <div>
                      <p className="fn-color-878791 p">未通过</p>
                    </div>
                  )}

                  {info && info.state == 1 && (
                    <div>
                      <p className="fn-color-007CFF p">审核中</p>
                    </div>
                  )}
                  {info && info.state >= 2 && (
                    <div>
                      <p className="fn-color-878791 p">已通过</p>
                    </div>
                  )}
                </div>
                <div className="fn-color-565663 profile-point all-width">
                  <span>
                    <Details />
                    &nbsp;&nbsp;
                    {info ? info.view_counts || 0 : 0}
                  </span>
                  <span>
                    <FavoriteBorder />
                    &nbsp;&nbsp;
                    {(info && info.like_counts) || 0}
                  </span>
                  {/*<span>
                <ChatBubbleOutlineOutlined />
                &nbsp;&nbsp;
                {(props.info && props.info.comment_counts) || 0}
              </span>*/}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    _html = (
      <div className={` box fn-size-12 ${type == "series" ? "p" : ""}`}>
        <div className="profile-item-img-box bg-all">
          {info && info.image_path && (
            <img
              className="all-height "
              src={info.image_path}
              style={{ width: "auto" }}
            />
          )}
          <p
            className={`profile-time fn-color-white fn-size-12 ${
              type == "series" ? "p" : ""
            }`}
          >
            {type == "draft"
              ? info.video_time
              : "共" + (info.video_counts || 0) + "集"}
          </p>
        </div>
        <div
          style={{ width: "calc(100% - 280px)", flexDirection: "column" }}
          className="box box-between"
        >
          <div>
            <Tooltip
              title={info.title || info.series_title || info.file_name}
              classes={{ tooltip: classes.noMaxWidth }}
              placement="top-start"
            >
              <Typography
                className={`text-overflow ${type == "series" ? "p" : ""}`}
                style={{ fontSize: 16 }}
              >
                {info.document_counts > 0 && (
                  <span className="fn-color-white fn-size-12 profile-sign">
                    <Description
                      style={{
                        width: 16,
                        height: 16,
                        transform: "translateY(-1px)",
                        verticalAlign: "middle",
                      }}
                    />
                    含课件
                  </span>
                )}

                {info.title || info.series_title || info.file_name}
              </Typography>
            </Tooltip>

            <p
              className={`fn-color-878791 all-width ${
                type == "series" ? "p" : ""
              }`}
            >
              {info
                ? "发布于  " +
                  get_date(info.update_time || info.upload_time, ".", 9)
                : ""}
            </p>
            <p
              className={`all-width textview-overflow two ${
                type == "series" ? "p" : ""
              }`}
            >
              {info ? info.description : ""}
            </p>
          </div>
          <div className="alll-width">
            <div className="alll-width">
              {info && info.state == -1 && (
                <div>
                  <p className="fn-color-878791 ">未通过</p>
                </div>
              )}

              {info && info.state == 1 && (
                <div>
                  <p className="fn-color-007CFF">审核中</p>
                </div>
              )}
              {info && info.state >= 2 && (
                <div>
                  <p className="fn-color-878791">已通过</p>
                </div>
              )}
            </div>

            {type != "draft" && (
              <div className="fn-color-565663 profile-point all-width">
                <span>
                  <Details />
                  &nbsp;&nbsp;
                  {info ? info.view_counts || 0 : 0}
                </span>
                <span>
                  <FavoriteBorder />
                  &nbsp;&nbsp;
                  {(info && info.like_counts) || 0}
                </span>
                {/*<span>
                <ChatBubbleOutlineOutlined />
                &nbsp;&nbsp;
                {(props.info && props.info.comment_counts) || 0}
              </span>*/}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return _html;
};

const SeriesItem = (props) => {
  const classes = userStyles();

  const [modalMsg, setModalMsg] = React.useState({
    open: false,
    type: 1,
    msg: "",
    title: "",
  });
  const [isShare, setIsShare] = React.useState(false); //分享
 
  return (
    <div className="box box-between box-align-center profile-top">
      <div
        className="profile-item"
        onClick={(event) => {
          if (
            props.series != "video" &&
            props.info.type != "document" &&
            props.info.type != "document_series"
          ) {
            event.stopPropagation();
            event.preventDefault();
            if (props.series == "series") {
              navigate(
                `/users/profile/workscenter/seriesdetail/${props.info.series_id}`
              );
            } else {
              return false;
            }
          }
        }}
      >
        {return_html(props.info, props.series)}
      </div>

      <div>
        {(props.series == "document" || props.series == "document_series") && (
          <DocMenu parent={props.parent} info={props.info} _type={"document"} />
        )}

        {props.series == "video" && (
          <VideoMenu
            parent={props.parent}
            info={props.info}
            _type={props.series}
          />
        )}

        {(props.series == "series" || props.series == "series_detail") && (
          <SericesMenu
            parent={props.parent}
            info={props.info}
            _type={props.series}
            _id={props._id}
          />
        )}
        {props.series == "draft" && (
          <div
            className="text-center box box-between "
            style={{ height: 160, flexDirection: "column" }}
          >
            <div>
              {props.info.state !== 1 &&
                props.info.type != "document" &&
                props.info.type != "document_series" && (
                  <Link
                    color="inherit"
                    underline="none"
                    href={`/video/?sid=${props.info.video_id}`}
                    target="_blank"
                    rel="noopener norefferer"
                  >
                    {props.series}
                    编辑
                  </Link>
                )}
            </div>
            <div>
              <span>
                <img
                  src={del}
                  style={{ width: 16, height: 16, cursor: "pointer" }}
                  onClick={() => {
                    if (
                      props.info.state === 1 &&
                      props.info.type != "document" &&
                      props.info.type != "document_series"
                    ) {
                      new CustomModal().alert(
                        "审核中的作品暂不支持删除",
                        "error",
                        3000
                      );
                      return;
                    }
                    setModalMsg({
                      title: "温馨提示",
                      type: "del",
                      msg: "上传作品不容易, 确定真的要删除该作品?",
                      open: true,
                    });
                  }}
                />
              </span>
            </div>
            <div></div>
          </div>
        )}
      </div>
      {/*     ))
      }*/}
      <ShareDialog
        isShare={isShare}
        parent={props}
        info={props.info}
        onEvent={() => {
          setIsShare(false);
        }}
      />

      <ModalDialog
        info={modalMsg}
        parent={props}
        onEvent={(msg) => {
          let req_data;
          if (
            props.info.type == "document" ||
            props.info.type == "document_series"
          ) {
            req_data = {
              model_name: "document",
              model_action: "delete",
              extra_data: {
                file_id: props.info.file_id,
              },
            };
          } else {
            req_data = {
              model_name: "video",
              model_action: "delete_video",
              extra_data: {
                video_id: [props.info.video_id],
              },
            };
          }

          if (msg.cancel) {
            setModalMsg({ open: false });
          }
          if (msg.confirm) {
            get_data(req_data).then((res) => {
              if (res.err === 0) {
                new CustomModal().alert("删除成功", "success", 5000);
                props.parent.update_data();

                setModalMsg({
                  open: false,
                });
              }
            });
          }
        }}
      ></ModalDialog>
    </div>
  );
};
export default React.memo(SeriesItem, stop_run);
