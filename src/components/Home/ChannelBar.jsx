import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { getCategoryList } from "../../services/home";
import "./ChannelBar.sass";

function ChannelBar({ id = "hots" }) {
  const [cates, setCates] = useState([]);

  const fetchBarIcons = () => {
    getCategoryList({}).then((data) => {
      setCates(data);
    });
  };

  useEffect(() => {
    fetchBarIcons();
  }, []);

  return cates.length ? (
    <Box className="channel-bar-paper">
      <Box className="bar-container">
        <div className="bar-content">
          {cates.map((o) => {
            const cn = id && id === o.id ? "slice-action" : "";
            const href = o.id === "hots" ? "/" : `/channel/?ch=${o.id}`;
            return (
              <Link
                key={o.id}
                href={href}
                state={{ id: o.id }}
                underline="none"
                color="textPrimary"
              >
                <Box className={`item ${cn}`}>
                  <div>
                    <img
                      src={`${o.web_icon}`}
                      alt={o.name}
                      width="48"
                      height="48"
                    />
                  </div>
                  <div>
                    <img
                      src={`${o.web_click_icon}`}
                      alt={o.name}
                      width="48"
                      height="48"
                    />
                  </div>
                  <Typography noWrap align="center">
                    {o.name}
                  </Typography>
                </Box>
              </Link>
            );
          })}
        </div>
      </Box>
      <Divider />
      <br />
    </Box>
  ) : null;
}

export default ChannelBar;
