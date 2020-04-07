import api, { VIDEO_URL } from "../api";

beforeAll(() => console.log("beforeall"));

describe("api", () => {
  test("api path", () => console.log(VIDEO_URL));
  test("api content", () => console.log(api));
});
