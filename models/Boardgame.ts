import { Schema, model, models } from "mongoose";

const BoardgameSchema = new Schema({
  title: String,
  subtitle: String,
  imgUrl: String,
  rating: Number,
  releaseYear: Number,
  minAvailableForPeopleNumber: Number,
  maxAvailableForPeopleNumber: Number,
  minPlayingTime: Number,
  maxPlayingTime: Number,
  difficulty: Number,
  ratingsCount: Number,
});

export const Boardgame =
  models.Boardgame || model("Boardgame", BoardgameSchema, "boardgames");
