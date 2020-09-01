import React from "react";
import Helmet from "react-helmet";
import { Redirect } from "@reach/router";
import Link from "@material-ui/core/Link";
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
      <div>
        <div style={{ visibility: "hidden" }}>
          <div>{info.title}</div>
          <div>{info.keywords}</div>
          <div>{info.description}</div>
        </div>

        <Link href="/" color="secondary">
          返回主页
        </Link>
      </div>
    </Layout>
  );
};

export default SimplePage;
