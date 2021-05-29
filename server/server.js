const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

// aEP2Gmx3oB5mU6Di

app.use(cors());
app.use(morgan(""));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://hamza:aEP2Gmx3oB5mU6Di@todos.pbo93.mongodb.net/mernstacktodoapp?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Successfully Connected");
  })
  .catch((err) => {
    console.log("Error in Connecting the Database ===> ", err);
  });

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Todos = new mongoose.model("Todo", todoSchema);

// GET request
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todos.find();
    res.send(todos);
  } catch (err) {
    console.log(err);
  }
});

// POST request
app.post("/todos", async (req, res) => {
  console.log(req.body);
  const newTodo = new Todos({ title: req.body.title, desc: req.body.desc });
  try {
    const data = await newTodo.save();
    console.log("data inserted", data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

// PUT request
app.put("/todos/:id", async (req, res) => {
  const query = { _id: req.params.id };
  try {
    const result = await Todos.findOneAndUpdate(
      query,
      { $set: { isCompleted: req.body.isCompleted } },
      {
        new: true,
      }
    );
    res.json(result);
  } catch (error) {
    console.log("..........ERROR", error);
  }
});

// DELETE request
app.delete("/todos/:id", async (req, res) => {
  try {
    await Todos.findByIdAndDelete(req.params.id);
    res.json({ remove: true });
  } catch (err) {
    console.log(err);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server is running on PORT 4000");
});
