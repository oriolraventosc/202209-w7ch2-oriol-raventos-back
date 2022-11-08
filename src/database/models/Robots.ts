import { Schema, model } from "mongoose";

// eslint-disable-next-line @typescript-eslint/naming-convention
const RobotSchema = new Schema({
  name: String,
  image: String,
  creation: Number,
  features: {
    speed: Number,
    resistance: Number,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Robot = model("Robot", RobotSchema, "robots");

export default Robot;
