import dotenv from "dotenv";
dotenv.config();
import { server } from "./src/Config/socket.js";
import { connectDB } from "./src/Config/connect_db.config.js";
import { seedDatabase } from "./src/Seeds/dummyUsers.js";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
  // seedDatabase();
});
