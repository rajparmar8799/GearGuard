import express from "express";
import { getSupabase } from "../config/supabase.js";

const router = express.Router();

// GET Work Centers
router.get("/", async (req, res) => {
  const supabase = getSupabase();
  let workcenters = [];

  if (supabase) {
    const { data, error } = await supabase
      .from("work_centers")
      .select(`
        id,
        name,
        code,
        department,
        description,
        is_active
      `)
      .order("name");

    if (!error && data) {
      workcenters = data;
    }
  }

  res.render("workcenters", {
    title: "Work Centers",
    workcenters
  });
});

// ADD Work Center
router.post("/add", async (req, res) => {
  const supabase = getSupabase();
  if (!supabase) return res.redirect("/workcenters");

  const { name, code, department, description, is_active } = req.body;

  await supabase.from("work_centers").insert([
    {
      name,
      code,
      department,
      description,
      is_active: is_active === "on"
    }
  ]);

  res.redirect("/workcenters");
});

export default router;
