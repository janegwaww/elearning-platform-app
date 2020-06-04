import React from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ComputerIcon from "@material-ui/icons/Computer";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    width: "100%"
  }
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const texts = [
    "金融",
    "管理",
    "人工智能",
    "数学",
    "物理",
    "电子工程",
    "机械工程",
    "游戏开发",
    "python",
    "前端",
    "后台",
    "计算机系统",
    "设计"
  ];

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} color="inherit" onClick={handleClick}>
        <Typography>频道</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{ paper: classes.paper }}
      >
        <Container fixed>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            {texts.map((o, i) => (
              <Button
                startIcon={<ComputerIcon />}
                onClick={() => {
                  navigate(`/channel/`, {
                    state: {
                      name: o,
                      index: (i + 1).toString().padStart(3, "0")
                    }
                  });
                  handleClose();
                }}
                key={o}
              >
                {o}
              </Button>
            ))}
          </div>
        </Container>
      </Popover>
    </div>
  );
}
