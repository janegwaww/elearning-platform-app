import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handleLogin, isLoggedIn } from "../../services/auth";

const Login = () => {
  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/users/profile`);
    }
  }, []);

  const handleSubmit = values => {
    handleLogin(values);
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          handleSubmit(values);
          navigate(`/users/profile`);
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="username">UserName</label>
        <Field name="username" type="text" />
        <ErrorMessage name="username" />
        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Login;
