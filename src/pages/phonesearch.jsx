import React from "react";
import SeacchInput from "../components/phonesearch/SearchInput";
import style from "../components/phone/component/style.module.css";

import { NewNav } from "../components/phone/component/Nav";
import { Grid, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Helmet from "react-helmet";
import { get_data } from "../assets/js/request";
import { switch_time } from "../assets/js/totls";
import ProgressBar from "../components/Loading/ProgressBar";
import LoadData from "../components/Profile/components/LoadData";
import btnStyle from "../components/phone/component/BtnStyle";
import Nofile from "../components/phone/component/Notfile";
import { navigate } from "@reach/router";
import { data } from "jquery";
export default function Search() {
  const classes = btnStyle();
  const [searchvalue, setSearchvalue] = React.useState("");
  const [tp, setTp] = React.useState("all");
  const [searchdata, setSerchdata] = React.useState(null);
  const [loading, setLodaing] = React.useState(false);
  const [insearch, setInsearch] = React.useState(false);
  const [searchcount, setSearchcount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [pageNum, setPageNum] = React.useState(12);
  const [fontSize, setFontSize] = React.useState(10);
  const btn_search = (_tp, _page) => {
    setLodaing(true);
    setInsearch(true);
    get_data({
      extra_data: {
        query_string: searchvalue,
        video_ids: [],
        max_size: pageNum,
        type: _tp || tp,
        page: _page || page,
      },
      model_action: "global_search",
      model_name: "video",
      model_type: "",
    })
      .then((res) => {
        setLodaing(false);
        setInsearch(false);
        let _data = res.result_data;
        for (let i = 0; i < _data.length; i++) {
          let _tex = _data[i].match_frame.whole_str;
          let str = {};
          let _now=''
          _data[i].match_frame.subtitle_dist.forEach((opt)=>{
              console.log(opt)
              _now +=opt[0]
          }) 
            
          str.now =_now ;
          str.prv = _tex.substring(0, _tex.indexOf(_now));
          str.next = _tex.substring(
            _tex.indexOf(_now) + searchvalue.length
          );
          console.log(str)
          _data[i].str = str;
        }
        if (res.count >= pageNum * page) {
          setPage((old) => old + 1);
        }
        setSearchcount(res.count);
        setSerchdata(_data);
      })
      .catch((err) => {
        setLodaing(false);
        setInsearch(false);
      });
  };
  const change_seach = (txt) => {
    setSearchvalue(txt);
  };
  React.useEffect(() => {
    setFontSize((10 / 414) * window.screen.width);
  }, []);
  return (
    <section style={{ fontSize: fontSize }}>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1"
        />
        <title>知擎</title>
        <meta http-equiv="Expires" content="0" />
        <meta http-equiv="Cache-Control" content="no-cache" />
        <meta http-equiv="Pragma" content="no-cache" />
        <line
          type="text/css"
          rel="stylesheet"
          href="../assets/css/tootls.css"
        />
      </Helmet>
      <ProgressBar loading={loading} />
      <div style={{ padding: "0 2em", height: "4em" }} className="all-width">
        <div
          className=" box box-align-center box-between"
          style={{ position: "absolute", zIndex: 5, width: "88%" }}
        >
          <SeacchInput
            onEvent={(_text) => {
              setSearchvalue("");
            }}
            onChange={(_text) => {
              change_seach(_text);
            }}
          />
          <div
            className={`fn-color-007CFF ${style.fn16}`}
            style={{
              padding: "0.8em",
            }}
            onClick={() => {
              setPage((old) => 1);
              let save_search = localStorage.getItem("phone_search")
                ? JSON.parse(localStorage.getItem("phone_search"))
                : [];
              save_search.unshift(searchvalue);

              let arr = [...new Set(save_search)];
              localStorage.setItem("phone_search", JSON.stringify(arr));
              btn_search(tp, 1);
            }}
          >
            确定
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div style={{ padding: " 0 1.7em" }}>
        {searchvalue ? (
          <div>
            {insearch ? (
              <div style={{ lineHeight: "4em", fontSize: "1.4em" }}>
                正在为你搜索中...
              </div>
            ) : (
              <p style={{ lineHeight: "4em", fontSize: "1.4em" }}>
                {searchcount}个
                <span className="fn-color-007CFF">{searchvalue}</span>相关的
              </p>
            )}
          </div>
        ) : (
          <div style={{ lineHeight: "4em", fontSize: "1.4em" }}></div>
        )}
        <div className="line"></div>
        <div style={{ fontSize: fontSize - 2 }}>
          <NewNav
            list={["全部模态", "单个视频", "系列视频", "单个文本", "系列文本"]}
            onEvent={(num) => {
              let _tp = "";
              if (num == 5) {
                _tp = "documents";
              } else if (num == 4) {
                _tp = "document";
              } else if (num == 3) {
                _tp = "series";
              } else if (num == 2) {
                _tp = "video";
              } else {
                _tp = "all";
              }
              if (tp == _tp) {
                return;
              }
              setTp(_tp);
              btn_search(_tp, 1);
            }}
          />
          {insearch ? (
            <LoadData />
          ) : (
            <main className="all-width">
              {searchdata && searchdata.length > 0 ? (
                searchdata.map((op, inx) => (
                  <Grid
                    container
                    spacing={1}
                    style={{ paddingTop: "1em" }}
                    key={"search_" + inx}
                    onClick={() => {
                      if (op.source == "video") {
                        navigate(`/phoneplay?vid=${op.data.video_id}`);
                      } else if (op.source == "document") {
                        navigate(`/document/?did=${op.data.file_id}`);
                        window.history.go();
                      } else if (op.source == "documents") {
                        navigate(`/series/?dsid=${op.data.series_id}`);
                        window.history.go();
                      } else {
                        navigate(`/series/?sid=${op.data.series_id}`);
                        window.history.go();
                      }
                    }}
                  >
                    <Grid item xs={6}>
                      <div
                        className="all-width all-height bg-all view-overflow"
                        style={{ borderRadius: "1em",maxHeight:'10em' }}
                      >
                        <img
                          src={op.data.image_path}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div
                        className="box box-between all-height"
                        style={{ flexDirection: "column" }}
                      >
                        <div>
                          <div className={`text-overflow ${style.fn16} `}>
                            {op.data.title ||
                              op.data.file_title ||
                              op.data.video_title ||
                              op.data.file_name}
                          </div>
                          {op.source == "document" ||
                          op.source == "documents"||op.source=='series' ? (
                            <div
                              style={{ marginTop: "1em" }}
                              className="textview-overflow four"
                            >
                              {op.str.prv}
                              <span style={{ color: "#2A32F9" }}>
                                {op.str.now}
                              </span>
                              {op.str.next}{" "}
                            </div>
                          ) : (
                            <div
                              style={{ marginTop: "1em" }}
                              className="text-overflow"
                            >
                              【{switch_time(op.match_frame.start_time, ":")}
                              】&nbsp;
                              {op.str.prv}
                              <span style={{ color: "#2A32F9" }}>
                                {op.str.now}
                              </span>
                              {op.str.next}
                            </div>
                          )}
                        </div>
                        {op.source != "document" ||
                          op.source != "documents" && (
                            <Grid
                              container
                              spacing={1}
                              className="box-align-center"
                            >
                              <Grid item xs={2}>
                                <Avatar
                                  src={op.data.headshot}
                                  style={{ width: "1.5em", height: "1.5em" }}
                                />
                              </Grid>
                              <Grid item xs={10}>
                                {op.data.user_name}
                              </Grid>
                            </Grid>
                          )}
                      </div>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Nofile
                  not={true}
                  msg={
                    !searchdata
                      ? "输入关键词试试吧"
                      : "没有搜索到相关内容，请换一个关键词试试"
                  }
                />
              )}
              {searchcount > page * pageNum && (
                <div className="text-center" style={{ marginTop: "1.5em" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={() => {
                      document.body.scrollTop = document.documentElement.scrollTop = 0;
                      btn_search(tp, page);
                    }}
                  >
                    下一页
                  </Button>
                </div>
              )}
            </main>
          )}
        </div>
      </div>
    </section>
  );
}
