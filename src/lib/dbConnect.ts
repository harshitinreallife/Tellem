const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database")
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")
        connection.isConnected = db.connections[0].readyState

        //Connect होने के बाद, db.connections[0].readyState — यानी Mongoose के internal array में पहले connection का numeric status — connection.isConnected में store कर दिया जाता है, ताकि अगली बार ऊपर वाला early-return check काम कर सके

        console.log("Database connected Succesfully")

    }
    catch (error) {
        console.log("Database connection failed", error)
        process.exit(1)
    }
}


export default dbConnect;