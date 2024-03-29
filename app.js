const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require('fs');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`DB CONNECTED`);
  });
mongoose.connection.on("error", err => {
  console.log(`DB Connection error: ${err.message}`);
});

// Bringing in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Api Docs
app.get('/', (req, res) => {
  fs.readFile("docs/apiDocs.json", (err , data) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data);
    res.json(docs);
  })
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error:
        "You are unauthorized..Please sign in or sign up to participate in all the fun we have here!"
    });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`A NodeJS API is Listening on port ${port}`);
});
