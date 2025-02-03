import pkg from "jsonwebtoken";
import User from "../models/User.js";
const { verify } = pkg;

export const authGuard = async (req, res, next) => {
  if (req.headers?.authorization?.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, token failed");
      error.statusCode = 401;
      next(err);
    }
  } else {
    let err = new Error("Not authorized, no token");
    err.statusCode = 401;
    next(err);
  }
};
