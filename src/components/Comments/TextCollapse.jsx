import React, { useState, useRef } from "react";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

export default function TextCollapse({ children }) {
  const [checked, setChecked] = useState(false);
  let collapse = useRef(null);

  const handleChange = e => {
    e.preventDefault();
    setChecked(prev => !prev);
  };

  return (
    <div>
      <Collapse
        in={checked}
        collapsedHeight={30}
        ref={ref => {
          collapse = ref;
        }}
      >
        <Paper elevation={4} style={{ boxShadow: "none" }}>
          {children}
        </Paper>
      </Collapse>
      <div style={{ marginTop: 8 }} />
      <Link href="#" onClick={handleChange} color="secondary">
        {!checked ? "展开" : "收起"}
      </Link>
    </div>
  );
}
