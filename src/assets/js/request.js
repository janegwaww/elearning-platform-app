import axios from "axios";
import { getUser } from "../../services/auth";
const _path = __dirname;
const request_url = "http://api.haetek.com:9191/"; //'http://192.168.0.200:9191/';//'http://seeker.haetek.com:9191/';//'

// axios.defaults.timeout = 10000;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer" + " " + getUser().token,
};

export const get_data = function(url, data, method, header) {
  return new Promise(function(resolve, reject) {
    axios({
      url: request_url + url,
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
        request_arr.push(get_data(url_lists, data_list[i]));
      }
    } else {
      for (let i = 0; i < len; i++) {
        request_arr.push(axios.get(url_lists, data_list[i]));
      }
    }
  } else {//url是数组列表时
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
        axios.spread(function(res1, ...reses) {//call_back里是不定参，不能是箭头函数，使用前头时不能绑定当前回调的arguments
          resolve(arguments);
        //   console.log(arguments)
        })
      )
      .catch(
        axios.spread(function(err, ...error) {
          // console.log(arguments)
          reject(arguments);
        })
      );
  });
};
