require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose"); 
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const urlRoutes = require("./routes/urlRoutes");
const uploadRoute = require('./routes/uploadRoute');

const { DB_URL, PORT } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log(` app listening on port ${PORT}`);
});

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: ["http://localhost:5173"],//, allowing specific HTTP methods and sending credentials (cookies).
    methods: ["GET", "POST", "PUT", "DELETE"],//HTTP methods are permitted for requests from allowed origins
    credentials: true,//Allows cookies and credentials to be sent with requests.
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.use("/api/url", urlRoutes);
app.use("/apiup",uploadRoute);