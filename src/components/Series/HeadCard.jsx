import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "../Link/Link";
import { secondsToDate } from "../../services/utils";

const HeadCard = ({ info = {} }) => {
  return (
    <div className="head-card-root">
      <div style={{ gridColumn: 1, gridRow: "1/8" }}>
        <img
          src={info.image_path}
          alt={info.title}
          style={{ height: "100%", width: 300 }}
        />
      </div>
      <Box className="card-title">
        <Typography noWrap>{info.title}</Typography>
        <Typography color="textSecondary" variant="caption">
          {`${secondsToDate(info.update_time || info.time)} 更新`}
        </Typography>
      </Box>
      <div style={{ gridColumn: 2, gridRow: 2 }}>
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

      <Box
        style={{
          gridColumn: 2,
          gridRow: "3/7",
          overflow: "hidden",
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          系列简介:
        </Typography>
        <Tooltip
          placement="top-start"
          title={info.description || "description"}
        >
          <Typography variant="body2">{info.description}</Typography>
        </Tooltip>
      </Box>
      <Link
        href={`/excellentcreator/creator/?cid=${info.author_id}`}
        className="series-avatar"
      >
        <Avatar
          src={info.headshot}
          alt={info.author_name}
          style={{ height: 30, width: 30, marginRight: 10 }}
        />
        <Typography variant="caption">{info.author_name}</Typography>
      </Link>
    </div>
  );
};

export default HeadCard;
