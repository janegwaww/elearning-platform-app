import React from "react";
import SubSwitchOutside from "./SubSwitchOutside";

const withSubtitle = (WrapComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { ...this.props };
      this.wrapComponentRef = React.createRef(null);
    }

    componentDidUpdate(prevProps) {
      const { info } = this.props;
      if (prevProps.info.videoId !== info.videoId) {
        this.setState({ ...this.props });
      }
    }

    continuePlayTime = () => {
      if (!this.wrapComponentRef.current) return;
      const { seekToCurrentTime } = this.wrapComponentRef.current;
      return seekToCurrentTime();
    };

    continuePlayPause = (time) => {
      if (!this.wrapComponentRef.current) return;
      this.wrapComponentRef.current.seekToCurrentTime(time);
      this.wrapComponentRef.current.getPlay();
    };

    handleChange = (e) => {
      const { info } = this.state;
      const time = this.continuePlayTime();
      if (!info) return;
      if (e) {
        this.setState(
          { info: Object.assign(info, { path: info.mergePath }) },
          () => this.continuePlayPause(time),
        );
      } else {
        this.setState(
          { info: Object.assign(info, { path: info.videoPath }) },
          () => this.continuePlayPause(time),
        );
      }
    };

    render() {
      const {
        info: { mergePath, isLoged },
      } = this.state;

      return (
        <>
          <WrapComponent
            {...this.state}
            {...this.props}
            ref={this.wrapComponentRef}
          />
          <SubSwitchOutside
            handleChange={this.handleChange}
            disabled={!mergePath ? "noSubtitle" : isLoged ? false : true}
          />
        </>
      );
    }
  };
};

export default withSubtitle;
