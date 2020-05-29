import "../css/modal.css";
function Modal() {
  this.body = document.body || document.querySelector("body");
  this.obj = document.createElement("div");
}
Modal.prototype.alert = function(option) {
  if (arguments.length > 1) {
    this.msg = arguments[0];
    this.severity = arguments[1];
  } else {
    this.option = arguments;
  }
  if (this.severity) {
    this.obj.className = "alert " + this.severity;
  } else {
    this.obj.className = "alert";
  }

  let _div = document.createElement("div");
  if (this.msg) {
    _div.innerHTML = this.msg + "<span id='close' >X</span>";
  }
  this.obj.appendChild(_div);
  this.body.appendChild(this.obj);
  document.getElementById('close').onclick=()=>{
    this.body.removeChild(this.obj);
    
  }
  setTimeout(()=>{
      if(!document.querySelector('.alert')){return};
      this.body.removeChild(this.obj);
  },3000)
  
};

export default Modal;
