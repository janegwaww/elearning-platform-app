import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { getVideoDocument } from "../../services/video";

const useStyles = makeStyles(theme => ({
  content: {
    borderRadius: "12px",
    backgroundColor: "#f2f2f5",
    padding: 6
  },
  list: {
    "& .MuiListItem-root:last-child": {
      borderBottom: "none"
    }
  }
}));

export default function VideoDocument({ vid }) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const fetchDoc = () => {
    getVideoDocument({
      max_size: 3,
      page: 1,
      video_id: vid
    }).then(data => setFiles(data));
  };

  useEffect(() => {
    if (vid) {
      fetchDoc();
    }
  }, [vid]);

  return (
    <div>
      <Typography variant="subtitle1">进阶内容</Typography>
      <Typography variant="caption" color="textSecondary">
        阶梯式系统化学习，有章有序，助您小步快跑
      </Typography>
      <div className={classes.content}>
        {files.length ? (
          <List className={classes.list}>
            {files.map((o, i) => (
              <ListItem divider key={i}>
                <Link
                  href={`/document/?did=${o.file_id}`}
                  underline="none"
                  target="_blank"
                  rel="noopener norefferer"
                  color="inherit"
                >
                  <Box height={68} display="flex">
                    <div style={{ marginRight: 10 }}>
                      <img
                        src={o.image_path}
                        alt={o.image_path}
                        height={68}
                        width={100}
                      />
                    </div>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Typography noWrap variant="body2">
                        {o.file_name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                      >{`${o.pay_counts}人购买`}</Typography>
                    </Box>
                  </Box>
                </Link>
              </ListItem>
            ))}
          </List>
        ) : (
          <div style={{ height: "68px", padding: 10 }}>
            <Typography variant="body2">没有进阶内容...</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
