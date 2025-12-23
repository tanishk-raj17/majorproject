const mongoose = require("mongoose");
const data = require("./data");                
const Listing = require("../models/listing.js");   

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function initDB() {
  await Listing.deleteMany({});
  await Listing.insertMany(data);
  console.log("data added");
}

initDB();