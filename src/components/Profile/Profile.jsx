import React from "react";
import Helmet from "react-helmet";
import Layout from "./layout";
import config from "../../../data/SiteConfig";

import { navigate } from "@reach/router";
import { Container, Avatar } from "@material-ui/core";
import { Telegram, NotificationsNone, OndemandVideo,PermIdentity} from "@material-ui/icons";
import "./layout/Profile.css";

import PageRouter from "./router/index";
import AdiseMenu from "./ProfileChildens/components/AsadeMenu";
import { get_data } from "../../assets/js/request";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: null,
      nowPage: {
        parent: "ProfileIndex",
        parent_id: 1,
        childPage: "",
        childpage_id: 0,
      },
      menuOpen: {
        //打开
        Dynamic: false, //动态
        MsgCenter: false, //作息中心
        CreateCenter: false, //作品管理
        ProfileIndex: false, //默认页
      },
    };
    this.pageRoute = this.pageRoute.bind(this);
  }
  componentDidMount() {
    if (sessionStorage.getItem("now_page")) {
      let _now_page = JSON.parse(sessionStorage.getItem("now_page"));
      let _menu_open = JSON.parse(JSON.stringify(this.state.menuOpen));

      switch (_now_page.parent_id) {
        case 2:
          _menu_open.MsgCenter = true;
          break;
        case 3:
          _menu_open.CreateCenter = true;
          break;
        case 4:
          _menu_open.Dynamic = true;
          break;
      }
      this.setState({
        nowPage: _now_page,
        menuOpen: _menu_open,
      });
    }
    //请求用户信息
    get_data("api/v1/gateway", {
      model_name: "user",
      model_action: "get_information",
    }).then((res) => {
      if (res.err == 0 && res.errmsg == "OK") {
        this.setState({
          userinfo: res.result_data[0],
        });
        sessionStorage.setItem("user_info", JSON.stringify(res.result_data[0]));
      }
    });
  }

  // componentWillReceiveProps(nextProps){

  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   console.log(nextState);
  //   return true;
  // }
  pageRoute(event) {
    let _data = event.target.dataset;
    if (this.state.nowPage.parent_id === parseInt(_data.id)) {
      return;
    }
    let _menuOpen = JSON.parse(JSON.stringify(this.state.menuOpen));
    if (!_data.page) {
      return;
    }
    Object.keys(_menuOpen).forEach((va) => {
      if (_menuOpen[va] && va != _data.page) {
        _menuOpen[va] = false;
      }
    });
    _menuOpen[_data.page] = true;
    this.setState({
      menuOpen: _menuOpen,
      nowPage: {
        parent: _data.page,
        parent_id: parseInt(_data.id),
        childPage: _data.defaultpage || "",
        childpage_id: 0,
      },
    });
    sessionStorage.setItem(
      "now_page",
      JSON.stringify({
        parent: _data.page,
        parent_id: parseInt(_data.id),
        childPage: _data.defaultpage || "",
        childpage_id: 0,
      })
    );
  }
  render() {
    const { menuOpen } = this.state;

    return (
      <Layout>
        <Helmet title={`${config.siteTitle}`} />
        <Container fixed className="all-height all-width">
          <section className="ma-container all-height all-width">
            <aside className="ma-aside profile-left all-height bg-white">
              {this.state.nowPage.parent_id > 1 ? (
                <div
                  className="profile-bottom profile-padding bg-white text-center"
                  data-page="ProfileIndex"
                  data-id="1"
                  onClick={this.pageRoute}
                >
                  <div className="box box-center">
                    <Avatar
                      style={{ width: 80, height: 80 }}
                      src={
                        this.state.userinfo && this.state.userinfo.headshot
                          ? this.state.userinfo.headshot
                          : ""
                      }
                    ></Avatar>
                  </div>
                  <p className="zero-edges fn-color-2C2C3B fn-size-18">
                    {this.state.userinfo && this.state.userinfo.user_name
                      ? this.state.userinfo.user_name
                      : "暂未留下称呼"}
                  </p>
                  <p className="zero-edges textview-overflow two fn-color-878791 fn-size-12">
                    {this.state.userinfo && this.state.userinfo.introduction
                      ? this.state.userinfo.introduction
                      : "暂未留下描述哦"}
                  </p>
                </div>
              ) : (
                ""
              )}
              <ul className="ul bg-white">
                <li
                  data-page="ProfileIndex"
                  data-id="1"
                  onClick={this.pageRoute}
                  onClick={this.pageRoute}
                >
                  <PermIdentity />
                  个人中心
                  {/**  <AdiseMenu
                menus={["我的订阅", "我的收藏", "历史记录"]}
                parent={this}
                info={this.state.nowPage}
                open={menuOpen.Dynamic}
                id={"dynamic-menu"}
              /> */}
                </li>

                <li
                  aria-label="more"
                  aria-controls="dynamic-menu"
                  aria-haspopup="true"
                  data-page="Dynamic"
                  data-id="4"
                  data-defaultpage="我的订阅"
                  onClick={this.pageRoute}
                >
                  <Telegram />
                  动态
                  <AdiseMenu
                    menus={["我的订阅", "我的收藏", "历史记录"]}
                    parent={this}
                    info={this.state.nowPage}
                    open={menuOpen.Dynamic}
                    id={"dynamic-menu"}
                  />
                </li>
                <li
                  aria-controls="message-menu"
                  onClick={this.pageRoute}
                  data-page="MsgCenter"
                  data-id="2"
                  data-defaultpage="回复我的"
                >
                  <NotificationsNone /> 消息中心
                  <AdiseMenu
                    menus={["回复我的", "@我的私信", "收到的赞", "系统通知"]}
                    parent={this}
                    open={menuOpen.MsgCenter}
                    info={this.state.nowPage}
                    id={"message-menu"}
                  />
                </li>

                <li
                  aria-label="more"
                  aria-controls="create-menu"
                  aria-haspopup="true"
                  data-page="CreateCenter"
                  data-id="3"
                  data-defaultpage="作品管理"
                  onClick={this.pageRoute}
                >
                  <OndemandVideo />
                  创作中心
                  <AdiseMenu
                    menus={["作品管理", "申诉管理"]}
                    parent={this}
                    open={menuOpen.CreateCenter}
                    info={this.state.nowPage}
                    id={"create-menu"}
                  />
                </li>
                {/**
                <li>
                  {" "}
                  <ReportProblem />
                  风纪中心
                </li>
                <li>
                  <AccountBalanceWalletTwoTone /> 钱包
                </li>
                <li>
                  <PermIdentity />
                  会员中心
                </li>
                <li>
                  <LocationCity /> 数据中心
                </li>
                 */}
              </ul>
            </aside>
            <main className="ma-main" style={{ width: "calc(100% - 250px)" }}>
              <PageRouter num={this.state.nowPage.parent_id} parent={this} />
            </main>
          </section>
        </Container>
      </Layout>
    );
  }
}
export default Profile;
