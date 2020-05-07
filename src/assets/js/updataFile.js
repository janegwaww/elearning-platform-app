import axios from "axios";
import getData from "./request";
import { getUser } from "../../services/auth";
import md5 from "md5";
function UpdataFile(options) {
  this.options = options;
  this.current=0;//当前的上传片数
  this.totalConud= 1;//上传总片数
  this.size=0
}
UpdataFile.prototype.upFile=function(formData,filesArr){
 
  let xhr;
  let _this = this;
  // console.log(_this.totalConud,_this.current)
  if(_this.current<_this.totalConud){
    formData.set('file',filesArr[_this.current]);
    formData.set("chunk", _this.current);

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.onload = function(res) {
        _this.current +=1;
        _this.size=_this.current*_this.options.shardSize;
        _this.upFile(formData,filesArr);
        
      };
      xhr.onerror = function(err) {
     
        _this.upFile(formData,filesArr);
      };
      xhr.onreadystatechange = function(res) {
        if (xhr.status == 200 && xhr.readyState === 4) {
          // console.log(this.current,JSON.parse(xhr.response));
        }
      };
      xhr.open("POST", this.options.url, true);
      xhr.upload.onprogress = function(res) {//进度
          let _size=_this.current*_this.options.shardSize+res.loaded;
          let _progress = parseInt(_size/_this.options.filesSize);
         _this.options.pageObj.setState({
          progress:_progress
        })
        // console.log(res)
        if(_progress>=100){
          _this.current=0;
          _this.totalConud=1;
          _this.options.pageObj
          document.getElementById(_this.options.fileId).value='';
          
        }
      };
      xhr.setRequestHeader("Authorization","Bearer " +(getUser().name||''));
    
      xhr.send(formData)
  }else{
    _this.current=0;
    _this.totalConud=1;
    document.getElementById(_this.options.fileId).value='';
    return
  }



}
UpdataFile.prototype.init = function() {
  let _option = this.options;
  let _files = document.getElementById(_option.fileId).files[0];
  console.log(_files)
  if(!_files){return}
  let  size = _files.size,
    start,
    end,
    succeed = 0;
    let shardSize =this.options.shardSize,// 一个分片大小
    sharConud = Math.ceil(size / shardSize); //总片数
    this.totalConud = sharConud;
    let filesArr = [];//分片上传列表
    for (let i = 0; i < sharConud; i++) {
      start = i * shardSize;
      end = Math.min(size, start + shardSize);
      filesArr.push(_files.slice(start, end))
    }
  
  let _formData = new FormData();
  _formData.append("task_id", md5(_files));
  _formData.append('name',_files.name)
  _formData.append("video_type", "mp4");
  _formData.append("model_name", "video");
  _formData.append("model_action", "upload");
  _formData.append("chunks", sharConud);
 
  this.upFile(_formData,filesArr);
  
};
export default UpdataFile;
