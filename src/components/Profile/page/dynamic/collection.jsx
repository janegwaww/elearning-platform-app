import React from "react";
import { get_data } from "../../../../assets/js/request";
import WorksItem from "../../components/WorksItem";
import SearchLoading from "../../../Loading/SearchLoading";
import { ProNavbar } from "../../components/ProfileNav";
import Pagination from "@material-ui/lab/Pagination";
import {  Grid } from "@material-ui/core";
export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page_type: "collection",
      total_counts: 0,
      total_data: null,
      show_data: null,
      show_counts: 12,
      show_page: 0,
      login_status: false,
    };
    this.update_data = this.update_data.bind(this);
    this.wind_size = this.wind_size.bind(this);
  }
  componentDidMount() {
    this.update_data();
  }
  update_data(id) {
    this.setState({
      login_status: true,
    });
    get_data({
      model_name: "collection",
      model_action: "get_collection",
    }).then((res) => {
      if (res.err == 0 && res.result_data.length > 0) {
        let _data = res.result_data;
        this.setState({
          total_counts: res.count,
          total_data: _data,
          show_data: _data.slice(
            this.state.show_page * this.state.show_counts,
            (this.state.show_page + 1) * this.state.show_counts
          ),
        });
      } else {
        this.setState({
          total_data: [],
        });
      }
      this.wind_size();
      setTimeout(() => {
        this.setState({
          login_status: false,
        });
      }, 300);
    });
  }
  wind_size(e) {
    let _e = e || window.event;
    if (!document.querySelector(".MuiGrid-root.grid .MuiGrid-item")) {
      return;
    }
    let _w = document.querySelector(".MuiGrid-root.grid .MuiGrid-item")
      .clientWidth;
    let _h = (_w / 16) * 9;
    this.setState({
      item_h: _h,
    });
  }
  componentWillUnmount() {
    window.onresize = null;
  }
  render() {
    const {
      total_counts,
      total_data,
      show_counts,
      show_data,
      show_page,
      login_status,
      ...other
    } = this.state;

    return (
      <div>
        <nav>
          <ProNavbar list={["我的收藏"]} parent={this} />
        </nav>
        {total_data && (
          <Grid container spacing={4} className="grid">
            {show_data ? (
              show_data.map((option) => (
                <Grid item xs={3} key={option.video_id || option.series_id}>
                  <WorksItem
                    parent={this}
                    info={option}
                    history={1}
                    _h={this.state.item_h}
                  />
                </Grid>
              ))
            ) : (
              <div className="profile-top">暂无数据</div>
            )}
          </Grid>
        )}

      
        {total_counts > show_counts && (
          <div className="profile-top">
            <Pagination
              count={Math.ceil(total_counts / show_counts)}
              variant="outlined"
              shape="rounded"
              onChange={(ev, v) => {
                this.setState({
                  // page_data: [],
                  login_status: true,
                });
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                setTimeout(() => {
                  this.setState({
                    show_page:v-1,
                    show_data: total_data.slice(
                      (v - 1) * show_counts,
                      v * show_counts
                    ),
                    login_status: false,
                  });
                }, 300);
              }}
            />
          </div>
        )}
        <div>
          <SearchLoading loading={login_status} />
        </div>
      </div>
    );
  }
}
