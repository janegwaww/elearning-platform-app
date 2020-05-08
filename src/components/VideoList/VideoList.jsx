import React, { Component, Fragment } from "react";
import CommentList from "../Comments/Comments";

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div>系列课程</div>
        <CommentList />
      </Fragment>
    );
  }
}

export default VideoList;
