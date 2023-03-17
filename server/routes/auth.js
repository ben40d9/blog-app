const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await req.db.collection("users").insertOne(newUser);
    res.status(201).send(result.ops[0]);
  } catch (error) {
    res.status(500).send({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await req.db.collection("users").findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in user" });
  }
});

module.exports = router;
