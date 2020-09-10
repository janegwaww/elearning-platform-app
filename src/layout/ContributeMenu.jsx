import React from "react";
import { Button, Link } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import { navigate } from "@reach/router";
import LoginModal from "../assets/template/LoginModal";
import { getUser, isLoggedIn } from "../services/auth";
import "../assets/css/contributemenu.css";

export default function MenuListComposition(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [upStatus, setUpStatus] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const handleToggle = () => {
    if (!isLoggedIn()) {
      setIsLogin(true);
      return;
    }

    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, pagenum) => {
    if (event) {
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

  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <LoginModal
      open={isLogin}
      onEvent={(msg) => {
        // if(msg.confirm){
        //   navigate(`/users/login`);
        // }
        setIsLogin(false);
      }}
    >
      <div className="muncon">
        <div className="root">
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            className="btn"
            onClick={handleToggle}
          >
            {props.title}投稿
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            className="lists"
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
                      className="menuList"
                    >
                      <MenuItem
                        onClick={() => {
                          if (props.title) {
                            navigate(`/video/?page=zhiqing`);
                          } else {
                            navigate(`/video/`);
                          }
                        }}
                      >
                        上传视频
                      </MenuItem>
                      <MenuItem onClick={()=>{
                        if(props.title){
                          navigate(`/video/zhiqingtext`);
                        }else{
                          navigate(`/video/uptext`);
                        }
                      }}>
                          上传文本
                        
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </LoginModal>
  );
}
