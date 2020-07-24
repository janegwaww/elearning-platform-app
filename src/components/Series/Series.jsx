import React from "react";
import AllSeries from "./AllSeries";
import DocSeries from "./DocSeries";
import { getIdFromHref } from "../../services/utils";
import withId from "../EmptyNotice/withId";

const Series = () => {
  const { sid } = getIdFromHref();
  return sid ? <AllSeries /> : <DocSeries />;
};

export default withId(Series);
