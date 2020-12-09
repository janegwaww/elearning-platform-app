import React from "react";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { slice, flow, map } from "lodash/fp";
import Link from "../Link/Link";
import Moment from "../Moment";
import {
  CardHeader,
  duration,
  seriesCounts,
  CardTitle,
  headshot,
  viewCounts,
  likeCounts,
  payCounts,
  handleLink,
} from "./GridCardItems";
import "./GridCardsStyles.sass";

const GridCards = ({ items = [], loading = false, itemCount = 0 }) => {
  const match = useMediaQuery("(min-width: 600px)");

  return (
    <Grid container wrap="wrap" spacing={2} className="grid-cards-container">
      {flow(
        slice(0, itemCount),
        map.convert({ cap: false })((i, index) => {
          const item = { ...i, match };
          return (
            <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
              <div className="grid-item">
                {i ? (
                  <div>
                    {/* Grid Card Image Head */}
                    <Link href={handleLink(item).to}>
                      <CardHeader item={item} />
                      {duration(item)}
                      {seriesCounts(item)}
                    </Link>
                    {/* Grid Card Context Body */}
                    <div className="grid-context-box">
                      {/* Card Title */}
                      <Link href={handleLink(item).to} underline="none">
                        <CardTitle item={item} />
                      </Link>
                      {/* User Avatar */}
                      {headshot(item)}
                      {/* User Data */}
                      <div className="grid-card-feedback">
                        <Typography variant="caption" noWrap>
                          {viewCounts(item)}
                          {likeCounts(item)}
                          {payCounts(item)}
                          <Moment date={item.upload_time || item.time} />
                        </Typography>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Skeleton variant="rect" className="grid-img-skeleton" />
                    <div style={{ paddingTop: 10 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                      <Skeleton />
                    </div>
                  </div>
                )}
              </div>
            </Grid>
          );
        }),
      )(loading ? Array.from({ length: itemCount }) : items)}
    </Grid>
  );
};

export default GridCards;
