import React from "react";
import moment from "moment";
import Moment from "react-moment";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import "moment/min/locales";

// Sets the moment instance to use.
Moment.globalMoment = moment;

// Set the locale for every react-moment instance to Chinese simple.
Moment.globalLocale = "Zh-cn";

// Set the output format for every react-moment instance.
/* Moment.globalFormat = "YYYY-MM-D"; */

// Set the output timezone for local for every instance.
Moment.globalLocal = true;

// Use a <span> tag for every react-moment instance.
Moment.globalElement = "span";

const MomentDisplay = ({ date = "" }) => {
  return date ? (
    <Tooltip title={new Date(date * 1000).toISOString()} placement="top-start">
      <Typography
        variant="caption"
        color="textSecondary"
        className="upload-time-title"
        noWrap
      >
        <Moment fromNow>{date * 1000}</Moment>
        发布
      </Typography>
    </Tooltip>
  ) : null;
};

export default MomentDisplay;
