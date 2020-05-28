import React, { Fragment, useState, useEffect } from "react";
import HomeTab from "./HomeTab";
import { getHotAuths } from "../../services/home";
import CreatorBar from "./CreatorBar";

export default function HotAuth() {
  const [auths, setAuths] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuths = () => {
    setLoading(true);
    getHotAuths({ max_size: 2, page: 1, video_size: 4 }).then(data => {
      setAuths(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAuths();
  }, []);

  return (
    <Fragment>
      <br />
      <HomeTab
        tabs={[
          {
            label: "优秀创作者",
            tabContent: () => (
              <Fragment>
                {auths.map((o, i) => (
                  <CreatorBar info={o} key={i} loading={loading} />
                ))}
              </Fragment>
            )
          }
        ]}
      />
    </Fragment>
  );
}
