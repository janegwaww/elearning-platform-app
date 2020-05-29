import React from "react";
import { MenuList, MenuItem } from "@material-ui/core";
const AsadeMenu = (props) => {
  // console.log(props)
  return (
    <div style={{height:props.open?'auto':'0px',transition:'all 0.5s'}} className='view-overflow'>
      <MenuList>
        {props.menus.map((v, inx) => (
          <MenuItem
            key={v}
            selected={inx == props.info.childpage_id}
            data-inx={inx}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              let _data = JSON.parse(
                JSON.stringify(props.parent.state.nowPage)
              );
              _data.childPage = props.menus[inx];
              _data.childpage_id = inx;
              props.parent.setState({
                nowPage: _data,
              });
            }}
          >
            {v}
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );
};
export default AsadeMenu;
