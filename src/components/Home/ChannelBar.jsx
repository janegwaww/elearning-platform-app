import React, { useState } from "react";
import { navigate, useStaticQuery, graphql } from "gatsby";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";
import map from "lodash/fp/map";
import useSEO from "../SEO/useSEO";
/* import { getCategoryList } from "../../services/home"; */
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./ChannelBar.sass";

const ChannelBar = ({ id = "hots" }) => {
  const setSEO = useSEO();
  const slickSetting = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 12,
    slidesToScroll: 12,
    className: "channel-slider",
    dotsClass: "slick-dots slick-thumb",
    arrows: false,
    customPaging: function (i) {
      return <div className="custom-dot" />;
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
    ],
  };
  const data = useStaticQuery(graphql`
    query {
      allChannelBarListJson {
        edges {
          node {
            name
            web_click_icon
            web_icon
            id
          }
        }
      }
    }
  `);

  const handleChannel = (event, { href, name }) => {
    event.preventDefault();
    navigate(href);
    setSEO({ title: name });
  };

  return (
    <div className="channel-bar-paper" id="channel-bar-paper-to-back">
      <div className="bar-container">
        <div className="bar-content">
          <Slider {...slickSetting}>
            {map(({ node }) => {
              const cn = id && id === node.id ? "slice-action" : "";
              const href = node.id === "hots" ? "/" : `/channel/?ch=${node.id}`;
              return (
                <div
                  className={`item ${cn}`}
                  onClick={(e) => handleChannel(e, { href, name: node.name })}
                  key={node.id}
                >
                  <div className="bar-icon">
                    <img src={`${node.web_icon}`} alt={node.name} />
                  </div>
                  <div className="bar-icon">
                    <img src={`${node.web_click_icon}`} alt={node.name} />
                  </div>
                  <div style={{ height: 10 }} />
                  <Typography noWrap align="center" variant="body2">
                    {node.name}
                  </Typography>
                </div>
              );
            })(data.allChannelBarListJson.edges)}
          </Slider>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ChannelBar;
