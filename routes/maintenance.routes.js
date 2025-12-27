import express from "express";
import { getSupabase } from "../config/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const supabase = getSupabase();
  let requests = [];

  if (supabase) {
    const { data, error } = await supabase
      .from("maintenance_requests")
      .select(`
        id,
        subject,
        status,
        priority,
        scheduled_date
      `)
      .order("scheduled_date", { ascending: true });

    if (!error && data) {
      requests = data;
    }
  }

  res.render("maintenance", {
    title: "Maintenance",
    requests
  });
});

export default router;
