import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
  Divider,
  IconButton
} from "@material-ui/core";
import { getVideoIntro } from "../../services/video";

const useStyles = makeStyles({
  root: {
    boxShadow: "none"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard({ vid = "" }) {
  const [intro, setIntro] = useState({});
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const fetchIntroduction = () => {
    getVideoIntro({ video_id: vid }).then(data => {
      setIntro(data);
    });
  };

  useEffect(() => {
    fetchIntroduction();
  }, [vid]);

  return (
    <Card className={classes.root}>
      <CardHeader
        title=""
        action={
          <IconButton aria-label="settings" size="small">
            <MoreVertIcon size="inherit" />
          </IconButton>
        }
      >
        <div>header</div>
      </CardHeader>
      <Divider />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
