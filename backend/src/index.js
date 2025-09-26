import dotenv from "dotenv"
import { connectDB } from "./db/mongooseConnection.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env"
})

const PORT = process.env.PORT;


connectDB()
  .then(() => {

    const server = app.listen((PORT), () => {
      console.log(`Server is listening at port ${PORT}`)
    })

    server.on("error", (error) => {
      console.log(`SERVER ERROR: ${error}`);
      process.exit(1);
    })
  })
  .catch((err) => {
    console.log(`MongoDB Connection FAILED: ${err}`);
  });

