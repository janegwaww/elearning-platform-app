import React from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Img from "gatsby-image";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    height: "480px",
    width: "100%",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      height: "280px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "180px",
    },
  },
}));

const Banner = ({ data }) => {
  const classes = useStyles();
  const handleClick = () => {
    return;
    navigate("/activety/");
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <Img
        fixed={data.file.childImageSharp.fixed}
        alt="banner"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Banner;
