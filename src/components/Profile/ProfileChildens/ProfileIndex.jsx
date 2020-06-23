import React from "react";
import BannerOne from "../../../assets/img/profile.png";
import { Avatar, Grid } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import  WorksItem  from "./components/WorksItem";

import { get_data, get_alldata } from "../../../assets/js/request";

class ProfileIndex extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      userInfo: props.parent.state.userinfo, //用户信息
      userData: null, //用户数据
      userWorks: null, //我的作品
      ordinaryOrSeries:false,//系列与普通
      userCollection: null, //我的收藏
      isHistory:false,//收藏与历史
      // historyData: null, //历史记录
    };
  }
  componentWillMount() {
  
    let _this = this;
    get_alldata("api/v1/gateway", [
     // { model_name: "user", model_action: "get_information" }, //用户信息，
      { model_name: "data", model_action: "get_data" }, //数据中心
      {
        //个人作品
        model_name: "video",
        model_action: "get_video",
        extra_data: {
          type: "video", // "series",
        },
      },
      { model_name: "collection", model_action: "get_collection" }, //我的收藏
    ]).then((res) => {
     console.log(res)
      
      _this.setState({
        // userInfo: res[0].result_data[0],
        userData: res[0].result_data[0],
        userWorks: res[1].result_data,
        userCollection: res[2].result_data,
      });
    });
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(JSON.stringify(nextProps.parent.state.userinfo)!=JSON.stringify(this.state.userinfo)){
      this.setState({
        userInfo:nextProps.parent.state.userinfo
      })
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   //优化
  // }

  render() {
    let _this = this;

    return (
      <section className=" view-scroll all-height">
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
              this.props.parent.setState({
                nowPage: {
                  childPage: "",
                  chilepage_id: 0,
                  parent: "SetingsCenter",
                  parent_id: 5,
                },
              });
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
                ID: 43572
              </p>
              <p className="zero-edges textview-overflow two">
                {this.state.userInfo ? this.state.userInfo.introduction : ""}
              </p>
            </div>
          </div>
          <div
            className="box box-align-end text-center"
            style={{ minWidth: 165 }}
          >
            <div style={{ margin: "0 20px" }}>
              <p className="fn-color-878791">关注数</p>
              <p className="zero-edges">
                {this.state.userInfo
                  ? this.state.userInfo.subscription_counts
                  : 0}
              </p>
            </div>
            <div style={{ margin: "0 20px" }}>
              <p className="fn-color-878791">粉丝数</p>
              <p className="zero-edges">
                {this.state.userInfo ? this.state.userInfo.fans_counts : 0}
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
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">订阅量</p>
              <p className="fn-size-20 fn-color-007CFF">
                {_this.state.userData
                  ? _this.state.userData.collections_counts
                  : 0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">视频播放量</p>
              <p className="fn-size-20 fn-color-007CFF">
                {_this.state.userData ? _this.state.userData.view_counts : 0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">课件下载量</p>
              <p className="fn-size-20 fn-color-007CFF">
                {_this.state.userData
                  ? _this.state.userData.download_counts
                  : 0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">点赞数</p>
              <p className="fn-size-20 fn-color-007CFF">
                {_this.state.userData ? _this.state.userData.fans_change : 0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">收藏数</p>
              <p className="fn-size-20 fn-color-007CFF">
                {_this.state.userData ? _this.state.userData.fans_counts : 0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">分享数</p>
              <p className="fn-size-20 fn-color-007CFF">
                {_this.state.userData ? _this.state.userData.share_counts : 0}
              </p>
              <p className="zero-edges">
                昨日 <span className="fn-color-F86B6B">-10</span>
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">评论数</p>
              <p className="fn-size-20 fn-color-007CFF">
                {_this.state.userData ? _this.state.userData.comment_counts : 0}
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
            <div className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
              全部作品
            </div>
          </div>
          <div style={{ margin: "30px 0" }}>
            <Navbar
              parent={_this}
              lists={["普通", "系列"]}
              onEvent={(num) => {
                let _data = {
                  model_name: "video",
                  model_action: "get_video",
                  extra_data: {
                    type: "video",
                  },
                };
                if (num == 1) {
                  _data.extra_data.type = "series";
                 
                }
                get_data("/api/v1/gateway", _data).then((res) => {
                 
                  if (res.err == 0) {
                    _this.setState({
                      userWorks: res.result_data,
                      ordinaryOrSeries:!this.state.ordinaryOrSeries
                    });
                  }
                });
              }}
            />
          </div>
          <div>
            <div>
              {this.state.userWorks&&this.state.userWorks.length>0 ? (
                this.state.userWorks.map((option, inx) => (
                  <SeriesItem parent={this} info={option} inx={inx} key={inx} series={this.state.ordinaryOrSeries} />
                ))
              ) : (
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
                    "extra_data": {},
                  };
                 
                  if (num == 1) {
                    _data = {
                      model_name: "collection",
                      model_action: "get_collection",
                    };
                  }
                  
                  get_data("/api/v1/gateway", _data).then((res) => {
                    
                    if (res.err == 0) {
                      this.setState({
                        userCollection: res.result_data,
                        isHistory:!this.state.isHistory
                      });
                    }
                  });
                }}
              />
            </div>
            <div className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
              查看更多
            </div>
          </div>
          <Grid
            container
            spacing={4}
            className='grid'
          >
            {this.state.userCollection &&this.state.userCollection.length>0? (
              this.state.userCollection.map((option, inx) => (
                <Grid item xs={3} key={inx} >
                  <WorksItem parent={this} inx={inx} info={option} history={_this.state.isHistory} />
                </Grid>
              ))
            ) : (
              <div>亲，你还没有数据可以展示哦，现在就去添加么？</div>
            )}
          </Grid>
        </main>
      </section>
    );
  }
}
export default ProfileIndex;
