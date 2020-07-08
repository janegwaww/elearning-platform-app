import React, { Component } from "react";
import styles from "./BottomAside.module.css";
import prvg from "../../../assets/img/prve.svg";
import next from "../../../assets/img/next.svg";
import videoImg from "../../../assets/img/video.svg";
import cnen from "../../../assets/img/cnen.svg";
import encn from "../../../assets/img/encn.png";
import cn from "../../../assets/img/cn.svg";
import en from "../../../assets/img/en.svg";
export default (props) => {
 
  const btn_show = function(ev){
    if(!props.parent.state.video_data.sub_josn){
      return
    }
    let _data= ev.target.dataset;
  if(JSON.stringify(_data)=="{}"){
    _data= ev.target.parentNode.dataset;
  }
    props.onEvent&&props.onEvent(_data.num);
  }
 
  return (
    <ul className={`${styles.ul}`}>
      <li className="box box-between box-center">
        <img src={prvg} />
        <img src={next} />
      </li>
      <li className="box box-center">
        <img src={videoImg} />
      </li>
      <li className="box box-center">
        {props.lang == 1 && (
          <div onClick={btn_show} data-num='2'>
            <img src={cnen} />
          </div>
        )}
        {props.lang == 2 && (
          <div>
            <div onClick={btn_show} data-num='1'>
              <img src={cn} style={{ width: 40, height: 28 }} />
            </div>

            <div style={{ marginTop: 20 }} onClick={btn_show} data-num='3'>
              <img src={en} style={{ width: 40, height: 28 }} />
            </div>
          </div>
        )}
        {props.lang == 3 &&(
          <div onClick={btn_show} data-num='2'>
            <img src={encn} />
          </div>
        )}
      </li>
    </ul>
  );
};
