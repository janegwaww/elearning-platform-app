import React from "react";
import { ProNavbar, Navbar ,Nav} from "../../components/ProfileNav";
import SeriesItem from "../../components/SeriesItem";
import { get_data, get_alldata } from "../../../../assets/js/request";
import SearchLoading from "../../../Loading/SearchLoading";
import { navigate } from "@reach/router";
export default class WorksCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
      item_inx:0
    };
    // this.update_data = this.update_data.bind(this);
  }
  // update_data(_type) {
  //   this.setState({
  //     login_status: true,
  //   });
  //   let _data = {
  //     //
  //     model_name: "video",
  //     model_action: "get_video",
  //     extra_data: {
  //       type: _type, //"series"
  //     },
  //   };
  //   get_data(_data).then((res) => {
  //     setTimeout(() => {
  //       this.setState({
  //         login_status: false,
  //       });
  //     }, 500);

  //     if (res.err == 0) {
  //       if (_data.extra_data.type == "video") {
  //         this.setState({
  //           video_data: res.result_data,
  //         });
  //       } else if (_data.extra_data.type == "series") {
  //         this.setState({
  //           series_data: res.result_data,
  //         });
  //       } else {
  //         this.setState({
  //           draft_data: res.result_data,
  //         });
  //       }
  //       this.setState({
  //         data_counts: res.count,
  //         page_data: res.result_data.slice(
  //           this.state.page_num * this.state.page_counts,
  //           (this.state.page_num + 1) * this.state.page_counts
  //         ),
  //       });
  //     }
  //   });
  // }
  componentDidMount() {
      let _router = this.props['*']
      console.log(_router)
      if(_router == 'series'||_router=='seriesdetail'){
        this.setState({
          item_inx:1
        })
      }else if(_router=='draft'){
        this.setState({
          item_inx:2
        })
      }else{
        this.setState({
          item_inx:0
        })
      }
    // if (this.props.parent.state.nowPage.childpage_id == 3) {
    // this.get_series_datial(this.props.parent.state.nowPage.series_id);
    // }
    // this.update_data(this.state.item_type);
    // window.onresize = (e) => {
    // this.wind_size(e);
    // };
    // if(this.)
  }
  componentWillReceiveProps (nextProps){
    let _router = nextProps['*'];
    console.log(_router)
    if(_router == 'series'||_router=='seriesdetail'){
      this.setState({
        item_inx:1
      })
    }else if(_router=='draft'){
      this.setState({
        item_inx:2
      })
    }else{
      this.setState({
        item_inx:0
      })
    }
  }
  render() {
    const {children,...other} = this.props;
    return (
      <section className="bg-white profile-padding all-height ">
        <main>
          <div>
            <Nav
              list={["普通", "系列", "草稿箱"]}
              parent={this}
              _inx={this.state.item_inx}
              
              onEvent={(num) => {
                console.log(num)
                if(num==1){
                  navigate(`/users/profile/workscenter`);
                }else if(num==2){
                  navigate(`/users/profile/workscenter/series`)
                }else{
                  navigate(`/users/profile/workscenter/draft`)
                }
                this.setState({
                  item_inx:num-1
                })
             
              }}
            />
          </div>
          <div className='profile-top'>
          {children}
          </div>
        </main>
      </section>
    );
  }
}
