import React from "react";
import { MenuList, MenuItem } from "@material-ui/core";
import { navigate, Link } from "@reach/router";
export const RightMenu = (props) => {
  
  return (
    <div
      style={{ height: props.open ? "auto" : "0px", transition: "all 0.5s" }}
      className="view-overflow"
    >
      <MenuList>
        {props.menus.map((v, inx) => (
          <MenuItem
            key={v.title}
            data-inx={inx}
            className= {inx==props._inx?"fn-color-007CFF":''} 
            style={{
              fontSize: 14,
              paddingLeft: 0,
              margin: "0 -6px",
              padding: 6,
            }}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              if (v._url) {
                navigate(`${v._url}`);
              }
            }}
          >
            {v.title}
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );
};

export const AsadeMenu = (props) => {
  // console.log(props)
  return (
    <div
      style={{ height: props.open ? "auto" : "0px", transition: "all 0.5s" }}
      className="view-overflow"
    >
      <MenuList>
        {/** selected={inx == props.info.childpage_id||(props.info.parent=="CreateCenter"&&props.info.childpage_id==3&&inx===0)}*/}
        {props.menus.map((v, inx) => (
          <MenuItem
            key={v}
            data-inx={inx}
            className={
              inx == props.info.childpage_id ||
              (props.info.parent == "CreateCenter" &&
                props.info.childpage_id == 3 &&
                inx === 0)
                ? "fn-color-007CFF"
                : ""
            }
            style={{
              fontSize: 14,
              paddingLeft: 0,
              margin: "0 -6px",
              padding: 6,
            }}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              let _data = JSON.parse(
                JSON.stringify(props.parent.state.nowPage)
              );
              if (_data.childpage_id === inx) {
                return;
              }
              _data.childPage = props.menus[inx];
              _data.childpage_id = inx;
              props.parent.setState({
                nowPage: _data,
              });
              sessionStorage.setItem("now_page", JSON.stringify(_data));
            }}
          >
            {v}
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );
};
