import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import WorksItem from "./components/WorksItem";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreHorizOutlined, Details, FavoriteBorder } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Management from "./components/Management";
import { get_data, get_alldata } from "../../../assets/js/request";
import { get_date } from "../../../assets/js/totls";
import CustomModal from "../../../assets/js/CustomModal";
class CreateCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: null,
      draft_data: null,
      series_data: null,
      page_id: props.parent.state.nowPage.childpage_id, //==3?2:props.parent.state.nowPage.childpage_id,
      item_type: "video", //普通/2系列
      series_details: null, //系列详情
      evt: null,
    };

    this.update_data = this.update_data.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClik = this.handleClik.bind(this);
    this.get_series_datial = this.get_series_datial.bind(this);
  }
  handleClose(ev) {
    let _id = ev.target.dataset.id;
    this.setState({
      evt: null,
    });
  }
  handleClik(evt) {
    this.setState({
      evt: evt.currentTarget,
    });
  }
  update_data(_type) {
    let _data = {
      //
      model_name: "video",
      model_action: "get_video",
      extra_data: {
        type: _type, //"series"
      },
    };
    get_data("api/v1/gateway", _data).then((res) => {
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
      }
    });
  }
  componentDidMount() {
    if (this.props.parent.state.nowPage.childpage_id == 3) {
      this.get_series_datial(this.props.parent.state.nowPage.series_id);
    }
    this.update_data(this.state.item_type);

    // if(this.)
  }
  get_series_datial(_id) {
    get_data("api/v1/gateway", {
      model_name: "series",
      model_action: "get_series_details",
      extra_data: {
        series_id: _id,
      },
    }).then((res) => {
      if (res.err === 0 && res.errmsg == "OK") {
        this.setState({
          page_id: 2,
          series_details: res.result_data[0],
        });
      } else {
        new CustomModal().alert("获取详情失败", "success", 3000);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.page_id != nextProps.parent.state.nowPage.childpage_id) {
      if (nextProps.parent.state.nowPage.childpage_id === 0) {
        this.update_data(this.state.item_type);
      }
      this.setState({
        page_id: nextProps.parent.state.nowPage.childpage_id,
        item_type: "video",
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.page_id != this.state.page_id) {
      this.update_data(nextState.item_type);
    }
    return true;
  }
  render() {
    return (
      <div className="view-scroll all-height">
        {this.state.page_id === 0 && (
          <section className="bg-white profile-padding all-height ">
            <main>
              <div>
                <ProNavbar
                  list={["普通", "系列", "草稿箱"]}
                  parent={this}
                  onEvent={(num) => {
                    let _type = "video";
                    if (num == 2) {
                      _type = "series";
                    }
                    if (num == 3) {
                      _type = "draft";
                    }
                    this.setState({ item_type: _type });
                    this.update_data(_type);
                  }}
                />
              </div>
              {this.state.item_type == "video" && (
                <div>
                  {this.state.video_data && this.state.video_data.length > 0 ? (
                    this.state.video_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                      />
                    ))
                  ) : (
                    <div>暂时还没有数据哦</div>
                  )}
                </div>
              )}

              {this.state.item_type == "series" && (
                <div>
                  {this.state.series_data && this.state.series_data.length > 0 ? (
                    this.state.series_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                        onEvent={(_id)=>{
                          this.get_series_datial(_id);
                        }}
                      />
                    ))
                  ) : (
                    <div>暂时还没有数据哦</div>
                  )}
                </div>
              )}
       
              {this.state.item_type == "draft" && (
                <div>
                  {this.state.draft_data && this.state.draft_data.length > 0 ? (
                    this.state.draft_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                      />
                    ))
                  ) : (
                    <div>暂时还没有数据哦</div>
                  )}
                </div>
              )}
            </main>
          </section>
        )}
        {this.state.page_id === 1 && (
          <section className="bg-white profile-padding  all-height">
            <div>
              <ProNavbar list={["申诉管理"]} parent={this} />
            </div>
            <div className="profile-top profile-bottom">
              <Navbar
                lists={["全部(5)", "进行中(3)", "已完成(2)"]}
                parent={this}
              />
            </div>
            <Management />
          </section>
        )}
        {this.state.page_id === 2 && (
          <section className="bg-white profile-padding all-width  all-height">
            <div>
              <ProNavbar list={["系列"]} parent={this} />
            </div>
            <div className="profile-top  all-width">
              <div className="box  fn-size-12 all-width box-align-center">
                <div
                  style={{
                    minWidth: 260,
                    width: 260,
                    height: 160,
                    marginRight: 20,
                    position: "relative",
                  }}
                >
                  <img
                    src={this.state.series_details.image_path}
                    className="all-width all-height"
                  />
                  <p className="profile-time fn-color-white fn-size-12">
                    {"共" + this.state.series_details.video_data.length + "集"}
                  </p>
                </div>
                <div
                  style={{
                    width: "calc(100% - 280px)",
                    flexDirection: "column",
                  }}
                  className="box box-between all-height"
                >
                  <div>
                    <div className="fn-color-2C2C3B fn-size-16 zero-edges text-overflow">
                      {this.state.series_details.series_title}
                    </div>
                    <p className="fn-color-878791 all-width ">
                      {"更新于  " +
                        get_date(this.state.series_details.update_time, ".", 9)}
                    </p>
                    <div className="all-width textview-overflow two">
                      {this.state.series_details.description}
                    </div>
                  </div>
                  <div className="fn-color-565663 profile-point all-width">
                    <span>
                      <Details />
                      &nbsp;&nbsp;
                      {this.state.series_details.view_counts || 0}
                    </span>
                    <span>
                      <FavoriteBorder />
                      &nbsp;&nbsp;
                      {this.state.series_details.like_counts || 0}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <IconButton
                    aria-label="more"
                    aria-controls="series-detail-menu"
                    aria-haspopup="true"
                    onClick={this.handleClik}
                  >
                    <MoreHorizOutlined />
                  </IconButton>

                  <Menu
                    open={Boolean(this.state.evt)}
                    anchorEl={this.state.evt}
                    keepMounted
                    id="series-detail-menu"
                  >
                    <MenuItem onClick={this.handleClose}>编辑系列</MenuItem>
                    <MenuItem onClick={this.handleClose}>排序</MenuItem>
                    <MenuItem onClick={this.handleClose}>分享</MenuItem>
                  </Menu>
                </div>
              </div>
              <div>
                <Grid container className="grid">
                  {this.state.series_details.video_data.map((option, inx) => (
                    <Grid item xs={3} key={inx}>
                      <WorksItem
                        parent={this}
                        inx={inx}
                        info={option}
                        history="3"
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
export default CreateCenter;
