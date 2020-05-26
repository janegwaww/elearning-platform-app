import React from "react";
import { ProNavbar } from "./components/ProfileNav";
import { Avatar, Grid } from "@material-ui/core";
import {WorksItem }from "./components/WorksItem";
import userStyles from './components/profileStyle';

import Pagination from '@material-ui/lab/Pagination';

const Dynamic = (props) => {
    const classes = userStyles();
  return (
    <section className="bg-white profile-padding all-height view-scroll">
      <div>历史记录</div>
      <nav className="profile-bottom">
        <ProNavbar list={["我的订阅", "我的收藏", "历史记录"]} parent={props} />
      </nav>
      <main>
        <div>
            订阅
          <div className="all-width box box-align-start">
            <Avatar
              style={{ width: 88, height: 88 }}
              className="profile-right"
            />
            <div>
              <p className="fn-size-16 fn-color-2C2C3B">Eddie Lobanovskiy</p>
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
          <Grid container spacing={4} className={classes.gird}>
            {[1, 2, 3, 4, 5, 6, 7].map((v) => (
              <Grid item xs={3} key={v}>
                <WorksItem />
              </Grid>
            ))}
          </Grid>
        </div>

        <div>
        <div className="all-width box box-align-start">
        <Avatar
          style={{ width: 88, height: 88 }}
          className="profile-right"
        />
        <div>
          <p className="fn-size-16 fn-color-2C2C3B">Eddie Lobanovskiy</p>
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
      <Grid container spacing={4} className={classes.gird}>
        {[1, 2, 3, 4, 5, 6, 7].map((v) => (
          <Grid item xs={3} key={v}>
            <WorksItem />
          </Grid>
        ))}
      </Grid>
    </div>


        
            收藏 /历史
            <Grid container spacing={4} className={classes.gird}>
            {[1, 2, 3, 4, 5, 6, 7].map((v) => (
              <Grid item xs={3} key={v}>
                <WorksItem />
              </Grid>
            ))}
          </Grid>
        
        
            
      </main>
                <footer className="box box-end profile-top">
                    <Pagination  shape="rounded"   count={20}/>
                </footer>
    </section>
  );
};
export default Dynamic;
