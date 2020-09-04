import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "../Link/Link";
import AuthTag from "../GridCards/AuthTag";
import { secondsToDate } from "../../services/utils";

const useStyles = makeStyles((theme) => ({
  headCardRoot: {},
  cardTitle: {
    gridColumn: 2,
    gridRow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardImg: {
    gridColumn: 1,
    gridRow: "1/8",
    width: "100%",
    overflow: "hidden",
  },
  seriesAvatar: {
    display: "flex",
    alignItems: "center",
  },
  intro: {
    lineHeight: 1.5,
  },
  headTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  headRigth: {
    display: "flex",
    flexFlow: "column noWrap",
  },
}));

const HeadCard = ({ info = {} }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.headCardRoot}>
      <Grid item xs={12} md={4}>
        <div className={classes.cardImg}>
          <img
            src={info.image_path}
            alt={info.title}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </Grid>

      <Grid item xs={12} md={8} className={classes.headRigth}>
        <Box className={classes.headTitle}>
          <Typography noWrap>{info.title}</Typography>
          <Typography color="textSecondary" variant="caption" noWrap>
            {`${secondsToDate(info.update_time || info.time)} 更新`}
          </Typography>
        </Box>

        <div>
          {!!info.video_counts && (
            <Typography variant="caption" color="textSecondary">
              {`${info.video_counts} 个视频`}
            </Typography>
          )}
          {!!info.document_counts && (
            <Typography variant="caption" color="textSecondary">
              {`${info.document_counts} 个文件`}
            </Typography>
          )}
        </div>

        <div style={{ overflow: "hidden", flexGrow: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            系列简介:
          </Typography>
          <Tooltip
            placement="top-start"
            title={info.description || "description"}
          >
            <Typography variant="body2" className={classes.intro}>
              {info.description}
            </Typography>
          </Tooltip>
        </div>

        <div>
          {!!info.headshot && (
            <Link
              href={`/excellentcreator/creator/?cid=${info.author_id}`}
              className={classes.seriesAvatar}
            >
              <Avatar
                src={info.headshot}
                alt={info.author_name}
                style={{ height: 30, width: 30, marginRight: 10 }}
              />
              <Typography variant="caption">{info.author_name}</Typography>
              <AuthTag authority={info.authority} />
            </Link>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default HeadCard;
