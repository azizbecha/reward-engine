import { Hono } from "hono";
import { fetchResource, validatePlayer } from "../../utils/index.js";
import type { Game, Mission, Player } from "../../types/index.js";

const app = new Hono();

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { playerId, gameId, missionId } = body;

    if (!playerId || !gameId || !missionId) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const [player, game, mission] = await Promise.all([
      fetchResource<Player>("players", playerId),
      fetchResource<Game>("games", gameId),
      fetchResource<Mission>("missions", missionId),
    ]);

    if (!player)
      return c.json({ eligible: false, error: "Player not found" }, 404);

    if (!game) return c.json({ eligible: false, error: "Game not found" }, 404);

    if (!mission) {
      return c.json({ eligible: false, error: "Mission not found" }, 404);
    }

    if (mission.gameId !== gameId) {
      return c.json(
        { eligible: false, error: "Mission does not belong to the game" },
        400
      );
    }
    const result = validatePlayer(player, mission);
    return c.json(result, 200);
  } catch (err: unknown) {
    return c.json({ error: "Invalid JSON", details: String(err) }, 400);
  }
});

export default app;
