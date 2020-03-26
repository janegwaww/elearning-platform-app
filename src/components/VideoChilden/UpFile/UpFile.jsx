import React, { Component } from "react";
import { Add, Minimize } from "@material-ui/icons";
import "./UpFile.css";

export default class UpFile extends Component {
  constructor(porps) {
    super(porps);
  }
  render() {
    return (
      <div>
        <div className="add-folder">
          <section>
            <div>
              <span>
               
                <Add />
              </span>
            </div>
            <p>新建文件夹</p>
          </section>
          <section>
            <div>
              <span>
                <Minimize />
              </span>
            </div>
            <p>默认文件夹</p>
          </section>
        </div>
      </div>
    );
  }
}
