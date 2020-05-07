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
