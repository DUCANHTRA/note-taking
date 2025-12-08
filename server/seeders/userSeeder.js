// backend/seeders/userSeeder.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const seedUser = async () => {
  const existing = await User.findOne({ email: "dummy@user.com" });
  if (existing) return existing;

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await User.create({
    name: "Dummy User",
    email: "dummy@user.com",
    password: hashedPassword,
  });

  return user;
};
