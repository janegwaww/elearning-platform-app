import React from 'react';

import {PlayCircleOutline,StarBorderOutlined,FavoriteBorderOutlined
} from "@material-ui/icons";
import fenxiong from '../../assets/img/fenxiang.png';

const Gongneng =({info})=>{
        
    return (
        <div className='box box-align-center fn-color-878791'  style={{marginTop:'4.1em',marginBottom:'0.7em'}}>
            <div className='box-flex'>
                <PlayCircleOutline  style={{width:'1.5em',height:'1.5em'}}/>
                &nbsp;&nbsp; {info&&info.video_counts}
                
            </div>
            <div className='box-flex'>
            <FavoriteBorderOutlined style={{width:'1.5em',height:'1.5em'}} />
            &nbsp;&nbsp;{info&&info.view_counts}
            </div>

            <div className='box-flex'>
                <img src={fenxiong}  style={{width:'1em',height:'1em'}}/>
                &nbsp;&nbsp; {info&&info.fans_counts}
            </div>
            <div className='box-flex'>
            <StarBorderOutlined  style={{width:'1.5em',height:'1.5em',transform:'translateY(-5px)'}}/>
            &nbsp;&nbsp; {info&&info.collection_counts}
            </div>
        </div>
    )
}

export default Gongneng;
