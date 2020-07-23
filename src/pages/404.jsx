import React from "react";
import { navigate } from "gatsby";
import Helmet from "react-helmet";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import KeContainer from "../components/Container/KeContainer";

const BlankPage = () => {
  return (
    <Layout>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <KeContainer>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <img src="/images/404.svg" alt="404" />
          <Box height={40} />
          <Typography color="textSecondary">
            哎呀,服务器出错了,刷新试试~
          </Typography>
          <Box height={40} />
          <IconButton
            style={{ padding: 0, borderRadius: "50px" }}
            onClick={() => navigate("/")}
          >
            <img src="/images/fresh-404.svg" alt="button" />
          </IconButton>
        </Box>
      </KeContainer>
    </Layout>
  );
};

export default BlankPage;
