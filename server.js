import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middleware/errrorHandler.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World1!");
});

app.use("/api/users", userRoutes);
app.use(invalidPathHandler);
app.use(errorResponseHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
