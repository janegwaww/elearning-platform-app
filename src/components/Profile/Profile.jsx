import React from "react";
import Helmet from "react-helmet";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";

const Profile = () => {
  return (
    <Layout>
      <Helmet title={`Profile | ${config.siteTitle}`} />
      <div>profile</div>
    </Layout>
  );
};

export default Profile;
