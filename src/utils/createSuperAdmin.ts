import bcrypt from "bcryptjs";
import User from "../models/User";
import { Roles } from "../types/roles";
import { connectDb } from "../config/database";

const createSuperAdmin = async () => {
  try {
    await connectDb();
    
    // Check if superadmin already exists
    const existingSuperAdmin = await User.findOne({ role: Roles.Super });
    if (existingSuperAdmin) {
      console.log("Super admin already exists!");
      process.exit(0);
    }

    // Create superadmin credentials
    const superAdminData = {
      name: "Super Administrator",
      email: "superadmin@demotaxi.com",
      password: "SuperAdmin@2024", // Change this to a secure password
      role: Roles.Super,
      status: true
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(superAdminData.password, 10);

    // Create superadmin user
    const superAdmin = new User({
      ...superAdminData,
      password: hashedPassword
    });

    await superAdmin.save();

    console.log("Super admin created successfully!");
    console.log("Email:", superAdminData.email);
    console.log("Password:", superAdminData.password);
    console.log("Please change the password after first login!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating super admin:", error);
    process.exit(1);
  }
};

// Run the script if called directly
if (require.main === module) {
  createSuperAdmin();
}

export default createSuperAdmin;
