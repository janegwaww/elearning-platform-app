import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Cancel from '@material-ui/icons/Cancel'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "80%",
    margin:'auto',
    backgroundColor:'#2C2C3B',
    height:'2.5em',
    borderRadius:'1em',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color:'white',
    fontSize:'1.2em'
    
  },
  iconButton: {
    color:'#fff',
  
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchInput( props) {
  const classes = useStyles();
  const [conter,setConter] = React.useState('');
  const concel_click=()=>{
      props.onEvent&&props.onEvent({
          concel:true,
          config:false
      })
  };
  const config_click=()=>{
    props.onEvent&&props.onEvent({
        concel:false,
        config:true,
        conter:conter
    })
  }

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu" onClick={config_click}>
      <SearchIcon style={{width:'2em',height:'2em'}} />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="支持对整段视频的字幕/语义定位搜索"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(ev)=>{
          
            setConter(ev.target.value);
        }}
      />
      
     
      <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={concel_click}>
        <Cancel style={{width:'2em',height:'2em'}} />
      </IconButton>
    </Paper>
  );
}