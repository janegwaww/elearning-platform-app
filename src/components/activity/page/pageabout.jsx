import React from "react";

import One from "../../../assets/activity/img/about/1.png";
import Two from "../../../assets/activity/img/about/2.png";
import Three from "../../../assets/activity/img/about/3.png";
import ProgressBar from "../../../assets/template/ProgressBar";
import { is_phone } from "../../../assets/js/totls";
import PhoneAbout from "./phoneabout";
import NavTar from "../comments/NavTar";
class PageAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_status: true,
      isPhone: false,
    };
  }
  componentDidMount() {
    this.setState({
      isPhone: is_phone(),
    });
    setTimeout(() => {
      this.setState({
        login_status: false,
      });
    }, 1500);
  }
  render() {
    return (
      <div>
        <ProgressBar loading={this.state.login_status} speed={50} />
        <NavTar inx={2} />
        {this.state.isPhone ? (
          <PhoneAbout />
        ) : (
          <div className="all-width">
            <img src={One} alt="" />
            <img src={Two} alt="" />
            <img src={Three} alt="" />
           
          </div>
        )}
      </div>
    );
  }
}
export default PageAbout;
