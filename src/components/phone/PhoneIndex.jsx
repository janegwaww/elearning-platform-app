import React, { Component } from "react";
import "../../assets/css/tootls.css";
import Head from "./component/Head";
import { HeadNav, ItemNav } from "./component/Nav";
import { navigate } from "@reach/router";
import Helmet from "react-helmet";

export default class PhoneIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_banner: true,
      router_name: "hots",
      font_size: 10,
    };
    this.get_router = this.get_router.bind(this);
  }
  componentDidMount() {
    this.get_router(this.props);
    console.log(window.screen.width);

    this.setState({
      font_size: (10 / 414) * window.screen.width,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.get_router(nextProps);
    this.setState({
      font_size: (10 / 414) * window.screen.width,
    });
  }
  get_router(pop) {
    let _router_arr = pop["*"].split("/");

    if (!_router_arr[0]) {
      _router_arr[0] = "hots";
    }
    this.setState({
      router_name: _router_arr[0],
    });
  }
  render() {
    const { children } = this.props;
    return (
      <section style={{ lineHeight: 1.5, fontSize: this.state.font_size }}>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,maximum-scale=1"
          />
        </Helmet>

        <div style={{ padding: "0 2em 0.8em" }}>
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
              src="https://api.haetek.com:9191/static/background/background.jpg"
              className="all-width"
              style={{ height: "auto" }}
            />
          </div>
        )}
        <div style={{ padding: 20 }}>
          <ItemNav
            nowpage={this.state.router_name}
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
      </section>
    );
  }
}
