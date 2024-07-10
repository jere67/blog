import express from "express";
import bodyParser from "body-parser";
 
const app = express();
const port = 4000;
 
app.use(bodyParser.json()); // Use for API file
app.use(bodyParser.urlencoded({ extended: true }));
 
let posts = [];
let lastId = 3;

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  lastId++;

  let today = new Date().toString();
  const newPost = {
    id: lastId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: today
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.post("/posts/:id", (req, res) => {
  const updateID = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === updateID);
  let today = new Date().toString();

  const newPost = {
    id: updateID,
    title: req.body.title || foundPost.title,
    content: req.body.content || foundPost.content,
    author: req.body.author || foundPost.author,
    date: today
  };

  const foundPostIndex = posts.findIndex((post) => post.id === updateID);
  posts[foundPostIndex] = newPost;
  res.json(newPost);
});

app.delete("/posts/:id", (req, res) => {
  const updateID = parseInt(req.params.id);
  const foundPost = posts.findIndex((post) => post.id === updateID);
  if (foundPost > -1) {
    posts.splice(foundPost, 1);
    lastId--;
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: `No matching ID was found. `});
  }
});
 
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});