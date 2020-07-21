import React, { useState, useCallback, Fragment } from "react";
import LoginConfirmContext from "./LoginConfirmContext";
import LoginConfirmModal from "./LoginConfirmModal";

const LoginConfirmProvider = ({ children }) => {
  const [resolveReject, setResolveReject] = useState([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback(() => {
    return new Promise((res, rej) => {
      setResolveReject([res, rej]);
    });
  }, []);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleConfirm = useCallback(() => {
    resolve();
    handleClose();
  }, [resolve, handleClose]);

  return (
    <Fragment>
      <LoginConfirmContext.Provider value={confirm}>
        {children}
      </LoginConfirmContext.Provider>
      <LoginConfirmModal
        open={resolveReject.length === 2}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Fragment>
  );
};

export default LoginConfirmProvider;
