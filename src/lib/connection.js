// src/lib/mongodb.js
import mongoose from "mongoose"

let isConnected = false

export default async function connectToDb() {
  if (isConnected) {
    console.log("Already connected to DB")
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL)
    isConnected = true
    console.log("Connected to database successfully")
    return db
  } catch (error) {
    console.error("Database connection error:", error)
    throw error
  }
}