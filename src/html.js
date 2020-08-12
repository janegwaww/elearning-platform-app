import React from "react";
import PropTypes from "prop-types";
import config from "../data/SiteConfig";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content={config.siteDescription} />
        <meta name="keywords" content={config.siteKeywords} />
         <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        /> 
        {props.headComponents}
        <link rel="shortcut icon" type="image/png" href="/logos/logo-48.png" />
        <meta name="baidu-site-verification" content="ErkXTkR7bR" />
        <title>知擎（KEngine） - 开动遨游知识海洋的引擎</title>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};
