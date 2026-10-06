// test-db.js
const mongoose = require("mongoose")
require("dotenv").config({ path: ".env.local" })

async function test() {
    try {
        console.log("Connecting to:", process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ Connection successful!")
        process.exit(0)
    } catch (err) {
        console.log("❌ Connection failed:", err.message)
        process.exit(1)
    }
}

test()








