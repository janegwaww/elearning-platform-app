import React from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";

import config from "../../../../data/SiteConfig";
import NavBar from "../../NavBar/NavBar";
import {settings_html} from '../../../assets/js/totls';
import Footer from "../../Footer/Footer";
import ScrollTop from "../../../layout/ScrollTop";
import theme from "../../../layout/theme";
import "./Profile.css";
import  Drawer from '../components/Drawer';

export default class MainLayout extends React.Component {
  componentDidMount(){
    settings_html();
  }
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Helmet>
            <meta name="description" content={config.siteDescription} />
           
          <link type= 'text/css' rel='stylesheet' href='../../../assets/css/tootls.css' />
          <link type= 'text/css' rel='stylesheet' href='../../../assets/css/container.css' />
          {/*<link type= 'text/css' rel='stylesheet' href='./profile.css' />*/}
            <html lang="en" />
          
          </Helmet>

          
         <section className=' bg-f9 ma-container is-vertical' style={{minHeight:'100vh'}}>
         
          <header  style={{height:'4rem'}} className= 'ma-header'>
          
              <NavBar  />
            </header> 
            <main className='profile-main ma-main'    >
         
              {children}
              
              
            
            </main>
             <ScrollTop />
          {/***   <Footer config={config} />
             */} 
            
         
         </section>
    </ThemeProvider>
    );
  }
}
