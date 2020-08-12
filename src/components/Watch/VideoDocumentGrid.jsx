import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import withVideoDocument from "./withVideoDocument";
import GridCards from "../GridCards/GridCards";
import EmptyNotice from "../EmptyNotice/EmptyNotice";

const VideoDocumentGrid = ({ list = [], loading = false }) => {
  return (
    <div>
      <Box>
        {list.length ? (
          <GridCards loading={loading} itemCount={10} items={list} />
        ) : (
          <EmptyNotice empty type="noResult" />
        )}
      </Box>
    </div>
  );
};

export default withVideoDocument(VideoDocumentGrid);
