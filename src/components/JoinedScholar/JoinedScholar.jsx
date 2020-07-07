import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "../Container/KeContainer";
import "./JoinedScholarStyles.sass";
import logo from "../../../static/logos/logo.svg";
import scholarData from "./scholarData";

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
  <Box className="scholar-card" onClick={() => handleClick(o.index)}>
    <div className="card-img">
      <img src={info.headshotBig} alt={info.name} width="100%" height="100%" />
    </div>
    <div className="card-text">
      <div className="card-text-word">
        <Typography className="name">{info.name}</Typography>
        <Typography className="intro">{info.introduction1}</Typography>
      </div>
    </div>
  </Box>
);

const JoinedScholar = () => {
  const handleClick = () => {
    console.log("module");
  };

  return (
    <div className="joined-scholar">
      {/* top bar */}
      <div className="toolbar">
        <Container style={{ height: "100%" }}>
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
        <Container>
          <Box height="121px" />
          <ContentTitle />

          <Box height="100px" />
          <div className="scholar-grid-container">
            <Grid container spacing={10}>
              {scholarData.map((o) => (
                <Grid item xs={12} md={6} key={o.index}>
                  <ScholCard info={o} handleClick={handleClick} />
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default JoinedScholar;
