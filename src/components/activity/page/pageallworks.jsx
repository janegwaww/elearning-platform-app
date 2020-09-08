import React from "react";
import { Grid } from "@material-ui/core";
import Footer from "../comments/Footer";
import Bgimg from "../../../assets/activity/img/bg.png";

import lefttop from "../../../assets/activity/img/all/lefttop.png";
import leftbottom from "../../../assets/activity/img/all/leftbottom.png";
import righttop from "../../../assets/activity/img/all/righttop.png";
import rightbottom from "../../../assets/activity/img/all/rightbottom.png";
import TextField from "@material-ui/core/TextField";
import WordsCar from "../comments/WorksCar";
import Pagination from "@material-ui/lab/Pagination";
import { get_data } from "../../../assets/js/request";
import { is_phone } from "../../../assets/js/totls";
import ProgressBar from "../../../assets/template/ProgressBar";
class PageAllWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contest_w: 0,
      total_data: null,
      show_data: null,
      total_counts: 0,
      page_num: 0,
      show_count: 10,
      login_status: false,
    };
    this.winsize = this.winsize.bind(this);
    this.up_data = this.up_data.bind(this);
  }
  componentDidMount() {
    this.winsize();
    window.onresize=()=>{
      this.winsize();
    }
    this.up_data();
  }
  componentWillUnmount() {
    window.onresize = null;
  }
  up_data() {
    this.setState({
      login_status: true,
    });
    get_data(
      {
        model_name: "data",
        model_action: "get_works",
        extra_data: {
          max_size: this.state.show_count,
          page: this.state.page_num + 1,
          type: "all", //# 全部
        },
        model_type: "",
      },
      "video"
    ).then((res) => {
      if (res.result_data.length > 0) {
        this.setState({
          total_data: res.result_data,
          total_counts: res.count,
          show_data: res.result_data.slice(
            this.state.page_num * this.state.show_count,
            (this.state.page_num + 1) * this.state.show_count
          ),
        });
      } else {
        this.setState({
          total_data: [],
          show_data: null,
        });
      }
      setTimeout(() => {
        this.setState({
          login_status: false,
        });
      }, 300);
    });
  }

  winsize() {
    this.setState({
      contest_w: document.getElementById("all-works").clientWidth,
    });
  }
  render() {
    let {
      contest_w,
      total_counts,
      total_data,
      show_data,
      show_count,
      page_num,
    } = this.state;
console.log(contest_w)
    return (
      <div>
        <ProgressBar loading={this.state.login_status} speed={15} />
        <div style={{ height: 2, backgroundColor: "#fcf800" }}></div>
        <div
          className="all-width bg-not"
          id="all-works"
          style={{
            // backgroundImage: `url(${Bgimg})`,

            position: "relative",
            padding: "11% 0",
          }}
        >
          <div
            className="bg-white all-height contestcar"
            style={{
              width: is_phone() ? "90%" : "74%",
              backgroundColor: "#260D4B",
              margin: "0 auto",
              borderRadius: "0.12em",

              position: "relative",
            }}
          >
            <img
              src={lefttop}
              alt=""
              style={{
                position: "absolute",
                top: -contest_w * 0.1,
                left: "-11%",
                width: "41%",
                height: "auto",
                zIndex: 0,
              }}
            />
            <img
              src={righttop}
              alt=""
              style={{
                position: "absolute",
                top: -contest_w * 0.04,
                right: "-3%",
                width: "8.3%",
                height: "auto",
                zIndex: 0,
              }}
            />
            <img
              src={leftbottom}
              alt=""
              style={{
                position: "absolute",
                bottom: -10,
                left: "-3%",
                width: "8.3%",
                height: "auto",
                zIndex: 0,
              }}
            />
            <img
              src={rightbottom}
              alt=""
              style={{
                position: "absolute",
                bottom: is_phone() ? -10 : -20,
                right: "-3%",
                width: "8.3%",
                height: "auto",
                zIndex: 0,
              }}
            />
            <div
              className="bg-white all-wdith all-height"
              style={{
                zIndex: 5,
                transform: "translateX(1px)",
                padding: "5%",
                borderRadius: 12,
                border: is_phone() ? "5px solid #260D4B" : "5px solid #260D4B",
              }}
            >
              <div
                className="contestcar box box-align-end"
                style={{ marginBottom: "calc(0.4em + 12px" }}
              >
                <div
                  style={{
                    fontSize: "0.3em",
                    lineHeight: "1.3333em",
                    marginRight: "1em",
                  }}
                >
                  全部作品
                </div>
                <div
                  style={{
                    lineHeight: "1.3em",
                    fontSize: is_phone() ? "14px" : "0.4em",
                  }}
                >
                  {total_counts}
                </div>
              </div>
              <Grid container spacing={3}>
                {show_data &&
                  show_data.map((op, inx) => (
                    <Grid item xs={6} sm={4} md={3} key={op.file_id}>
                      <WordsCar info={op} />
                    </Grid>
                  ))}
              </Grid>
              {total_counts > show_count && (
                <div className="settings">
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={8}>
                      <Pagination
                        count={10}
                        variant="outlined"
                        shape="rounded"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <div className="box box-align-center root">
                        <span>共21页，跳至</span>
                        <TextField
                          variant="outlined"
                          style={{ width: "3.75rem" }}
                        />
                        <span>页</span>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default PageAllWorks;
