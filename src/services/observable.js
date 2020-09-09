import { flow } from "lodash/fp";

const errors = ["4103", "4104"];

const action = err => {
  if (errors.includes(err)) {
    console.log("error: ", err);
  }
};

export const observer = flow(action);

export default {};
