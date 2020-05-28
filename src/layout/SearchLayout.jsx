import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";

export default function SearchLayout({ children }) {
  const [input, setInput] = useState("");
  const [refInput, setRefInput] = useState("");

  const handleSearch = e => {
    e.preventDefault();
    setRefInput(input);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" color="inherit">
        <div style={{ backgroundColor: "#2c2c3b", height: 40 }}>
          <Container>
            <nav>
              <a href="#">知擎首页</a>
              <a href="#">频道</a>
              <a href="#">我的订阅</a>
              <a href="#">优秀创作者</a>
              <a href="#">下载APP</a>
            </nav>
          </Container>
        </div>
        <Container>
          <Toolbar>
            <InputBase onChange={e => setInput(e.target.value)} />
            <div onClick={handleSearch}>搜索</div>
          </Toolbar>
        </Container>
      </AppBar>
      <div>{children(refInput)}</div>
    </div>
  );
}
