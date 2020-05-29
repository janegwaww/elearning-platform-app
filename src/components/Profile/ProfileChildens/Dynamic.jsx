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
  componentWillMount() {
    this.update_data({
      model_name: "subscription",
      model_action: "get_subscription",
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.page_id != nextProps.parent.state.nowPage.childpage_id) {
      let _data = {
        model_name: "subscription",
        model_action: "get_subscription",
      };
      if (nextProps.parent.state.nowPage.childpage_id == 1) {
        _data = {
          model_name: "collection",
          model_action: "get_collection",
        };
      }
      if (nextProps.parent.state.nowPage.childpage_id == 2) {
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
    get_data("/api/v1/gateway", data).then((res) => {
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
      <section className="bg-white profile-padding all-height view-scroll">
        <nav className="profile-bottom">
          <ProNavbar
            list={[this.props.parent.state.nowPage.childPage]}
            parent={this}
          />
        </nav>
        <main>
          {this.state.page_id == 0 ? (
            <div>
              {this.state.pagedata && this.state.pagedata.length > 0
                ? this.state.pagedata.map((option, inx) => (
                    <div>
                      <div className="all-width box box-align-start">
                        <Avatar
                          style={{ width: 88, height: 88 }}
                          className="profile-right"
                        />
                        <div>
                          <p className="fn-size-16 fn-color-2C2C3B">
                            Eddie Lobanovskiy
                          </p>
                          <p className="fn-size-12 fn-color-878791">
                            212 个视频●12,103 订阅
                          </p>
                          <p className="fn-size-14 fn-color-565663">
                            资深视觉设计/UI设计，淘宝天下网商特约访谈嘉宾，与小米、阿里、资深视觉设计/UI设计，淘宝天下网商特约访谈嘉宾，与小米、阿里、滴滴的资深设计共同创建EDC设计研究中心，致力于帮助在职UI设计师提高专业技能。
                          </p>
                          <div className="box">
                            <p className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
                              资深用户体验设计师
                            </p>
                          </div>
                        </div>
                        <span
                          className="fn-color-878791 fn-size-14"
                          style={{
                            position: "absolute",
                            right: 0,
                            display: "inline-block",
                            padding: "2px 5px",
                            borderRadius: 4,
                            backgroundColor: "#E7E9EE",
                          }}
                        >
                          取消
                        </span>
                      </div>
                      <Grid container spacing={4} className="grid">
                        {this.state.pagedata && this.state.pagedata.length > 0
                          ? this.state.pagedata.map((v,inx) => (
                              <Grid item xs={3} key={JSON.stringify(v)}>
                                {/** 
                <WorksItem />*/}
                              </Grid>
                            ))
                          : ""}
                      </Grid>
                    </div>
                  ))
                : ""}
            </div>
          ) : (
            ""
          )}
          {this.state.page_id == 1 ? (
            <div>
              {/*<div className="all-width box box-align-start">
                <Avatar
                  style={{ width: 88, height: 88 }}
                  className="profile-right"
                />
                <div>
                  <p className="fn-size-16 fn-color-2C2C3B">
                    Eddie Lobanovskiy
                  </p>
                  <p className="fn-size-12 fn-color-878791">
                    212 个视频●12,103 订阅
                  </p>
                  <p className="fn-size-14 fn-color-565663">
                    资深视觉设计/UI设计，淘宝天下网商特约访谈嘉宾，与小米、阿里、资深视觉设计/UI设计，淘宝天下网商特约访谈嘉宾，与小米、阿里、滴滴的资深设计共同创建EDC设计研究中心，致力于帮助在职UI设计师提高专业技能。
                  </p>
                  <div className="box">
                    <p className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
                      资深用户体验设计师
                    </p>
                  </div>
                </div>
                <span
                  className="fn-color-878791 fn-size-14"
                  style={{
                    position: "absolute",
                    right: 0,
                    display: "inline-block",
                    padding: "2px 5px",
                    borderRadius: 4,
                    backgroundColor: "#E7E9EE",
                  }}
                >
                  取消
                </span>
              </div>*/}
              <Grid container spacing={4} className="grid">
                {this.state.pagedata && this.state.pagedata.length > 0
                  ? this.state.pagedata.map((v,inx) => (
                      <Grid item xs={3} key={JSON.stringify(v)}>
                        <WorksItem parent={this} info={v} />
                      </Grid>
                    ))
                  : ""}
              </Grid>
            </div>
          ) : (
            <div></div>
          )}
          {this.state.page_id == 2 ? (
            <Grid container spacing={4} className="grid">
              {this.state.pagedata && this.state.pagedata.length > 0
                ? this.state.pagedata.map((v,inx) => (
                    <Grid item xs={3} key={JSON.stringify(v)}>
                      <WorksItem />
                    </Grid>
                  ))
                : ""}
            </Grid>
          ) : (
            <div></div>
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
