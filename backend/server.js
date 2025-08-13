 const express = require('express');
 const mongoose = require('mongoose')
 const  cors = require("cors");

 const app = express();
 app.use(cors({
  origin: "http://localhost:5173", // allow only your frontend
  credentials: true               // allow cookies if needed
}));
 app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json())
app.get('/',(req,res)=>{res.send("backend is running")})
 
//step1: start the server and connect with the db
const connectDbAndStartServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connected");

    const port = process.env.PORT_NUMBER || 3000;
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

connectDbAndStartServer();

app.use("/library/api/v1/auth",require('./routes/auth.route'))