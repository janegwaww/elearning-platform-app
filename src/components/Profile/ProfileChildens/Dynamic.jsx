import React from "react";
import { ProNavbar } from "./components/ProfileNav";
import { Avatar, Grid } from "@material-ui/core";
import WorksItem from "./components/WorksItem";
import Pagination from "@material-ui/lab/Pagination";
import { get_data } from "../../../assets/js/request";

class Dynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagedata: null, //页面数据
      page_id: props.parent.state.nowPage.childpage_id,

    };
    this.update_data = this.update_data.bind(this);
  }
  componentDidMount() {
   
    this.update_data({
      model_name: "collection",
      model_action: "get_collection",
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (this.state.page_id != nextProps.parent.state.nowPage.childpage_id) {
    
      let _data = {
        model_name: "collection",
        model_action: "get_collection",
      };
      
      if (nextProps.parent.state.nowPage.childpage_id == 1) {
        _data = {
          model_name: "video_history",
          model_action: "get_history",
          extra_data: {},
          model_type: "",
        };
      }
      this.update_data(_data);
      this.setState({
        page_id: nextProps.parent.state.nowPage.childpage_id,
      });
      return;
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps);
  //   console.log(nextState);
  //   return  false
  // }
  update_data(data) {
    get_data("api/v1/gateway", data).then((res) => {
      console.log(res.result_data);
      if (res.err == 0) {
        this.setState({
          pagedata: res.result_data,
        });
      }
    });
  }
  render() {
    return (
      <section className="bg-white profile-padding all-height view-scroll ">
        <nav>
          <ProNavbar
            list={[this.props.parent.state.nowPage.childPage]}
            parent={this}
          />
        </nav>
        <main className="profile-margin">
         
          {this.state.page_id == 0 && (
            <div>
              
              <Grid container spacing={4} className="grid">
                {this.state.pagedata && this.state.pagedata.length > 0
                  ? this.state.pagedata.map((v, inx) => (
                      <Grid item xs={3} key={JSON.stringify(v)}>
                        <WorksItem
                          parent={this}
                          info={v}
                          history={1}
                          inx={this.state.page_id}
                        />
                      </Grid>
                    ))
                  : ""}
              </Grid>
            </div>
         
          )}

          {this.state.page_id == 1 && (
            <Grid container spacing={4} className="grid">
              {this.state.pagedata && this.state.pagedata.length > 0
                ? this.state.pagedata.map((v, inx) => (
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
          
          )}
          {!this.state.pagedata || this.state.pagedata.length <= 0 ? (
            <div>亲你还没有数据呢，赶快添加吧！</div>
          ) : (
            ""
          )}
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
