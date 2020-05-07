import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    },
    secondary: {
      main: "#007cff"
    },
    error: {
      main: "#fa5555"
    },
    background: {
      default: "#fff"
    }
  },
  status: {
    danger: red.A400
  }
});

export default theme;
