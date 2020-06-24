import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import WorksItem from "./components/WorksItem";

import Grid from "@material-ui/core/Grid";
import Management from "./components/Management";
import { get_data, get_alldata } from "../../../assets/js/request";

class CreateCenter extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      pagedata: null,
      page_id: props.parent.state.nowPage.childpage_id,
      item_type:'video'//普通/2系列

    };
    this.update_data = this.update_data.bind(this);
  }
  update_data(_type) {
    let _data={//
        model_name: "video",
        model_action: "get_video",
        extra_data: {
          type: _type, //"series"
        },
      };
    get_data("api/v1/gateway", _data).then((res) => {
      console.log(res)
      if (res.err == 0) {
        this.setState({
          pagedata: res.result_data,
        });
      }
    });
  }
  componentDidMount() {
    
    this.update_data(this.state.item_type);
  }

  componentWillReceiveProps(nextProps) {
    
    if (this.state.page_id != nextProps.parent.state.nowPage.childpage_id) {
      if (nextProps.parent.state.nowPage.childpage_id === 0) {
        this.update_data(this.state.item_type)
    }
    this.setState({
      page_id: nextProps.parent.state.nowPage.childpage_id,
    });
  }
   
  }
  render() {
    return (
      <div className="view-scroll all-height">
      {this.state.page_id===0?(
        <section className="bg-white profile-padding all-height ">
          <main>
            <div>
              <ProNavbar
                list={["普通", "系列",'草稿箱']}
                parent={this}
                onEvent={(num) => {
                  let _type= "video"; 
                  if(num==2){
                    _type='series';
                  }
                  if(num==3){
                    _type='draft';
                  }
                this.setState({item_type:_type})
                this.update_data(_type);
                }}
              />
            </div>
             {/*{this.state.item_id==1?( <div>**/}
              {
                this.state.pagedata&&this.state.pagedata.length>0?(
                  this.state.pagedata.map((option,inx)=>(<SeriesItem parent={this} info={option} inx={inx} key={inx} series={this.state.item_type} />))
                 
                    ):(<div>暂时还没有数据哦</div>)}
              
           {/* </div>):(
              <Grid container spacing={4} className="gid">
              {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                <Grid item xs={3} key={JSON.stringify(v)}>
                  <WorksItem />
                </Grid>
              ))}
            </Grid>
            )}
           
            <div className="line profile-top"></div>
*/}
            
          </main>
        </section>
        ):(
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
      </div>
    );
  }
}
export default CreateCenter;
