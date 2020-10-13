import React from "react";
import { Navbar } from "../../components/ProfileNav";
import { Button, Grid } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import "cropperjs/dist/cropper.css";
// import CustomModal from "../../../../assets/js/CustomModal";
import wechatQrcode from "../../../../assets/img/wxp.jpg";

const Help = (props) => {
  return (
    <main className="settings">
      <div className="root">
        <nav>
          <Navbar
            lists={["热门问题", "会员问题", "账号问题", "其他问题"]}
            parent={props}
          />
        </nav>
        <div className="line " style={{ marginTop: 10 }}></div>
        <div
          className="bg-F2F2F5 fn-size-14 fn-color-2C2C3B profile-top"
          style={{ padding: 20, borderRadius: 8 }}
        >
          <p className="all-width">
            <input type="checkbox" value="无法购买会员" id="help_1" />
            <label htmlFor="help_1">无法购买会员</label>
          </p>
          <p>
            <input
              type="checkbox"
              value="会员购买成功，VIP服务未生效"
              id="help_2"
            />
            <label htmlFor="help_2">会员购买成功，VIP服务未生效</label>
          </p>
          <p>
            <input type="checkbox" value="会员未到期提示过期" id="help_3" />
            <label htmlFor="help_3">会员未到期提示过期</label>
          </p>
          <p>
            <input type="checkbox" value="取消连续包月" id="help_4" />
            <label htmlFor="help_4">取消连续包月</label>
          </p>
          <p>
            <input
              type="checkbox"
              value="请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~"
              id="help_5"
            />
            <label htmlFor="help_5">
              请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~
            </label>
          </p>
          <p className="fn-color-007CFF fn-size-12">
            查看更多
            <ExpandMore style={{ verticalAlign: "middle" }} />
          </p>
        </div>
        <div className="profile-top">
          <Grid container>
            <Grid item xs={2} className="text-right fn-color-878791">
              问题描述(选填)：
            </Grid>
            <Grid item xs={8}>
              <TextField
                placeholder="请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~"
                variant="outlined"
                rows={3}
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
        <div className="profile-top">
          <Grid container>
            <Grid item xs={2} className="text-right fn-color-878791">
              <span className="fn-color-FC3535">*</span>联系方式：
            </Grid>
            <Grid item xs={8}>
              <TextField placeholder="请输入您的手机号" variant="outlined" />
            </Grid>
          </Grid>
        </div>
        <div className="profile-top">
          <Grid container>
            <Grid item xs={2} className="text-right fn-color-878791">
              官方微信公众号：
            </Grid>
            <Grid item xs={8}>
              <div>关注官方微信公众号，消息第一时间通知您</div>
              <div style={{ paddingTop: 20 }} className="text-center">
                <img src={wechatQrcode} />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="text-center profile-top">
          <Button className="btn" variant="contained" color="primary">
            提交
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Help;
