import React from "react";
import { Container, Avatar, Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import "./navtar.css";
import { navigate } from "@reach/router";

const NavTar = (props) => {
  const [pageInx,setPageInx] = React.useState(props.inx||1)

  const btn_page=(ev)=>{
    let _data=ev.target.dataset;
    let _url = '/activity/';
    if(_data.id==2){
      _url=_url+'about';
    }else if(_data.id==3){
      _url=_url+'detail'
    }else if(_data.id==4){
      _url=_url+'allworks'
    }
    navigate(`${_url}`);
    setPageInx(_data.id);
  }
  return (
    <div className="all-width view-overflow">
      <div style={{backgroundColor:'#fcf800'}}>
      <div className="navtar text-center ">
        <Container >
          <Grid container>
            <Grid item xs={3}>
                <span className={pageInx==1?'acti':''} data-page='/' data-id='1' onClick={btn_page}>
                  首页
                </span>
              
            </Grid>
            <Grid item xs={3}>
           
              <span className={pageInx==2?'acti':''} data-page='about' data-id='2' onClick={btn_page}>关于知擎杯</span>
             
            </Grid>
            <Grid item xs={3}>
              
                <span className={pageInx==3?'acti':''} data-page="detail" data-id='3' onClick={btn_page}>赛事详情</span>
              
            </Grid>
            <Grid item xs={3}>
          
              <span className={pageInx==4?'acti':''} data-page="allworks" data-id='4' onClick={btn_page}>全部作品</span>
             
            </Grid>
          </Grid>
        </Container>
      </div>
     </div>
    </div>
  );
};

export default NavTar;
