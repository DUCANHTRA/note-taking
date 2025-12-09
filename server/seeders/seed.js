// backend/seeders/seed.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Note from '../models/Note.js';

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    // --- USERS SEEDING --- //
    console.log(collectionNames.includes("users")
      ? '⚠️ "users" collection exists.'
      : '🆕 Creating "users" collection...'
    );

    // Clear existing users
    await User.deleteMany();

    // Pre-hash because schema pre-save won't run when using insertMany
    const hashPassword = async (password) => await bcrypt.hash(password, 10);

    const users = [
      {
        email: "dummy@user.com",
        password: await hashPassword("password123"),
      },
      {
        email: "admin@example.com",
        password: await hashPassword("adminpass123"),
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log("🌱 Users seeded successfully!");

    const dummyUser = createdUsers.find(u => u.email === "dummy@user.com");

    // --- NOTES SEEDING --- //
    console.log(collectionNames.includes("notes")
      ? '⚠️ "notes" collection exists.'
      : '🆕 Creating "notes" collection...'
    );

    await Note.deleteMany({ user: dummyUser._id });

    const sampleNotes = [
      {
        user: dummyUser._id,
        title: "Project ideas",
        content: "Build a note-taking app with AI suggestions",
        tags: ["ideas", "projects"],
      },
      {
        user: dummyUser._id,
        title: "Shopping list",
        content: "Milk, Bread, Eggs, Coffee",
        tags: ["personal", "shopping"],
      },
      {
        user: dummyUser._id,
        title: "Workout routine",
        content: "Mon: Chest, Tue: Back, Wed: Legs",
        tags: ["fitness", "health"],
      },
      {
        user: dummyUser._id,
        title: "Career goals",
        content: "Learn system design, build portfolio",
        tags: ["career", "goals"],
      },
      {
        user: dummyUser._id,
        title: "Books to read",
        content: "Deep Work, Atomic Habits, Pragmatic Programmer",
        tags: ["books", "reading"],
      },
      {
        user: dummyUser._id,
        title: "Daily journal",
        content: "Reflect on today's achievements and tasks",
        tags: ["journal", "personal"],
      },
    ];

    await Note.insertMany(sampleNotes);

    console.log("🌱 Notes seeded successfully!");

  } catch (err) {
    console.error(`🚨 Error seeding data: ${err.message} 🚨`);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

seedData();
