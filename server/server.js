// backend/server.js
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
