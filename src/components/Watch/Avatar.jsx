import React, { Fragment, useState, useEffect } from "react";
import { navigate } from "gatsby";
import { Paper, Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
/* import Button from "@material-ui/core/Button"; */
/* import TextCollapse from "../Comments/TextCollapse"; */
/* import { subscribeAuth } from "../../services/video"; */
import AuthTag from "../GridCards/AuthTag";

const CREATOR = "/excellentcreator/creator?cid=";

const PersonAvatar = ({ auth = {} }) => {
  const { headshot, introduction, authority } = auth;

  /* 订阅功能暂时取消 */
  /* const [subButton, setSubButton] = useState(false); */
  /* const [chips, setChips] = useState(["资深用户体验设计师"]); */

  /* const handleSub = () => {
   *   setSubButton((prev) => !prev);
   *   const val = subButton ? 0 : 1;
   *   subscribeAuth({ relation_id: user_id, value: val, type: "author" }).then(
   *     (res) => {
   *       res && setSubButton(val);
   *     },
   *   );
   * };
   */
  /* useEffect(() => {
   *   setSubButton(auth.is_subscribe === 1);
   * }, []); */

  return (
    <Fragment>
      <Paper
        elevation={0}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "10px 0",
        }}
      >
        <Avatar
          alt="avatar"
          src={headshot}
          style={{
            marginRight: "8px",
            height: 60,
            width: 60,
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(`${CREATOR + auth.user_id}`, {
              state: { cid: "" },
            })
          }
        />
        <div>
          <div style={{ display: "flex" }}>
            <Typography>{auth.user_name}</Typography>
            <AuthTag authority={authority} />
          </div>
          {/* <div
          style={{
              display: "none",
              alignItems: "center",
              justifyContent: "space-between"
          }}
              >
              <Typography variant="caption">212,103万 订阅</Typography>
              <Button
              size="small"
              style={{ color: "#fc5659" }}
              onClick={() => handleSub()}
              >
              {subButton ? "已订阅" : "+订阅"}
              </Button>
              </div> */}
          <div>
            <Typography variant="caption">{introduction}</Typography>
          </div>
        </div>
      </Paper>
      <Divider />
    </Fragment>
  );
};

export default PersonAvatar;
