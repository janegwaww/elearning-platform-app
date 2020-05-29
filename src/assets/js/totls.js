// import { navigate } from "@reach/router";
// import { getUser, isLoggedIn } from "../../services/auth";
// import {get_data} from './request';
// export const isGoLogin=(c_b)=>{//检查是否登录与超时
//     if(!isLoggedIn()){
//       c_b&&c_b(false);
//       return false;
//     }
//     get_data("api/v1/gateway", {
//         model_name: "user",
//         model_action: "is_login",
//         extra_data: {},
//         model_type: "",
//       })
//         .then((res) => {
//           if(c_b){
//             c_b(res)
//           }else{
//             if(res.err==4104){
//               navigate(`users/login`);
//               return
//             }
//           }
//         })
  
    
    
// }

export const getObj = (id) => {

  return document.getElementById(id);
};

export const getScroll = () => {
  let scrollLeft =
    document.body.scrollLeft || document.documentElement.scrollLeft;
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop,
  };
};

export const getPage = (e) => {
  let pagex = e.pageX || e.clientX + getScroll().scrollLeft;
  let pagey = e.pageY || e.clientY + getScroll().scrollTop;
  return {
    pageX: pagex,
    pageY: pagey,
  };
};

export const getWidth = (boxId, contentId, scrollboxId) => {
  let barWidth = 0;
  let _box = getObj(boxId);
  let _sliderbox = getObj(contentId);
  let _thumbbox = getObj(scrollboxId); //滚动盒子
  
  if (_sliderbox.scrollWidth > _box.clientWidth) {
    barWidth =
      (_box.clientWidth / _sliderbox.scrollWidth) * _thumbbox.clientWidth;
  }
  return barWidth;
};
export const getStyles = (objId, att) => {
  //请勿使获取其他值；
  let obj = getObj(objId);
  let att_value = null;
  if (obj.getAttribute(att)) {
    att_value = obj.getAttribute(att);
  } else {
    att_value = document.defaultView.getComputedStyle(obj, null)[att];
    if(att =='left'){
      att_value = parseInt(att_value.split('p')[0]);
    }
    if (att_value == "none" || !att_value) {
      att_value = 0;
    } else {
      if (att == "transform") {
        let _v = att_value.split(",");
        att_value = parseInt(_v[_v.length - 2]);
      }
    }
  }

  return att_value;
};
export const get_date=(timer,sep,num)=>{//时间戳转换
    let _date =new Date(timer*1000),
     _y = _date.getFullYear(),
     _m = _date.getMonth(),
     _d = _date.getDate(),
     _h = _date.getHours(),
     _min = _date.getMinutes(),
     _s = _date.getSeconds(),
     _day=_date.getDay();
     let _num = num ||1;
     let _sep = sep||'-';
  if(num==1){
    return _y+_sep+_m+_sep+_d+' '+_h+':'+_min;
  }else{
    return _y+_sep+_m+_sep+_d+' '+_h+':'+_min+':'+_s;
  }

}




