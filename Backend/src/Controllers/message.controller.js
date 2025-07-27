import { Message } from "../Models/message.model.js";
import { User } from "../Models/user.model.js";
import { ImageUploadCloudinary } from "../Utils/uploadToCloudinary.js";
import { getReceiverSocketID, io } from "../Config/socket.js";

const getUsersForSidebar = async (req, res) => {
  
  try {
    const loggedInUserId = req.user._id;
    if (!loggedInUserId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required to fetch contacts.",
      });
    }

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    if (filteredUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No contacts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: filteredUsers,
    });
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    return res.status(500).json({ 
      success: false,
      message: `Internal server error: ${error.message}`,
     });
  }
};

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
    
    const text = req.body?.text;
    const image = req.files?.image;

    console.log("Received message data:", { text, image });

    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least text or image to send",
      });
    }

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image && Object.keys(image).length !== 0) {
      const uploadResponse = await ImageUploadCloudinary(
        image,
        process.env.CLOUDINARY_FOLDER_NAME,
        500,
        80
      );
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId: senderId,
      receiverId: receiverId,
      text:text,
      image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketID(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }

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

export { getUsersForSidebar, getMessages, sendMessages };
