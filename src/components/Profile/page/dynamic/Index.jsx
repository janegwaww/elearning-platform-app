import React from "react";
import { ProNavbar } from "../../components/ProfileNav";
import { Avatar, Grid } from "@material-ui/core";
import WorksItem from "../../components/WorksItem";
import Pagination from "@material-ui/lab/Pagination";
import { get_data } from "../../../../assets/js/request";

class Dynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagedata: null, //页面数据
      collection_data: null,
      history_data: null,
      page_num: 0, //记录当前数据的第几页
      page_count: 0, //记录当前页面数据一有几条
      // page_id: props.parent.state.nowPage.childpage_id,
      item_h:0
    };
    this.update_data = this.update_data.bind(this);
    this.wind_size = this.wind_size.bind(this);
  }
  componentDidMount() {
    
    if (this.state.page_id === 0) {
      this.update_data({
        model_name: "collection",
        model_action: "get_collection",
      });
    }
    if (this.state.page_id == 1) {
      this.update_data({
        model_name: "video_history",
        model_action: "get_history",
        extra_data: {},
      });
    }
    window.onresize=(e)=>{
      this.wind_size(e);
    }

  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.state.page_id != nextProps.parent.state.nowPage.childpage_id) {
  //     let _data = {
  //       model_name: "collection",
  //       model_action: "get_collection",
  //     };

  //     if (nextProps.parent.state.nowPage.childpage_id == 1) {
  //       _data = {
  //         model_name: "video_history",
  //         model_action: "get_history",
  //         extra_data: {},
  //       };
  //     }
  //     this.update_data(_data);
  //     this.setState({
  //       page_id: nextProps.parent.state.nowPage.childpage_id,
  //     });
  //     return;
  //   }
  // }
  wind_size(e){
    let _e=e||window.event;
    if(!document.querySelector('.MuiGrid-root.grid .MuiGrid-item')){return}
    let _w = document.querySelector('.MuiGrid-root.grid .MuiGrid-item').clientWidth;
    let _h = _w/16*9;
    this.setState({
      item_h:_h
    })
  }
  componentWillUnmount() {
    window.onresize = null;
   
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps);
  //   console.log(nextState);
  //   return  false
  // }
  update_data(data) {
    // this.props.parent.setState({
    //   login_status:true
    // })
    get_data( data).then((res) => {

      setTimeout(()=>{
        // this.props.parent.setState({
        //   login_status:false
        // })
      },500)

      if (res.err == 0) {
        if (this.state.page_id == 0) {
          this.setState({
            collection_data: res.result_data,
          });
        }
        if (this.state.page_id == 1) {
          this.setState({
            history_data: res.result_data,
          });
        }
        this.setState({
          pagedata: res.result_data,
        });
        this.wind_size();
      }
     
    });
  }
  render() {
    return (
      <section className="bg-white profile-padding all-height view-scroll ">
        <nav>
          <ProNavbar
            list={['我的收藏']}
            parent={this}
          />
        </nav>
        <main>
          {/**收藏 */}
          {this.state.page_id == 0 ? (
            <Grid container spacing={4} className="grid">
              {this.state.collection_data &&
              this.state.collection_data.length > 0
                ? this.state.collection_data.map((v, inx) => (
                    <Grid item xs={3} key={JSON.stringify(v)}>
                      <WorksItem
                        parent={this}
                        info={v}
                        history={1}
                        inx={this.state.page_id}
                        _h={this.state.item_h}
                      />
                    </Grid>
                  ))
                : ""}
            </Grid>
          ) : (
            ""
          )}
          {/**历史记录 */}
          {this.state.page_id == 1 ? (
            <Grid container spacing={4} className="grid">
              {this.state.history_data && this.state.history_data.length > 0
                ? this.state.history_data.map((v, inx) => (
                    <Grid item xs={3} key={JSON.stringify(v)}>
                      <WorksItem
                        parent={this}
                        info={v}
                        history={2}
                        inx={this.state.page_id}
                      />
                    </Grid>
                  ))
                : ""}
            </Grid>
          ) : (
            ""
          )}
          {(this.state.page_id == 0 &&
            (this.state.collection_data&&
              this.state.collection_data.length <= 0)) ||
            (this.state.page_id == 1 &&
              (this.state.history_data &&
                this.state.history_data.length <= 0) && (
                <div className='profile-top'>亲你还没有数据呢，赶快添加吧！</div>
              ))}
        </main>
        {/**翻页 */}
        {this.state.pagedata && this.state.pagedata.length > 10 ? (
          <footer className="box box-end profile-top">
            <Pagination shape="rounded" count={20} />
          </footer>
        ) : (
          ""
        )}
      </section>
    );
  }
}
export default Dynamic;
