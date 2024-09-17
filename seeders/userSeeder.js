import "dotenv/config";
import connectDB from "../config/database.js";
import User from "../models/User.js";

async function userSeeder() {
  connectDB();

  await User.create({
    roleCode: 100,
    userName: "E",
    firstName: "Jairo",
    lastName: "Ochoa Velasquez",
    email: "yenochoave@rapirepuestos.com",
    password: process.env.SEEDER_USER_PASSWORD,
    age: 30,
    adress: "Cl 42 N° 85 -11",
    phoneNumber: 3128739574,
    avatar: "1.jpg",
  });
  process.exit(1);
}
userSeeder();
