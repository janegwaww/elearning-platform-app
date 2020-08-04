import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const LineText = ({
  name = "",
  content = "",
  detail = "",
  color = "#2c2c3b",
  mb = 1.5,
}) => {
  const styles = { color, lineHeight: "1.5rem" };
  //此页面的rem 是2020/8/3更改，即为1920宽屏上的实际尺寸/16,1rem为：16/1920*当前屏宽
  /** 2020/8/3 更改 "calc(100% - 210px)"=>"calc(100% - 13.125rem)",marginTop: 20=>marginTop: '1.25rem' */

  return (
    <Box
      style={{
        display: "flex",
        marginBottom: `${mb}rem`,
        alignItems: "baseline",
      }}
    >
      {name && (
        <div style={{ marginRight: "0.62rem",paddingLeft:'4rem',minWidth:'9rem'}}>
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

      <div >
        {content && (
          <Typography style={styles} variant="body2">
            {content}
          </Typography>
        )}
        {detail && (
          <Typography
            style={{ ...styles, marginTop: "1.25rem" }}
            variant="body2"
          >
            {detail}
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default LineText;
