import React, { Component } from "react";
import { Add, Minimize,PersonIcon } from "@material-ui/icons";
import { Dialog ,List,ListItem,ListItemAvatar,Avatar, ListItemText} from "@material-ui/core";
import "./UpFile.css";

 



export default class UpFile extends Component {
  constructor(porps) {
    super(porps);
    this.file_pack = React.createRef();
    this.create_file = this.create_file.bind(this);
    this.theElement = this.theElement.bind(this);
    this.del_file_pack = this.del_file_pack.bind(this);
    this.oncon = this.oncon.bind(this);
    this.state = {
      file_pack: [
        { id: 1, name: "新建文件夹" },
        { id: 2, name: "默认文件夹" }
      ],
      open:false
    };
  }
  oncon(el) {
    el.preventDefault();
    let _id = parseInt(el.target.dataset.id);
    console.log(_id)
    if (_id > 2) {
      this.setState({
        open:true
      })
    } else {
      return;
    }
  }
  del_file_pack(el) {
    let _id = el.target.dataset.id;
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
   
    } else {
      return;
    }
  }
  

  create_file() {
    let _data = this.state.file_pack;
    let _nextdata = { id: _data.length + 1, name: "新建文件夹" };
    _data.push(_nextdata);
    this.setState({
      file_pack: _data
    });
  }
  newdialog(props) {
    // button onClick={() => handleListItemClick(email)} key={email}
    // button onClick={() => handleListItemClick(email)} key={email}
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={this.state.open} onClose={()=>this.setState({open:false})}>
        <List>
          <ListItem>
            <ListItemText primary="重命名" />
          </ListItem>
          <ListItem>
            <ListItemText primary="删除" />
          </ListItem>
        </List>
      </Dialog>
    );
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
        <section onContextMenu={this.oncon} key={item.id}>
          <div>
            <span data-id={item.id} onClick={this.del_file_pack}>
              <Minimize />
            </span>
            {this.newdialog()}
          </div>
          <p>{item.name}</p>
        </section>
      );
    }
  }
  render() {
    return (
      <div>
        <div className="add-folder" id="file_pack" ref={this.file_pack}>
          {this.state.file_pack.map((item, index) => {
            return this.theElement(item);
          })}
        </div>
      </div>
    );
  }
}
