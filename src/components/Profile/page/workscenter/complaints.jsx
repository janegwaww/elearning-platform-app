import React from "react";
import { Nav, Navbar } from "../../components/ProfileNav";
import { get_data } from "../../../../assets/js/request";
import ProgressBar from "../../../Loading/ProgressBar";
import { ModalDialog } from "../../components/Modal";
import Pagination from "@material-ui/lab/Pagination";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import notcom from "../../../../assets/img/notcom.png";

export default class Complaints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page_type: "complaints",
      total_counts: 0,
      total_data: null,
      show_data: null,
      show_counts: 9,
      show_page: 0,

      login_status: false,
      modalMsg: {
        open: false,
        type: 1,
        msg: "",
        title: "申诉",
      },
    };
    this.update_data = this.update_data.bind(this);
  }
  componentDidMount() {
    let _data = [
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 3,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 3,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 2,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 1,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 2,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 1,
      },
      {
        title: "在评论中发攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 2,
      },
      {
        title: "在评布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 3,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 2,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 5,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 2,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 3,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 1,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 3,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 2,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 3,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 1,
      },
      {
        title: "在评论中发布人身攻击",
        date: "2020-02-04 12:23:32",
        result: "封禁15天",
        status: 2,
      },
    ];
    this.setState({
      total_counts: _data.length,
      total_data: _data,
      show_data: _data.slice(
        this.state.show_page * this.state.show_counts,
        (this.state.show_page + 1) * this.state.show_counts
      ),
    });
  }
  update_data() {}
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const {
      page_type,
      total_counts,
      total_data,
      show_data,
      show_counts,
      show_page,
      modalMsg,

      login_status,
      ...other
    } = this.state;

    return (
      <section className="profile-padding">
        <ProgressBar loading={login_status} />
        <div>
          <Nav list={["申诉管理"]} parent={this} _inx={0} />
        </div>
        <div className="profile-top">
          <Navbar
            lists={["全部(5)", "进行中(3)", "已完成(2)"]}
            parent={this}
            onEvent={(num) => {
              console.log(num);
            }}
          />
        </div>
        <main className="profile-top fn-color-2C2C3B fn-size-14">
          {total_data && total_data.length > 0 ? (
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow className="bg-F2F2F5">
                  <TableCell align="left">举报理由</TableCell>
                  <TableCell align="left">投诉时间</TableCell>
                  <TableCell align="left">惩罚</TableCell>
                  <TableCell align="left">申诉</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {show_data &&
                  show_data.map((opt, inx) => (
                    <TableRow key={inx}>
                      <TableCell component="th" scope="row">
                        {opt.title}
                      </TableCell>
                      <TableCell align="left">{opt.date}</TableCell>
                      <TableCell align="left">{opt.result}</TableCell>
                      <TableCell align="left">
                        {opt.status == 1 ? (
                          <span
                            className="fn-color-F86B6B p"
                            onClick={() => {
                              this.setState({
                                modalMsg: {
                                  open: true,
                                  title: "申诉",
                                  type: 1,
                                },
                              });
                            }}
                          >
                            申诉
                          </span>
                        ) : opt.status == 2 ? (
                          <span className="fn-color-007CFF">进行中</span>
                        ) : (
                          <span>完成</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="profile-top all-width all-height view-overflow text-center">
              <img src={notcom} style={{ width: 490, height: 293 }} />
              <div className="fn-color-6f fn-size-16 profile-top-20">
                暂无申诉
              </div>
            </div>
          )}
        </main>
        {total_counts > show_counts && (
          <div className="profile-top">
            <Pagination
              count={Math.ceil(total_counts / show_counts)}
              variant="outlined"
              shape="rounded"
              onChange={(ev, v) => {
                this.setState({
                  // page_data: [],
                  login_status: true,
                });
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                setTimeout(() => {
                  this.setState({
                    show_page: v - 1,
                    show_data: total_data.slice(
                      (v - 1) * show_counts,
                      v * show_counts
                    ),
                    login_status: false,
                  });
                }, 300);
              }}
            />
          </div>
        )}
        <ModalDialog
          parent={this}
          info={modalMsg}
          onEvent={(msg) => {
            console.log(msg);

            this.setState({
              modalMsg: {
                open: false,
              },
            });
          }}
        >
          <div className="text-center" style={{ marginBottom: 20 }}>
            对举报理由为&nbsp;
            <span className="fn-color-F86B6B">“在评论中发布不实信息”</span>
            &nbsp;进行申诉
          </div>
          <textarea
            placeholder="请输入申诉的理由~耐心等待审核"
            className="textfield all-width"
            rows="3"
            style={{ marginBottom: 20 }}
          ></textarea>
        </ModalDialog>
      </section>
    );
  }
}
