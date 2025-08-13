const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/UserModel");
const connectDb = require("./config/db");
require("dotenv").config();

async function createAdmin() {
  try {
    await connectDb();

    const adminEmail = "admin2@gmail.com"; 
    const adminPassword = "AdminPass123";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = new User({
      name: "Admin2",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log(" admin created successfully");
    process.exit();
  } catch (error) {
    console.log("Error creating admin user:", error.message);
    process.exit(1);
  }
}

createAdmin();
