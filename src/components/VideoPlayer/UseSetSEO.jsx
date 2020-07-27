import React, { useEffect } from "react";
import useSEO from "../SEO/useSEO";

export default function UseSetSEO({ info = {} }) {
  const setSEO = useSEO();
  useEffect(() => {
    if (info.title) {
      setSEO({ title: info.category ? info.category[0] : "" })({
        title: info.title,
        description: info.description,
      });
    }
  }, [info.title]);
  return <div />;
}
