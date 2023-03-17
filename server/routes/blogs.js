const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

module.exports = function (app, db) {
  // Middleware to verify JWT
  const verifyJWT = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) return res.status(401).send("Access Denied");

    try {
      const verified = jwt.verify(token, process.env.SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  };

  app.post("/blogs", verifyJWT, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;

    try {
      const result = await db.collection("blogs").insertOne({
        title,
        content,
        user_id: ObjectId(userId),
        created_at: new Date(),
      });

      res.status(201).send(result.ops[0]);
    } catch (error) {
      res.status(500).send({ message: "Error creating blog post" });
    }
  });

  app.get("/blogs", async (req, res) => {
    try {
      const blogs = await db.collection("blogs").find().toArray();
      res.send(blogs);
    } catch (error) {
      res.status(500).send({ message: "Error fetching blog posts" });
    }
  });

  app.put("/blogs/:id", verifyJWT, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;
    const blogId = req.params.id;

    try {
      const result = await db
        .collection("blogs")
        .findOneAndUpdate(
          { _id: ObjectId(blogId), user_id: ObjectId(userId) },
          { $set: { title, content } },
          { returnOriginal: false }
        );

      if (result.value) {
        res.send(result.value);
      } else {
        res.status(404).send({ message: "Blog post not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error updating blog post" });
    }
  });

  app.delete("/blogs/:id", verifyJWT, async (req, res) => {
    const userId = req.user._id;
    const blogId = req.params.id;

    try {
      const result = await db.collection("blogs").findOneAndDelete({
        _id: ObjectId(blogId),
        user_id: ObjectId(userId),
      });

      if (result.value) {
        res.send({ message: "Blog post deleted", deletedPost: result.value });
      } else {
        res.status(404).send({ message: "Blog post not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error deleting blog post" });
    }
  });
};
