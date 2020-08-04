import React from "react";
import Helmet from "react-helmet";
import Layout from "./layout";
import config from "../../../data/SiteConfig";
import { navigate, Link } from "@reach/router";
import { Container, Avatar,Grid } from "@material-ui/core";
import { RightMenu } from "./components/AsadeMenu";
import { get_data, get_info } from "../../assets/js/request";
import usercontainer from "../../assets/img/usercontainer.png";
import iconDy from "../../assets/img/iconDy.png";
import iconcrear from "../../assets/img/iconcrear.png";

import Drawer from './components/Drawer';
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: null,
      is_show: false,
      inx: 0,
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
    this.pageRoute(this.props);
    get_info().then(res=>{
      this.setState({
        userinfo: res,
      });
    })
   
  }
  componentWillReceiveProps(nextProps) {
    this.pageRoute(nextProps);
  }
  componentWillUnmount() {
    sessionStorage.removeItem("now_page");
  }

  pageRoute(props) {
    let _menu_open = JSON.parse(JSON.stringify(this.state.menuOpen));
    let _router_arr = props["*"].split("/");

    let _router = _router_arr[0];
    let _is_show = false;
    let _inx = 0;
    Object.keys(_menu_open).forEach((va) => {
      _menu_open[va] = false;
    });
    
    switch (_router) {
      case "complaints":
        _menu_open.CreateCenter = true;
        _inx = 1;
        break;

      case "workscenter":
        _menu_open.CreateCenter = true;
        break;
      case "dynamic":
        _menu_open.Dynamic = true;
        if (_router_arr.length > 1) {
          _inx = 1;
        }
        break;
    }

    if (_router) {
      _is_show = true;
    }

    this.setState({
      menuOpen: _menu_open,
      is_show: _is_show,
      inx: _inx,
    });
  }
  render() {
    const { menuOpen, inx } = this.state;
    const { children } = this.props;

    return (
      <Layout>
        <Container className="all-height all-width ">
        {/** <Drawer  >
        {children}
        
        </Drawer>*/}
          <Grid container>
            <Grid xs={5} sm={3} item>
            <aside
              className=" profile-left all-height bg-white "
              
            >
              {this.state.is_show ? (
                <div
                  className="profile-bottom profile-padding bg-white text-center"
                  onClick={() => {
                    navigate(`/users/profile`);
                  }}
                >
                  <div className="box box-center">
                    <Avatar
                      style={{ width:'5rem', height: '5rem' }}
                      src={
                        this.state.userinfo && this.state.userinfo.headshot
                          ? this.state.userinfo.headshot
                          : ""
                      }
                    ></Avatar>
                  </div>
                  <p className="zero-edges fn-color-2C2C3B fn-r-18 text-overflow">
                    {this.state.userinfo && this.state.userinfo.user_name
                      ? this.state.userinfo.user_name
                      : "暂未留下称呼"}
                  </p>
                  <p className="zero-edges textview-overflow two fn-color-878791 fn-r-12">
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
                  onClick={(evt) => {
                    navigate(`/users/profile`);
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
                  onClick={(evt) => {
                    navigate(`/users/profile/dynamic`);
                    
                  }}
                  className="bg-not"
                  style={{ backgroundImage: "url(" + iconDy + ")" }}
                >
                  动态
                  <RightMenu
                    _inx={inx}
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
                
                  onClick={(evt) => {
                    navigate("/users/profile/workscenter");
                    
                  }}
                  className="bg-not"
                  style={{ backgroundImage: "url(" + iconcrear + ")" }}
                >
                  创作中心
                  {/** { title: "申诉管理", _url: "/users/profile/complaints" }, */}
                  <RightMenu
                    _inx={inx}
                    menus={[
                      { title: "作品管理", _url: "/users/profile/workscenter" },
                     
                    ]}
                    parent={this}
                    open={menuOpen.CreateCenter}
                    info={this.state.nowPage}
                    id={"create-menu"}
                  />
                </li>
              </ul>
            </aside>
            
            </Grid>
            <Grid xs={7} sm={9} item>
            <main
              className=" bg-white"
              
            >
              {children}
            </main>
            </Grid>
          </Grid>
            
        
         
        </Container>
      </Layout>
    );
  }
}
export default Profile;
