import React from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";

import config from "../../../../data/SiteConfig";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import ScrollTop from "../../../layout/ScrollTop";
import theme from "../../../layout/theme";
import '../../../assets/css/tootls.css';
import '../../../assets/css/container.css';
import "./Profile.css";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Helmet>
            <meta name="description" content={config.siteDescription} />
            <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"></meta>
            <html lang="en" />
          </Helmet>
         <section className=' bg-f9' style={{minHeight:'100vh'}}>
         
            <header  style={{height:64}}>
          
              <NavBar  />
            </header>
            <main className='profile-main ma-main'  >
         
              {children}
              
              
              <ScrollTop />
            </main>
           {/*** 
            <Footer config={config} />
             */} 
            
         
         </section>
    </ThemeProvider>
    );
  }
}
