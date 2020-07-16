import React from "react";
import { ProNavbar, Navbar } from "../../components/ProfileNav";
import { Button, Grid } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "cropperjs/dist/cropper.css";
import CustomModal from "../../../../assets/js/CustomModal";
import wechatQrcode from "../../../../../static/images/wechat-qrcode.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      "& .MuiInput-underline": {
        "&:before": { border: "none" },
        "&:after": {
          border: "none",
        },
      },
      "& .MuiInputBase-input": {
        // padding: 0,
        "&:focus": {
          border: "1px solid #007cff",
        },
      },
      "& .MuiOutlinedInput-multiline": {
        padding: 2,
      },
    },
  },

  input: {
    "& .MuiInputBase-input": {
      border: "1px solid rgba(231,233,238,1)",
      borderRadius: "10px",
      padding: 10,
    },
  },
  btn1: {
    width: 148,
    height: 32,
    borderRadius: 16,
    border: "1px solid #007CFF",
    color: "#007CFF",
    fontSize: 14,
  },
  btn2: {
    color: "#FC5659",
    border: "1px solid #FC5659",
  },
  btn: {
    backgroundColor: "#007CFF",
    color: "white",
    fontSize: 16,
    width: 180,
    height: 40,
    borderRadius: 20,
  },
  btn4: {
    backgroundColor: "#F2F2F5",
    color: "#878791",
  },

  radioRoot: {
    flexDirection: "row",
    "& .MuiRadio-root": {
      padding: "0 9px",
    },
  },
  usersimg: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    backgroundColor: "#F3F3F3",
  },
}));
const table_data = [
  {
    label: "手机号",
    value: "",
    button_v: "修改手机号",
    type: "phone",
    isunite: true,
  },
  {
    label: "绑定微信",
    value: "已邦定微信",
    button_v: "解除绑定",
    type: "weChat",
    isunite: true,
  },
  {
    label: "绑定QQ",
    value: "未绑定QQ账号, 绑定后可使用QQ直接登录",
    button_v: "绑定QQ",
    type: "QQ",
    isunite: false,
  },
  {
    label: "绑定微博:",
    value: "未绑定新浪微博账号, 绑定后可使用微博直接登录",
    button_v: "绑定微博",
    type: "weibo",
    isunite: false,
  },
];

const Help = (props) => {
  const classes = useStyles();

  return (
    <div>
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
          <input type="checkbox" value="无法购买会员" />
          <label>无法购买会员</label>
        </p>
        <p>
          <input type="checkbox" value="会员购买成功，VIP服务未生效" />
          <label>会员购买成功，VIP服务未生效</label>
        </p>
        <p>
          <input type="checkbox" value="会员未到期提示过期" />
          <label></label>
          会员未到期提示过期
        </p>
        <p>
          <input type="checkbox" value="取消连续包月" />
          <label>取消连续包月</label>
        </p>
        <p>
          <input
            type="checkbox"
            value="请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~"
          />
          <label>
            请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~
          </label>
        </p>
        <p className="fn-color-007CFF fn-size-12">
          查看更多
          <ExpandMore style={{ verticalAlign: "middle" }} />
        </p>
      </div>
      <div className={`profile-top ${classes.root}`}>
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
              className={classes.input}
            />
          </Grid>
        </Grid>
      </div>
      <div className={`profile-top ${classes.root}`}>
        <Grid container>
          <Grid item xs={2} className="text-right fn-color-878791">
            <span className="fn-color-FC3535">*</span>联系方式：
          </Grid>
          <Grid item xs={8}>
            <TextField
              placeholder="请输入您的手机号"
              className={classes.input}
            />
          </Grid>
        </Grid>
      </div>
      <div className={`profile-top ${classes.root}`}>
        <Grid container>
          <Grid item xs={2} className="text-right fn-color-878791">
            官方微信公众号：
          </Grid>
          <Grid item xs={8}>
            <div>关注官方微信公众号，消息第一时间通知您</div>
            <div style={{ paddingTop: 20 }}>
              <img src={wechatQrcode} />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="text-center profile-top">
        <Button className={classes.btn} variant="contained" color="primary">
          提交
        </Button>
      </div>
    </div>
  );
};

export default Help;
