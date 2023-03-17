const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

//env variables for secret keys
const pw = process.env.MONGO_PASSWORD;
const dbMongo = process.env.APP_NAME;
console.log(`${pw} ${dbMongo}`);

const uri = `mongodb+srv://ben40d9:${pw}@${dbMongo}.fm7gp23.mongodb.net/?retryWrites=true&w=majority`;

MongoClient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.error("Error connecting to MongoDB", err);
      return;
    }

    console.log("Connected to MongoDB");
    const db = client.db("mern-blog");

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use("/", authRoutes);
    app.use("/", blogRoutes);
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
