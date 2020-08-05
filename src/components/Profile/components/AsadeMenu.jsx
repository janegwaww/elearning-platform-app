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
              fontSize: '0.875rem',
              paddingLeft: 0,
              margin: "0 -0.375rem",
              padding: ' 0.375rem',
              minHeight:'2rem'
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


