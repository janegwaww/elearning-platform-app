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
    if (att == "left") {
      att_value = parseInt(att_value.split("p")[0]);
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
export const get_date = (timer, sep, num) => {
  //时间戳转换
  let _date = new Date(timer * 1000),
    _y = _date.getFullYear(),
    _m = _date.getMonth() + 1,
    _d = _date.getDate(),
    _h = _date.getHours(),
    _min = _date.getMinutes(),
    _s = _date.getSeconds(),
    _day = _date.getDay();
  let _num = num || 1;
  let _sep = sep || "-";
  if (num == 1) {
    return _y + _sep + _m + _sep + _d + " " + _h + ":" + _min;
  } else if (num == 9) {
    return _y + "年" + _m + "月" + _d + "日";
  } else if (num == 8) {
    return _m + "月" + _d + "日";
  } else {
    return _y + _sep + _m + _sep + _d + " " + _h + ":" + _min + ":" + _s;
  }
};
export const get_time = function(time) {
  if (time == 0) {
    return 0;
  }
  let _time_arr = time.split(":");
  let _new_time =
    parseInt(_time_arr[0]) * 3600 +
    parseInt(_time_arr[1]) * 60 +
    parseInt(_time_arr[2]);
  return _new_time;
};
export const ev_stop = (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
};
export const switch_time = (time, sep) => {
  let _time = time;
  let _h = parseInt(_time / 3600);
  _h = _h > 9 ? _h : "0" + _h;
  let _min = _time % 3600;
  let _m = parseInt(_min / 60);
  _m = _m > 9 ? _m : "0" + _m;
  let _s = parseInt(_min % 60);
  _s = _s > 9 ? _s : "0" + _s;

  return _h + sep + _m + sep + _s;
};
export const is_phone = () => {
  if (window) {
    let ua = navigator.userAgent;
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/),
      isMobile = isIphone || isAndroid ;
    if (isMobile) {
      return true;
    } else {
      return false;
    }
  }
};

export const settings_html = () => {
  let _w = window.screen.width;
  let _new_w = (48 / 1920) * _w;

  if (is_phone()) {
    document.querySelector("html").style.fontSize = _new_w + "px";
  } else {
    document.querySelector("html").style.fontSize = 16 + "px";
  }
};
export const empty_content =(num)=>{
  let list = [];
  for(let i=0;i<num;i++){
    list.push(i);
  }
  return list;
}