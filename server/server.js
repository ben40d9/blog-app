const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

//env variables for secret keys
const pw = process.env.MONGO_PASSWORD;
const dbMongo = process.env.APP_NAME;

const app = express();

// Connect to MongoDB
(async () => {
  const uri = `mongodb+srv://ben40d9:${pw}@${dbMongo}.fm7gp23.mongodb.net/testblog?retryWrites=true&w=majority`;
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    app.locals.db = client.db("test_blog"); // Update 'test_blog' to your database name if different

    app.use(express.json());
    app.use(cors());
    app.use("/auth", authRoutes);
    app.use("/blogs", blogRoutes);

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
})();
