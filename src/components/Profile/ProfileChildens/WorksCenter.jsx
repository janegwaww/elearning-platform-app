import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import { get_data, get_alldata } from "../../../assets/js/request";
import SearchLoading from "../../Loading/SearchLoading";
export default class WorksCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: null,
      draft_data: null,
      series_data: null,
      data_counts: 0,
      page_counts: 10,
      page_num: 0,
      page_data: [],
      series_details: null, //系列详情
      item_type: "video", //普通/2系列
    };
    this.update_data = this.update_data.bind(this);
  }
  update_data(_type) {
    this.setState({
      login_status: true,
    });
    let _data = {
      //
      model_name: "video",
      model_action: "get_video",
      extra_data: {
        type: _type, //"series"
      },
    };
    get_data(_data).then((res) => {
      setTimeout(() => {
        this.setState({
          login_status: false,
        });
      }, 500);

      if (res.err == 0) {
        if (_data.extra_data.type == "video") {
          this.setState({
            video_data: res.result_data,
          });
        } else if (_data.extra_data.type == "series") {
          this.setState({
            series_data: res.result_data,
          });
        } else {
          this.setState({
            draft_data: res.result_data,
          });
        }
        this.setState({
          data_counts: res.count,
          page_data: res.result_data.slice(
            this.state.page_num * this.state.page_counts,
            (this.state.page_num + 1) * this.state.page_counts
          ),
        });
      }
    });
  }
  componentDidMount() {
    // if (this.props.parent.state.nowPage.childpage_id == 3) {
    // this.get_series_datial(this.props.parent.state.nowPage.series_id);
    // }
    // this.update_data(this.state.item_type);
    // window.onresize = (e) => {
    // this.wind_size(e);
    // };
    // if(this.)
  }

  render() {
    return (
      <section className="bg-white profile-padding all-height ">
        <main>
          <div>
            <ProNavbar
              list={["普通", "系列", "草稿箱"]}
              parent={this}
              page_num={
                this.state.item_type == "video"
                  ? 1
                  : this.state.item_type == "series"
                  ? 2
                  : 3
              }
              onEvent={(num) => {
                let _type = "video";
                if (num == 2) {
                  _type = "series";
                }
                if (num == 3) {
                  _type = "draft";
                }
                this.setState({
                  item_type: _type,
                  data_counts: 0,
                  page_data: [],
                  page_num: 0,
                });
                this.update_data(_type);
              }}
            />
          </div>
        </main>
      </section>
    );
  }
}
