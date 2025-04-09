const express = require("express");
const { MongoDBconfig } = require('./lib/mongodbconfig');
const cors = require('cors');
const authrouter = require('./router/Authrouter');
const Teacherrouter = require('./router/Teacherrouter');
const Graderouter=require('./router/Graderouter')
require("dotenv").config();
const PORT = process.env.PORT || 5002;
const cookieParser = require("cookie-parser");
const app = express();



app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true,
}));




app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authrouter);
app.use("api/teacher",Teacherrouter)
app.use("api/grade",Graderouter)

app.listen(PORT, () => {
  MongoDBconfig();
  console.log(`The server is running at port ${PORT}`);
});



