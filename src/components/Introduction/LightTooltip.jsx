import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(242,242,245,1)",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrow: {
    color: "rgba(242,242,245,1)",
  },
}))(Tooltip);

export default LightTooltip;
