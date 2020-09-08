import React from "react";
import {
  FavoriteBorder,
  Details,
  AccessTimeOutlined,
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";


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
          minHeight:80,
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

      <div style={{ padding:'20px 0.2em 0' }}>
        <div className="textview-overflow two" style={{fontSize:'0.18em',minHeight:'2.67em'}}>
            {props.info.file_name}
        </div>
        <div style={{margin:'1em 0',fontSize:'0.14em',
        lineHeight: '1em',color:'#878791'}} className='box box-align-center box-between'>
          <div>
            <Details style={{ transform: "rotate(-90deg)",fontSize:'1.8em' }} />
            &nbsp;{props.info.view_counts||0}
          </div>&nbsp;&nbsp;
          <div>
            <FavoriteBorder style={{fontSize:'1.8em'}} />
            &nbsp;{props.info.like_counts||0}
          </div>&nbsp;&nbsp;
          <div>
            <AccessTimeOutlined style={{fontSize:'1.8em'}}/>
            &nbsp;{get_date(props.info.time,'.',8)}
          </div>
        </div>
        <div className="box box-align-center box-between all-width">
          <div className="box box-align-center box-flex all-width" style={{fontSize:'0.12em'}}>
            <Avatar style={{ width: "1.4em", height: "1.4em" }} src={props.info.headshot} />&nbsp;&nbsp;
            <div  title={props.info.user_name} className='text-overflow' style={{fontSize:'0.2em'}}>{props.info.user_name}</div>&nbsp;

          </div>
        
        </div>
      </div>
    </div>
    </Link>
    </div>
  );
};
export default WordsCar;
