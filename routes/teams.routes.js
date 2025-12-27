import express from "express";
import { getSupabase } from "../config/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const supabase = getSupabase();

  const { data: teams, error } = await supabase
    .from("maintenance_teams")
    .select(`
      id,
      name,
      team_members (
        id,
        users (
          name,
          role
        )
      )
    `);

  if (error) {
    console.error(error);
    return res.send("Failed to load teams");
  }

  res.render("teams", {
    title: "Teams",
    teams
  });
});

router.post("/add", async (req, res) => {
  const supabase = getSupabase();
  const { name } = req.body;

  if (!name) return res.redirect("/teams");

  await supabase.from("maintenance_teams").insert({ name });
  res.redirect("/teams");
});

export default router;
