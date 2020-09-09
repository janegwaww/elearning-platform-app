import axios from "axios";
import { getUser } from "../../services/auth";

const api = "https://api.haetek.com:9191/api/v1/gateway";
const { token } = getUser();
const resType = {
  responseType: "blob",
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const params = id => ({
  model_action: "download",
  model_name: "document",
  extra_data: { file_id: id },
  model_type: "",
});

const fileDownload = (res, fileName, fileType) => {
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const save = document.createElement("a");
  save.href = url;
  save.download = `${fileName}.${fileType}`;
  save.target = "_blank";
  document.body.appendChild(save);
  save.click();
  document.body.removeChild(save);
};

const download = (id, name, type) => {
  if (id && name) {
    axios
      .post(api, params(id), resType)
      .then(res => {
        fileDownload(res, name, type);
      })
      .catch(err => {
        console.error("Could not Download the file from the backend.", err);
      });
  }
};

export default download;
