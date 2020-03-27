import urlJoin from "url-join";
import axios from "axios";

const PATH = "http://seeker.haetek.com";
const SERVE_API = {
  videoList: urlJoin(PATH, "9191", "videos"),
  videoUploads: urlJoin(PATH, "9191", "uploads")
};

const axiosInstance = axios.create({
  baseURL: PATH,
  timeout: 1000
});

const api = () => {
  const videoParamFactory = ({ modelAction, queryString, videoIds, type }) => {
    return {
      model_action: modelAction || "search",
      query_string: queryString || "",
      video_ids: videoIds || [],
      type: type || "global"
    };
  };

  const videos = async ({ modelAction, queryString }) => {
    const params = videoParamFactory({ modelAction, queryString });

    const response = await axiosInstance.post(SERVE_API.videoList, params);
    return response;
  };

  const videoUpload = async ({ modelAction, queryString, videoIds, type }) => {
    const params = videoParamFactory({
      modelAction,
      queryString,
      videoIds,
      type
    });

    const response = await axiosInstance.post(SERVE_API.videoUpload, params);
    return response;
  };

  return {
    videos,
    videoUpload
  };
};

export default api();
