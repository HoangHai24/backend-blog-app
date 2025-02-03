import User from "../models/User.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      //   return res.status(400).json({ message: "User already exists" });
      throw new Error("User already exists");
    }

    user = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      vefified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    console.log("Error registering user", error.message);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }
    if (!(await user.comparePassword(password))) {
      throw new Error("Invalid email or password");
    } else {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        vefified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    }
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let err = new Error("User not found");
      err.statusCode = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
