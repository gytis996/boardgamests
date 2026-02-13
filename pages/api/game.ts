import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Boardgame } from "../../models/Boardgame";

const MONGODB_URI =
  "mongodb+srv://robertas:robertas123@cluster0.chsur9i.mongodb.net/test";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGODB_URI);
  }

  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const games = await Boardgame.find().limit(limit);
    res.status(200).json(games);
  } catch {
    res.status(500).json({ error: "Nepavyko užkrauti žaidimų" });
  }
}
