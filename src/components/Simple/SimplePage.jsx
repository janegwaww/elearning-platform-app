import React from "react";
import Helmet from "react-helmet";
import { Redirect } from "@reach/router";
import Link from "@material-ui/core/Link";
import Layout from "../../layout";

const SimplePage = ({ pageContext: { item } }) => {
  return (
    <Layout>
      <Helmet defer={false}>
        <title>{`${item.title}`}</title>
        <meta name="keywords" content={item.keywords} />
        <meta name="description" content={item.description} />
      </Helmet>
      {/* <Redirect noThrow to="/" /> */}
      <div>
        <div style={{ visibility: "hidden" }}>
          <div>{item.title}</div>
          <div>{item.keywords}</div>
          <div>{item.description}</div>
        </div>

        <Link href="/" color="secondary">
          返回主页
        </Link>
      </div>
    </Layout>
  );
};

export default SimplePage;
