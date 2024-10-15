import express, { Express, Request, Response } from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import dotenv from "dotenv";
import { sendMail } from "./sendMail";
import {getYTMetaInfo} from "./controllers/yt-controller";
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 8080;

/**
 * Get information about a video.
 */
app.get("/metainfo", getYTMetaInfo);

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));
