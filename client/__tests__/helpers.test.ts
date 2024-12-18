import {
  isYtUrl,
  getDownloadUrl,
  formats,
  decodeStr,
  formatSecondsToMinutesAndSeconds,
} from "../src/utils/helpers";

describe("helpers", () => {
  describe("isYtUrl", () => {
    it("should return true for valid YouTube URLs", () => {
      expect(isYtUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(true);
      expect(isYtUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(true);
    });

    it("should return false for invalid YouTube URLs", () => {
      expect(isYtUrl("https://www.google.com")).toBe(false);
      expect(isYtUrl("https://vimeo.com/123456")).toBe(false);
    });
  });

  describe("getDownloadUrl", () => {
    it("should return correct download URL with default format", () => {
      expect(getDownloadUrl("dQw4w9WgXcQ")).toBe(
        "http://localhost:4000/watch?v=dQw4w9WgXcQ&format=mp4"
      );
    });

    it("should return correct download URL with specified format", () => {
      expect(getDownloadUrl("dQw4w9WgXcQ", "mp3")).toBe(
        "http://localhost:4000/watch?v=dQw4w9WgXcQ&format=mp3"
      );
    });
  });

  describe("formats", () => {
    it("should contain correct formats", () => {
      expect(formats).toEqual([
        { text: "MP4", format: ".mp4" },
        { text: "MP3", format: ".mp3" },
        { text: "MOV", format: ".mov" },
        { text: "FLV", format: ".flv" },
      ]);
    });
  });

  describe("decodeStr", () => {
    it("should decode HTML entities", () => {
      expect(
        decodeStr("Klaas&#39; ECHTE Mama als Überraschungsgast im Studio!")
      ).toBe("Klaas' ECHTE Mama als Überraschungsgast im Studio!");
    });
  });

  describe("formatSecondsToMinutesAndSeconds", () => {
    it("should format seconds into minutes and seconds", () => {
      expect(formatSecondsToMinutesAndSeconds(125)).toBe("02:05");
      expect(formatSecondsToMinutesAndSeconds(59)).toBe("00:59");
    });
  });
});

const request = require("supertest");

const api_request = request("http://localhost:8080");

describe("Suggestions API", () => {
  it("should contain the search keyword in the returned items", async () => {
    const searchKeyword = "test";

    const response = await api_request.get("/suggestions").query({ search: searchKeyword });

    const { success, data } = response.body;

    expect(success).toBe(true);

    const containsKeyword = data.every((item: any) =>
        JSON.stringify(item).toLowerCase().includes(searchKeyword.toLowerCase())
    );

    expect(containsKeyword).toBe(true);
  });
});