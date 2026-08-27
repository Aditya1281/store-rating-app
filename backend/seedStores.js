const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Store = require("./models/Store");

dotenv.config();

const stores = [
  {
    name: "The Urban Café",
    category: "Café & Restaurant",
    location: "Ahmedabad",
  },
  {
    name: "TechWorld Store",
    category: "Electronics",
    location: "Pune",
  },
  {
    name: "Fresh Basket",
    category: "Grocery",
    location: "Mumbai",
  },
  {
    name: "Style Avenue",
    category: "Fashion",
    location: "Delhi",
  },
  {
    name: "Home Comfort",
    category: "Home & Living",
    location: "Bangalore",
  },
  {
    name: "Book Haven",
    category: "Books",
    location: "Hyderabad",
  },
];

async function seedStores() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    // Existing demo stores remove kar do
    await Store.deleteMany({});

    // Fresh stores create karo
    const createdStores = await Store.insertMany(stores);

    console.log(
      `Created ${createdStores.length} stores successfully`
    );

    console.table(
      createdStores.map((store) => ({
        id: store._id.toString(),
        name: store.name,
        category: store.category,
        location: store.location,
      }))
    );

    await mongoose.disconnect();

    console.log("Done");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedStores();