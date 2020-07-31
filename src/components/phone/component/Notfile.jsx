import React from "react";
import noResult from "../../../../static/images/no-result.svg";
import { Button } from "@material-ui/core";
import btnStyle from './BtnStyle';
const Nofile = (props) => {
  const classes = btnStyle();
  return (
    <div style={{marginTop:'2em'}}>
      <img src={noResult} className='all-width' style={{height:'auto'}}/>
      <div className='text-center' style={{marginTop:'2em'}}>
      {!props.not?(
        <Button
          variant="contained"
          color="primary"
          className={`${classes.btn}  ${classes.borderRa}`}
          onClick={() => {
            props.onEvent && props.onEvent();
          }}
        >
          点击刷新
        </Button>
        ):(<div className="fn-color-007CFF">{props.msg}</div>)}
      </div>
    </div>
  );
};
export default Nofile;
