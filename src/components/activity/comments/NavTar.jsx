import React from "react";
import { Container, Avatar, Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import "./navtar.css";
import { navigate } from "@reach/router";
import {is_phone} from '../../../assets/js/totls';
const NavTar = (props) => {
  const [pageid, setPageid] = React.useState(props.inx);
  const [isPhone,setIsPhone] =React.useState(false);
  const [lists, setLists] = React.useState([
    { title: "首页", page: "/" },
    { title: "关于知擎杯", page: "about" },
    { title: "赛事详情", page: "detail" },
    { title: "全部作品", page: "allworks" },
  ]);
  const btn_page = (ev) => {
    let _data = ev.target.dataset;
    let _url = "/activity/";
    if (_data.id == 2) {
      _url = _url + "about";
    } else if (_data.id == 3) {
      _url = _url + "detail";
    } else if (_data.id == 4) {
      _url = _url + "allworks";
    }
    navigate(`${_url}`);
    setPageid(parseInt(_data.id));
    props.onEvent&&props.onEvent(parseInt(_data.id));
  };
  React.useEffect(()=>{
    let _router = props.rou;
    let _inx = 1
    if(_router==='detail'){
      _inx=3;
    }else if(_router=='allworks'){
      _inx=4;
    }else if(_router=='about'){
      _inx=2;
    };
    setPageid(_inx);
    setIsPhone(is_phone());
  },[])

  return (
    <div className="all-width contestcar" style={{ backgroundColor: "#fcf800" }}>
     
        <div className="navtar text-center ">
   
            <div className="box box-align-center all-height contestcar">
              {lists.map((v, inx) => (
                <div className="box-flex " key={v.title}>
                  <div>
                    <span className={pageid==inx+1? "acti" : ""}
                    style={{fontSize:isPhone&&pageid==inx+1?'2em':'1.33em'}}
                    key={v.title}
                    data-page={v.page}
                    data-id={inx + 1}
                    onClick={btn_page}>{v.title}</span>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </div>
  );
};

export default NavTar;
