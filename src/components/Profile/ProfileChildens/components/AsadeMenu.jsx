import React from 'react';
import {Container,MenuList,MenuItem} from '@material-ui/core';
const AsadeMenu=(props)=>{
        
    return(
        <MenuList open={props.open} id={props.id}  >
        {props.menus.map((v)=>(<MenuItem key={v} selected={v==props.menus[0]}>{v}</MenuItem>))}
        
        </MenuList>
    )
}
export default AsadeMenu;