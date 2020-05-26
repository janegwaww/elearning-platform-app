import React from "react";
import Helmet from "react-helmet";
import Layout from "./layout";
import config from "../../../data/SiteConfig";

import { navigate } from "@reach/router";
import { Container, Avatar, MenuList, MenuItem } from "@material-ui/core";
import {
  Telegram,
  NotificationsNone,
  LiveTv,
  ReportProblem,
  AccountBalanceWalletTwoTone,
  PermIdentity,
  LocationCity,
} from "@material-ui/icons";
import "./layout/profile.css";

import PageRouter from "./router/index";
import AdiseMenu from "./ProfileChildens/components/AsadeMenu";
import { object } from "prop-types";

config.siteTitle = "黑顿-个人中心";
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowPage: {
        parent: "ProfileIndex",
        parent_id: 1,
        childPage: "",
        childpage_id: 0,
      },
      menuOpen: {
        Dynamic: false,
        MsgCenter: false,
        CreateCenter: false,
        ProfileIndex: false,
      },
    };
    this.pageRoute = this.pageRoute.bind(this);
  }
  pageRoute(event) {
    
    let _data = event.target.dataset;
    let _menuOpen = JSON.parse(JSON.stringify(this.state.menuOpen));
    if(!_data.page){return};
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
  }
  render() {
    const { menuOpen } = this.state;

    return (
      <Layout>
        <Helmet title={`${config.siteTitle}`} />
        <Container fixed className="all-height">
          <section className="ma-container all-height">
            <aside className="ma-aside profile-left">
              {this.state.nowPage.parent_id > 1 ? (
                <div
                  className="profile-bottom profile-padding bg-white text-center"
                  data-page="ProfileIndex"
                  data-id="1"
                  onClick={this.pageRoute}
                >
                  <div className="box box-center">
                    <Avatar style={{ width: 80, height: 80 }}></Avatar>
                  </div>
                  <p className="zero-edges fn-color-2C2C3B fn-size-18">
                    Omnicreativora
                  </p>
                  <p className="zero-edges textview-overflow two fn-color-878791 fn-size-12">
                    资深视觉设计/UI设计，淘宝天下网商特约访谈嘉宾…
                  </p>
                </div>
              ) : (
                ""
              )}
              <ul className="ul bg-white">
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
                  <LiveTv />
                  创作中心
                  <AdiseMenu
                    menus={["作品管理", "申诉管理"]}
                    parent={this}
                    open={menuOpen.CreateCenter}
                    id={"create-menu"}
                  />
                </li>
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
              </ul>
            </aside>
            <main className="ma-main all-width">
              <PageRouter num={this.state.nowPage.parent_id} parent={this} />
            </main>
          </section>
        </Container>
      </Layout>
    );
  }
}
export default Profile;
