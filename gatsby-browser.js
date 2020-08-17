import React from "react";
import prevHref from "./src/services/prevHref";

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation) {
    prevHref.set(prevLocation.href);
  }
};
