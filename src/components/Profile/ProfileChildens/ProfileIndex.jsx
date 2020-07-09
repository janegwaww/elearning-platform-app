import React from "react";

import { Avatar, Grid, Link } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import WorksItem from "./components/WorksItem";
import { get_data, get_alldata } from "../../../assets/js/request";

class ProfileIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.parent.state.userinfo, //用户信息
      userData: null, //用户数据
      userWorks: null, //我的作品
      userWorks_counts: 0, //作品数量
      video_type: "video", //系列与普通
      userCollection: null, //我的收藏
      userColllection_counts: 0, //收藏数量
      page_type: 1, //收藏与历史
      item_h: 0,
      // historyData: null, //历史记录
    };
    this.update_data = this.update_data.bind(this);
    this.wind_size = this.wind_size.bind(this);
  }
  componentDidMount() {
    this.props.parent.setState({
      login_status: true,
    });
    let _this = this;

    get_data({
      model_name: "home",
      model_action: "get_information",
      extra_data: {
        video_counts: 2,
        collection_counts: 8,
      },
      model_type: "",
    }).then((res) => {
      if (res.err === 0) {
        let _data = res.result_data[0];
        console.log(_data);
        this.setState({
          userData: _data,
          userWorks: _data.video,
          userWorks_counts: _data.view_counts,
          userCollection: _data.collection,
          userColllection_counts: _data.collection_counts,
        });
      }
      this.props.parent.setState({
        login_status: false,
      });
      this.wind_size();
    });

    window.onresize = (e) => {
      this.wind_size(e);
    };
  }
  wind_size(e) {
    let _e = e || window.event;
    if (!document.querySelector(".MuiGrid-root.grid .MuiGrid-item")) {
      return;
    }
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
  update_data(_type) {
    this.props.parent.setState({
      login_status: true,
    });

    let _data = {
      model_name: "video",
      model_action: "get_video",
      extra_data: {
        type: _type,
      },
    };
    get_data(_data).then((res) => {
      setTimeout(() => {
        this.props.parent.setState({
          login_status: false,
        });
      }, 1000);

      if (res.err == 0) {
        this.setState({
          userWorks: res.result_data.slice(0, 2),
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.parent.state.userinfo) !=
      JSON.stringify(this.state.userinfo)
    ) {
      this.setState({
        userInfo: nextProps.parent.state.userinfo,
      });
    }
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   //优化
  // }

  render() {
    let _this = this;
    return (
      <section className=" view-scroll all-height all-width">
        <main className="all-width">
          <img
            src={this.state.userInfo ? this.state.userInfo.background : ""}
            className="all-width"
            style={{ height: "300px" }}
          />
          <span
            className="bg-white view-overflow box box-center"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              borderRadius: "50%",
            }}
            onClick={() => {
              event.stopPropagation();
              event.preventDefault();
              let _page = {
                childPage: "",
                chilepage_id: 0,
                parent: "SetingsCenter",
                parent_id: 5,
              };
              this.props.parent.setState({
                nowPage: _page,
              });
              sessionStorage.setItem("now_page", JSON.stringify(_page));
            }}
          >
            <Settings />
          </span>
        </main>
        <main
          style={{ height: "158px", paddingTop: "20px" }}
          className="all-width profile-padding bg-white box  box-between fn-size-14 fn-color-2C2C3B"
        >
          <div className="box box-align-center">
            <div style={{ marginRight: 20 }}>
              <Avatar
                style={{
                  width: "80px",
                  height: "80px",
                  transform: "translateY(-55px)",
                }}
                src={this.state.userInfo ? this.state.userInfo.headshot : ""}
              />
            </div>
            <div>
              <p className="zero-edges fn-size-16">
                {this.state.userInfo ? this.state.userInfo.user_name : ""}
              </p>
              <p
                className="zero-edges fn-size-12 fn-color-9E9EA6"
                style={{ margin: "10px 0" }}
              >
                ID: {this.state.userInfo ? this.state.userInfo.user_id : ""}
              </p>
              <p className="zero-edges textview-overflow two">
                {this.state.userInfo ? this.state.userInfo.introduction : ""}
              </p>
            </div>
          </div>
        </main>
        <main
          style={{ height: "250px" }}
          className="all-width bg-white profile-margin profile-padding"
        >
          <div className="box box-align-center box-between">
            <div>
              <ProNavbar parent={this} list={["数据中心"]} />
            </div>
            <div className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
              查看数据
            </div>
          </div>
          <div
            className="box box-align-center text-center fn-size-14 fn-color-878791"
            style={{ marginTop: "30px" }}
          >
            <div className="box-flex bg-EDF6FF all-height">
              <p className="zero-edges">视频播放量</p>
              <p className="fn-size-20 fn-color-007CFF">
                {(_this.state.userData && _this.state.userData.view_counts) ||
                  0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">课件下载量</p>
              <p className="fn-size-20 fn-color-007CFF">
                {(_this.state.userData &&
                  _this.state.userData.download_counts) ||
                  0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">点赞数</p>
              <p className="fn-size-20 fn-color-007CFF">
                {(_this.state.userData && _this.state.userData.fans_change) ||
                  0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">收藏数</p>
              <p className="fn-size-20 fn-color-007CFF">
                {(_this.state.userData && _this.state.userData.fans_counts) ||
                  0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">分享数</p>
              <p className="fn-size-20 fn-color-007CFF">
                {(_this.state.userData && _this.state.userData.share_counts) ||
                  0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-F86B6B">-10</span>
              </p>
            </div>
          </div>
        </main>
        <main className="all-width bg-white profile-margin profile-padding">
          <div className="box box-align-center box-between">
            <div>
              <ProNavbar parent={_this} list={["我的作品"]} />
            </div>
            <div
              className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center"
              data-page="CreateCenter"
              data-id="3"
              data-defaultpage="作品管理"
              onClick={(evt) => {
                evt.stopPropagation(); 
                evt.preventDefault();
                this.props.parent.pageRoute(evt);
              }}
            >
              全部作品
            </div>
          </div>
          <div style={{ margin: "30px 0" }}>
            <Navbar
              parent={_this}
              lists={["普通", "系列", "草稿箱"]}
              onEvent={(num) => {
                let _type = "video";
                if (num == 1) {
                  _type = "series";
                }
                if (num == 2) {
                  _type = "draft";
                }
                this.setState({
                  video_type: _type,
                });
                this.update_data(_type);
              }}
            />
          </div>
          <div>
            <div>
              {this.state.userWorks &&
                this.state.userWorks.length > 0 &&
                this.state.userWorks.map((option, inx) => (
                  <SeriesItem
                    parent={this}
                    info={option}
                    inx={inx}
                    key={option.video_id || option.series_id}
                    series={this.state.video_type}
                  />
                ))}
              {this.state.userWorks && this.state.userWorks.length <= 0 && (
                <div>亲，暂时你还没有作品哦，现在去添加么？</div>
              )}
            </div>
          </div>
        </main>
        <main
          style={{ marginBottom: "0" }}
          className="all-width bg-white profile-margin profile-padding"
        >
          <div className="box box-align-center box-between">
            <div>
              <ProNavbar
                parent={_this}
                list={["我的收藏", "历史记录"]}
                onEvent={(num) => {
                  let _data = {
                    model_name: "video_history",
                    model_action: "get_history",
                    extra_data: {},
                  };

                  if (num == 1) {
                    _data = {
                      model_name: "collection",
                      model_action: "get_collection",
                    };
                  }

                  get_data(_data).then((res) => {
                    if (res.err == 0) {
                      this.setState({
                        userCollection: res.result_data.slice(0, 4),
                        page_type: num,
                      });
                    }
                  });
                }}
              />
            </div>
            <div
              className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center"
              data-page="Dynamic"
              data-id="4"
              data-defaultpage="我的收藏"
              onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                this.props.parent.pageRoute(evt);
              }}
            >
              查看更多
            </div>
          </div>
          <Grid container spacing={4} className="grid">
            {this.state.userCollection &&
            this.state.userCollection.length > 0 ? (
              this.state.userCollection.map((option, inx) => (
                <Grid item xs={3} key={option.video_id}>
                  <WorksItem
                    parent={this}
                    inx={inx}
                    info={option}
                    history={_this.state.page_type}
                    _h={this.state.item_h}
                  />
                </Grid>
              ))
            ) : (
              <div className="profile-top">
                亲，你还没有数据可以展示哦，现在就去添加么？
              </div>
            )}
          </Grid>
        </main>
      </section>
    );
  }
}
export default ProfileIndex;
