import React from "react";
import Helmet from "react-helmet";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import { Button } from "@material-ui/core";
import { navigate } from "@reach/router";
// import styles from 'assets/css/container.css'

const Profile = () => {
  return (
    <Layout>
      <Helmet title={`Profile | ${config.siteTitle}`} />
      <section>
        <div>
          <div>profile</div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(`/video`);
              }}
            >
              
              创作中心
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
