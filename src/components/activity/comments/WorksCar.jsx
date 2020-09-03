import React from "react";
import {
  FavoriteBorder,
  Details,
  AccessTimeOutlined,
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import One from "../../../assets/activity/img/all/8.png";
import Two from "../../../assets/activity/img/all/9.png";
import three from "../../../assets/activity/img/all/10.png";
import {get_date} from '../../../assets/js/totls';

const WordsCar = (props) => {
  return (
    <div>
    <Link  color="inherit"
    target="_blank"
    underline="none"
    href={props.info.type=='document'?'/documentsearch/?dsid='+props.info.file_id:'/watch/?vid='+props.info.file_id}>
    <div className="all-width contestcar">
      <div
        style={{
          height: "1.7em",
          background: "#D8D8D8",
          boxShadow: "0px 0px 8px 0px rgba(32, 32, 32, 0.1)",
          borderRadius: '0.12em ',
          margin: "0 auto",
        }}
        className='view-overflow'
      >
        <img
          style={{
            height: '100%',
            width: "auto",margin:'0 auto'
          }}
          src={props.info.image_path}
          alt=""
        />
      </div>

      <div style={{ padding:'0.2em' }}>
        <div className="textview-overflow two" style={{fontSize:'0.14em'}}>
            {props.info.file_name}
        </div>
        <div style={{margin:'1em 0',fontSize:'0.12em',
        lineHeight: '1em',color:'#878791'}}>
          <span>
            <Details style={{ transform: "rotate(-90deg)" }} />
            &nbsp;{props.info.view_counts||0}
          </span>&nbsp;&nbsp;
          <span>
            <FavoriteBorder />
            &nbsp;{props.info.like_counts||0}
          </span>&nbsp;&nbsp;
          <span>
            <AccessTimeOutlined />
            &nbsp;{get_date(props.info.time,'.',8)}
          </span>
        </div>
        <div className="box box-align-center box-between all-width">
          <div className="box box-align-center " style={{fontSize:'0.12em'}}>
            <Avatar style={{ width: "1.4em", height: "1.4em" }} src={props.info.headshot} />&nbsp;
            <div >{props.info.user_name}</div>&nbsp;

            <img
              src={One}
              alt=""
              style={{ width: "1.25rem", height: "1rem" }}
            />
          </div>
          <div className="box box-align-center" style={{fontSize:'0.1em'}}>
            <img
              src={Two}
              alt=""
              style={{ width: "1rem", height: "1.25rem" }}
            />&nbsp;&nbsp;
            <img
              src={three}
              alt=""
              style={{ width: "1rem", height: "1.25rem" }}
            />
          </div>
        </div>
      </div>
    </div>
    </Link>
    </div>
  );
};
export default WordsCar;
