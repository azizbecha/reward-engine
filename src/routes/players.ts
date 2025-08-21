import { Hono } from "hono";
import players from "@/data/players.json";

const app = new Hono()
  .get("/", (c) => {
    return c.json(players);
  })
  .get("/:id", (c) => {
    const id = c.req.param("id");
    const player = (players as any)[id];
    if (!player) return c.json({ error: "Player not found" }, 404);
    return c.json(player);
  });

export default app;
