import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import SeriesItem from "./components/SeriesItem";
import {WorksItem }from "./components/WorksItem";
import userStyles from './components/profileStyle'
import Grid from "@material-ui/core/Grid";
import Management from './components/management';
const CreateCenter = (props) => {
  const classes = userStyles();
  return (
    <div className='view-scroll all-height'>
      创作中心 作品管理
      <section className="bg-white profile-padding ">
        <main>
          <div>
            <ProNavbar list={["系列"]} parent={props} />
          </div>
          <div>
            <SeriesItem />
            <SeriesItem />
          </div>
          <div className="line profile-top"></div>
          <Grid container spacing={4} className={classes.gird}>
            {[1, 2, 3, 4, 5, 6, 7].map((v) => (
              <Grid item xs={3} key={v}>
                <WorksItem />
              </Grid>
            ))}
          </Grid>
        </main>
      </section>
      <section className ='bg-white profile-padding profile-top'>
              申诉管理
              <div>
              <ProNavbar list={["申诉管理"]} parent={props} />
          </div>
          <div className='profile-top profile-bottom'>
              <Navbar lists = {['全部(5)','进行中(3)','已完成(2)']} parent={this} />
          </div>
          <Management />
      </section>
    </div>
  );
};
export default CreateCenter;
