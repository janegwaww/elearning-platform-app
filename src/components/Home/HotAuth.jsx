import React, { Fragment, useState, useEffect } from "react";
import { getHotAuths } from "../../services/home";

export default function HotAuth() {
  const [auths, setAuths] = useState([]);

  const fetchAuths = () => {
    getHotAuths({ max_size: 2, page: 1, video_size: 4 }).then(data =>
      setAuths(data)
    );
  };

  useEffect(() => {
    fetchAuths();
  }, []);

  return (
    <Fragment>
      <div style={{ backgroundColor: "#F2F2F5", height: 500 }}>
        {auths.map((o, i) => (
          <div
            key={i}
            style={{ width: 100, height: 100, backgroundColor: "#fff" }}
          >
            {o.user_name}
          </div>
        ))}
      </div>
    </Fragment>
  );
}
