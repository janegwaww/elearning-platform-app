import React from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";

import config from "../../../../data/SiteConfig";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import ScrollTop from "../../../layout/ScrollTop";
import theme from "../../../layout/theme";
import '../../../assets/css/container.css';
import '../../../assets/css/tootls.css';

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Helmet>
            <meta name="description" content={config.siteDescription} />
            
            <html lang="en" />
          </Helmet>
         <section className='ma-container is-vertical bg-f9' style={{minHeight:'100vh'}}>
            <header className='ma-header' style={{height:80}}>
              <NavBar  />
            </header>
            <main className='ma-main profile-main' style={{height:'1px'}}>
         
              {children}
              
              
              <ScrollTop />
            </main>
            
            <footer className='ma-footer'>
              <Footer config={config} />
            </footer>
         
         </section>
    </ThemeProvider>
    );
  }
}
