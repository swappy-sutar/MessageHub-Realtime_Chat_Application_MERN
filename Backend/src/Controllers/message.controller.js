import { Message } from "../Models/message.model.js";
import { User } from "../Models/user.model.js";
import { ImageUploadCloudinary } from "../Utils/uploadToCloudinary.js";

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    return res.status(200).json({
      success: true,
      messages: "all messages retrived successfully",
      data: messages,
    });
  } catch (error) {
    console.error(`Error in getting messages: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const sendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.files?.image;

    // Require at least one: text or image
    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least text or image to send",
      });
    }

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await ImageUploadCloudinary(
        image,
        process.env.CLOUDINARY_FOLDER_NAME,
        500,
        80
      );
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      text,
      senderId: senderId, // previously: sender
      receiverId: receiverId, // previously: receiver
      image: imageUrl,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(`Error in sending message: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

export { getMessages, sendMessages };
