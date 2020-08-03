import { useContext } from "react";
import SEOContext from "./SEOContext";

const useSEO = () => {
  const seo = useContext(SEOContext);
  return seo;
};

export default useSEO;
