import express from "express";
import { getSupabase } from "../config/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const supabase = getSupabase(); // ✅ THIS WAS MISSING

  if (!supabase) {
    return res.send("Supabase not configured. Check .env file.");
  }

  const { data: equipment, error } = await supabase
    .from("equipment")
    .select(`
      id,
      name,
      serial_number,
      department,
      location,
      is_scrapped
    `)
    .order("name");

  if (error) {
    console.error(error);
    return res.send("Error fetching equipment");
  }

  res.render("equipment", {
    title: "Equipment",
    equipment
  });
});

export default router;
