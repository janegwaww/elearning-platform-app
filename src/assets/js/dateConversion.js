const dateConversion = function(date) {
  let _date = date||0;

  let _h =
    parseInt(_date / 60 / 60) > 9
      ? parseInt(_date / 60 / 60)
      : "0" + parseInt(_date / 60 / 60); //时

  let _h_m = _date % 3600;

  let _m =
    parseInt(_h_m / 60) > 9 ? parseInt(_h_m / 60) : "0" + parseInt(_h_m / 60); //分
  let _s =
    parseInt(_h_m % 60) > 9 ? parseInt(_h_m % 60) : "0" + parseInt(_h_m % 60);

 
  return _h + ":" + _m + ":" + _s;
};
export default dateConversion;
