import { Hono } from "hono";
import missions from "../../data/missions.json" with { type: "json" };

const app = new Hono();

app.get("/", (c) => {
  return c.json(missions);
});

app.get("/:id", (c) => {
  const id = c.req.param("id");
  const mission = (missions as any)[id];
  if (!mission) return c.json({ error: "Mission not found" }, 404);
  return c.json(mission);
});

export default app;
