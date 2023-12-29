import { Youtrack } from "youtrack-rest-client";

const config = {
  baseUrl: "https://yanshufai.youtrack.cloud",
  token: process.env.YOUTRACK_TOKEN!,
};

export const youtrack = new Youtrack(config);
