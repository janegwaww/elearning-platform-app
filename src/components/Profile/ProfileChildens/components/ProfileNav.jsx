import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
const useStyles= makeStyles(theme => ({
  root:{
    marginLeft:'-10px',
    position:'relative',
    height:34,
    "& span":{
      display:'inline-block',
      margin:'0 10px',
      '&:hover':{
        cursor: 'pointer',
      }
    }
  },
  scroll:{
    position:'absolute',
    width:36,
    height:2,
    'backgroundColor':'#007CFF',
    left:0,
    transition:'all 0.3s',
    bottom:0,
    marginLeft:10,
  },
  navbar:{
      '& span':{
        display:'inline-block',
        marginRight:40,
        '&:hover':{
          cursor: 'pointer',
        }
      }
  }

}))

export  function ProNavbar(props) {
  const classes = useStyles();

  const [scrollWidth,setScrollWidth]=React.useState(props.list[0].length*18);
  const [scrollLeft,setScrollLeft]=React.useState(0);
  const handleChange = (event, newValue) => {
    let left = event.target.offsetLeft;
    let e_w =event.target.clientWidth
    let p_w = event.target.parentNode.clientWidth;
    setScrollWidth(event.target.clientWidth);
    setScrollLeft(event.target.offsetLeft-10);
    if(props.onEvent&&props.list.length>1){
      props.onEvent(parseInt( event.target.dataset.inx)+1);
    }
   
  };
  
  return (
    <div className={classes.root}>
        <div className= 'box box-align-center fn-size-18 fn-color-2C2C3B'>
        {props.list.map((value,inx)=>(<span key={value} onClick={handleChange} data-inx={inx} >{value}</span>))}
          
        </div>
        <div className={classes.scroll}  style={{transform:'translate('+scrollLeft+'px)',width:scrollWidth+'px'}}></div>
        
    </div>
  );
}

export function Navbar(props){
 
  const classes = useStyles();
  const [val,setVal] = React.useState(0)
  return (
    <div className={classes.navbar}>
      { props.lists.map((v,idx)=>(<span className='fn-size-16' key={v} 
      style={{color:val==idx?'#007CFF':'#878791'}}
      onClick={()=>{setVal(idx)}}
      >{v}</span>))}
      
    </div>
  )
}