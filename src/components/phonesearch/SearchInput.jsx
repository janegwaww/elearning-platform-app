import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { Search, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    background: "rgba(242,242,245,1)",
    height: "3.5em",
    borderRadius: "1.75em",
    position: "relative",
    width:'84%'
  },
  rootNone: {
    boxShadow: "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize:'1.4em'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    // height: 300,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    background: "rgba(242,242,245,1)",
    zIndex: -1,
    borderRadius: "1.75em",
    border: "1px solid rgba(151,151,151,1)",
    paddingTop: "3.5em",
    "& ul": {
      listStyle: "none",
      "& li": {
        lineHeight: "2em",
        fontSize: "1.6em",
      },
    },
  },
}));

export default function SearchInput(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [isIn, setIsIn] = React.useState(false);
  const [histroy, setHistroy] = React.useState(null);
  React.useEffect(() => {
    let _histroy_search = localStorage.getItem("phone_search");
    if (_histroy_search) {
      setHistroy(JSON.parse(_histroy_search));
    }
  }, []);

  return (
    <Paper
      component="form"
      className={`${classes.root} ${histroy && isIn && classes.rootNone}`}
    >
      <IconButton className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="输入搜索相关的关键词"
        inputProps={{ "aria-label": "search google maps" }}
        value={value}
        onFocus={(ev) => {
          setIsIn(true);
          let _histroy_search = localStorage.getItem("phone_search");
          if (_histroy_search) {
            setHistroy(JSON.parse(_histroy_search));
          }
        }}
        onBlur={(ev) => {
            setTimeout(()=>{setIsIn(false);},100)
          
        }}
        onChange={(ev) => {
          let _txt = ev.target.value;
          props.onChange && props.onChange(_txt);
          setValue(_txt);
        }}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
        onClick={(ev) => {
          setValue("");
          props.onEvent && props.onEvent("clean");
          return false;
        }}
      >
        <Close />
      </IconButton>
      {histroy && isIn && (
        <div className={classes.divider}>
          <ul>
            {histroy.map((va, inx) => (
              <li
                key={"va_" + inx}
                data-txt={va}
                onClick={(ev) => {
                  setValue(ev.target.dataset.txt);
                  props.onChange&&props.onChange(ev.target.dataset.txt);
                }}
              >
                {va}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Paper>
  );
}
