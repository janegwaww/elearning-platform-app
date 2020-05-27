import React, { Fragment, useState } from "react";
import HomeTab from "./HomeTab";
import GridCards from "./GridCards";

export default function MySubscription() {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  return (
    <Fragment>
      <HomeTab
        tabs={[
          {
            label: "订阅更新",
            tabContent: () => <GridCards itemCount={8} loading={loading1} />
          }
        ]}
      />
      <br />
      <HomeTab
        tabs={[
          {
            label: "推荐订阅",
            tabContent: () => <GridCards itemCount={8} loading={loading2} />
          }
        ]}
      />
    </Fragment>
  );
}
