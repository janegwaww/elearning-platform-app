import React from "react";
import BannerOne from "../../../assets/img/profile.png";
import { Avatar, Grid } from "@material-ui/core";
import {Settings} from '@material-ui/icons';
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import {WorksItem }from "./components/WorksItem";
import userStyles from './components/profileStyle';

const ProfileIndex = (props) => {
  const classes = userStyles();
  
  return (
    <section className=' view-scroll all-height'>
      <main className='all-width'>
        <img
          src={BannerOne}
          className="all-width"
          style={{ height: "300px" }}
        />
        <span className='bg-white' style={{position:'absolute',right:0,top:0}} onClick={()=>{
          event.stopPropagation();
        event.preventDefault();
            props.parent.setState({
              nowPage:{
                childPage:'', 
                chilepage_id:0,
                parent:'SetingsCenter',
                parent_id:5
              }
            })
          console.log(props)
        }}><Settings /></span>
      </main>
      <main
        style={{ height: "158px", paddingTop: "20px" }}
        className="all-width profile-padding bg-white box  box-between fn-size-14 fn-color-2C2C3B"
      >
        <div className="box box-align-center">
          <div style={{ marginRight: 20 }}>
            <Avatar
              src={BannerOne}
              style={{
                width: "80px",
                height: "80px",
                transform: "translateY(-55px)",
              }}
            />
          </div>
          <div>
            <p className="zero-edges fn-size-16">Eddie Lobanovskiy</p>
            <p
              className="zero-edges fn-size-12 fn-color-9E9EA6"
              style={{ margin: "10px 0" }}
            >
              ID: 43572
            </p>
            <p className="zero-edges">
              资深视觉设计/UI设计，淘宝天下网商特约访谈嘉宾，与小米、阿里、滴滴的资深设计共同创
              <br />
              建EDC设计研究中心，致力于帮助在职UI设计师提高专业技能...
            </p>
          </div>
        </div>
        <div className="box box-align-end text-center">
          <div style={{ margin: "0 20px" }}>
            <p className="fn-color-878791">关注数</p>
            <p className="zero-edges">100</p>
          </div>
          <div style={{ margin: "0 20px" }}>
            <p className="fn-color-878791">粉丝数</p>
            <p className="zero-edges">22万</p>
          </div>
        </div>
      </main>
      <main
        style={{ height: "250px" }}
        className="all-width bg-white profile-margin profile-padding"
      >
        <div className="box box-align-center box-between">
          <div>
            <ProNavbar parent={props} list={["数据中心"]} />
          </div>
          <div className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
            查看数据
          </div>
        </div>
        <div
          className="box box-align-center text-center fn-size-14 fn-color-878791"
          style={{ marginTop: "30px" }}
        >
          <div className="box-flex bg-EDF6FF">
            <p className="zero-edges">订阅量</p>
            <p className="fn-size-20 fn-color-007CFF">2.2万</p>
            <p className="zero-edges">
              昨日 <span className="fn-color-02BB17">+200</span>
            </p>
          </div>
          <div className="box-flex bg-EDF6FF">
            <p className="zero-edges">视频播放量</p>
            <p className="fn-size-20 fn-color-007CFF">2.2万</p>
            <p className="zero-edges">
              昨日 <span className="fn-color-02BB17">+200</span>
            </p>
          </div>
          <div className="box-flex bg-EDF6FF">
            <p className="zero-edges">课件下载量</p>
            <p className="fn-size-20 fn-color-007CFF">2.2万</p>
            <p className="zero-edges">
              昨日 <span className="fn-color-02BB17">+200</span>
            </p>
          </div>
          <div className="box-flex bg-EDF6FF">
            <p className="zero-edges">点赞数</p>
            <p className="fn-size-20 fn-color-007CFF">2.2万</p>
            <p className="zero-edges">
              昨日 <span className="fn-color-02BB17">+200</span>
            </p>
          </div>
          <div className="box-flex bg-EDF6FF">
            <p className="zero-edges">收藏数</p>
            <p className="fn-size-20 fn-color-007CFF">2.2万</p>
            <p className="zero-edges">
              昨日 <span className="fn-color-02BB17">+200</span>
            </p>
          </div>
          <div className="box-flex bg-EDF6FF">
            <p className="zero-edges">分享数</p>
            <p className="fn-size-20 fn-color-007CFF">2.2万</p>
            <p className="zero-edges">
              昨日 <span className="fn-color-F86B6B">-10</span>
            </p>
          </div>
          <div className="box-flex bg-EDF6FF">
            <p className="zero-edges">评论数</p>
            <p className="fn-size-20 fn-color-007CFF">2.2万</p>
            <p className="zero-edges">
              昨日 <span className="fn-color-F86B6B">-10</span>
            </p>
          </div>
        </div>
      </main>
      <main
        style={{ height: "555px" }}
        className="all-width bg-white profile-margin profile-padding"
      >
        <div className="box box-align-center box-between">
          <div>
            <ProNavbar parent={props} list={["我的作品", "审核中"]} />
          </div>
          <div className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
            全部作品
          </div>
        </div>
        <div style={{ margin: "30px 0" }}>
          <Navbar parent={props} lists={["普通", "系列"]} />
        </div>
        <div>
          <div style={{ height: "164px" }}>
            <SeriesItem />
            <SeriesItem />
          </div>
        </div>
      </main>
      <main
        style={{ height: "395px", marginBottom: "0" }}
        className="all-width bg-white profile-margin profile-padding"
      >
        <div className="box box-align-center box-between">
          <div>
            <ProNavbar parent={props} list={["我的收藏", "历史记录"]} />
          </div>
          <div className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
            查看更多
          </div>
        </div>
        <Grid container spacing={4} className={classes.gird}>
          {[1, 2, 3, 4, 5, 6, 7].map((v) => (
            <Grid item xs={3} key={v}>
              <WorksItem />
            </Grid>
          ))}
        </Grid>
      </main>
    </section>
  );
};
export default ProfileIndex;
