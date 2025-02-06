import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Định nghĩa __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadPicture = multer({
  storage,
  limits: {
    fileSize: 3 * 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    const extname = path.extname(file.originalname);

    if (extname !== ".jpg" && extname !== ".jpeg" && extname !== ".png") {
      return cb(new Error("Images only!"));
    }
    cb(null, true);
  },
});

export default uploadPicture;
