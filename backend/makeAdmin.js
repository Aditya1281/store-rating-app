const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOneAndUpdate(
      { email: "apratap7398@gmail.com" },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
    } else {
      console.log("Admin created successfully:", user.email, user.role);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

makeAdmin();
