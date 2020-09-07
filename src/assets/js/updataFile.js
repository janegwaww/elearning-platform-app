
function UpdataFile(options) {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // xhr.timeout = 3000;
  this.xhr = xhr;
  this.options = options;
  this.current = 0; //当前的上传片数
  this.totalConud = 1; //上传总片数
  this.not_suc = []; //上传成功片数
  // this.size = 0;
  this.progress = null; //进度
  this.onload = null; //成功
  this.error = null; //失败
  this.onchange = null; //监听
 
}

UpdataFile.prototype.on = function(attribute, c_b) {
  Object.defineProperty(this, attribute, {
    get: function() {
      return attribute;
    },
    set: function(value, oldvalue) {
      c_b && c_b(value);
    },
  });
};

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
    
    this.current = this.not_suc[0];
    this.upFile(this.formData, this.filesList);
  } catch (error) {
    alert(error);
  }
};
UpdataFile.prototype.upFile = function(formData, filesArr) {
 
  let _this = this;
  if (_this.not_suc.length>0) {
    formData.set("file", filesArr[_this.current]);
    formData.set("chunk", _this.current);
    
    _this.xhr.onload = function(res) {
      //上传成功
      _this.not_suc.shift();
      if (_this.not_suc.length===0) {
        _this.onload = {
          chunks: _this.totalConud,
          chunk: _this.filesList.length,
          // request: res,
          response: JSON.parse(_this.xhr.response),
        };
        return;
      }
     
      if (_this.not_suc.length > 0) {//明还有没上传
        _this.current = _this.not_suc[0];
      
        _this.upFile(formData, filesArr);
      }
    };
    _this.xhr.ontimeout = function(event){
        _this.stop();
        _this.error={
          chunk: _this.current + 1,
          chunks: _this.totalConud,
          response:'请求超时！'
        }
       }
    _this.xhr.onerror = function(err) {
      //网络失败
      _this.error = {
        chunk: _this.current + 1,
        chunks: _this.totalConud,
        response: err,
      };
      _this.stop();
    };
    _this.xhr.onreadystatechange = function(res) {
      if (_this.xhr.status == 200 && _this.xhr.readyState === 4) {
        let _data = JSON.parse(_this.xhr.response);
    
        _this.onchange = {
          chunks: _this.totalConud,
          chunk: _this.current + 1,
          response: _data,
         
        };
      }
    };
    _this.xhr.open("POST", this.options.url, true);
    _this.xhr.upload.onprogress = function(res) {
      //进度
      let _size =
        (_this.filesList.length - _this.not_suc.length) *
          _this.options.shardSize +
        res.loaded;
      let _progress = parseInt((_size / _this.options.filesSize) * 100);
      _this.progress = {
        size: _progress,
        
        chunks: _this.totalConud,
        chunk: _this.current + 1,
      };
    };
    if (_this.options.headers) {
      _this.xhr.setRequestHeader(
        _this.options.headers.key,
        _this.options.headers.value
      );
    }
   

    _this.xhr.send(formData);
  }
};
UpdataFile.prototype.init = function(file,task_id) {
  let _option = this.options;
  let _files = null;
  if (file) {
    _files = file;
  } else {
    if (document.getElementById(_option.fileId)) {
      _files = document.getElementById(_option.fileId).files[0];
    }
  }
  if (!_files) {
    return;
  }
  this.files = _files;

  let size = _files.size,
    start,
    end,
    succeed = 0;
  let shardSize = this.options.shardSize, // 一个分片大小
    sharConud = Math.ceil(size / shardSize); //总片数
  this.options.filesSize = size;
  this.options.task_id= task_id;
  this.totalConud = sharConud;
  this.current = 0; //当前的上传片数 //上传成功后将要保存的分数
  let filesArr = []; //分片上传列表
  let not_up = [];
  for (let i = 0; i < sharConud; i++) {
    start = i * shardSize;
    end = Math.min(size, start + shardSize);
    filesArr.push(_files.slice(start, end));
    not_up.push(i);
  }
  this.not_suc= not_up;
  this.filesList = filesArr; //分片列表

  let _formData = new FormData();
  _formData.append("task_id",  task_id+new Date().getTime());
  _formData.append("title", _files.name.split('.')[0]);
  _formData.append("video_type", "mp4");
  _formData.append("model_name", "video");
  _formData.append("model_action", "upload");
  _formData.append("chunks", sharConud);
  this.formData = _formData; //保存起来，为续传用
  this.upFile(_formData, filesArr);
};
export default UpdataFile;
