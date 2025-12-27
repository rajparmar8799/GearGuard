import express from "express";
import { getSupabase } from "../config/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const supabase = getSupabase();

  let total = 0;
  let open = 0;
  let completed = 0;

  if (supabase) {
    const { data, error } = await supabase
      .from("maintenance_requests")
      .select("status");

    if (!error && data) {
      total = data.length;
      open = data.filter(r => r.status !== "repaired").length;
      completed = data.filter(r => r.status === "repaired").length;
    }
  }

  res.render("dashboard", {
    title: "Dashboard",
    total,
    open,
    completed
  });
});

export default router;
