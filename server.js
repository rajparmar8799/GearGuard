import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
import dashboardRoutes from "./routes/dashboard.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import equipmentRoutes from "./routes/equipment.routes.js";
import teamsRoutes from "./routes/teams.routes.js";
import workcenterRoutes from "./routes/workcenters.routes.js";

app.use("/", dashboardRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/teams", teamsRoutes);
app.use("/workcenters", workcenterRoutes);

// Calendar placeholder
app.get("/calendar", (req, res) => {
  res.render("calendar", { title: "Calendar" });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ GearGuard running at http://localhost:${PORT}`);
});
