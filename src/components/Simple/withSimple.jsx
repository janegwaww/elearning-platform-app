import React from "react";
import helmetInfo from "./helmetInfo.json";

const withSimple = (WrapComponent, index) => {
  return class extends React.Component {
    render() {
      const info = helmetInfo[index];

      return <WrapComponent info={info} />;
    }
  };
};

export default withSimple;
