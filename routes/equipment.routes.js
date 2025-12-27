import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("equipment", { title: "Equipment" });
});

export default router;
