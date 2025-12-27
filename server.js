import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import calendarRoutes from "./routes/calendar.routes.js";


// ESM __dirname / __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force-load .env from project root
dotenv.config({
  path: path.join(__dirname, ".env")
});

// Debug check (temporary)
console.log("ENV CHECK →", {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "LOADED" : "MISSING"
});

const app = express();


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
app.use("/calendar", calendarRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ GearGuard running at http://localhost:${PORT}`);
});
