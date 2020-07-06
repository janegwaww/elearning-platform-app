import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { MoreHoriz } from "@material-ui/icons";
import Modal from '../../../assets/js/CustomModal';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight: theme.spacing(2),
  },
  popper: {
    left: "50% !important",
    top: "50% !important",
    transform: "translate(-50%,-50%) !important",
    backgroundColor: "#fff",
    padding: "10px",
    "border-radius": "8px",
  },
  moreHoriz: {
    color: "red",
  },
}));
const NewMenuItem = withStyles({
  root: {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
})(MenuItem);
export default function SimpleMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popperEl, setPopperEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const poperOpen = (event) => {
    setPopperEl(popperEl ? null : event.currentTarget);
  };
  const popperClose = (event) => {
    setPopperEl(null);
  };
  // const id = open ? "simple-popper" : undefined;
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz className={classes.moreHoriz} />
      </Button>
      <Menu
        className={classes.paper}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NewMenuItem onClick={handleClose}>复制</NewMenuItem>
        <NewMenuItem
          onClick={(e) => {
        
            if (JSON.stringify(props.parent.state.video_data) != "{}") {
              props.parent.setState({
                uploadStatus: 4,
              });
            } else {
              poperOpen(e);
              setTimeout(() => {
                popperClose();
              }, 3000);
            }
            handleClose();
          }}
        >
          AI字幕
        </NewMenuItem>
        <NewMenuItem onClick={handleClose}>删除</NewMenuItem>
      </Menu>
      {/*<Popper
        id={id}
        open={Boolean(popperEl)}
        anchorEl={popperEl}
        className={classes.popper}
      >
        <div className={classes.paper}>请先上传文件</div>
      </Popper>*/}
    </div>
  );
}
