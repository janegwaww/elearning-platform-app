import React from 'react';

import logo from '../../../../static/logos/logo.svg';
import {SearchOutlined} from '@material-ui/icons';
import style from './style.module.css';
import { navigate } from '@reach/router';
const Head =(props)=>{


    return(
        <header className='box box-align-center box-between' style={{padding:'1.2em 0'}}>
            <img src={logo} alt='logo'></img>
            <div className= {`box box-align-center ${style.fn16}`} >
                <SearchOutlined />
                <p ><span className='fn-color-007CFF' style={{marginLeft:'2em'}}
                onClick={()=>{
                    navigate(`/users/login`);
                    window.history.go();
                }}>登录&nbsp;/&nbsp;</span>注册</p>
            </div>
        </header>
    )
}
export default Head;