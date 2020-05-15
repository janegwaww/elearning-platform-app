import axios from "axios";
import getData from "./request";
import { getUser } from "../../services/auth";
import md5 from "md5";
import { getObj } from "./totls";
import { getNullableType } from "C:/Users/chen-web/AppData/Local/Microsoft/TypeScript/3.8/node_modules/graphql/type/definition";
function UpdataFile(options) {
  this.options = options;
  this.current=0;//当前的上传片数
  this.totalConud= 1;//上传总片数
  this.size=0;
  this.progress=null;
  this.upload=null;
  this.error=null;
  this.onchange=null;
  this.stop=null;//停止上传，
  this.start=null;//开始上传
}
UpdataFile.prototype.on= function(attribute,c_b){
    Object.defineProperty(this,attribute,{
      get:function () {
        return attribute
      },
      set:function (value,oldvalue) {
        
        c_b&&c_b(value)
        
      }
    })
},
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

          if(_this.current==_this.totalConud-1){
            _this.onload = {chunks:_this.totalConud,chunk:_this.current+1,request:res,response:JSON.parse(xhr.response)}
            
            return
          }
        _this.current +=1;
        _this.size=_this.current*_this.options.shardSize;
        _this.upFile(formData,filesArr);
        
      };
      xhr.onerror = function(err) {
       
        _this.error={chunk:_this.current+1,chunks:_this.totalConud,response:err,request:xhr};
        
       
      };
      xhr.onreadystatechange = function(res) {
        if (xhr.status == 200 && xhr.readyState === 4) {
            let _data = JSON.parse(xhr.response);
            _this.onchange={chunks:_this.totalConud,chunk:_this.current+1,response:_data,request:res}
            if(_data.err==0&&_data.result_data.length>0){
              _this.options.pageObj.props.parent.get_url(_data.result_data[0])//上传成功后将地址传给播放器
              _this.options.pageObj.setState({
                files:_data.result_data,
                status:3
              })
            }
        
        }
      };
      xhr.open("POST", this.options.url, true);
      xhr.upload.onprogress = function(res) {//进度
          let _size=_this.current*_this.options.shardSize+res.loaded;
          let _progress = parseInt(_size/_this.options.filesSize*100);
            _this.progress = {size:_progress,request:res,chunks:_this.totalConud,chunk:_this.current+1};
     
      };
      xhr.setRequestHeader("Authorization","Bearer " +(getUser().token||''));
    
      xhr.send(formData)
  }else{
    _this.current=0;
    _this.totalConud=1;
    // document.getElementById(_this.options.fileId).value='';
    return
  }
}
UpdataFile.prototype.init = function() {
  let _option = this.options;
  let _files = document.getElementById(_option.fileId).files[0]; 
  if(!_files){return}
  this.options.filesList =[_files];
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

  // formData.set('file',filesArr[_this.current]);
  // formData.set("chunk", _this.current);

 
  this.upFile(_formData,filesArr);
  
};
export default UpdataFile;
