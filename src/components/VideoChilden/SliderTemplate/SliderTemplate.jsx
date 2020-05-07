import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import "./SliderTemplate.css";
import dateConversion from '../../../assets/js/dateConversion';

const TemplateSlider = withStyles({
  mark: {
    backgroundColor: "#bfbfbf",
    height:5,
    width: 1,
    transform: "translateY(-6px)"
  },
  thumb: {
    width: "9px",
    height: "9px",
    "&:after": {
      width: "1px",
      left: "4px",
      right: 0,
      bottom: 0,
      top: "5px",
      position: "absolute",
      height: "800px",
      backgroundColor: "red",
      zIndex: 100
    },
    
    "&:hover": {
      boxShadow: "none"
    }
  },
  root: {
    color: "#fff",
    padding: "25px 0 0 0",
   
  },
  rail:{
    'background-color':'transparent'
  },
  marked: {
    margin: 0
  },
  markLabel: {
    top: "-5px",
    color: "#CCCCD1",
    'margin-left':"30px"
  },
  track :{
  'background-color':'transparent'
},
  active: {
    boxShadow: "none"
  }
})(Slider);

class SliderTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      leng: props.length
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      leng: nextProps.length
    });
    return true;
  }
  
  handleChange(e, newValue) {
    //移动滑块读取滑块值 ，并将值传递给video页面
    this.setState({
      value: newValue
    });
    // 传值
    this.props.parent.getChildrenMsg(this, newValue);
  }
  render() {
    let _this = this;
    const marks = function(value) {
      let marks = [];
      if (value > 0) {
        for (let i = 0; i <= value; i += 10) {
          if (i % 60 === 0) {
            marks.push({ value: i, label:dateConversion( i) });
            
          } else {
            marks.push({ value: i });
            
          }
        }
      }else{
        for (let i = 0; i <= 1000; i += 10) {

            marks.push({ value: i });
          
        }
      }
     
      return marks;
    };
    return (
      <TemplateSlider
        min={0}
        max={this.state.leng||1000}
        value={this.state.value}
        step={0.01}
        marks={marks(this.state.leng||1200)}
        aria-labelledby="continuous-slider"
        onChange={this.handleChange}
      />
    );
  }
}

export default SliderTemplate;
