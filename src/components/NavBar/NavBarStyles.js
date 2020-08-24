import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 0.4,
  },
  toolbar: {
    padding: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoLink: {
    lineHeight: 0,
    [theme.breakpoints.down("md")]: {
      "& img": {
        width: "110px",
      },
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  inputInput: {
    backgroundColor: "#f2f2f5",
    borderRadius: "50px 0 0 50px",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0.5)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    "&::placeholder": {
      fontSize: "0.875em",
    },
  },
  searchButton: {
    padding: "6px 14px",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "0px 50px 50px 0",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    "& .MuiButton-startIcon": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  searchButtonAlone: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    padding: "6px 14px",
    borderRadius: "50px",
    float: "right",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  createButton: {
    borderRadius: "20px",
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  sectionDesktop: {
    display: "flex",
    marginRight: "calc(6%)",
    justifyContent: "space-between",
    width: "calc(12%)",
    [theme.breakpoints.down("md")]: {
      marginRight: 0,
      width: "calc(50%)",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  list: {
    backgroundColor: "#fff",
  },
  menus: {
    display: "none",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexGrow: 0.6,
      justifyContent: "space-evenly",
    },
  },
}));

export default useStyles;
