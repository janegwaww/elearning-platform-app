import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import "./TextTemplate.css";
import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  TextRotateVertical,
  TextRotationNone,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10px",
    height: "100%",
  },
  item: {
    width: "33.33%",
  },
  dirPaper: {
    "border-radius": 0,
    "background-color": "#2E2E30",
    border: "1px solid #666666",
    width: "100%",
    height: "100%",
    color: "transparent",
  },
  active: {
    "background-color": "#1B1B1D",
  },
  paper: {
    height: 80,
    width: "100%",
    backgroundColor: "#2E2E30",
    color: "#CCCCD1",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  control: {
    padding: theme.spacing(2),
  },
}));
export default function TextTemplate() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  let inx = 2;
  return (
    <div className="text-template">
      <section>
        <div className="nav-tabs">
          <p>字幕模板</p>
        </div>
        <section>
          <Grid container className={classes.root} spacing={2}>
            {[0, 1, 2, 3].map((value) => (
              <Grid key={value} item className={classes.item}>
                <Paper className={classes.paper}> 字幕模板{value + 1}</Paper>
              </Grid>
            ))}
          </Grid>
        </section>
      </section>
      <section>
        <div className="nav-tabs">
          <p>字幕样式</p>
        </div>
        <section>
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={3}>
              <p style={{ "text-align": "left", margin: 0 }}>字幕定位:</p>
            </Grid>
            <Grid item xs={9}>
              <div className="text-direction">
                <Grid container spacing={0}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].reverse().map((value) => (
                    <Grid key={value} item className={classes.item}>
                      <Paper
                        className={`${classes.dirPaper} ${
                          inx == value ? classes.active : "a"
                        }`}
                      >
                        1
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={3}>
              <p style={{ "text-align": "left", margin: 0 }}>字幕样式:</p>
            </Grid>
            <Grid item xs={9}>
              <p style={{ "text-align": "left", margin: 0 }}>
                <FormatBold />
                <FormatUnderlined />
                <FormatItalic />
                <FormatAlignLeft />
                <FormatAlignCenter />
                <FormatAlignRight />
                <FormatAlignJustify />
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={3}>
              <p style={{ "text-align": "left", margin: 0 }}>文字方向:</p>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                <Grid item>
                  <span>
                    <TextRotateVertical />
                    <span>水平排列</span>
                  </span>
                </Grid>
                <Grid item>
                  <span>
                    <TextRotationNone /> <span>垂直排列</span>
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>
      </section>
    </div>
  );
}
