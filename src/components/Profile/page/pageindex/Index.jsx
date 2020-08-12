import React from "react";
import { Avatar, Grid, Link } from "@material-ui/core";

import { Navbar, Nav } from "../../components/ProfileNav";
import SeriesItem from "../../components/SeriesItem";
import WorksItem from "../../components/WorksItem";
import { get_data } from "../../../../assets/js/request";
import { getUser, isLoggedIn } from "../../../../services/auth";
import { navigate } from "@reach/router";

import ProgressBar from "../../../../assets/template/ProgressBar";
import notcoll from "../../../../assets/img/notcoll.png";
import notvideo from "../../../../assets/img/notvideo.png";

class ProfileIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: props.parent.state.userinfo, //用户信息
      userData: null, //用户数据
      works_video: null, //作品数据
      works_series: null, //系列数据
      works_draft: null, //草稿数据
      history_data: null, //历史数据
      collection_data: null, //收藏数据
      document_data: null, //文本数据数据
      document_series: null, //系列文本数据
      video_type: "video", //系列与普通/草稿

      lists_arr: ["普通", "系列", "草稿箱"],
      // userCollection: null, //我的收藏
      // userColllection_counts: 0, //收藏数量
      page_type: 1, //收藏与历史
      item_h: 0,
      login_status: false,
    };
    this.update_data = this.update_data.bind(this);
    this.wind_size = this.wind_size.bind(this);
  }
  componentDidMount() {
    if (!isLoggedIn) {
      alert("用户未登录，下在跳转登录页...");
      navigate(`/users/login`);
      return;
    }
    this.update_data();
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

  update_data() {
    this.setState({
      login_status: true,
    });

    get_data({
      model_name: "home",
      model_action: "get_information",
      extra_data: {
        max_size: 2,
        collection_counts: 4,
      },
      model_type: "",
    }).then((res) => {
      if (res.err == 4104) {
        alert("用户未登录，或登录已过期,将为你跳转到登录页...");
        localStorage.removeItem("haetekUser");
        navigate(`/users/login`);
        return;
      }

      if (res.err === 0) {
        let _data = res.result_data[0];
        let _list = ["普通", "系列", "草稿箱"];
        if (_data.document && _data.document.length > 0) {
          _list.push("文本");
        }
        if (_data.document_series && _data.document_series.length > 0) {
          _list.push("系列文本");
        }
        this.setState({
          userData: _data,
          works_video: _data.video,
          works_series: _data.series,
          works_draft: _data.draft,
          history_data: _data.history,
          collection_data: _data.collection,
          document_data:
            _data.document && _data.document.length > 0 ? _data.document : null,
          document_series:
            _data.document_series && _data.document_series.length > 0
              ? _data.document_series
              : null,
          lists_arr: _list,
        });
      }

      // setTimeout(() => {
      this.setState({
        login_status: false,
      });
      // }, 300);

      this.wind_size();
    });

    window.onresize = (e) => {
      this.wind_size(e);
    };
  }

  componentWillUnmount() {
    window.onresize = null;
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const {
      userData,
      works_video,
      works_series,
      works_draft,
      history_data,
      collection_data,
      video_type,
      page_type,
      item_h,
      login_status,
      document_data,
      document_series,
      ...other
    } = this.state;
    let _this = this;
    return (
      <section className=" view-scroll all-height all-width bg-f9">
        <ProgressBar loading={login_status} />
        {/** <SearchLoading loading={this.state.login_status} /> */}
        <main
          className="all-width bg-image "
          style={{
            minHeight: 183,

            borderRadius: "0.75rem 0.75rem 0 0",
          }}
        >
          {userData && userData.background && (
            <img
              className=" all-width"
              src={userData.background}
              style={{ height: "auto" }}
              alt=""
            />
          )}
        </main>

        <main
          style={{ height: "9.875rem", paddingTop: "1.25rem" }}
          className="all-width profile-padding bg-white box  box-between fn-r-14 fn-color-2C2C3B"
        >
          <div className="box box-align-center">
            <div style={{ marginRight: '1.25rem' }}>
              <Avatar
                style={{
                  width: "5rem",
                  height: "5rem",
                  transform: "translateY(-3.4375rem)",
                }}
                src={userData ? userData.headshot : ""}
              />
            </div>
            <div>
              <p className="zero-edges fn-r-16">
                {userData ? userData.user_name : ""}
              </p>
              <p
                className="zero-edges fn-r-12 fn-color-9E9EA6"
                style={{ margin: "0.625rem 0" }}
              >
                ID: {userData ? userData.user_id : ""}
              </p>
              <p className="zero-edges textview-overflow two">
                {userData ? userData.introduction : ""}
              </p>
              <p className="zero-edges fn-r-12" style={{ marginTop: '0.625rem' }}>
                <Link
                  href={`/users/profile/settings`}
                  className="fn-color-007CFF"
                  underline="none"
                >
                  {"编辑个人资料 >"}
                </Link>
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
              <Nav parent={this} list={["数据中心"]} _inx={0} />
            </div>
            <div></div>
            {/**
            <div className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
              查看数据
            </div> */}
          </div>
          <div
            className="box box-align-center text-center fn-r-14 fn-color-878791"
            style={{ marginTop: "30px" }}
          >
            <div className="box-flex bg-EDF6FF all-height">
              <p className="zero-edges">视频播放量</p>
              <p className="r-20 fn-color-007CFF">
                {(_this.state.userData && _this.state.userData.view_counts) ||
                  0}
              </p>
              {/*<p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>*/}
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">课件下载量</p>
              <p className="fn-f-20 fn-color-007CFF">
                {(_this.state.userData &&
                  _this.state.userData.download_counts) ||
                  0}
              </p>
              {/**  <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>*/}
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">点赞数</p>
              <p className="fn-f-20 fn-color-007CFF">
                {(_this.state.userData && _this.state.userData.like_counts) ||
                  0}
              </p>
              {/**  <p className="zero-edges">
                昨日 <span className="fn-color-02BB17">+200</span>
              </p>*/}
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">收藏数</p>
              <p className="fn-size-20 fn-color-007CFF">
                {(_this.state.userData &&
                  _this.state.userData.collections_counts) ||
                  0}
              </p>
              <p className="zero-edges">
                {/** 
                昨日 <span className="fn-color-02BB17">+200</span>*/}
              </p>
            </div>
            <div className="box-flex bg-EDF6FF">
              <p className="zero-edges">分享数</p>
              <p className="fn-f-20 fn-color-007CFF">
                {(_this.state.userData && _this.state.userData.share_counts) ||
                  0}
              </p>
              <p className="zero-edges">
                {/** 昨日 <span className="fn-color-F86B6B">-10</span> */}
              </p>
            </div>
          </div>
        </main>
        <main className="all-width bg-white profile-margin profile-padding">
          <div className="box box-align-center box-between">
            <div>
              <Nav parent={_this} _inx={0} list={["我的作品"]} />
            </div>
            <div
              className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-r-12 text-center"
              data-page="CreateCenter"
              data-id="3"
              data-defaultpage="作品管理"
              onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();

                if (video_type == "video") {
                  navigate(`/users/profile/workscenter`);
                }
                if (video_type == "series") {
                  navigate(`/users/profile/workscenter/series`);
                }
                if (video_type == "draft") {
                  navigate(`/users/profile/workscenter/draft`);
                }
                if(video_type=='document'){
                  navigate(`/users/profile/workscenter/document`);
                }
                if(video_type=='document_series'){
                  navigate(`/users/profile/workscenter/seriesdoc`);
                }
                return;
              }}
            >
              全部作品
            </div>
          </div>
          <div style={{ margin: "30px 0" }}>
            <Navbar
              parent={_this}
              lists={this.state.lists_arr}
              onEvent={(num) => {
                let _type = "video";
                if (num == 1) {
                  _type = "series";
                } else if (num == 2) {
                  _type = "draft";
                } else if (num == 3) {
                  if(document_data){
                    _type = "document";
                  }else{
                    _type='document_series'
                  }
                  
                } else if (num == 4) {
                  _type = "document_series";
                }
                this.setState({
                  video_type: _type,
                });
              }}
            />
          </div>
          <div>
            {video_type == "video" && (
              <div>
                {works_video && works_video.length > 0 ? (
                  works_video.map((option) => (
                    <SeriesItem
                      parent={this}
                      info={option}
                      key={option.video_id}
                      series={video_type}
                    />
                  ))
                ) : (
                  <div className="profile-top all-width all-height view-overflow text-center">
                    <img src={notvideo} style={{ width: 490, height: 293 }} />
                    <div className="fn-color-6f fn-f-16 profile-top-20">
                      暂无视频
                    </div>
                  </div>
                )}
              </div>
            )}
            {video_type == "series" && (
              <div>
                {works_series && works_series.length > 0 ? (
                  works_series.map((option) => (
                    <SeriesItem
                      parent={this}
                      info={option}
                      key={option.series_id}
                      series={video_type}
                    />
                  ))
                ) : (
                  <div className="profile-top all-width all-height view-overflow text-center">
                    <img src={notvideo} style={{ width: 490, height: 293 }} />
                    <div className="fn-color-6f fn-f-16 profile-top-20">
                      暂无视频
                    </div>
                  </div>
                )}
              </div>
            )}
            {video_type == "draft" && (
              <div>
                {works_draft && works_draft.length > 0 ? (
                  works_draft.map((option) => (
                    <SeriesItem
                      parent={this}
                      info={option}
                      key={option.video_id}
                      series={video_type}
                    />
                  ))
                ) : (
                  <div className="profile-top all-width all-height view-overflow text-center">
                    <img src={notvideo} style={{ width: 490, height: 293 }} />
                    <div className="fn-color-6f fn-f-16 profile-top-20">
                      暂无视频
                    </div>
                  </div>
                )}
              </div>
            )}
            {video_type == "document" && (
              <div>
                {document_data && document_data.length > 0 ? (
                  document_data.map((option) => (
                    <SeriesItem
                      parent={this}
                      info={option}
                      key={option.file_id}
                      series={video_type}
                    />
                  ))
                ) : (
                  <div className="profile-top all-width all-height view-overflow text-center">
                    <img src={notvideo} style={{ width: 490, height: 293 }} />
                    <div className="fn-color-6f fn-size-16 profile-top-20">
                      暂无文本
                    </div>
                  </div>
                )}
              </div>
            )}
            {video_type == "document_series" && (
              <div>
                {document_series && document_series.length > 0 ? (
                  document_series.map((option) => (
                    <SeriesItem
                      parent={this}
                      info={option}
                      key={option.series_id}
                      series={video_type}
                    />
                  ))
                ) : (
                  <div className="profile-top all-width all-height view-overflow text-center">
                    <img src={notvideo} style={{ width: 490, height: 293 }} />
                    <div className="fn-color-6f fn-size-16 profile-top-20">
                      暂无文本
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        <main
          style={{ marginBottom: "0" }}
          className="all-width bg-white profile-margin profile-padding"
        >
          <div className="box box-align-center box-between">
            <div>
              <Nav
                parent={_this}
                list={["我的收藏", "历史记录"]}
                _inx={page_type - 1}
                onEvent={(num) => {
                  console.log(num);
                  this.setState({
                    page_type: num,
                  });
                  setTimeout(this.wind_size, 50);
                }}
              />
            </div>
            <div
              className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-f-12 text-center"
              data-page="Dynamic"
              data-id="4"
              data-defaultpage="我的收藏"
              onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();

                if (page_type == 1) {
                  navigate(`/users/profile/dynamic`);
                }
                if (page_type == 2) {
                  navigate(`/users/profile/dynamic/history`);
                }
                return;
              }}
            >
              查看更多
            </div>
          </div>
          {page_type == 1 && (
            <Grid container spacing={4} className="grid">
              {collection_data && collection_data.length > 0 ? (
                collection_data.map((option) => (
                  <Grid item xs={3} key={option.video_id || option.series_id}>
                    <WorksItem
                      parent={this}
                      info={option}
                      history={page_type}
                      _h={this.state.item_h}
                    />
                  </Grid>
                ))
              ) : (
                <div className="profile-top all-width all-height view-overflow text-center">
                  <img src={notcoll} style={{ width: 490, height: 293 }} />
                  <div className="fn-color-6f fn-f-16 profile-top-20">
                    暂无视频
                  </div>
                </div>
              )}
            </Grid>
          )}
          {page_type == 2 && (
            <Grid container spacing={4} className="grid">
              {history_data && history_data.length > 0 ? (
                history_data.map((option) => (
                  <Grid item xs={3} key={option.video_id || option.series_id}>
                    <WorksItem
                      parent={this}
                      info={option}
                      history={page_type}
                      _h={this.state.item_h}
                    />
                  </Grid>
                ))
              ) : (
                <div className="profile-top all-width all-height view-overflow text-center"> 
                  <img src={notcoll} style={{ width: 490, height: 293 }} />
                  <div className="fn-color-6f fn-f-16 profile-top-20">
                    暂无视频
                  </div>
                </div>
              )}
            </Grid>
          )}
        </main>
      </section>
    );
  }
}
export default ProfileIndex;
