import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const LineText = ({
  name = "",
  content = "",
  detail = "",
  color = "#2c2c3b",
  mb = 20,
}) => {
  const styles = { color, lineHeight: "24px" };
  return (
    <Box
      style={{
        display: "flex",
        marginBottom: `${mb}px`,
        alignItems: "baseline",
      }}
    >
      {name && (
        <div style={{ width: 200, marginRight: 10 }}>
          <Typography
            color="textSecondary"
            variant="body2"
            gutterBottom
            align="right"
          >
            {`${name} :`}
          </Typography>
        </div>
      )}
      <div style={{ maxWidth: "calc(100% - 210px)" }}>
        {content && (
          <Typography style={styles} variant="body2">
            {content}
          </Typography>
        )}
        {detail && (
          <Typography style={{ ...styles, marginTop: 20 }} variant="body2">
            {detail}
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default LineText;
