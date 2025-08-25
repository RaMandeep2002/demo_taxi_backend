import express from "express";
import { register, loginuser, loginadmin, update_user, deleteUser } from "../controller/auhtController";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import { Roles } from "../types/roles";
import createSuperAdmin from "../utils/createSuperAdmin";

const router = express.Router();

router.post(
  "/register",
  authenticate,
  authorize(["super-admin"]),
  register,
);

// Login endpoint
router.post("/login", loginuser);
router.post("/login-admin", loginadmin);
router.put("/update_user/:id", update_user)
router.delete("/delete_user/:id", deleteUser)

// Temporary route to create first superadmin (remove after first superadmin is created)
router.post("/create-first-superadmin", async (req, res) => {
  try {
    await createSuperAdmin();
    res.status(201).json({ message: "First super admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating super admin", error });
  }
});

export default router;
