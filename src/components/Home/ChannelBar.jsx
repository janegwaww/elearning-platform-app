import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Slider from "react-slick";
import useSEO from "../SEO/useSEO";
import { getCategoryList } from "../../services/home";
import channelList from "./ChannelBarList.json";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./ChannelBar.sass";

const ChannelBar = ({ id = "hots" }) => {
  const [cates, setCates] = useState([]);
  const [loading, setLoading] = useState(false);
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

  /* const fetchBarIcons = () => {
   *   setLoading(true);
   *   getCategoryList({}).then((data = []) => {
   *     setCates(data);
   *     setLoading(false);
   *     setSEO({ title: data.filter((o) => o.id === id).name });
   *   });
   * }; */

  useEffect(() => {
    /* fetchBarIcons(); */
    setCates(channelList);
  }, []);

  const handleChannel = (event, { href, name }) => {
    event.preventDefault();
    navigate(href);
    setSEO({ title: name });
  };

  return !loading && cates.length ? (
    <div className="channel-bar-paper" id="channel-bar-paper-to-back">
      <div className="bar-container">
        <div className="bar-content">
          <Slider {...slickSetting}>
            {cates.map((o) => {
              const cn = id && id === o.id ? "slice-action" : "";
              const href = o.id === "hots" ? "/" : `/channel/?ch=${o.id}`;
              return (
                <Box
                  className={`item ${cn}`}
                  onClick={(e) => handleChannel(e, { href, name: o.name })}
                  key={o.id}
                >
                  <div className="bar-icon">
                    <img src={`${o.web_icon}`} alt={o.name} />
                  </div>
                  <div className="bar-icon">
                    <img src={`${o.web_click_icon}`} alt={o.name} />
                  </div>
                  <div style={{ height: 10 }} />
                  <Typography noWrap align="center" variant="body2">
                    {o.name}
                  </Typography>
                </Box>
              );
            })}
          </Slider>
        </div>
      </div>
      <Divider />
    </div>
  ) : (
    <div>
      <div className="channel-bar-skeletons">
        {Array.from({ length: 12 }).map((o, i) => (
          <Skeleton key={i} variant="rect" width={48} height={48} />
        ))}
      </div>
      <Divider />
    </div>
  );
};

export default ChannelBar;
