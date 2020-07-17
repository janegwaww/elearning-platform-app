import React from "react";
import AllSeries from "./AllSeries";
import DocSeries from "./DocSeries";
import { getIdFromHref } from "../../services/utils";

export default function Series() {
  const { sid } = getIdFromHref();
  return sid ? <AllSeries /> : <DocSeries  />;
}
