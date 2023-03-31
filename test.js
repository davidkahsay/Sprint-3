/* Import dependencies */
const express = require("express");
const mysql = require("mysql2");

/* Create express instance */
const app = express();
const port = 3000;

/* Setup database connection */
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});

/* Landing route */
app.get("/", (req, res) => {
  res.send("Hello world!");
});
/*This code just verify if the code is running or not*/
// Sample API route
app.get("/ping", (req, res) => {
  res.send("pong");
});

 // Adds a new city to the database
 app.post("/cities/add", (req, res) => {
  const { name, population } = req.body;
  const query = "INSERT INTO `city` (`Name`, `Population`) VALUES (?, ?)";
  db.execute(query, [name, population], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("This entry was not able to be added");
    }
    console.log(`Added city`);
    return res.send("Your entry has been added");
  });
});

// Returns an array of cities from the database
app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.send(rows);
  });
});

// Returns an array of cities from the database
app.get("/countries", (req, res) => {
    db.execute("SELECT * FROM `country`", (err, rows, fields) => {
      console.log(`/cities: ${rows.length} rows`);
      return res.send(rows);
    });
  });

  // Returns an array of cities from the database
app.get("/countrylanguages", (req, res) => {
    db.execute("SELECT * FROM `countrylanguage`", (err, rows, fields) => {
      console.log(`/cities: ${rows.length} rows`);
      return res.send(rows);
    });
  });

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
