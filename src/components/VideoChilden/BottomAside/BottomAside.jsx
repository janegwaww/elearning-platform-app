import React, { Component } from "react";
import  styles from "./BottomAside.module.css";
import  sty from '../TopAside/TopAside.module.css';
import prvg from '../../../assets/img/prve.svg';
import next from '../../../assets/img/next.svg';
import videoImg from '../../../assets/img/video.svg';
import cnen from '../../../assets/img/cnen.svg';
import cn from '../../../assets/img/cn.svg';
import en from '../../../assets/img/en.svg';
export default ()=> (
      <ul className={`${styles.ul} ${sty.ul}` }>
  

        <li className='box box-between box-center'>
          <img src={prvg} />
          <img src={next} />
        </li>
        <li className='box box-center'>
          <img src={videoImg}  />
        </li>
        <li className='box box-center'>
          <img src={cnen} />
        </li>
        
      </ul>
    );
  

