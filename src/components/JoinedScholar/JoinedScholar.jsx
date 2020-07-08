import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Container from "../Container/KeContainer";
import "./JoinedScholarStyles.sass";
import logo from "../../../static/logos/logo.svg";
import scholarData from "./scholarData";

const useStyles = makeStyles((theme) => ({
  maxWidthXs: {
    maxWidth: 1420,
    height: "100%",
  },
  modelBody: {
    position: "absolute",
    width: 800,
    height: 540,
    backgroundColor: "#313134",
    borderRadius: 12,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 40,
  },
  icon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
}));

const Logo = () => (
  <Link href="/">
    <img src={logo} alt="logo" />
  </Link>
);

const JoinButton = () => (
  <ButtonBase
    className="cooperate-button"
    onClick={() => window.open("http://www.haetek.com")}
  >
    合作洽谈
  </ButtonBase>
);

const ContentTitle = () => (
  <Box className="content-title">
    <Typography variant="h3" color="primary">
      在知擎，遇见学术大咖
    </Typography>
    <div className="title-divider" />
    <Typography className="subtitle">Meet our Whiz in KEngine</Typography>
  </Box>
);

const ScholCard = ({ info = {}, handleClick = () => ({}) }) => (
  <Box className="scholar-card" onClick={() => handleClick(info.index)}>
    <div className="card-img">
      <img src={info.headshotBig} alt={info.name} width="100%" height="100%" />
    </div>
    <div className="card-text">
      <div className="card-text-word">
        <Typography className="name">{info.name}</Typography>
        <Typography className="intro" variant="body2">
          {info.introduction1}
        </Typography>
      </div>
    </div>
  </Box>
);

const ModalBody = ({ item, handleClose }) => {
  const classes = useStyles();
  return (
    <div className={classes.modelBody}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <div style={{ height: 196, width: 160 }}>
          <img src={item.headshot} alt={item.name} width="100%" height="100%" />
        </div>
        <div style={{width:520}}>
          <Typography style={{color: '#fff',fontSize:'1.5rem'}}>{item.name}</Typography>
          <Box height={20} />
          <Typography style={{color:'#fff',fontSize:'0.75rem'}}>{item.introduction1}</Typography>
          <Box height={20} />
          <Typography style={{color:'#ccccd1',fontSize:'0.75rem'}}>{item.introduction2}</Typography>
        </div>
      </Box>
      <div className={classes.icon}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

const JoinedScholar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (index) => {
    setOpen(true);
    setItem(scholarData.find((o) => o.index === index));
  };

  return (
    <div className="joined-scholar">
      {/* top bar */}
      <div className="toolbar">
        <Container maxWidth="xs" classes={{ maxWidthXs: classes.maxWidthXs }}>
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            justifyContent="space-between"
          >
            <Logo />

            <JoinButton />
          </Box>
        </Container>
      </div>
      <div className="toolbar-divider" />

      {/* content */}
      <div className="content-background">
        <Container maxWidth="xs" classes={{ maxWidthXs: classes.maxWidthXs }}>
          <Box height="121px" />
          <ContentTitle />

          <Box height="100px" />
          <div className="scholar-grid-container">
            <Grid container spacing={10}>
              {scholarData.map((o) => (
                <Grid item xs={12} md={6} key={o.index}>
                  <ScholCard info={o} handleClick={handleOpen} />
                </Grid>
              ))}
            </Grid>
          </div>
          <Box height="85px" />
        </Container>
      </div>
      <Modal open={open} onClose={handleClose}>
        <ModalBody item={item} handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default JoinedScholar;
