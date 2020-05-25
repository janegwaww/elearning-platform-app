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

config.siteTitle = "黑顿-个人中心";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagesNum: 1,
    };
  }
  render() {
    return (
      <Layout>
        <Helmet title={`${config.siteTitle}`} />
        <Container fixed className="all-height">
          <section className="ma-container all-height">
            <aside className="ma-aside profile-left ">
            {this.state.pagesNum>1?(
              <div className="profile-bottom profile-top profile-padding bg-white text-center">
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
              ):''}
              <ul className="ul bg-white">
                <li
                  aria-label="more"
                  aria-controls="dynamic-menu"
                  aria-haspopup="true"
                  onClick={()=>{this.setState({ pagesNum: 4 });}}
                >
                  <Telegram />
                  动态
                  <AdiseMenu
                    menus={["我的订阅", "我的收藏", "历史记录"]}
                    parent={this}
                    open={true}
                    id={"dynamic-menu"}
                  />
                </li>
                <li
                  aria-controls="message-menu"
                  onClick={() => {
                    this.setState({ pagesNum: 2 });
                  }}
                >
                  <NotificationsNone /> 消息中心
                  <AdiseMenu
                    menus={["回复我的", "@我的私信", "收到的赞", "系统通知"]}
                    parent={this}
                    open={true}
                    id={"message-menu"}
                  />
                </li>
                <li
                  aria-label="more"
                  aria-controls="create-menu"
                  aria-haspopup="true"
                  onClick={() => {
                    this.setState({ pagesNum: 3 });
                  }}
                >
                  <LiveTv />
                  创作中心
                  <AdiseMenu
                    menus={["作品管理", "申诉管理"]}
                    parent={this}
                    open={true}
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
            <main className="ma-main all-width view-scroll ">
              <PageRouter num={this.state.pagesNum} />
            </main>
          </section>
        </Container>
      </Layout>
    );
  }
}
export default Profile;
