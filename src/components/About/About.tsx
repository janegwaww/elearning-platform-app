import React, { Component } from "react";
import "./About.scss";

class About extends Component {
  handleClick = (values: string): void => {
    return alert(values);
  };
  render() {
    return (
      <div className="about">
        <h1 onClick={(e): void => this.handleClick("about")}>
          Edit About component or pages/about.jsx to include your information.
        </h1>
      </div>
    );
  }
}

export default About;
