import { Request, Response } from "express";
import ytdl from "ytdl-core";

export async function getYTMetaInfo(req: Request, res: Response) {
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
}
