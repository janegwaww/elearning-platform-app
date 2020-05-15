import React from "react";
import "./SliderTemplate.css";
import dateConversion from "../../../assets/js/dateConversion";
import {getObj,getScroll,getPage ,getWidth,getStyles} from '../../../assets/js/totls';


   
class SliderTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      leng: props.length ,
    };
    
  }
  componentWillReceiveProps(nextProps) {
    
    let value=0;
    getObj('sliderbox').style.width=getObj('sliderbox').scrollWidth+'px';
    if(this.state.leng==nextProps.length){
      value = (nextProps.value*1000)/(this.state.leng*1000/getObj('sliderbox').scrollWidth);
      this.setState({
        value: value,
      })
    }else{
    value = (nextProps.value*1000)/(nextProps.length*1000/getObj('sliderbox').scrollWidth);
    // getObj('sliderbox').style.width=getObj('sliderbox').scrollWidth+'px';
    this.setState({
      value: value,
      leng: nextProps.length,
    });
  }
    return true;
  }


  render() {
    let _this = this;
    
    let lists = [];
    let leng= this.state.leng||100
    for (let i = 0; i < Math.ceil((leng * 1000) / 274 / 10); i++) {
      lists.push(
        <div className="scales" key={i}>
          <span>{dateConversion(i * 2.74)}</span>
          <div className="sub-scales" data-index={i}>
            <div className="mm" data-inx={i+'_1'}></div>
            <div className="mm" data-inx={i+'_2'}></div>
            <div className="mm" data-inx={i+'_3'}></div>
            <div className="mm" data-inx={i+'_4'}></div>
            <div className="mm" data-inx={i+'_5'}></div>
            <div className="mm" data-inx={i+'_6'}></div>
            <div className="mm" data-inx={i+'_7'}></div>
            <div className="mm" data-inx={i+'_8'}></div>
            <div className="mm" data-inx={i+'_9'}></div>
            <div className="mm" data-inx={i+'_10'}></div>
          </div>
        </div>
      );
    }

    return (
      
        <div className="mainedit">
          <div className="mark" id= 'mark' onClick={(e)=>{
            e.stopPropagation();
            e.preventDefault();
              
            let x = getPage(e).pageX-getStyles('pointer','left');
              let total_x =getObj('mark').scrollWidth;
              console.log(this.props)
              // 页面的位置加页面偏移的位置就是移动的位置
              let barX = getPage(e).pageX-50-6-getStyles('sliderbox','transform')
              barX= barX<0?0:barX;
              barX = barX>total_x-6 ?total_x-6:barX;
              _this.setState({
                value:barX
              })
              this.props.parent.video_live.pause()//拖动滑块时暂停播放
              this.props.parent.setState({
                status: false,
              });
              _this.props.parent.getChildrenMsg(_this, leng/total_x*barX);
              // getObj('pointer').style.left=barX+'px';
          }}>{lists}</div>
          <div className="draggable">
            <div className="pointer" id='pointer' style={{left:this.state.value+'px'}} onMouseDown={(e)=>{
              e.stopPropagation();
              e.preventDefault();
              
              let obj = e.target;
              let x = getPage(e).pageX-getStyles('pointer','left');
              
              let total_x =getObj('sliderbox').scrollWidth;
              
              document.onmousemove=(ev)=>{
                let barX = getPage(ev).pageX-x;
                barX=barX>=0?barX:0;
                barX =barX> total_x-6?total_x-6:barX;
               //每px对应多少毫秒
               _this.setState({
                 value:barX
               })
               this.props.parent.video_live.pause()//拖动滑块时暂停播放
              this.props.parent.setState({
                status: false,
              });
                // getObj('pointer').style.left=barX+'px';
                _this.props.parent.getChildrenMsg(_this, leng/total_x*barX);
              }
              document.onmouseup=(ev)=>{
                document.onmousemove=null;
              }
              
            }}></div>
          </div>
        </div>
       
      
    );
  }
}

export default SliderTemplate;
