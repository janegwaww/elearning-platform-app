import { globalSearchResultUpdate } from "./home";
import { isLoggedIn } from "./auth";

const isLoged = isLoggedIn();

export const kGlobalSearchRecord = ({
  data = {},
  match_frame,
  source,
  input
}) => {
  if (!isLoged) return;
  const { video_id, series_id, file_id, user_id } = data;
  const id = video_id || series_id || file_id || user_id;
  globalSearchResultUpdate({
    query_string: input,
    source,
    relation_id: id,
    match_frame
  });
};
