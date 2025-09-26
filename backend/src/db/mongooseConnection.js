import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`MONGODB_CONNECTION_FAILED_ERROR: ${error}`);
    }
}

export { connectDB }