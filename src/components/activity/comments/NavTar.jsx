import React from "react";
import { Container, Avatar, Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import "./navtar.css";

const NavTar = () => {
 
  return (
    <div className="all-width view-overflow">
      <div style={{backgroundColor:'#fcf800'}}>
      <div className="navtar text-center ">
        <Container >
          <Grid container>
            <Grid item xs={3}>
              <Link href="/activity/" color="inherit" underline='none'>
                <span>
                  首页
                </span>
              </Link>
            </Grid>
            <Grid item xs={3}>
            <Link href="/activity/about" color="inherit" underline='none'>
              <span>关于知擎杯</span>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link href="/activity/detail" color="inherit" underline='none'>
                <span data-page="detail">赛事详情</span>
              </Link>
            </Grid>
            <Grid item xs={3}>
            <Link href="/activity/allworks" color="inherit" underline='none'>
              <span>全部作品</span>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
     </div>
    </div>
  );
};

export default NavTar;
