import React from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";

const GlobalSearchBar = ({ type, handleTypeClick }) => {
  return (
    <div>
      <Divider />
      <Box className="buttonGrounp">
        <Button
          size="small"
          className={`${type === "all" && "action"}`}
          onClick={() => handleTypeClick("all")}
        >
          全部模态
        </Button>
        <Button
          size="small"
          className={`${type === "video" && "action"}`}
          onClick={() => handleTypeClick("video")}
        >
          单个视频
        </Button>
        <Button
          size="small"
          className={`${type === "series" && "action"}`}
          onClick={() => handleTypeClick("series")}
        >
          系列视频
        </Button>
        <Button
          size="small"
          className={`${type === "document" && "action"}`}
          onClick={() => handleTypeClick("document")}
        >
          单个文本
        </Button>
        <Button
          size="small"
          className={`${type === "documents" && "action"}`}
          onClick={() => handleTypeClick("documents")}
        >
          系列文本
        </Button>
        <Button
          size="small"
          className={`${type === "user" && "action"}`}
          onClick={() => handleTypeClick("user")}
        >
          用户
        </Button>
        <Tooltip title="敬请期待..." placement="top-start">
          <span>
            <Button
              size="small"
              disabled
              className={`${type === "more" && "action"}`}
              onClick={() => handleTypeClick("more")}
            >
              更多模态...
            </Button>
          </span>
        </Tooltip>
      </Box>
      <Divider />
    </div>
  );
};

export default GlobalSearchBar;
