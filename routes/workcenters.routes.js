import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("workcenters", { title: "Work Centers" });
});

export default router;
