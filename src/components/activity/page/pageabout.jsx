import React from "react";
import Footer from '../comments/Footer';
import One from '../../../assets/activity/img/about/1.png';
import Two from '../../../assets/activity/img/about/2.png';
import Three from '../../../assets/activity/img/about/3.png';
import ProgressBar from '../../../assets/template/ProgressBar';
class PageAbout extends React.Component {
  constructor(props){
    super(props);
    this.state={
      login_status:true
    }
  }
  componentDidMount(){
    
    setTimeout(()=>{
      this.setState({
        login_status:false
      })
    },4000)
  }
  render() {
    return (
      
          <div className="all-width">
            <ProgressBar loading={this.state.login_status} speed={15} />
            <img src={One} alt='' />
            <img src={Two} alt=''/>
            <img src={Three} alt=''/>
            <Footer />
          </div>
         
       
    );
  }
}
export default PageAbout;