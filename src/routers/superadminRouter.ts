import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import {
  getAllAdmins,
  getSuperAdminInfo,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
  getSystemStats,
} from "../controller/superadminController";

const router = express.Router();

// All routes require superadmin authentication
router.use(authenticate);
router.use(authorize(["super-admin"]));

// Superadmin info
router.get("/info", getSuperAdminInfo);

// Admin management routes
router.get("/admins", getAllAdmins);
router.post("/admins", createAdmin);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);
router.put("/admins/:id/status", toggleAdminStatus);

// System statistics
router.get("/stats", getSystemStats);
  
export default router;
