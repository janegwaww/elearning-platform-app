import { getUser } from "../../services/auth";
import md5 from "md5";

function UpdataFile(options) {
  
  this.xhr = this.rest();
  this.options = options;
  this.current = 0; //当前的上传片数
  this.totalConud = 1; //上传总片数
  this.size = 0;
  this.progress = null; //进度
  this.onload = null; //成功
  this.error = null; //失败
  this.onchange = null; //监听
  this.stop = null; //停止，暂停 未写
  this.start = null; //续传 未写
  
 
}
UpdataFile.prototype.on = function(attribute, c_b) {
  Object.defineProperty(this, attribute, {
    get: function() {
      console.log(attribute)
      return attribute;
    },
    set: function(value, oldvalue) {
      console.log(attribute)
      c_b && c_b(value);
    },
  });
};
UpdataFile.prototype.rest=function(){
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
 
  return xhr;
}
UpdataFile.prototype.stop = function() {
  try {
    if (!this.xhr) {
      throw "还没有建立与服务器的链接，请先建立通道才能停止！";
      return;
    }
    this.xhr.abort();
  } catch (error) {
    alert(error);
  }
};
UpdataFile.prototype.start = function() {
  try {
    if (!this.xhr) {
      throw "请先建立链接，才能开始!";
      return;
    }
    this.init();
  } catch (error) {
    alert(error);
  }
};
UpdataFile.prototype.upFile = function(formData, filesArr) {
  // let xhr;
  let _this = this;
  if (_this.current < _this.totalConud) {
    formData.set("file", filesArr[_this.current]);
    formData.set("chunk", _this.current);

   _this.xhr.onload = function(res) {
      //上传成功
    
      if (_this.current == _this.totalConud - 1) {
        _this.onload = {
          chunks: _this.totalConud,
          chunk: _this.current + 1,
          request: res,
          response: JSON.parse(_this.xhr.response),
        };
        return;
      }
      _this.current += 1;
      _this.size = _this.current * _this.options.shardSize;
      _this.upFile(formData, filesArr);
    };
    _this.xhr.onerror = function(err) {
      //网络失败
      _this.error = {
        chunk: _this.current + 1,
        chunks: _this.totalConud,
        response: err,
        
      };
    };
    _this.xhr.onreadystatechange = function(res) {
     
      if (_this.xhr.status == 200 && _this.xhr.readyState === 4) {
        let _data = JSON.parse(_this.xhr.response);
        _this.onchange = {
          chunks: _this.totalConud,
          chunk: _this.current + 1,
          response: _data,
          request: res,
        };
      }
    };
    _this.xhr.open("POST", this.options.url, true);
    _this.xhr.upload.onprogress = function(res) {
      //进度
      let _size = _this.current * _this.options.shardSize + res.loaded;
      let _progress = parseInt((_size / _this.options.filesSize) * 100);
      _this.progress = {
        size: _progress,
        request: res,
        chunks: _this.totalConud,
        chunk: _this.current + 1,
      };
    };
    if(_this.options.headers){
      _this.xhr.setRequestHeader(_this.options.headers.key,_this.options.headers.value)
    }
    // _this.xhr.setRequestHeader("Authorization", "Bearer " + (getUser().token || ""));

    _this.xhr.send(formData);
  } else {
    _this.current = 0;
    _this.totalConud = 1;
    // document.getElementById(_this.options.fileId).value='';
    return;
  }
};
UpdataFile.prototype.init = function(file) {


  let _option = this.options;
  let _files = null;
  if (file) {
    _files =file;
    
  } else {
    if(document.getElementById(_option.fileId)){
      _files = document.getElementById(_option.fileId).files[0];
    }
  }
  if (!_files) {
    return;
  }
  this.files = _files;
 
  // this.options.filesList = [_files];
  let size = _files.size,
    start,
    end,
    succeed = 0;
  let shardSize = this.options.shardSize, // 一个分片大小
    sharConud = Math.ceil(size / shardSize); //总片数
  this.options.filesSize=size;
  this.totalConud = sharConud;
  let filesArr = []; //分片上传列表
  for (let i = 0; i < sharConud; i++) {
    start = i * shardSize;
    end = Math.min(size, start + shardSize);
    filesArr.push(_files.slice(start, end));
  }
  this.filesList = filesArr;//分片列表

  let _formData = new FormData();
  _formData.append("task_id", md5(_files) + Math.random() * 1000);
  _formData.append("title", _files.name);
  _formData.append("video_type", "mp4");
  _formData.append("model_name", "video");
  _formData.append("model_action", "upload");
  _formData.append("chunks", sharConud);



  this.upFile(_formData, filesArr);
};
export default UpdataFile;
