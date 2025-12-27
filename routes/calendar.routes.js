import express from "express";
import { getSupabase } from "../config/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const supabase = getSupabase();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  const start = new Date(year, month, 1).toISOString();
  const end = new Date(year, month + 1, 0).toISOString();

  const { data: jobs, error } = await supabase
    .from("maintenance_requests")
    .select("id, subject, scheduled_date, request_type")
    .gte("scheduled_date", start)
    .lte("scheduled_date", end);

  if (error) {
    console.error(error);
    return res.send("Calendar load failed");
  }

  res.render("calendar", {
    title: "Calendar",
    year,
    month,
    jobs
  });
});

export default router;
