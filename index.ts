import express, { Express, Request, Response } from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import { google } from "googleapis";
import contentDisposition from "content-disposition";
import dotenv from "dotenv";
import { sendMail } from "./sendMail";
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));
