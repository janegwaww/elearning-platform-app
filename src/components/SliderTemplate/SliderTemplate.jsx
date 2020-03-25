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
        padding:'25px 0 0 0'
    },
    markLabel:{
        top:'-5px',
        color:'#fff'
    },
    active:{
        boxShadow:'none'
    }
})(Slider);

const marks = [];
for (let i = 0; i <= 1000; i += 10) {
    if(i%100===0){
        marks.push({ value: i,label:i });
    }else{
        marks.push({ value: i });
    }
    
}

const handleChange = function (e) {
    console.log(e);
};

const SliderTemplate=()=> <TemplateSlider min={0} marks={marks} max={1000} defaultValue={60} step={0.01} valueLabelFormat={handleChange} />

export default SliderTemplate;

