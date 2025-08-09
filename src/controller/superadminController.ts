import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { AuthRequest } from "../types/custom";
import { Roles } from "../types/roles";
import { registerSchema } from "../schema/userSchema";

// Get all admins (including superadmin)
export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ 
      role: { $in: [Roles.Admin, Roles.Super] } 
    }).select("-password");
    
    res.status(200).json({ 
      message: "All admins retrieved successfully", 
      data: admins 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching admins", 
      error 
    });
  }
};

// Get superadmin info
export const getSuperAdminInfo = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const superAdmin = await User.findOne({ 
      _id: req.user.id,
      role: Roles.Super 
    }).select("-password");

    if (!superAdmin) {
      res.status(404).json({ message: "Super admin not found" });
      return;
    }

    res.status(200).json({ 
      message: "Super admin data retrieved successfully", 
      admin: superAdmin 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching super admin info", 
      error 
    });
  }
};

// Create new admin (only superadmin can create admins)
export const createAdmin = async (req: Request, res: Response) => {
  const validationResult = registerSchema.safeParse(req.body);

  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.errors });
    return;
  }

  const { name, email, password, role } = validationResult.data;

  // Only allow creating admin role, not super-admin
  if (role === Roles.Super) {
    res.status(403).json({ 
      message: "Cannot create super admin accounts through this endpoint" 
    });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || Roles.Admin 
    });
    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      message: "Admin created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating admin!", 
      error 
    });
  }
};

// Update admin (only superadmin can update admins)
export const updateAdmin = async (req: Request, res: Response) => {
  const adminId = req.params.id;
  const { name, email, password, role, status } = req.body;

  try {
    if (!adminId) {
      res.status(400).json({ message: "Admin ID required" });
      return;
    }

    // Check if trying to update a super admin
    const existingAdmin = await User.findById(adminId);
    if (!existingAdmin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    if (existingAdmin.role === Roles.Super) {
      res.status(403).json({ 
        message: "Cannot modify super admin accounts through this endpoint" 
      });
      return;
    }

    // Prevent changing role to super-admin
    if (role === Roles.Super) {
      res.status(403).json({ 
        message: "Cannot change role to super admin" 
      });
      return;
    }

    const updatedRecord: Record<string, any> = {};

    if (name) updatedRecord.name = name;
    if (email) updatedRecord.email = email;
    if (role) updatedRecord.role = role;
    if (typeof status === 'boolean') updatedRecord.status = status;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedRecord.password = hashedPassword;
    }

    const updatedAdmin = await User.findByIdAndUpdate(
      adminId, 
      updatedRecord, 
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    const { password: _, ...adminWithoutPassword } = updatedAdmin.toObject();

    res.status(200).json({
      message: "Admin updated successfully",
      admin: adminWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating admin!", 
      error 
    });
  }
};

// Delete admin (only superadmin can delete admins)
export const deleteAdmin = async (req: Request, res: Response) => {
  const adminId = req.params.id;

  try {
    if (!adminId) {
      res.status(400).json({ message: "Admin ID required" });
      return;
    }

    const adminToDelete = await User.findById(adminId);
    if (!adminToDelete) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    if (adminToDelete.role === Roles.Super) {
      res.status(403).json({ 
        message: "Cannot delete super admin accounts" 
      });
      return;
    }

    await User.findByIdAndDelete(adminId);

    res.status(200).json({ 
      message: "Admin deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting admin!", 
      error 
    });
  }
};

// Disable/Enable admin
export const toggleAdminStatus = async (req: Request, res: Response) => {
  const adminId = req.params.id;
  const { status } = req.body;

  try {
    if (!adminId) {
      res.status(400).json({ message: "Admin ID required" });
      return;
    }

    if (typeof status !== 'boolean') {
      res.status(400).json({ message: "Status must be a boolean value" });
      return;
    }

    const admin = await User.findById(adminId);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    if (admin.role === Roles.Super) {
      res.status(403).json({ 
        message: "Cannot modify super admin status" 
      });
      return;
    }

    admin.status = status;
    await admin.save();

    const { password: _, ...adminWithoutPassword } = admin.toObject();

    res.status(200).json({
      message: `Admin ${status ? 'enabled' : 'disabled'} successfully`,
      admin: adminWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating admin status!", 
      error 
    });
  }
};

// Get system statistics (only superadmin)
export const getSystemStats = async (req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      totalAdmins,
      totalDrivers,
      totalCustomers,
      activeUsers,
      disabledUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: { $in: [Roles.Admin, Roles.Super] } }),
      User.countDocuments({ role: Roles.Driver }),
      User.countDocuments({ role: Roles.Customer }),
      User.countDocuments({ status: true }),
      User.countDocuments({ status: false })
    ]);

    res.status(200).json({
      message: "System statistics retrieved successfully",
      stats: {
        totalUsers,
        totalAdmins,
        totalDrivers,
        totalCustomers,
        activeUsers,
        disabledUsers
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching system statistics", 
      error 
    });
  }
};
