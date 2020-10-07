require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const db = require("./db");

const userRouter = require("./routes/user-router");
const tripRouter = require("./routes/trip-router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", userRouter);
app.use("/api", tripRouter);

const apiPort = process.env.PORT || 5000;

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
