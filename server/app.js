const mysql = require("mysql2");
const express = require("express");

// Initial Variables
const app = express();
app.use(express.json());

const databaseConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oriya1234",
  port: 3306,
  database: "FullStackProject6",
});

//const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.send("Koko Lala!");
});

// Connect to the Database and running up the server
databaseConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected To The Database.");
  databaseConnection.query(
    "SELECT * FROM users;",
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    }
  );

  app.get("/api/users", (req, res) => {
    databaseConnection.query(
      "SELECT * FROM users;",
      function (err, result, fields) {
        res.send(result);
      }
    );
  });

  app.get("/api/users/:id", (req, res) => {
    let userId = parseInt(req.params.id);
    let sql = "SELECT * FROM users WHERE id = ?";
    databaseConnection.query(sql, [userId], function (err, result, fields) {
      res.send(result);
    });
  });

  app.get("/api/users/:id/todos", (req, res) => {
    let userId = parseInt(req.params.id);
    let sql = "SELECT * FROM todos WHERE userId = ?";
    databaseConnection.query(sql, [userId], function (err, result, fields) {
      res.send(result);
    });
  });

  app.get("/api/users/:id/posts", (req, res) => {
    let userId = parseInt(req.params.id);
    let sql = "SELECT * FROM posts WHERE userId = ?";
    databaseConnection.query(sql, [userId], function (err, result, fields) {
      res.send(result);
    });
  });

  app.get("/api/posts/:id/comments", (req, res) => {
    let postId = parseInt(req.params.id);
    let sql = "SELECT * FROM comments WHERE postId = ?";
    databaseConnection.query(sql, [postId], function (err, result, fields) {
      res.send(result);
    });
  });

  app.listen(port, () => {
    console.log(`Server running at localhost:${port}/`);
  });
});
