import React from "react";
import { get_data } from "../../../../assets/js/request";
import SeriesItem from "../../components/SeriesItem";
import WorksItem from "../../components/WorksItem";
import SearchLoading from "../../../Loading/SearchLoading";
import ProgressBar from '../../../Loading/ProgressBar';
import CustomModal from "../../../../assets/js/CustomModal";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
export default class SeriesDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page_type: "series_detail",
      serise_data: null,
      serise_id: "",
      total_counts: 0,
      total_data: null,
      show_data: null,
      show_counts: 8,
      show_page: 0,
      item_h:0,
      login_status: false,
    };

    this.update_data = this.update_data.bind(this);
    this.wind_size= this.wind_size.bind(this)
  }
  componentDidMount() {
    
    let _id = this.props.location.search.split("=")[1];
    this.update_data(_id);
    window.onresize = (e) => {
        this.wind_size(e);
      };
 
  }
  update_data(_id) {
    this.setState({
      login_status: true,
    });
    get_data({
      model_name: "series",
      model_action: "get_series_details",
      extra_data: {
        series_id: _id||this.state.serise_id,
      },
    })
      .then((res) => {
        if (res.err == 0 && res.result_data.length > 0) {
          let _data = res.result_data[0];
        
          setTimeout(() => {
            this.setState({
              serise_data: _data,
              total_data: _data.video_data,
              total_counts:_data.video_counts,
              serise_id:_id,
              show_data: _data.video_data.slice(
                this.state.show_counts * (this.state.show_page ),
            (this.state.show_page+1) * this.state.show_counts
              ),
              login_status: false,
            });
            this.wind_size();
          }, 300);
        }
            else {
                new CustomModal().alert("获取详情数据失败", "error", 3000);
                this.setState({
                    login_status:false
                })
              }
        
      })
      .catch((err) => {
          
        this.setState({
          login_status: false,
        });
        new CustomModal().alert("获取详情数据失败，网络出错", "error", 3000);
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

      this.setState = (state, callback) => {
        return;
      };
      
    
  }
  render() {
    const {
      serise_data,
      serise_id,
      total_counts,
      total_data,
      show_data,
      show_counts,
      show_page,
      login_status,
      item_h,
      ...other
    } = this.state;
    
    return (
      <div>
      <ProgressBar loading={login_status} />
        <div className="  fn-size-12 all-width ">
          {serise_data && (
            <SeriesItem
              parent={this}
              info={serise_data}
              series="series_detail"
              _id ={serise_id}
            />
          )}
        </div>
        <div>
          <Grid container className="grid">
            {show_data &&
              show_data.map((option, inx) => (
                <Grid item xs={3} key={option.video_id}>
                  <WorksItem
                    parent={this}
                    inx={inx}
                    info={option}
                    history="3"
                    _h={item_h}
                    _id={serise_id}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
        <div className='profile-top'>
            {total_counts>show_counts&&(
          <Pagination
            count={Math.ceil(total_counts / show_counts)}
            variant="outlined"
            shape="rounded"
            onChange={(ev, v) => {
              this.setState({
                // page_data: [],
                login_status: true,
              });
              // document.body.scrollTop = document.documentElement.scrollTop = 0;
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
          )}
        </div>
        {/**<div>
          <SearchLoading loading={login_status} />
        </div>*/}
      </div>
    );
  }
}
