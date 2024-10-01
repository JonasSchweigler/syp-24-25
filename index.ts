import express, { Express, Request, Response } from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import dotenv from "dotenv";
import { sendMail } from "./sendMail";
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 8080;

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

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));
