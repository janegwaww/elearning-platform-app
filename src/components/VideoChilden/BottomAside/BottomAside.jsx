import React, { Component } from "react";
import  styles from "./BottomAside.module.css";
import  sty from '../TopAside/TopAside.module.css';
import prvg from '../../../assets/img/prve.svg';
import next from '../../../assets/img/next.svg';
export default ()=> (
      <ul className={`${styles.ul} ${sty.ul}` }>
  

        <li className='box box-between box-center'>
          <img src={prvg} />
          <img src={next} />
       
        </li>
        
      </ul>
    );
  

