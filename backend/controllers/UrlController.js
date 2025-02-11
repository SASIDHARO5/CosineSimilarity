// const Url = require("../models/UrlModel");
// const User = require("../models/UserModel");

// module.exports.addUrl = async (req, res) => {
//   try {
//     const { userId, url } = req.body;
//     const newUrl = await Url.create({ userId, url });
//     await User.findByIdAndUpdate(userId, { $push: { urls: newUrl._id } });
//     res.status(201).json({ message: "URL added successfully", success: true, url: newUrl });
//   } catch (error) {
//     console.error("Error adding URL:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const Url = require("../models/UrlModel");
const User = require("../models/UserModel");
// const Url = require('../models/UrlModel');


module.exports.addUrl = async (req, res) => {
  try {
    const { url, result } = req.body;
    const userId = req.user.id; // Assuming the user ID is attached to the request object by the middleware

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }
  
    const newUrl = await Url.create({ userId, url , result });
    await User.findByIdAndUpdate(userId, { $push: { urls: newUrl._id } });
    res.status(201).json({ message: "URL added successfully", success: true, url: newUrl });

    
  } catch (error) {
    console.error("Error adding URL:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getUrls = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is attached to the request object by the middleware

    const urls = await Url.find({ userId });
    res.status(200).json({ success: true, urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// module.exports.getUserUrls = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const urls = await Url.find({ userId });
//     res.status(200).json({ success: true, urls });
//   } catch (error) {
//     console.error("Error fetching URLs:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };