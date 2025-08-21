import { serve } from "@hono/node-server";
import { Hono } from "hono";

import gamesRoute from "./routes/games.js";
import playersRoute from "./routes/players.js";
import missionsRoute from "./routes/missions.js";
import missionCheckRoute from "./routes/missionCheck.js";

const app = new Hono()
  .get("/", (c) => {
    return c.html("<h1>Hello from reward engine demo</h1>");
  })
  .route("/games", gamesRoute)
  .route("/players", playersRoute)
  .route("/missions", missionsRoute)
  .route("/mission/check", missionCheckRoute);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

type AppType = typeof app;
export type { AppType };
