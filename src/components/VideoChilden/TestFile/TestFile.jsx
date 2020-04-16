import React from "react";
import "./TestFile.css";
import "../Uploader/Uploader.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Slider,
  Radio,
  Select,
  Checkbox,
  MenuItem,
  Input,
  Grid,
  Typography
} from "@material-ui/core";

import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  TextRotateVertical,
  TextRotationNone
} from "@material-ui/icons";

import { withStyles } from "@material-ui/core/styles";


const NewSlider = withStyles({
  root: {
    width: "180px",
    color: "#BDC3C7"
  },
  track: {
    color: "#04A59B"
  },
  thumb: {
    "background-color": "#04A59B",
    "&:hover": {
      boxShadow: "none"
    },
    "&:active": {
      boxShadow: "none"
    }
  }
})(Slider);

/**
 * 生成ass文件的参数
 * 
 * Name, 样式的名称，区分大小写，不能包含逗号
 * Fontname, 使用的字体名称，区分大小写
 * Fontsize,字体的字号
 *  PrimaryColour,设置字幕正常显示的填充颜色。长整形rgb,16进制字节，顺序 AAAABBGGRR例如，&H00FFFFFF。
 *  SecondaryColour, 它主要是用在卡拉 OK 效果中由 SecondaryColour 变为 PrimaryColour
 * TertiaryColour/OutlineColor, 在 ASS 中名称为 OutlineColor，设置字体边框的颜色。
 * BackColour, 设置字体阴影的颜色。
 * Bold, -1 是粗体，0 不是。它与斜体属性相互独立，即你可以把文本同时设置为粗体和斜体。
 * Italic,-1 是斜体，0 不是。它与粗体属性相互独立，即你可以把文本同时设置为粗体和斜体。
 *  Underline,它定义了文本是否有下划线。-1 有，0 没有。
 *  StrikeOut,它定义了文本是否有中划线（删除线）。-1 有，0 没有。`。
 *  ScaleX,修改字体的宽度（为百分数）。
 *  ScaleY, 修改字体的高度（为百分数）。
 * Spacing,字符之间额外的间隙（为像素）。
 *  Angle, 旋转所基于的原点由 Alignment 定义（为角度）。
 * BorderStyle,边框的样式。1 为边框 + 阴影，3 为不透明背景。可以被 \r 重置。
 *  Outline, 如果 BorderStyle 为 1，它定义了文字边框的像素宽度。常见的值有 0、1、2、3 或 4。
 * Shadow,阴影总是基于边框使用，当边框宽度没有给定时 SSA 会强制把边框设置为 1px。
 *  Alignment, 它设置文本如何在屏幕上根据左右边距对齐和垂直位置。可能的值有 1 = 居左，2 = 居中，3 = 居右。上述的值加 4 出现在屏幕顶部，上述的值加 8 出现在屏幕中间。例如，5 = 屏幕顶部居左。但是在 ASS 中是按数字键盘对应的位置（1-3 为底部，4-6 为中部，7-9 为顶部）。

 * MarginL,它定义了左边距（为像素）。它是到屏幕左边缘的距离。三个屏幕边距（MarginL，MarginR，MarginV）定义了字幕可以出现的区域。
 *  MarginR,它定义了左边距（为像素）。它是到屏幕左边缘的距离。三个屏幕边距（MarginL，MarginR，MarginV）定义了字幕可以出现的区域。
 *  MarginV,它定义了垂直边距（为像素）。对于底部字幕，它是字幕和屏幕底部的距离。对于顶部字幕，它是字幕和屏幕顶部的距离。对于中部字幕，该值被忽略，字幕会垂直居中
 *  AlphaLevel,它定义了文本的透明度。SSA 尚未使用。ASS 中没有该字段
 *  Encoding,在多语种的 Windows 安装中它可以获取多种语言中的字符。通常 0 为英文，134 为简体中文，136 为繁体中文。当文件是 Unicode 编码时，该字段在解析对话时会起作用。
 * 
 * 
 * Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
 * Style: Default,Arial,16,&Hffffff,&Hffffff,&H0,&H0,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,0
 */
const _family = {
  // STHeiti: "华文黑体",
  // STKaiti: "华文楷体",
  // STSong: "华文宋体",
  // STFangsong: "华文仿宋",
  SimHei: "黑体",
  SimSun: "宋体",
  "Microsoft YaHei": "微软雅黑",
  // LiSu: "隶书",
  //YouYuan: "幼圆",
  //FangSong_GB2312: "仿宋_GB2312",
  "Microsoft JhengHei": "微软正黑体"
};
const _number = [
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36
];
const _color = ["FFFFFF", "1B1B1D", "00574A", "002467", "5E4700", "A40000"];
// let _bold = 0,
//   _u = 0,
//   _i = 0,
//   _alignment = 1; //_alignment :1,2,3,下左中右，4，5，6中左中右，7，8，9上左中右

