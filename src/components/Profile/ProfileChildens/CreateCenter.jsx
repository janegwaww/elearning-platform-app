import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import WorksItem from "./components/WorksItem";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  MoreHorizOutlined,
  Details,
  FavoriteBorder,
  AddCircle,
  MenuOutlined,
} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Management from "./components/Management";
import { get_data, get_alldata } from "../../../assets/js/request";
import { get_date } from "../../../assets/js/totls";
import CustomModal from "../../../assets/js/CustomModal";
import EditDialog from "./components/EditDialog";
import { withStyles } from "@material-ui/core/styles";
import fenxiang from "../../../assets/img/fenxiang.png";
import sore from "../../../assets/img/sore.png";
import bianmiao from "../../../assets/img/bianmiao.png";
import { ShareDialog } from "./components/shareDialog";
const NewMenu = withStyles((theme) => ({
  root: {
    border: "1px solid red",
    "& .MuiPaper-root": {
      borderRadius: "12px",
    },
    "& .MuiList-root.MuiMenu-list": {
      display: "flex",
      flexWrap: "wrap",
      width: 320,
      height: 216,
      padding: 30,
      boxShadow: "0px 2px 10px 2px rgba(0,0,0,0.1)",

      "& .MuiMenuItem-root": {
        width: "33.33%",
        fontSize: 14,
        flexDirection: "column",
      },
      "& img": {
        width: 14,
        height: 14,
      },
    },
  },
}))(Menu);

class CreateCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: null,
      draft_data: null,
      series_data: null,
      page_id: props.parent.state.nowPage.childpage_id, //==3?2:props.parent.state.nowPage.childpage_id,
      item_type: "video", //普通/2系列
      series_details: null, //系列详情
      evt: null,
      series_id: "", //系列id
      newimgurl: "", //新的imgurl
      newTitle: "", //新的系列名
      newdescription: "", //新的系列描述
      item_h: 0,
      is_share: false, //分享
    };
    this.update_data = this.update_data.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClik = this.handleClik.bind(this);
    this.get_series_datial = this.get_series_datial.bind(this);
    this.wind_size = this.wind_size.bind(this);
  }
  wind_size(e) {
    let _e = e || window.event;
    let _w = document.querySelector(".MuiGrid-root.grid .MuiGrid-item")
      .clientWidth;
    let _h = (_w / 16) * 9;
    this.setState({
      item_h: _h,
    });
  }
  componentWillUnmount() {
    window.onresize = null;
  }
  handleClose(ev) {
    let _id = ev.target.dataset.id;
    this.setState({
      evt: null,
    });
  }
  handleClik(evt) {
    this.setState({
      evt: evt.currentTarget,
    });
  }
  update_data(_type) {
    let _data = {
      //
      model_name: "video",
      model_action: "get_video",
      extra_data: {
        type: _type, //"series"
      },
    };
    get_data(_data).then((res) => {
      if (res.err == 0) {
        if (_data.extra_data.type == "video") {
          this.setState({
            video_data: res.result_data,
          });
        } else if (_data.extra_data.type == "series") {
          this.setState({
            series_data: res.result_data,
          });
        } else {
          this.setState({
            draft_data: res.result_data,
          });
        }
      }
    });
  }
  componentDidMount() {
    if (this.props.parent.state.nowPage.childpage_id == 3) {
      this.get_series_datial(this.props.parent.state.nowPage.series_id);
    }
    this.update_data(this.state.item_type);

    window.onresize = (e) => {
      this.wind_size(e);
    };

    // if(this.)
  }
  get_series_datial(_id) {
    get_data({
      model_name: "series",
      model_action: "get_series_details",
      extra_data: {
        series_id: _id,
      },
    }).then((res) => {
      if (res.err === 0 && res.errmsg == "OK") {
        this.setState({
          page_id: 2,
          series_details: res.result_data[0],
          series_id: _id,
        });
        this.wind_size();
      } else {
        new CustomModal().alert("获取详情失败", "success", 3000);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.page_id != nextProps.parent.state.nowPage.childpage_id) {
      if (nextProps.parent.state.nowPage.childpage_id === 0) {
        this.update_data(this.state.item_type);
      }
      this.setState({
        page_id: nextProps.parent.state.nowPage.childpage_id,
        item_type: "video",
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.page_id != this.state.page_id) {
      this.update_data(nextState.item_type);
    }
    return true;
  }
  render() {
    return (
      <div className="view-scroll all-height">
        {this.state.page_id === 0 && (
          <section className="bg-white profile-padding all-height ">
            <main>
              <div>
                <ProNavbar
                  list={["普通", "系列", "草稿箱"]}
                  parent={this}
                  onEvent={(num) => {
                    let _type = "video";
                    if (num == 2) {
                      _type = "series";
                    }
                    if (num == 3) {
                      _type = "draft";
                    }
                    this.setState({ item_type: _type });
                    this.update_data(_type);
                  }}
                />
              </div>
              {this.state.item_type == "video" && (
                <div>
                  {this.state.video_data && this.state.video_data.length > 0 ? (
                    this.state.video_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                      />
                    ))
                  ) : (
                    <div>暂时还没有数据哦</div>
                  )}
                </div>
              )}

              {this.state.item_type == "series" && (
                <div>
                  {this.state.series_data &&
                  this.state.series_data.length > 0 ? (
                    this.state.series_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                        onEvent={(_id) => {
                          this.get_series_datial(_id);
                        }}
                      />
                    ))
                  ) : (
                    <div>暂时还没有数据哦</div>
                  )}
                </div>
              )}

              {this.state.item_type == "draft" && (
                <div>
                  {this.state.draft_data && this.state.draft_data.length > 0 ? (
                    this.state.draft_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                      />
                    ))
                  ) : (
                    <div>暂时还没有数据哦</div>
                  )}
                </div>
              )}
            </main>
          </section>
        )}
        {this.state.page_id === 1 && (
          <section className="bg-white profile-padding  all-height">
            <div>
              <ProNavbar list={["申诉管理"]} parent={this} />
            </div>
            <div className="profile-top profile-bottom">
              <Navbar
                lists={["全部(5)", "进行中(3)", "已完成(2)"]}
                parent={this}
              />
            </div>
            <Management />
          </section>
        )}
        {this.state.page_id === 2 && (
          <section className="bg-white profile-padding all-width  all-height">
            <div>
              <ProNavbar list={["系列"]} parent={this} />
            </div>
            <div className="profile-top  all-width">
              <div className="box  fn-size-12 all-width box-align-center">
                <div
                  style={{
                    minWidth: 260,
                    width: 260,
                    height: 160,
                    marginRight: 20,
                    position: "relative",
                  }}
                >
                  <img
                    src={this.state.series_details.image_path}
                    className="all-width all-height"
                  />
                  <p className="profile-time fn-color-white fn-size-12">
                    {"共" + this.state.series_details.video_data.length + "集"}
                  </p>
                </div>
                <div
                  style={{
                    width: "calc(100% - 280px)",
                    flexDirection: "column",
                    height: 160,
                  }}
                  className="box box-between all-height"
                >
                  <div>
                    <div className="fn-color-2C2C3B fn-size-16 zero-edges text-overflow">
                      {this.state.series_details.title}
                    </div>
                    <p className="fn-color-878791 all-width ">
                      {"更新于  " +
                        get_date(this.state.series_details.update_time, ".", 9)}
                    </p>
                    <div className="all-width textview-overflow two">
                      {this.state.series_details.description}
                    </div>
                  </div>
                  <div className="fn-color-565663 profile-point all-width">
                    <span>
                      <Details />
                      &nbsp;&nbsp;
                      {this.state.series_details.view_counts || 0}
                    </span>
                    <span>
                      <FavoriteBorder />
                      &nbsp;&nbsp;
                      {this.state.series_details.like_counts || 0}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <IconButton
                    aria-label="more"
                    aria-controls="series-detail-menu"
                    aria-haspopup="true"
                    onClick={this.handleClik}
                  >
                    <MoreHorizOutlined />
                  </IconButton>

                  <Menu
                    open={Boolean(this.state.evt)}
                    anchorEl={this.state.evt}
                    keepMounted
                    id="series-detail-menu"
                    onClick={this.handleClose}
                    className="menulist"
                  >
                    <MenuItem onClick={this.handleClose}>
                      <EditDialog
                        title="编辑系列"
                        info={this.state.series_details}
                        icon_img={bianmiao}
                        onChange={(res) => {
                          if (res.url) {
                            this.setState({
                              newimgurl: res.url,
                            });
                          }
                        }}
                        onEvent={(res) => {
                          if (
                            !this.state.newimgurl &&
                            !this.state.newTitle &&
                            !this.state.newdescription
                          ) {
                            return;
                          }
                          if (res.cancel) {
                            return;
                          }
                          if (res.confirm) {
                            let _data = {
                              model_name: "series",
                              model_action: "change_information",
                              extra_data: {
                                series_id: this.state.series_id,
                                image_path:
                                  this.state.newimgurl ||
                                  this.state.series_details.image_path,
                                title:
                                  this.state.newTitle ||
                                  this.state.series_details.title,
                                description:
                                  this.state.newdescription ||
                                  this.state.series_details.description,
                              },
                            };

                            get_data(_data).then((data) => {
                              if (data.err == 0) {
                                new CustomModal().alert(
                                  data.errmsg,
                                  "success",
                                  5000
                                );
                              } else {
                                new CustomModal().alert(
                                  "修改失败",
                                  "error",
                                  5000
                                );
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
                                    "url(" +
                                    (this.state.newimgurl ||
                                      this.state.series_details.image_path) +
                                    ")",
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
                                        document
                                          .getElementById("file-img")
                                          .click();
                                      }}
                                    />
                                  </span>
                                  <p className="fn-color-878791">
                                    建议尺寸为295x190
                                  </p>
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
                                    "url(" +
                                    (this.state.newimgurl ||
                                      this.state.series_details.image_path) +
                                    ")",
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
                                value={this.state.newTitle}
                                placeholder={this.state.series_details.title}
                                onChange={(ev) => {
                                  this.setState({
                                    newTitle: ev.target.value,
                                  });
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
                                defaultValue={
                                  this.state.series_details.description ||
                                  "填写新的描述"
                                }
                                onChange={(ev) => {
                                  this.setState({
                                    newdescription: ev.target.value,
                                  });
                                  // setNewdescription(ev.target.value);${classes.textfield}
                                }}
                              ></textarea>
                            </Grid>
                            <Grid item xs={1}></Grid>
                          </Grid>
                        </div>
                      </EditDialog>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      <EditDialog
                        icon_img={sore}
                        title="排序"
                        info={this.state.series_details}
                        onEvent={(msg) => {
                          if (msg.cancel) {
                            return;
                          }
                          if (msg.confirm) {
                          }
                        }}
                      >
                        <div>
                          {this.state.series_details.video_data.map(
                            (op, inx) => (
                              <div
                                key={op.video_id}
                                className="box box-align-center "
                              >
                                <div style={{ marginRight: 10 }}>
                                  <MenuOutlined />
                                </div>
                                <div className="fn-color-2C2C3B">
                                  {op.video_title}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </EditDialog>
                    </MenuItem>
                    <MenuItem
                      onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        this.setState({
                          is_share: true,
                        });
                        this.handleClose(ev);
                      }}
                    >
                      <div>
                        {" "}
                        <img src={fenxiang} />
                      </div>
                      <div>分享</div>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div>
                <Grid container className="grid">
                  {this.state.series_details.video_data.map((option, inx) => (
                    <Grid item xs={3} key={inx}>
                      <WorksItem
                        parent={this}
                        inx={inx}
                        info={option}
                        history="3"
                        _h={this.state.item_h}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            <ShareDialog
              isShare={this.state.is_share}
              parent={this}
              info={this.state.series_details}
              onEvent={() => {
                this.setState({
                  is_share:false
                })
              }}
            />
          </section>
        )}
      </div>
    );
  }
}
export default CreateCenter;
