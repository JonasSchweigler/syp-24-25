import express, { Express, Request, Response } from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import { google } from "googleapis";
import contentDisposition from "content-disposition";
import db from "./db";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 45881;

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_KEY,
});

interface SearchParams {
  q?: string;
  pageToken?: string;
  maxResults?: number;
}

async function searchYouTube(params: SearchParams = {}) {
  const res = await youtube.search.list({
    // @ts-ignore
    part: "snippet",
    type: "video",
    ...params,
  });
  return (res as any).data;
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(cors());
app.use(express.json());

/**
 * Get the formats of a video.
 */
app.get("/formats", async (req: Request, res: Response) => {
  try {
    const videoURL: string = req.query.url as string;
    const formats = await ytdl.getInfo(videoURL);
    res.status(200).json(formats.formats);
  } catch (error) {
    console.error("Error while getting the formats:", error);
    res.status(500).send("Some error occurred while getting the formats.");
  }
});

/**
 * Get suggestions depending on the search query/value.
 */
app.get("/suggestions", async (req: Request, res: Response) => {
  const { search, next = null } = req.query as {
    search?: string;
    next?: string | null;
  };

  try {
    // await db.collection("searchstatistics").insertOne({ searchInput: search });

    const data = await searchYouTube({
      q: search,
      // nextPageToken: next,
      pageToken: next as any,
      maxResults: 14,
    });

    // @ts-ignore
    const { items, nextPageToken, pageInfo, regionCode, prevPageToken } = data;
    return res.status(200).json({
      success: true,
      data: items,
      pagingInfo: { ...pageInfo, nextPageToken, regionCode, prevPageToken },
    });
  } catch (error: any) {
    console.error(error);
    if (error.status === 403) {
      return res
        .status(403)
        .json({ success: false, error, limitExceeded: true });
    }
    return res.status(400).json({ success: false, error, limitExceeded: true });
  }
});

/**
 * Get information about a video.
 */
app.get("/metainfo", async (req: Request, res: Response) => {
  const url = req.query.url as string;

  if (!ytdl.validateID(url) && !ytdl.validateURL(url)) {
    return res
      .status(400)
      .json({ success: false, error: "No valid YouTube Id!" });
  }

  try {
    const result = await ytdl.getInfo(url);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ success: false, error });
  }
});

export { app };
