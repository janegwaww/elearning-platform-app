import axios from "axios";
import { getUser } from "../../services/auth";
import CustomModal from "./CustomModal";
const _path = __dirname;
const users_url ="https://api.haetek.com:9191/api/v1/gateway"; //个中心
const video_url= 'https://api2.haetek.com:9191/api/v1/gateway';//生字幕
axios.defaults.timeout = 15000;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer" + " " + getUser().token,
};

export const get_data = function( data,_type, method, header) {
  return new Promise(function(resolve, reject) {
    axios({
      url:_type=='video'?video_url:users_url,
      data: data,
      method: method || "post",
      headers: header || {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + getUser().token,
      },
    })
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.log(err);
        reject(err);

        // new CustomModal().alert('网络错误','error')
      });
  });
};
export const get_alldata = function(url_lists, data_list, methods) {
  //用于并发请求
  /**
   * url_list请求接口列表或字符,
   * data_list发送接口请求数据列表，
   * method 请求方式
   */
  let len = data_list.length;
  let request_arr = [];

  if (typeof url_lists == "string") {
    //url是字符时
    if (!methods || methods == "post" || methods == "POST") {
      for (let i = 0; i < len; i++) {
        request_arr.push(get_data( data_list[i]));
      }
    } else {
      for (let i = 0; i < len; i++) {
        request_arr.push(axios.get(data_list[i]));
      }
    }
  } else {
    //url是数组列表时
    if (!methods || methods == "post" || methods == "POST") {
      for (let i = 0; i < len; i++) {
        request_arr.push(get_data(url_lists[i], data_list[i]));
      }
    } else {
      for (let i = 0; i < len; i++) {
        request_arr.push(axios.get(url_lists[i], data_list[i]));
      }
    }
  }
  return new Promise(function(resolve, reject) {
    axios
      .all(request_arr)
      .then(
        axios.spread(function(res1, ...reses) {
          //call_back里是不定参，不能是箭头函数，使用前头时不能绑定当前回调的arguments
          resolve(arguments);
          //   console.log(arguments)
        })
      )
      .catch(
        axios.spread(function(err, ...error) {
          // console.log(arguments)
          reject(arguments);
          // new CustomModal().alert('网络错误','error')
        })
      );
  });
};
export const updata_img = function(_file, _type) {
  let _form = new FormData();
  _form.append("model_name", "file");
  _form.append("model_action", "upload_file");
  _form.append("type", _type);
  _form.append("file", _file);
  return new Promise(function(resolve, reject) {
    get_data(_form)
      .then((res) => {
        if (res.err == 0 && res.errmsg == "OK") {
          new CustomModal().alert("上传成功", "success", 3000);
        } else {
          new CustomModal().alert("上传失败", "error", 3000);
        }
        resolve(res);
        // new CustomModal().alert('上传成功','success',3000)
      })
      .catch((err) => {
        reject(err);
      });
  });
};
