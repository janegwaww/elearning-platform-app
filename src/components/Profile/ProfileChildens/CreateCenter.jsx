import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import WorksItem from "./components/WorksItem";

import Grid from "@material-ui/core/Grid";
import Management from "./components/management";
import { get_data, get_alldata } from "../../../assets/js/request";
class CreateCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagedata: null,
      page_id: props.parent.state.nowPage.childpage_id,
      item_id:1//普通/2系列

    };
    this.update_data = this.update_data.bind(this);
  }
  update_data(data) {
  
    let _data={};
    if(!data){
       _data = {//
        model_name: "video",
        model_action: "get_video",
        extra_data: {
          type: "video", //"series"
        },
      };
    }else{
      _data=data;
    };
   
    get_data("/api/v1/gateway", _data).then((res) => {
      
      if (res.err == 0) {
      
        this.setState({
          pagedata: res.result_data,
        });
      }
    });
  }
  componentWillMount() {
    
    this.update_data();
  }

  componentWillReceiveProps(nextProps) {
    
    if (this.state.page_id != nextProps.parent.state.nowPage.childpage_id) {
      if (nextProps.parent.state.nowPage.childpage_id === 0) {
        this.update_data()
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
        <section className="bg-white profile-padding ">
          <main>
            <div>
              <ProNavbar
                list={["普通", "系列",'草稿箱']}
                parent={this}
                onEvent={(num) => {
                  
                  let _data={
                    model_name: "video",
                    model_action: "get_video",
                    extra_data: {
                      type: "video", //"series"
                    },
                  }
                  if(num==2){
                    _data.extra_data.type='series';
                  }
                  if(num==3){
                    _data.extra_data.type='draft'
                  }
                  
                this.update_data(_data);
                this.setState({item_id:num})
                
                }}
              />
            </div>
             {/*{this.state.item_id==1?( <div>**/}
              {
                this.state.pagedata&&this.state.pagedata.length>0?(
                  this.state.pagedata.map((option,inx)=>(<SeriesItem parent={this} info={option} inx={inx} key={inx} series={this.state.item_id==1?false:true} />))
                 
                    ):('')}
              
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
        <section className="bg-white profile-padding profile-top">
         
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
