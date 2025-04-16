import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/utils.js";
import { cloudinaryConnect } from "../Config/cloudinary.config.js";
import { ImageUploadCloudinary } from "../Utils/uploadToCloudinary.js";

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, conformPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !conformPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (password !== conformPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const isAlreadyExist = await User.find({ email });
    if (isAlreadyExist.length) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
      });
    }
  } catch (error) {
    console.error(`Error in signupUser: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = generateToken(payload, res);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: payload,
      token: token,
    });
  } catch (error) {
    console.error(`Error in loginUser: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profilePic = req.files?.profilePic;

    if (!profilePic) {
      return res.status(400).json({
        success: false,
        message: "Please provide a profile picture",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const uploadResponse = await ImageUploadCloudinary(
      profilePic,
      process.env.CLOUDINARY_FOLDER_NAME,
      300,
      80
    );

    if (!uploadResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        profilePic: uploadResponse.secure_url,
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(`Error in updateProfilePic: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

export { signupUser, loginUser, updateProfile };
