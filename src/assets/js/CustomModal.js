import "../css/modal.css";
import success from '../img/success.png';
import error from '../img/err.png';
function CustomModal() {
  this.body = document.body || document.querySelector("body");
  this.obj = document.createElement("div");
}
CustomModal.prototype.alert = function(option) {
  //argument多参时，第1个为显示的信息，第二个为类型，如成功success，失败error
  //argument为一个参时，判断是字符还是对像，字符为信息，默认类型。对像时modal的各参就是对像属性

  if (arguments.length > 1) {
    this.msg = arguments[0];
    this.severity = arguments[1];
    this.times = arguments[2];
    console.log(this.severity)
  } else {
    this.option = option;
  }
  if (this.severity) {
    this.obj.className = "alert " + this.severity;
  } else {
    this.obj.className = "alert";
  }

  let _div = document.createElement("div");
  if (this.msg&&this.severity=='success') {
    _div.innerHTML =`<img src='${success}' />`+ this.msg ;
  }else{
    _div.innerHTML =`<img src='${error}' />`+ this.msg||'网络错误' ;
  }
  this.obj.appendChild(_div);
  this.body.appendChild(this.obj);
  // document.getElementById('close').onclick=()=>{
  //   this.body.removeChild(this.obj);
  // }
  setTimeout(()=>{
      if(!document.querySelector('.alert')){return};
      this.body.removeChild(this.obj);
  },this.times||5000)
  
};

export default CustomModal;
