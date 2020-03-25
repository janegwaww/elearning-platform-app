import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import "./SliderTemplate.css";

const TemplateSlider = withStyles({

    
      
    
     


    mark: {
        backgroundColor: "#bfbfbf",
        height: 5,
        width: 1,
        transform: "translateY(-6px)"
    },
    thumb: {
        width: "9px",
        height: "9px"
    },
    root: {
        color: "#fff",
        padding: '25px 0 0 0',
        width:'98%',
        margin:'0 auto'
    },
    marked :{
        margin:0,
    },
    markLabel: {
        top: '-5px',
        color: '#fff'
    },
    track: {
        // height: 2,
      },
    active: {
        boxShadow: 'none'
    }
})(Slider);

const marks = [];
for (let i = 0; i <= 1000; i += 10) {
    if (i % 100 === 0) {
        marks.push({ value: i, label: i });
    } else {
        marks.push({ value: i });
    }

}

class SliderTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value : props.value
        }
        
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps){
        
        this.setState({
            value:nextProps.value
        });
        return true;
        
    }
    // shouldComponentUpdate(nextProps, nextState){
    //     // console.log(nextProps,nextState);
    //     return true;
    // }
    
    handleChange(e,newValue) {
        //移动滑块读取滑块值 ，并将值传递给video页面
        this.setState({
            value:newValue
        });
        // 传值
        this.props.parent.getChildrenMsg(this,newValue)
       
    }
    render() {
        return (
     
            <TemplateSlider  min={0} max={1000} value={this.state.value} marks={marks} aria-labelledby="continuous-slider"  onChange={this.handleChange} />
                // <TemplateSlider  
                //     min={0} 
                //     max={1000} 
                //     value={this.state.value} 
                //      marks={marks}
                //     aria-labelledby="non-linear-slider"
                //     getAriaLabel={this.handleChange} 
                // />
           
        )
    }
}

export default SliderTemplate;

