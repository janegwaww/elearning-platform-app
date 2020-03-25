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
        width: "8px",
        height: "8px"
    },
    root: {
        color: "#fff"
    }
})(Slider);

const marks = [];
for (let i = 0; i <= 1000; i += 10) {
    marks.push({ value: i });
}

const handleChange = function (e) {
    console.log(e);
};
export default class SliderTemplate extends React.Component {
  
    render() {
        return (
            <TemplateSlider min={0} marks={marks} max={1000} defaultValue={60} step={0.01} valueLabelFormat={handleChange} />
        );
    }
}
