import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import WorksItem from "./components/WorksItem";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  MoreHorizOutlined,
  Details,
  FavoriteBorder,
  AddCircle,
  MenuOutlined,
} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Management from "./components/Management";
import { get_data, get_alldata } from "../../../assets/js/request";
import { get_date } from "../../../assets/js/totls";
import CustomModal from "../../../assets/js/CustomModal";
import EditDialog from "./components/EditDialog";
import { withStyles } from "@material-ui/core/styles";
import fenxiang from "../../../assets/img/fenxiang.png";
import sore from "../../../assets/img/sore.png";
import bianmiao from "../../../assets/img/bianmiao.png";
import { ShareDialog, SericesMenu } from "./components/shareDialog";
import SearchLoading from "../../Loading/SearchLoading";
const NewMenu = withStyles((theme) => ({
  root: {
    border: "1px solid red",
    "& .MuiPaper-root": {
      borderRadius: "12px",
    },
    "& .MuiList-root.MuiMenu-list": {
      display: "flex",
      flexWrap: "wrap",
      width: 320,
      height: 216,
      padding: 30,
      boxShadow: "0px 2px 10px 2px rgba(0,0,0,0.1)",

      "& .MuiMenuItem-root": {
        width: "33.33%",
        fontSize: 14,
        flexDirection: "column",
      },
      "& img": {
        width: 14,
        height: 14,
      },
    },
  },
}))(Menu);

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
      series_id: "", //系列id
      newimgurl: "", //新的imgurl
      newTitle: "", //新的系列名
      newdescription: "", //新的系列描述
      item_h: 0,
      is_share: false, //分享
      login_status: false,
    };
    this.update_data = this.update_data.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClik = this.handleClik.bind(this);
    this.get_series_datial = this.get_series_datial.bind(this);
    this.wind_size = this.wind_size.bind(this);
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
      }
    });
  }
  componentDidMount() {
    if (this.props.parent.state.nowPage.childpage_id == 3) {
      this.get_series_datial(this.props.parent.state.nowPage.series_id);
    }
    this.update_data(this.state.item_type);

    window.onresize = (e) => {
      this.wind_size(e);
    };

    // if(this.)
  }
  get_series_datial(_id) {
    get_data({
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
          series_id: _id,
        });
        this.wind_size();
      } else {
        new CustomModal().alert("获取详情失败", "error", 3000);
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
        <SearchLoading loading={this.state.login_status} />
        {this.state.page_id === 0 && (
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
                    this.setState({ item_type: _type });
                    this.update_data(_type);
                  }}
                />
              </div>
              {this.state.item_type == "video" && (
                <div>
                  {this.state.video_data &&
                    this.state.video_data.length > 0 &&
                    this.state.video_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                      />
                    ))}
                    {this.state.video_data &&
                      this.state.video_data.length <= 0 &&(
                        <div className='profile-top'>亲，暂时你还没有作品哦，现在去添加么？</div>
                      )}
                </div>
              )}

              {this.state.item_type == "series" && (
                <div>
                  {this.state.series_data &&
                    this.state.series_data.length > 0 &&
                    this.state.series_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                        onEvent={(_id) => {
                          this.get_series_datial(_id);
                        }}
                      />
                    ))}

                    {this.state.series_data &&
                      this.state.series_data.length <= 0 &&(
                        <div className='profile-top'>亲，暂时你还没有作品哦，现在去添加么？</div>
                      )}
                </div>
              )}

              {this.state.item_type == "draft" && (
                <div>
                  {this.state.draft_data &&
                    this.state.draft_data.length > 0 &&
                    this.state.draft_data.map((option, inx) => (
                      <SeriesItem
                        parent={this}
                        info={option}
                        inx={inx}
                        key={inx}
                        series={this.state.item_type}
                      />
                    ))}
                    {this.state.draft_data &&
                      this.state.draft_data.length <= 0 &&(
                        <div className='profile-top'>亲，暂时你还没有作品哦，现在去添加么？</div>
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
              <ProNavbar
                list={["普通", "系列", "草稿箱"]}
                parent={this}
                _type="two"
                onEvent={(num) => {
                  console.log(num);
                  let _type = "video";
                  if (num == 2) {
                    _type = "series";
                  }
                  if (num == 3) {
                    _type = "draft";
                  }
                
                  this.setState({ item_type: _type, page_id: 0 });

                  this.update_data(_type);
                }}
              />
            </div>
            <div className="profile-top  all-width">
              <div className="  fn-size-12 all-width ">
                <SeriesItem
                  parent={this}
                  info={this.state.series_details}
                  series="series_detail"
                />
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
                        _h={this.state.item_h}
                        _id={this.state.series_details.series_id}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            <ShareDialog
              isShare={this.state.is_share}
              parent={this}
              info={this.state.series_details}
              onEvent={() => {
                this.setState({
                  is_share: false,
                });
              }}
            />
          </section>
        )}
      </div>
    );
  }
}
export default CreateCenter;
