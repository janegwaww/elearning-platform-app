import React from "react";
import Helmet from "react-helmet";
import { navigate } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import KeContainer from "../components/Container/KeContainer";
import EmptyNotice from "../components/EmptyNotice/EmptyNotice";

const BlankPage = () => {
  const handleFresh = () => {
    navigate("/");
  };

  return (
    <Layout>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <KeContainer>
        <EmptyNotice empty type="404" handleFresh={handleFresh} />
      </KeContainer>
    </Layout>
  );
};

export default BlankPage;
