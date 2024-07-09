import express from "express";
import bodyParser from "body-parser";
 
const app = express();
const port = 3000;
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
 
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/blog", (req, res) => {
  res.render("blog.ejs", { posts: posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/submit-create", (req, res) => {
  console.log(req.body);
  console.log(req.body.title);
  let post = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  }
  posts.push(post);
  res.redirect("/blog");
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});

app.get("/delete", (req, res) => {
  res.render("delete.ejs");
});
 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});