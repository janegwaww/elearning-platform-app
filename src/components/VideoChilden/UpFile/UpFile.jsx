import React, { Component } from "react";
import { Add, Minimize,PersonIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import "./UpFile.css";

 

export default class UpFile extends Component {
  constructor(porps) {
    super(porps);
    this.file_pack = React.createRef();
    this.create_file = this.create_file.bind(this);
    this.theElement = this.theElement.bind(this);
    this.del_file_pack = this.del_file_pack.bind(this);
    this.oncon = this.oncon.bind(this);
    this.on_close=this.on_close.bind(this)
    this.state = {
      file_pack: [
        { id: 1, name: "新建文件夹" ,open:false},
        { id: 2, name: "默认文件夹" ,open:false}
      ],
      openId:0
    };
  }
  oncon(el) {
    el.preventDefault();
    let _id = parseInt(el.target.dataset.id);
    let _data = this.state.file_pack;
    if (_id > 2) {
      for (let i = 0; i < _data.length; i++) {
        if (_data[i].id === _id) {
          _data[i].open=true;
        }
      }
     this.setState({file_pack:_data,openId:_id})
    } else {
      return;
    }
  }
  del_file_pack(el) {//删除
    el.stopPropagation();
    let _id =parseInt( el.target.dataset.id);
    let _data = this.state.file_pack;
    let _newData = [];
    if (_id > 2) {
      for (let i = 0; i < _data.length; i++) {
        if (_data[i].id != _id) {
          _newData.push(_data[i]);
        }
      }
      this.setState({
        file_pack: _newData
      });
     
    } 
  }
  reset_name(){//重命名

  }

  create_file() {
    let _data = this.state.file_pack;
    let _nextdata = { id: _data.length + 1, name: "新建文件夹",open:false };
    _data.push(_nextdata);
    this.setState({
      file_pack: _data
    });
  }
  on_close(){
    for(let i=0;i<this.state.file_pack.length;i++){
      if(this.state.openId&&this.state.file_pack[i].id==this.state.openId){
        this.state.file_pack[i].open=false
      }
    }
    this.setState({file_pack:this.state.file_pack});
  }

  new_dialog(bool,id){
    if(bool){
      return ( <ul>
        <li data-id={id} onClick={this.del_file_pack}>删除</li>
        <li data-id={id}>重命名</li>
      </ul>)
    }
  }


  theElement(item) {
    if (item.id == 1) {
      return (
        <section onClick={this.create_file} key={item.id}>
          <div>
            <span data-id={item.id}>
              <Add />
            </span>
          </div>
          <p>{item.name}</p>
       
        </section>
      );
    } else {
      return (
        <section onContextMenu={this.oncon} key={item.id} >
          <div>
            <span data-id={item.id}>
              <Minimize />
            </span>
          </div>
          <p>{item.name}</p>
          {this.new_dialog(item.open,item.id)}
         
        </section>
      );
    }
  }
  render() {
    return (
      <div>
        <div className="add-folder" id="file_pack" ref={this.file_pack} onClick={this.on_close}>
          {this.state.file_pack.map((item, index) => {
            return this.theElement(item);
          })}
        </div>
        
      </div>
    );
  }
}
