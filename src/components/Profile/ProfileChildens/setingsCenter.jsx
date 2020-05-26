import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import { Button, Grid } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      "& .MuiInput-underline": {
        "&:after": {
          border: "1px solid #007cff",
        },
      },
      "& .MuiInputBase-input": {
        "&:focus": {
          border: "1px solid #007cff",
        },
      },
      "& .MuiOutlinedInput-multiline": {
        padding: 2,
      },
    },
  },
  btn: {
    backgroundColor: "#007CFF",
    color: "white",
    fontSize: 16,
    width: 180,
    height: 40,
    borderRadius: 20,
  },
  radioRoot: {
    flexDirection: "row",
  },
}));
const table_data = [
  { label: "手机号", value: "12345678921", button_v: "修改手机号" },
  { label: "绑定微信", value: "已邦定微信", button_v: "解除绑定" },
  {
    label: "绑定QQ",
    value: "未绑定QQ账号, 绑定后可使用QQ直接登录",
    button_v: "绑定QQ",
  },
  {
    label: "绑定微博:",
    value: "未绑定新浪微博账号, 绑定后可使用微博直接登录",
    button_v: "绑定微博",
  },
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            原手机号
          </Grid>
          <Grid item xs={9}>
            <TextField />
          </Grid>
          <Grid item xs={3}>
            验证码
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField />
              </Grid>
              <Grid item xs={6}>
                获取验证码
              </Grid>

              <Grid item xs={12}>
                验证过程中会用到短信, 请注意您的手机提示,
                我们将保护您个人手机号信息
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            原手机号
          </Grid>
          <Grid item xs={9}>
            <TextField />
          </Grid>
          <Grid item xs={3}>
            验证码
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField />
              </Grid>
              <Grid item xs={6}>
                获取验证码
              </Grid>

              <Grid item xs={12}>
                验证过程中会用到短信, 请注意您的手机提示,
                我们将保护您个人手机号信息
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    case 2:
      return <div>成功</div>;
    default:
      return "Unknown step";
  }
}

const Setpage = (props) => {
  const classes = useStyles();
  const [navbarStatus, setNavbarStatus] = React.useState(1);
  const [navBarList,setNavBarList] = React.useState(["基本设置", "安全中心", "帮助/反馈"]);
  const onEvent = function(value) {
    setNavbarStatus(value);
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
 
  return (
    <section className="all-height view-scroll bg-white profile-padding">
      {navbarStatus<4?(<nav>
        <ProNavbar
          list={navBarList}
          parent={props}
          onEvent={onEvent}
        />
      </nav>):(<span></span>)}
      <main>
        {navbarStatus == 1 ? (
          <div className={classes.root}>
            基本设置
            <Grid container spacing={3}>
              <Grid item xs={2} className="text-right">
                头像
              </Grid>
              <Grid item xs={10}>
                <input type="file" />
              </Grid>
              <Grid item xs={2} className="text-right">
                个人封面
              </Grid>
              <Grid item xs={10}>
                <input type="file" />
              </Grid>
              <Grid item xs={2} className="text-right">
                用户名:
              </Grid>
              <Grid item xs={10}>
                <TextField placeholder="Placeholder" />
              </Grid>
              <Grid item xs={2} className="text-right">
                ID号:
              </Grid>
              <Grid item xs={10}>
                11222
              </Grid>

              <Grid item xs={2} className="text-right">
                性别:
              </Grid>
              <Grid item xs={10}>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  className={classes.radioRoot}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="男"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="女"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="保密"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={2} className="text-right">
                出生日期:
              </Grid>
              <Grid item xs={10}>
                <TextField type="date" defaultValue="2017-05-24" />{" "}
              </Grid>
              <Grid item xs={2} className="text-right">
                我的简介:
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  rows={5}
                  defaultValue="Default Value"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className="text-center">
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                >
                  提交
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div></div>
        )}
        {navbarStatus == 2 ? (
          <div>
            安全中心
            {table_data.map((option,inx) => (
              <div
                className="box box-between box-align-center"
                key={option.label}
              >
                <div>
                  <span>{option.label}:</span>
                  <span>{option.value}</span>
                </div>
                <div>
                  <Button variant="outlined" color="secondary" data-inx={inx} onClick={(event)=>{
                      let _inx =parseInt(event.target.dataset.inx);
                      
                      if(!_inx&&_inx!==0){
                        _inx =parseInt( event.target.parentNode.dataset.inx)
                      }
                     
                      if(_inx===0){
                        
                          onEvent(4)
                          setNavBarList(['设置手机'])
                      }
                  }}>
                    {option.button_v}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
        {navbarStatus == 3 ? (
          <div>
            帮助/反馈
            <nav>
              <Navbar
                lists={["热门问题", "会员问题", "账号问题", "其他问题"]}
                parent={props}
              />
            </nav>
            <div className="line"></div>
            <div className="bg-F2F2F5 fn-size-14 fn-color-2C2C3B">
              <p>
                <input type="radio" value="无法购买会员" />
                无法购买会员
              </p>
              <p>
                <input type="radio" value="会员购买成功，VIP服务未生效" />{" "}
                会员购买成功，VIP服务未生效
              </p>
              <p>
                <input type="radio" value="会员未到期提示过期" />
                会员未到期提示过期
              </p>
              <p>
                <input type="radio" value="取消连续包月" />
                取消连续包月
              </p>
              <p>
                <input
                  type="radio"
                  value="请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~"
                />
                请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~
              </p>
              <p className="fn-color-007CFF fn-size-12">
                查看更多
                <ExpandMore />
              </p>
            </div>
            <div className={`box box-align-center ${classes.root}`}>
              <div>问题描述(选填)：</div>
              <div>
                <TextField
                  placeholder="Placeholder"
                  variant="outlined"
                  rows={3}
                  multiline
                  fullWidth
                />
              </div>
            </div>
            <div className={`box box-align-center ${classes.root}`}>
              <div>联系方式：</div>
              <div>
                <TextField defaultValue="Small" size="small" />
              </div>
            </div>
            <div className="text-center">
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
              >
                提交
              </Button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
    
         {navbarStatus==4?( <div>
        <nav>
        <ProNavbar
          list={navBarList}
          parent={props}
          onEvent={onEvent}
        />
      </nav>
         
          <div>
            <Stepper orientation="vertical" activeStep={activeStep}>
              {["身份验证", "绑定手机", "绑定成功"].map((label, inx) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <div>
                      {getStepContent(inx)}
                      <Grid container spacing={3}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={9}>
                          <Button onClick={handleNext}>下一步</Button>{" "}
                          <Button onClick={handleBack}>取消</Button>
                        </Grid>
                      </Grid>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </div>
          </div>):(<span></span>
       )}
      </main>
    </section>
  );
};
export default Setpage;
