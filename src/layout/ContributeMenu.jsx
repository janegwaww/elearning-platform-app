import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },

  btn: {
    color: "#fff",
    borderRadius: 20,
    backgroundColor: "#007cff",

    "&:hover": {
      backgroundColor: "#007cff",
    },
  },
  menuList: {
    padding: "0.625rem 0.75rem",

    "& .MuiMenuItem-root": {
      fontSize: "0.875rem",
      color: "#333",
      paddingLeft: 0,
      paddingRight: 0,
      "&:hover": {
        color: "#666",
        backgroundColor: "#eee",
      },
    },
  },
 
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [upStatus,setUpStatus] = React.useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if(event){
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        className={classes.btn}
        onClick={handleToggle}
      >
        投稿
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                  className={classes.menuList}
                >
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      navigate(`/video`);
                      
                    }}
                  >
                    上传视频文件
                  </MenuItem>
                  <MenuItem onClick={(e)=>{
                    handleClose(e);
                    navigate(`/video/uptext`);
                  }}>
                  上传文本文件/工程文件
                
                  </MenuItem>
                  
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
     
    </div>
  );
}
