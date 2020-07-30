import React from 'react';

import {PlayCircleOutline,StarBorderOutlined,FavoriteBorderOutlined
} from "@material-ui/icons";
import fenxiong from '../../assets/img/fenxiang.png';

const Gongneng =({info})=>{
        
    return (
        <div className='box box-align-center fn-color-878791'  style={{marginTop:'4.1em',marginBottom:'0.7em'}}>
            <div className='box-flex'>
                <PlayCircleOutline  style={{width:'0.8em',height:'0.8em'}}/>
                    {info&&info.video_counts}
                
            </div>
            <div className='box-flex'>
            <FavoriteBorderOutlined style={{width:'0.8em',height:'0.8em'}} />
            {info&&info.view_count}
            </div>

            <div className='box-flex'>
                <img src={fenxiong}  style={{width:'1em',height:'1em'}}/>
                {info&&info.fans_counts}
            </div>

            <div className='box-flex'>
            <StarBorderOutlined  style={{width:'0.8em',height:'0.8em'}}/>
            {info&&info.collection_counts}
            </div>
        </div>
    )
}

export default Gongneng;
