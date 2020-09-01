import React from "react";
import Helmet from "react-helmet";
import { Container, Avatar, Grid } from "@material-ui/core";
import { ArrowDownwardOutlined } from "@material-ui/icons";
import "../../../assets/activity/css/activity.css";
import Layout from "../layout";
import Bananer from "../comments/Banner";
import NavTar from "../comments/NavTar";
import Footer from "../comments/Footer";
import Bgimg from "../../../assets/activity/img/all/bg.png";
import lefttop from '../../../assets/activity/img/all/lefttop.png';
import leftbottom from '../../../assets/activity/img/all/leftbottom.png';
import righttop from '../../../assets/activity/img/all/righttop.png';
import rightbottom from '../../../assets/activity/img/all/rightbottom.png';
import TextField from '@material-ui/core/TextField';
import WordsCar from "../comments/WorksCar";
import Pagination from '@material-ui/lab/Pagination';
class PageAllWorks extends React.Component {
  constructor (props){
  super(props);
    this.state = {
      contest_w: 0,
    };
    this.winsize = this.winsize.bind(this);
  }
  componentDidMount() {
    this.winsize();
    window.onresize = () => {
      this.winsize();
    };
  }
  componentWillUnmount() {
    window.onresize =null;
  }
  winsize() {
    let w = document.documentElement.clientWidth;
    let size = (16 / 1920) * w;

    document.querySelector("html").style.fontSize = size + "px";
    this.setState({
      contest_w: document.getElementById("all-works").clientWidth,
    });
  }
  render() {
    let { contest_w } = this.state;
    console.log(contest_w);
    return (
      <Layout>
        <div>
          <Bananer />
          <NavTar />
          <div style={{ height: 2, backgroundColor: "#fcf800" }}></div>
          <div
            className="all-width" id='all-works'
            style={{
              backgroundRepeat: "no-repeat",
              
              // height: 'auto',
              margin: "0 auto",
              backgroundSize: "100% 100%",
              backgroundPosition: "left center",
              backgroundImage: `url(${Bgimg})`,
              
              position: "relative",
              padding:'11% 0',
            }}
          >
          <div className='bg-white all-height'
          style={{
            width: "74%",
            // height: 'auto',
            margin: "0 auto",
            borderRadius: 12,
            border: '5px solid #260D4B',
            position:'relative',
           
          }}
        >
            <img src={lefttop} alt='' style={{
              position:'absolute',
              top:-contest_w*0.1,
              left:'-11%',
              width:'41%',
              height:'auto',
              zIndex:0,
            }} />
            <img src={righttop} alt='' style={{
              position:'absolute',
              top:-contest_w*0.04,
              right:'-3%',
              width:'8.3%',
              height:'auto',
              zIndex:0,
            }} />
            <img src={leftbottom} alt='' style={{
              position:'absolute',
              bottom:-10,
              left:'-3%',
              width:'8.3%',
              height:'auto',
              zIndex:0,
            }} />
            <img src={rightbottom} alt='' style={{
              position:'absolute',
              bottom:-20,
              right:'-3%',
              width:'8.3%',
              height:'auto',
              zIndex:0,
            }} />
            <div className='bg-white all-wdith all-height' style={{zIndex:5,transform:'translateX(1px)',padding:'5%',borderRadius:12}}>
              <Grid container spacing={3}>
              
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <WordsCar />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <WordsCar />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                <WordsCar />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <WordsCar />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                  <WordsCar />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <WordsCar />
                </Grid>
              </Grid>
                <div className='box box-center box-align-center'>
                <Pagination count={10} variant="outlined" shape="rounded" />
                  <div>共21页，跳至 <TextField  label="Outlined" variant="outlined" /></div>
                </div>
              
            </div>
           
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }
}
export default PageAllWorks;
