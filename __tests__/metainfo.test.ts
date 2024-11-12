import request from "supertest";
import ytdl from "ytdl-core";

const host = "http://localhost:8080";

jest.mock("ytdl-core");

describe("GET /metainfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if no valid YouTube Id is provided", async () => {
    const response = await request(host)
      .get("/metainfo")
      .query({ url: "invalid-url" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      error: "No valid YouTube Id!",
    });
  });

  it("should return 200 and video info if valid YouTube Id is provided", async () => {
    const mockInfo = {
      videoDetails: {
        title:
          "Palpable tension between Biden and Harris during first appearance since brutal election wipeout",
      },
    };

    const response = await request(host)
      .get("/metainfo")
      .query({ url: "https://www.youtube.com/watch?v=5c3Pv6JmauI" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, data: mockInfo });
  });
});
