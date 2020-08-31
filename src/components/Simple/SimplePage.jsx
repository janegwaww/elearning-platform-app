import React from "react";
import Helmet from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Layout from "../../layout";

const SimplePage = ({ info = {} }) => {
  return (
    <Layout>
      <Helmet defer={false}>
        <title>{`${info.title}`}</title>
        <meta name="keywords" content={info.keywords} />
        <meta name="description" content={info.description} />
      </Helmet>
      <div>
        <Typography variant="h6">{info.title}</Typography>
        <Typography variant="h6">{info.keywords}</Typography>
        <Typography variant="h6">{info.description}</Typography>
      </div>
    </Layout>
  );
};

export default SimplePage;
