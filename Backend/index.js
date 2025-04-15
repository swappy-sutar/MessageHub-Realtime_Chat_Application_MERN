import dotenv from "dotenv";
dotenv.config();

import { app } from "./src/app.js";
import { connectDB } from "./src/Config/connect_db.config.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
