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

    // --- Users Seeding --- //
    const existingCollections = await db.listCollections().toArray();
    const collectionNames = existingCollections.map(c => c.name);

    if (!collectionNames.includes('users')) {
      console.log('🆕 Creating "users" collection...');
    } else {
      console.log('⚠️ "users" collection exists.');
    }

    // Clear existing users
    await User.deleteMany();

    const hashPassword = async (password) => await bcrypt.hash(password, 10);

    const users = [
      {
        name: "Dummy User",
        email: "dummy@user.com",
        password: await hashPassword("password123"),
        role: "user",
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: await hashPassword('hellovue'),
        role: 'admin',
      },
    ];

    await User.insertMany(users);
    console.log('🌱 Users seeded successfully 🌱');

    // --- Notes Seeding --- //
    if (!collectionNames.includes('notes')) {
      console.log('🆕 Creating "notes" collection...');
    } else {
      console.log('⚠️ "notes" collection exists.');
    }

    // Get dummy user for notes
    const dummyUser = await User.findOne({ email: "dummy@user.com" });

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

    // Remove existing notes for dummy user
    await Note.deleteMany({ user: dummyUser._id });
    await Note.insertMany(sampleNotes);
    console.log('🌱 Notes seeded successfully 🌱');

  } catch (error) {
    console.error(`🚨 Error seeding data: ${error.message} 🚨`);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed 🔌');
  }
};

seedData();
