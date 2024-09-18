import express from "express"; // react style
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";

dotenv.config({});
connectDB();
const app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONT_END_URI,
    credentials:true
}
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);
const Port=process.env.PORT
app.listen(Port, ()=>{
    console.log(`Server running at port ${Port}`);
});