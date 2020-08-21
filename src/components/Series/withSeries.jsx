import React from "react";
import { getIdFromHref, pipe } from "../../services/utils";

const filterData = (name) => (data = []) => {
  const arr = [];
  data.map((o) => {
    if (o.source === name || name === "all") {
      arr.push(o);
    }
  });
  return arr;
};

const filterSearchData = (input) => (data) => {
  const arr = [];
  data.map((o) => {
    if (
      (o.data.file_name && o.data.file_name.includes(input)) ||
      (o.data.title && o.data.title.includes(input)) ||
      !input
    ) {
      arr.push(o);
    }
  });
  return arr;
};

const sd = (page) => (d) => d.slice((page - 1) * 12, page * 12);

const withSeries = (WrapComponent, getSeriesData, seriesSearch) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        series: [],
        docSeries: [],
        docSeriesLength: 0,
        seriesLength: 0,
        seriesInfo: {},
        type: "video",
        input: "",
        isSearch: false,
        id: "",
      };
    }

    componentDidMount() {
      const { sid, dsid } = getIdFromHref();
      if (sid || dsid) {
        this.setState({ id: sid ? sid : dsid });
        this.fetchSeriesData();
      } else {
        alert("系列不存在～");
      }
    }

    componentDidUpdate(prevProps, prevState) {
      const { type, isSearch, input } = this.state;
      if (type !== prevState.type) {
        if (isSearch && input) {
          this.fetchSearchSeriesData();
        } else {
          this.fetchSeriesData();
        }
      }
    }

    setSeriesState = (page, data = {}) => {
      const { type } = this.state;
      this.setState({
        series: pipe(filterData(type), sd(page))(data.series),
        docSeries: pipe(sd(page))(data.series),
        seriesLength: pipe(filterData(type))(data.series).length,
        docSeriesLength: data.series.length,
        seriesInfo: data.info,
        loading: false,
      });
    };

    fetchSeriesData = (page = 1) => {
      this.setState({ loading: true });
      getSeriesData(getIdFromHref()).then((data) => {
        this.setSeriesState(page, data);
      });
    };

    fetchSearchSeriesData = (page = 1) => {
      const { input, id, type } = this.state;
      this.setState({ loading: true });
      seriesSearch({
        query_string: input,
        series_id: id,
        type,
        max_size: 999,
        page,
      }).then((data) => {
        this.setState({
          series: sd(page)(data),
          docSeries: sd(page)(data),
          docSeriesLength: data.length,
          seriesLength: data.length,
          loading: false,
        });
      });
    };

    handleTypeClick = (name) => {
      this.setState({ type: name });
    };

    handlePage = (event, page) => {
      if (this.state.isSearch) {
        this.fetchSearchSeriesData(page);
      } else {
        this.fetchSeriesData(page);
      }
    };

    handleSearchClick = (value) => {
      // 找到匹配名字的课件或视频
      if (value) {
        this.setState({ input: value, isSearch: true }, () =>
          this.fetchSearchSeriesData(),
        );
      } else {
        this.fetchSeriesData();
      }
    };

    handleInput = (v) => {
      this.setState({ input: v });
    };

    handleEnter = (e) => {
      if (e.key === "Enter") {
        this.handleSearchClick();
      }
    };

    render() {
      return (
        <WrapComponent
          {...this.state}
          {...this.props}
          handlePage={this.handlePage}
          handleTypeClick={this.handleTypeClick}
          handleSearchClick={this.handleSearchClick}
          handleInput={this.handleInput}
          handleEnter={this.handleEnter}
        />
      );
    }
  };
};

export default withSeries;
