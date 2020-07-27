import React, { useCallback, useState, Fragment } from "react";
import Helmet from "react-helmet";
import SEOContext from "./SEOContext";
import config from "../../../data/SiteConfig";

const SEO = ({ children }) => {
  const [seo, setSeo] = useState({
    title: config.siteTitle,
    keywords: config.siteKeywords,
    description: config.siteDescription,
  });

  const composeStr = (str = "频道") => {
    const concat = (s) => composeStr(`${s} - ${str}`);
    return Object.assign(concat, {
      toString: () => `${str}`,
    });
  };

  const concatTitle = composeStr(config.siteTitleShort);

  const concatKeywords = composeStr(config.siteChannelKeywords);

  const cutDescription = (des = "介绍") => {
    if (des.length > 80) {
      return des.slice(0, 80);
    }
    return des;
  };

  const setSEO = useCallback((site = {}) => {
    setSeo({
      title: concatTitle(site.title).toString(),
      keywords: concatKeywords(site.title).toString(),
      description: site.description,
    });
    return (detail) => {
      setSeo({
        title: concatTitle(site.title)(detail.title).toString(),
        keywords: concatKeywords(site.title)(detail.title).toString(),
        description: cutDescription(detail.description),
      });
    };
  }, []);

  return (
    <>
      <Helmet defaultTitle={config.siteTitle} defer={false}>
        <title>{`${seo.title}`}</title>
        <meta name="keywords" content={seo.keywords} />
        <meta name="description" content={seo.description} />
      </Helmet>
      <SEOContext.Provider value={setSEO}>{children}</SEOContext.Provider>
    </>
  );
};

export default SEO;
