import { makeStyles } from "@material-ui/core/styles";
const userStyles = makeStyles((theme) => ({
    gird: {
      margin: -10,
      width: "calc(100% + 20px)",
      marginTop: 30,
      "& >.MuiGrid-item": {
        padding: "0 10px",
      },
    },
  }));

  export default userStyles;