// let _styles =
//   "Default,Arial,16,&Hffffff,&Hffffff,&H0,&H0,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,0";

export default class TestFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _styles: {}
    };
  }
  font_style = function(name, value) {
    let _style = this.state._styles;
    _style[name] = value;
    this.setState({
      _styles: _style
    });
    
    this.props.parent.get_style(_style);
  };
  render() {
    let _this = this;
    const { _styles } = this.state;
    
    return (
      <div className="testedit">
        <div className="nav-tabs">
          <p>文字</p>
        </div>
        <section>
          <form>
            <div className="font-family">
              <label> 字体:</label>
              <select name="family" onChange={(el)=>this.font_style('family',el.target.value)}>
                <option></option>
                {Object.keys(_family).map(item => (
                  <option value={item} key={item}>
                    {_family[item]}
                  </option>
                ))}
              </select>

              <select name="size" onChange={(el)=>this.font_style('size',el.target.value)}>
                <option></option>
                {_number.map(num => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="font-color">
              <label>字体颜色:</label>
              {_color.map((item, inx) => (
                <span
                  onClick={_this.font_style.bind(_this,'color',item)}
                  className={_styles.color == item ? "active" : ""}
                  key={item}
                 
                  style={{ backgroundColor: "#" + item }}
                ></span>
              ))}
            </div>
            <div className="font-style">
              <label>字体样式:</label>
              <FormatBold
                onClick={this.font_style.bind(
                  this,
                  "bold",
                  _styles.bold === 0 ? -1 : 0
                )}
                className={_styles.bold == -1 ? "active" : ""}
              />
              <FormatUnderlined
                onClick={this.font_style.bind(
                  this,
                  "_u",
                  _styles._u === 0 ? -1 : 0
                )}
                className={_styles._u == -1 ? "active" : ""}
              />
              <FormatItalic
                onClick={this.font_style.bind(
                  this,
                  "_i",
                  _styles._i === 0 ? -1 : 0
                )}
                className={_styles._i == -1 ? "active" : ""}
              />
              <FormatAlignRight
                onClick={this.font_style.bind(
                  this,
                  "align",
                  _styles.align === 1 ? 0 : 1
                )}
                className={_styles.align == 1 ? "active" : ""} 
              />
              <FormatAlignCenter
                onClick={this.font_style.bind(
                  this,
                  "align",
                  _styles.align === 2 ? 0 : 2
                )}
                className={_styles.align == 2 ? "active" : ""}
              />
              <FormatAlignLeft
                onClick={this.font_style.bind(
                  this,
                  "align",
                  _styles.align === 3 ? 0 : 3
                )}
                className={_styles.align == 3 ? "active" : ""}
              />
              <FormatAlignJustify
                onClick={this.font_style.bind(
                  this,
                  "align",
                  _styles.align === 4 ? 0 : 4
                )}
                className={_styles.align == 4 ? "active" : ""}
              />
            </div>
            <div className="font-direction">
              <label>文字方向:</label>
              <span
                onClick={this.font_style.bind(
                  this,
                  "vertical",
                  _styles.vertical == 1 ? 0 : 1
                )}
                className={_styles.vertical == 1 ? "active" : ""}
              >
                <TextRotationNone />
                <span>垂直左排列</span>
              </span>
              <span
                onClick={this.font_style.bind(
                  this,
                  "vertical",
                  _styles.vertical == 2 ? 0 : 2
                )}
                className={_styles.vertical == 2 ? "active" : ""}
              >
                <TextRotateVertical />
                <span>垂直右排列</span>
              </span>
            </div>
            <div>
              <label>字间距:</label>

              <NewSlider
                min={0}
                max={50}
                value={_styles.spacing||0}
                
                onChange={(e,value) =>this.font_style('spacing',value) }
                aria-labelledby="input-slider"
                data-type="spacing"
              />
              <span className="slider-value">{_styles.spacing}</span>
            </div>
            <div>
              <label>行距:</label>
              <NewSlider
                min={0}
                max={50}
                value={_styles.line||0}
                onChange={(e,value) =>this.font_style('line',value)}
                aria-labelledby="input-slider"
                data-type="line"
              />
              <span className="slider-value">{_styles.line}</span>
            </div>
          </form>
        </section>
      </div>
    );
  }
}
