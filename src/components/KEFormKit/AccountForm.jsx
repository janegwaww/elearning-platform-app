import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CustomInput from "./CustomInput";
import { generateSMSCode } from "../../services/auth";

const useStyles = makeStyles((theme) => ({
  loginButton: {
    backgroundColor: "#007cff",
    borderRadius: "30px",
    width: "100%",
    color: "#fff",
    marginTop: theme.spacing(2),
    "&.Mui-disabled": {
      backgroundColor: "#ddd",
    },
    "&:hover": {
      backgroundColor: "#007cff",
    },
  },
  notice: {
    fontSize: 12,
    color: "#909399",
    marginTop: 10,
    textAlign: "center",
  },
}));

const AccountForm = ({ handleButton, buttonText = "登录" }) => {
  const classes = useStyles();

  const YupObject = Yup.object({
    mobile: Yup.string()
      .matches(/^1\d{10}$/, "手机号格式不正确!")
      .required("手机号必须填写!"),
    smscode: Yup.string()
      .matches(/^\d{4}$/, "验证码错误!")
      .required("验证码必须填写!"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    handleButton(values);
  };

  const handleCodeSend = ({ mobile }) => {
    /* 发送验证码 */
    generateSMSCode({ mobile });
  };

  return (
    <Formik
      initialValues={{ mobile: "", smscode: "" }}
      validationSchema={YupObject}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isValid }) => {
        return (
          <Form>
            <Field
              label="手机号码"
              name="mobile"
              type="mobile"
              component={CustomInput}
            />
            <Field
              label="验证码"
              name="smscode"
              type="smscode"
              onSend={handleCodeSend}
              component={CustomInput}
            />
            <Button
              type="submit"
              className={classes.loginButton}
              disabled={!isValid}
              color="primary"
            >
              {buttonText}
            </Button>
            <Typography className={classes.notice}>
              未注册的手机号码验证后自动创建知擎账号
            </Typography>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountForm;
