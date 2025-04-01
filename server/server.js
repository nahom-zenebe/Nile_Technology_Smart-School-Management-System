const express = require("express");
const { MongoDBconfig } = require('./lib/mongodbconfig');
const cors = require('cors');


require("dotenv").config();
const PORT = process.env.PORT || 5002;

const app = express();



app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true,
}));





app.listen(PORT, () => {
  MongoDBconfig();
  console.log(`The server is running at port ${PORT}`);
});



