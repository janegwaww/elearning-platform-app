import React from "react";
import Helmet from "react-helmet";
import { Redirect } from "@reach/router";
import Layout from "../../layout";

const SimplePage = ({ info = {} }) => {
  return (
    <Layout>
      <Helmet defer={false}>
        <title>{`${info.title}`}</title>
        <meta name="keywords" content={info.keywords} />
        <meta name="description" content={info.description} />
      </Helmet>
      <Redirect noThrow to="/" />
    </Layout>
  );
};

export default SimplePage;
