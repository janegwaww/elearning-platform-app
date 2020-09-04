import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import Container from "../Container/KeContainer";

const useStyles = makeStyles(() => ({
  authAvatar: {
    display: "grid",
    gridTemplateColumns: "66px auto",
    gridTemplateRows: "repeat(4,1fr)",
    gap: "2px 20px",
  },
  subButton: {
    backgroundColor: "#fc5659",
    padding: "4px 6px",
    borderRadius: 4,
    color: "#fff",
  },
  mesButton: {
    backgroundColor: "#fdc44f",
    padding: "4px 6px",
    borderRadius: 4,
    color: "#fff",
  },
}));

const CreatorAvatar = ({ auth }) => {
  const classes = useStyles();
  const {
    user_name,
    headshot,
    introduction,
    description_counts = 0,
    fans_counts = 0,
    like_counts = 0,
    view_counts = 0,
    user_id,
  } = auth;

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={9}>
          <div className={classes.authAvatar}>
            <div
              style={{
                gridColumn: 1,
                gridRow: "1/5",
              }}
            >
              <div
                style={{
                  padding: 10,
                  marginTop: -40,
                  borderRadius: 50,
                  height: 80,
                  width: 80,
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={headshot}
                  alt={user_name}
                  style={{ width: 66, height: 66 }}
                />
              </div>
            </div>
            <Typography variant="body2">{user_name}</Typography>
            <Typography
              variant="caption"
              color="textSecondary"
            >{`ID: ${user_id}`}</Typography>
            <div style={{ gridRow: "3/5" }}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="pre"
                noWrap
              >
                {introduction}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <span>获赞数</span>
                <span>{like_counts}</span>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <span>播放量</span>
                <span>{view_counts}</span>
              </Box>
            </div>
          </Typography>
          <div
            style={{
              justifyContent: "space-evenly",
              padding: "8px 0",
              display: "none",
            }}
          >
            <ButtonBase className={classes.subButton}>+订阅</ButtonBase>
            <ButtonBase className={classes.mesButton}>发消息</ButtonBase>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatorAvatar;
