import React, { Component } from "react";
import Head from "./component/Head";
import { HeadNav, ItemNav } from "./component/Nav";
import { navigate } from "@reach/router";
import Helmet from "react-helmet";
import banner from "../../../static/images/lifeofpi.jpeg";
import { get_data } from "../../assets/js/request";
import Notfile from "./component/Notfile";
import LoadData from "../Profile/components/LoadData";
import ProgressBar from "../Loading/ProgressBar";
export default class PhoneIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_banner: true,
      router_name: "hots",
      font_size: 10,
      navArr: null,
      is_show: false,
      is_update: true,
    };
    this.get_router = this.get_router.bind(this);
  }
  componentDidMount() {
    this.get_router(this.props);

    this.setState({
      font_size: (10 / 414) * window.screen.width,
    });
    get_data({
      extra_data: {},
      model_action: "get_category",
      model_name: "category",
      model_type: "",
    })
      .then((res) => {
        if (res.err == 0) {
          this.setState({
            navArr: res.result_data,
            is_show: true,
            is_update: true,
          });
        } else {
          this.setState({
            is_show: false,
            is_update: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          is_show: false,
          is_update: true,
        });
        alert("网络错误");
      });
  }
  componentWillReceiveProps(nextProps) {
    this.get_router(nextProps);
  }
  get_router(pop) {
    let _router_arr = pop["*"].split("/");
    if (!_router_arr[0]) {
      _router_arr[0] = "hots";
      this.setState({
        is_banner: true,
        router_name: _router_arr[0],
      });
    } else {
      this.setState({
        router_name: _router_arr[0],
        is_banner: false,
      });
    }
  }
  render() {
    const { children } = this.props;
    return (
      <section>
        <ProgressBar loading={!this.state.is_show} />
        {!this.state.is_update && <LoadData />}
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,maximum-scale=1"
          />
          <meta http-equiv="Expires" content="0" />
          <meta http-equiv="Cache-Control" content="no-cache" />
          <meta http-equiv="Pragma" content="no-cache" />

          <title>知擎</title>
          <line
            type="text/css"
            rel="stylesheet"
            href="../../assets/css/tootls.css"
          />
        </Helmet>
        {this.state.is_show ? (
          <div style={{ lineHeight: 1.5, fontSize: this.state.font_size }}>
            <div style={{ padding: "0 1.67em 0.8em" }}>
              <header>
                <Head />
              </header>
              <nav>
                <HeadNav />
              </nav>
            </div>
            {this.state.is_banner && (
              <div className="">
                <img
                  alt="banner"
                  src={banner}
                  className="all-width"
                  style={{ height: "auto" }}
                />
              </div>
            )}
            <div style={{ padding: 20 }}>
              <ItemNav
                nowpage={this.state.router_name}
                navArr={this.state.navArr}
                onEvent={(num, tp) => {
                  if (tp == "hots") {
                    this.setState({
                      is_banner: true,
                    });
                    navigate(`/phone`);
                  } else {
                    if (this.state.is_banner) {
                      this.setState({
                        is_banner: false,
                      });
                    }
                    navigate(`/phone/${tp}`);
                  }
                }}
              />
              <div className="line"></div>
              <div>{children}</div>
            </div>
          </div>
        ) : (
          <div>
            <Notfile />
          </div>
        )}
      </section>
    );
  }
}
