import React from "react";
import {
  FavoriteBorder,
  Details,
  AccessTimeOutlined,
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import One from "../../../assets/activity/img/all/8.png";
import Two from "../../../assets/activity/img/all/9.png";
import three from "../../../assets/activity/img/all/10.png";
import { transform } from "lodash";
const WordsCar = () => {
  return (
    <div style={{width: "18.75rem",  margin:'0 auto'}}>
      <div
        style={{
          width: "18.75rem",
          height: "10.625rem",
          background: "#D8D8D8",
          boxShadow: "0px 0px 8px 0px rgba(32, 32, 32, 0.1)",
          borderRadius: 12,
          margin:'0 auto'
        }}
      ></div>

      <div style={{ padding: 20 }}>
        <div className="textview-overflow two">
          Python 数据分析与展示(2020年版)析与展示(2020析与展示(2020年版)析与
          Python 数据分析与展示(2020年版)析
        </div>
        <div>
          <span>
            <Details style={{transform: 'rotate(-90deg)'}} />
            &nbsp;625
          </span>
          <span>
            <FavoriteBorder />
            &nbsp;625
          </span>
          <span>
            <AccessTimeOutlined />
            &nbsp;7月22日
          </span>
        </div>
        <div className='box box-align-center box-between all-width'>
          <div className='box box-align-center '>
            <Avatar style={{width:'1.75rem',height:'1.75rem'}} />
            <span>flare_zhao</span>

            <img src={One} alt="" style={{width:'1.3125rem',height:'0.75rem'}} />
          </div>
          <div className= 'box box-align-center'>
            <img src={Two} alt="" style={{width:'1rem',height:'1.25rem'}} />
            <img src={three} alt="" style={{width:'1rem',height:'1.25rem'}}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WordsCar;
