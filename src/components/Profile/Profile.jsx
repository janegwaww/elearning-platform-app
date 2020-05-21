import React from "react";
import Helmet from "react-helmet";
import Layout from "./layout";
import config from "../../../data/SiteConfig";

import { navigate } from "@reach/router";
import {Container} from '@material-ui/core';
import {Telegram,NotificationsNone,LiveTv,ReportProblem,AccountBalanceWalletTwoTone,PermIdentity,LocationCity} from '@material-ui/icons';
import './layout/profile.css';
import Link from 'gatsby-link';

import PageRouter from "./router/index";

console.log(navigate)
const Profile = () => {
  config.siteTitle = '黑顿-个人中心';
  return (
    <Layout>
      <Helmet title={`${config.siteTitle}`} />
        <Container fixed className='all-height'>
            <section className='ma-container all-height' >
                <aside className='ma-aside profile-left '>
                      <ul className='ul'>
                        <li> <Telegram />动态</li>
                        <li ><Link to='/users/profile/msgcenter'><NotificationsNone /> 消息中心</Link> </li>
                        <li><LiveTv /> 创作中心</li>
                        <li> <ReportProblem />风纪中心</li>
                        <li><AccountBalanceWalletTwoTone/> 钱包</li>
                        <li><PermIdentity/>会员中心</li>
                        <li><LocationCity /> 数据中心</li>
                      </ul>
                </aside>
                <main className='ma-main all-width '>
                    <PageRouter />
                </main>
            
            
            </section>
        </Container>
      
    </Layout>
  );
};

export default Profile;
