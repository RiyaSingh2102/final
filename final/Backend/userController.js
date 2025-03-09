import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";

// Register a new user
export const registerControllers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Login user
export const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Send user details without password
    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Set Avatar for user
export const setAvatarController = async (req, res) => {
  try {
    const userId = req.params.id;
    const imageData = req.body.image;

    const user = await User.findByIdAndUpdate(
      userId,
      { isAvatarImageSet: true, avatarImage: imageData },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      isSet: user.isAvatarImageSet,
      image: user.avatarImage,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all users except the requester
export const allUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select("email name avatarImage _id");

    return res.status(200).json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
