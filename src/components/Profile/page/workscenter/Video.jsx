import React from "react";
import { get_data } from "../../../../assets/js/request";
import SeriesItem from "../../components/SeriesItem";
import  {empty_content} from '../../../../assets/js/totls';
import ProgressBar from "../../../../assets/template/ProgressBar";
import Pagination from "@material-ui/lab/Pagination";
import notvideo from "../../../../assets/img/notvideo.png";
import LoadData from '../../components/LoadData';
import NotData from '../../components/NotData';
export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page_type: "video",
      total_counts: 0,
      total_data: new Array(10),
      show_data: empty_content(10),
      show_counts: 10,
      show_page: 0,
      login_status: false,
    };
    this.update_data = this.update_data.bind(this);
  }
  componentDidMount() {
    this.update_data();
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  update_data(id) {
    this.setState({
      login_status: true,
    });
    get_data({
      //
      model_name: "video",
      model_action: "get_video",
      extra_data: {
        type: "video",
      },
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
          total_data:[],
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
      <div className="all-width">
        <ProgressBar loading={login_status} />
        {total_data ? (
          <div>
            {show_data ? (
              show_data.map((option, inx) => (
                <SeriesItem
                  key={option.video_id||option}
                  parent={this}
                  info={typeof option=='string'||typeof option=='number'?'':option}
                  series="video"
                />
              ))
            ) : (
              <NotData src={notvideo} content='暂无视频' />
            
            )}
          </div>
        ) : (
          <LoadData />
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
                    show_page: v - 1,
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
      </div>
    );
  }
}
