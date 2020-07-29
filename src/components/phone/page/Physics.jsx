import React from "react";
import { Nav } from "../component/Nav";
import Item from "../component/Item";

import { Grid, Button } from "@material-ui/core";
import { get_data } from "../../../assets/js/request";
import ProgressBar from "../../Loading/ProgressBar";
import LoadData from "../../Profile/components/LoadData";
import Nofile from '../component/Notfile';
import btnStyle from '../component/BtnStyle';
const Physics = () => {
  const classes = btnStyle();
  const [showdata, setShowData] = React.useState(null);
  const [loginstatus, setLoginstatus] = React.useState(false);
  const [tp, setTp] = React.useState("all");
  React.useEffect(() => {
    update_data("all");
  }, []);

  const update_data = (_type) => {
    setLoginstatus(true);
    get_data({
      extra_data: {
        category: "physics",
        max_size: 12,
        page: 1,
        type: _type || tp,
      },
      model_action: "category_information",
      model_name: "video",
      model_type: "",
    })
      .then((res) => {
        if (res.err == 0) {
          setShowData(res.result_data);
        }else{
            setShowData([])
          }
        setLoginstatus(false);
      })
      .catch((err) => {
        setLoginstatus(false);
      });
  };

  return (
    <div>
    <ProgressBar loading={loginstatus} />
      <div>
        <Nav
          onEvent={(num) => {
            if (num == 1) {
              setTp("all");
              update_data("all");
            } else if (num == 2) {
              setTp("video");
              update_data("video");
            } else if (num == 3) {
              setTp("document");
              update_data("document");
            }
          }}
        />
      </div>

      {showdata ? (
        <Grid container spacing={2}>
          {showdata.length > 0
            ? showdata.map((op) => (
                <Grid item xs={6} key={op.video_id||op.file_id}>
                  <Item info={op} />
                </Grid>
              ))
            : <Nofile onEvent={update_data} />}
        </Grid>
      ) : (
        <LoadData />
      )}

      {showdata && showdata.length > 0 && (
        <div className="text-center" style={{ marginTop: 30 }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => {
              update_data(tp);
            }}
          >
            换一批
          </Button>
        </div>
      )}
    </div>
  );
};

export default Physics;
