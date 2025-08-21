import { serve } from "@hono/node-server";
import { Hono } from "hono";

import gamesRoute from "@/src/routes/games";
import playersRoute from "@/src/routes/players";
import missionsRoute from "@/src/routes/missions";
import missionCheckRoute from "@/src//routes/missionCheck";

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
