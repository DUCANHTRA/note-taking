// backend/seeders/noteSeeder.js
import Note from "../models/Note.js";
import { seedUser } from "./userSeeder.js";

export const seedNotes = async () => {
  // Create/get dummy user
  const user = await seedUser();

  const sampleNotes = [
    {
      user: user._id,
      title: "Project ideas",
      content: "Build a note-taking app with AI suggestions",
      tags: ["ideas", "projects"],
    },
    {
      user: user._id,
      title: "Shopping list",
      content: "Milk, Bread, Eggs, Coffee",
      tags: ["personal", "shopping"],
    },
    {
      user: user._id,
      title: "Workout routine",
      content: "Mon: Chest, Tue: Back, Wed: Legs",
      tags: ["fitness", "health"],
    },
    {
      user: user._id,
      title: "Career goals",
      content: "Learn system design, build portfolio",
      tags: ["career", "goals"],
    },
    {
      user: user._id,
      title: "Books to read",
      content: "Deep Work, Atomic Habits, Pragmatic Programmer",
      tags: ["books", "reading"],
    },
    {
      user: user._id,
      title: "Daily journal",
      content: "Reflect on today's achievements and tasks",
      tags: ["journal", "personal"],
    },
  ];

  await Note.deleteMany({ user: user._id });
  const created = await Note.insertMany(sampleNotes);

  return { user, notes: created };
};
