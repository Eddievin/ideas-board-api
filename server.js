const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

let ideas = [
  {
    id: 1,
    title: "Living happily",
    content: "Secret to living happy",
    date: new Date(2009, 0, 31),
  },
  {
    id: 2,
    title: "Learning to live",
    content: "Learning to live a happier more fulfilling life",
    date: new Date(2010, 0, 31),
  },
  {
    id: 3,
    title: "Manage Life",
    content: "Learning to manage expectations",
    date: new Date(2011, 0, 31),
  },
];

app.use(cors());

app.get("/ideas", function (req, res, next) {
  return res.json({
    status: "SUCCESS",
    ideas,
  });
});

app.post("/ideas/new", (req, res, next) => {
  let idea = {
    id: ideas.length + 1,
    title: req.body.title,
    content: req.body.content,
    date: new Date(),
  };

  ideas.push(idea);

  return res.json({
    status: "SUCCESS",
    message: "Idea saved to server",
  });
});

app.put("/ideas/update", (req, res, next) => {
  console.log(req.body);
  let ideaIndex = ideas.findIndex((o) => o.id == req.body.id);
  let idea = ideas[ideaIndex];
  idea.title = req.body.title;
  idea.content = req.body.content;

  return res.json({
    status: "SUCCESS",
    message: "Idea data updated",
  });
});

app.delete("/ideas/delete", (req, res, next) => {
  var index = ideas.findIndex((o) => o.id === req.body.id);
  if (index !== -1) ideas.splice(index, 1);
  return res.json({
    status: "SUCCESS",
    message: "Idea data deleted",
  });
});

app.listen(3001, () => console.log("Running on port 3001"));