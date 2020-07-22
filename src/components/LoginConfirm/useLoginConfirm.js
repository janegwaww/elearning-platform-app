import { useContext } from "react";
import LoginConfirmContext from "./LoginConfirmContext";

const useLoginConfirm = () => {
  const confirm = useContext(LoginConfirmContext);
  return confirm;
};

export default useLoginConfirm;
