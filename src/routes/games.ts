import { Hono } from "hono";
import games from "../../data/games.json" with { type: "json" };

const gamesApp = new Hono()
  .get("/", (c) => {
    return c.json(games);
  })
  .get("/:id", (c) => {
    const id = c.req.param("id");
    const game = (games as any)[id];
    if (!game) return c.json({ error: "Game not found" }, 404);
    return c.json(game);
  });

export default gamesApp;