import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./profileNav.css";


export function Nav(props) {
 
  const [scrollWidth, setScrollWidth] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  React.useEffect(() => {
    let _inx = props._inx || 0;
    let _arr = props.list.slice(0, _inx);
    let _num = _arr.join("").length * 1.125 + _inx * 1.25;
    let _w = props.list[_inx].length * 1.125;
    setScrollWidth(_w);
    setScrollLeft(_num);
  });

  const handleChange = (event) => {
    if (props.onEvent) {
      props.onEvent(parseInt(event.target.dataset.inx) + 1);
    }
  };

  return (
    <main className="nav">
      <div className='root'>
        <div className="box box-align-center fn-r-18 fn-color-2C2C3B">
          {props.list.map((value, inx) => (
            <span
              key={value}
              onClick={handleChange}
              data-inx={inx}
              className={props.list.length > 1 ? "" : "nothover"}
            >
              {value}
            </span>
          ))}
        </div>
        <div
          className='scroll'
          style={{
            transform: "translate(" + scrollLeft + "rem)",
            width: scrollWidth + "rem",
          }}
        ></div>
      </div>
    </main>
  );
}

export function Navbar(props) {
 
  const [val, setVal] = React.useState(0);
  return (
    <main className='nav'>
    <div className={`text-left navbar`}>
      {props.lists.map((v, idx) => (
        <span
          className="fn-size-16"
          key={v}
          style={{ color: val == idx ? "#007CFF" : "#878791" }}
          onClick={() => {
            if (val == idx) {
              return;
            }
            setVal(idx);

            props.onEvent && props.onEvent(idx);
          }}
        >
          {v}
        </span>
      ))}
    </div>
    </main>
  );
}
