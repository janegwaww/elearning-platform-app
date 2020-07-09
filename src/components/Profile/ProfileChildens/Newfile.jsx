import React from "react";

export default class Newfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      console.log(this.props)
    return <div>新的页面</div>;
  }
}


