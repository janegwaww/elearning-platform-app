import React from "react";
import "../assets/css/tootls.css";
import "../assets/css/container.css";
import Modal from "../assets/js/modal";
import { get_data } from "../assets/js/request";

import "../assets/css/color.css";
export default class ColorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: [],
      two: [],
      thiree: [],
      htmlArr: [],
    };
  }

  render() {
    return (
      <section
        style={{
          margin: "0 auto",
          marginTop: 50,
          padding: 20,
        }}
        className="box box-align-start"
      >
        <div style={{ marginRight: 20,width:'40%' }}>
          <div className="fn-size-16" style={{ margin: "10px 0" }}>
            <label
              htmlFor="one"
              className="fn-size-20"
              style={{ marginRight: 20 }}
            >
              0.0分对应的颜色::
            </label>
            <input
              type="text"
              name="one"
              id="one"
              placeholder="请输入“127,100,127”样式的色值"
              onChange={(e) => {
                let _data = e.target.value.replace(/[^0-9]/gi, ",");
                let new_data = _data.split(",");

                new_data = new_data.filter((value) => {
                  return value;
                });
                if (new_data.length > 3) {
                  new_data = new_data.splice(0, 3);
                }
                for (let i = 0; i < new_data.length; i++) {
                  if (new_data[i] > 255) {
                    new_data[i] = 255;
                  } else {
                    new_data[i] = parseInt(new_data[i]);
                  }
                }

                this.setState({
                  one: new_data,
                });
              }}
              style={{
                minWidth:200,
                height: 40,
                borderRadius: 8,
                padding: "5px 10px",
              }}
            />
          </div>
          <div className="fn-size-16" style={{ margin: "10px 0" }}>
            <label
              htmlFor="two"
              className="fn-size-20"
              style={{ marginRight: 20 }}
            >
              0.5分对应的颜色::
            </label>
            <input
              type="text"
              name="two"
              id="two"
              placeholder="请输入“127,100,127”样式的色值"
              onChange={(e) => {
                let _data = e.target.value.replace(/[^0-9]/gi, ",");
                let new_data = _data.split(",");

                new_data = new_data.filter((value) => {
                  return value;
                });
                if (new_data.length > 3) {
                  new_data = new_data.splice(0, 3);
                }
                for (let i = 0; i < new_data.length; i++) {
                  if (new_data[i] > 255) {
                    new_data[i] = 255;
                  } else {
                    new_data[i] = parseInt(new_data[i]);
                  }
                }
                this.setState({
                  two: new_data,
                });
              }}
              style={{
                minWidth:200,
                height: 40,
                borderRadius: 8,
                padding: "5px 10px",
              }}
            />
          </div>
          <div className="fn-size-16" style={{ margin: "10px 0" }}>
            <label
              htmlFor="thiree"
              className="fn-size-20"
              style={{ marginRight: 20 }}
            >
              1.0分对应的颜色::
            </label>
            <input
              type="text"
              name="thiree"
              id="thiree"
              placeholder="请输入“127,100,127”样式的色值"
              onChange={(e) => {
                let _data = e.target.value.replace(/[^0-9]/gi, ",");
                let new_data = _data.split(",");

                new_data = new_data.filter((value) => {
                  return value;
                });
                if (new_data.length > 3) {
                  new_data = new_data.splice(0, 3);
                }
                for (let i = 0; i < new_data.length; i++) {
                  if (new_data[i] > 255) {
                    new_data[i] = 255;
                  } else {
                    new_data[i] = parseInt(new_data[i]);
                  }
                }
                this.setState({
                  thiree: new_data,
                });
              }}
              style={{
                minWidth:200,
                height: 40,
                borderRadius: 8,
                padding: "5px 10px",
              }}
            />
          </div>
          <div>
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                if (this.state.one.length != 3) {
                  new Modal().alert("请输入0.0 合法的颜色1", "error");
                  return;
                }
                if (this.state.two.length != 3) {
                  new Modal().alert("请输入0.5分 合法的颜色", "error");
                  return;
                }
                if (this.state.thiree.length != 3) {
                  new Modal().alert("请输入1.0 合法的颜色", "error");
                  return;
                }
                let _data = {
                  model_name: "color",
                  model_action: "change_color",
                  extra_data: {
                    start_RGB: this.state.one,
                    middle_RGB: this.state.two,
                    end_RGB: this.state.thiree,
                  },
                  model_type: "",
                };
                get_data("api/v1/gateway", _data).then((res) => {
                  if (res.err == 0 && res.result_data.length > 0) {
                    let _data = res.result_data;
                    let _htm_str = "";
                    let _arr = [];
                    for (let i = 0; i < _data.length; i++) {
                      _arr.push(
                        <div className="box "  key={i}>
                        <div style={{width:"50%",marginRight:20}}>
                            {i===0?<h3>查询句</h3>:''}
                          <p >
                            {i + 1}&nbsp;&nbsp;{_data[i].query_str}
                          </p>
                          </div>
                          <div style={{width:"50%",paddingLeft: 20 }}>
                            {i===0?<h3>匹配结果</h3>:''}
                            <p >
                              {_data[i].result.map((option, inx) => (
                                <span
                                  key={inx}
                                  style={{
                                    color:
                                      "rgb(" +
                                      option[1][0] +
                                      "," +
                                      option[1][1] +
                                      "," +
                                      option[1][2] +
                                      ")",
                                  }}
                                >
                                  {option[0]}
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    this.setState({
                      htmlArr: _arr,
                    });
                  }
                  else{
                      new Modal().alert('网络错误','error')
                  }
                });

                return false;
              }}
            >
              确定
            </button>
            <button
              onClick={() => {
                this.setState({
                  one: [],
                  two: [],
                  thiree: [],
                  htmlArr: [],
                });
              }}
            >
              清除
            </button>
          </div>
        </div>
        <div id="colorbox" style={{width:'60%'}}>
              
        {this.state.htmlArr} </div>
      </section>
    );
  }
}
