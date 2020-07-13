import React from "react";
import Helmet from "react-helmet";
import Layout from "./layout";
import config from "../../../data/SiteConfig";

import { navigate, Link } from "@reach/router";
import { Container, Avatar } from "@material-ui/core";

import "./layout/Profile.css";
// import SearchLoading from '../Loading/SearchLoading';

import { AsadeMenu, RightMenu } from "./components/AsadeMenu";
import { get_data } from "../../assets/js/request";
import usercontainer from "../../assets/img/usercontainer.png";
import iconDy from "../../assets/img/iconDy.png";
import iconcrear from "../../assets/img/iconcrear.png";
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
      // login_status:false,
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
    if (sessionStorage.getItem("file_data")) {
      sessionStorage.removeItem("file_data");
    }
    let _router = this.props["*"].split("/")[0];
    console.log(_router);
    let _menu_open = JSON.parse(JSON.stringify(this.state.menuOpen));
    Object.keys(_menu_open).forEach((va) => {
      // if (_menuOpen[va] && va != _data.page) {
      _menu_open[va] = false;
      // }
    });

    switch (_router) {
      case "workscenter":
        _menu_open.CreateCenter = true;
        break;
      case "dynamic":
        _menu_open.Dynamic = true;
        break;
    }
    this.setState({
      //     nowPage: _now_page,
      menuOpen: _menu_open,
    });
    // if (sessionStorage.getItem("now_page")) {
    //   let _now_page = JSON.parse(sessionStorage.getItem("now_page"));
    //   let _menu_open = JSON.parse(JSON.stringify(this.state.menuOpen));

    //   switch (_now_page.parent_id) {
    //     case 2:
    //       _menu_open.MsgCenter = true;
    //       break;
    //     case 3:
    //       _menu_open.CreateCenter = true;
    //       break;
    //     case 4:
    //       _menu_open.Dynamic = true;
    //       break;
    //   }
    //   this.setState({
    //     nowPage: _now_page,
    //     menuOpen: _menu_open,
    //   });
    // }

    get_data({
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
  componentWillReceiveProps(nextProps) {
    let _menu_open = JSON.parse(JSON.stringify(this.state.menuOpen));

    let _router = nextProps["*"].split("/")[0];

    console.log(_router);
    Object.keys(_menu_open).forEach((va) => {
      // if (_menuOpen[va] && va != _data.page) {
      _menu_open[va] = false;
      // }
    });
    switch (_router) {
      case "workscenter":
        _menu_open.CreateCenter = true;
        break;
      case "dynamic":
        _menu_open.Dynamic = true;
        break;
    }
    this.setState({
      menuOpen: _menu_open,
    });
  }
  componentWillUnmount() {
    sessionStorage.removeItem("now_page");
  }

  pageRoute(event, msg) {
    //要修改
    let _data = msg || event.target.dataset;
    if (
      this.state.nowPage.parent_id === parseInt(_data.id) &&
      _data.page != "CreateCenter"
    ) {
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
        childpage_id: _data.inx || 0,
        series_id: _data.series_id && _data.series_id,
      },
    });
    sessionStorage.setItem(
      "now_page",
      JSON.stringify({
        parent: _data.page,
        parent_id: parseInt(_data.id),
        childPage: _data.defaultpage || "",
        childpage_id: _data.inx || 0,
        series_id: _data.series_id && _data.series_id,
      })
    );
  }
  render() {
    const { menuOpen } = this.state;
    const { children } = this.props;

    return (
      <Layout>
        <Helmet title={`${config.siteTitle}`} />
        <Container className="all-height all-width ">
          <section className="ma-container all-height all-width profile-height">
            <aside className="ma-aside profile-left all-height bg-white ">
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
                  onClick={(evt) => {
                    navigate(`/users/profile`);
                    this.pageRoute(evt);
                  }}
                  className="bg-not"
                  style={{ backgroundImage: "url(" + usercontainer + ")" }}
                >
                  个人中心
                </li>

                <li
                  aria-label="more"
                  aria-controls="dynamic-menu"
                  aria-haspopup="true"
                  data-page="Dynamic"
                  data-id="4"
                  data-defaultpage="我的收藏"
                  onClick={(evt) => {
                    navigate(`/users/profile/dynamic`);
                    this.pageRoute(evt);
                  }}
                  className="bg-not"
                  style={{ backgroundImage: "url(" + iconDy + ")" }}
                >
                  动态
                  <RightMenu
                    menus={[
                      { title: "我的收藏", _url: "/users/profile/dynamic" },
                      {
                        title: "历史记录",
                        _url: "/users/profile/dynamic/history",
                      },
                    ]}
                    parent={this}
                    info={this.state.nowPage}
                    open={menuOpen.Dynamic}
                    id={"dynamic-menu"}
                  />
                </li>

                <li
                  aria-label="more"
                  aria-controls="create-menu"
                  aria-haspopup="true"
                  data-page="CreateCenter"
                  data-id="3"
                  data-defaultpage="作品管理"
                  onClick={(evt) => {
                    navigate("/users/profile/workscenter");
                    this.pageRoute(evt);
                  }}
                  className="bg-not"
                  style={{ backgroundImage: "url(" + iconcrear + ")" }}
                >
                  创作中心
                  <RightMenu
                    menus={[
                      { title: "作品管理", _url: "/users/profile/workscenter" },
                      { title: "申诉管理" },
                    ]}
                    parent={this}
                    open={menuOpen.CreateCenter}
                    info={this.state.nowPage}
                    id={"create-menu"}
                  />
                </li>
              </ul>
            </aside>
            <main className="ma-main" style={{ width: "calc(100% - 250px)" }}>
              {children}
            </main>
          </section>
        </Container>
      </Layout>
    );
  }
}
export default Profile;
