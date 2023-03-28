/* Import dependencies */
import express from "express";
import mysql from "mysql2/promise";

/* Create express instance */
const app = express();
const port = 3000;


app.set("view engine", "pug");

// Serve assets from 'static' folder
app.use(express.static("static"));

//const db = await DatabaseService.connect();
//const { conn } = db;

/* Landing route */
app.get("/", (req, res) => {
  res.render("index");
});


// Landing route
app.get("/", (req, res) => {
  res.render("index");
});

/* Setup database connection */
const db = await mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});


// Gallery route
app.get("/gallery", (req, res) => {
  res.render("gallery");
});

// About route
app.get("/login", (req, res) => {
  res.render("login");
});

// About route
app.get("/signup", (req, res) => {
  res.render("signup");
});
// About route

app.get("/contactus", (req, res) => {
  res.render("contactus");
});

// Returns an array of cities from the database
// Returns an array of cities from the database
app.get("/cities", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `city`");
  return res.render("cities",{rows,fields});
  //return res.send(rows);
});


app.get('/cities/:id', async (req, res) => {
  const cityId = req.params.id;
  const city = await db.getCity(cityId);
  return res.render('city', { city });
})

// Returns JSON array of cities
app.get("/api/cities", async (req, res) => {
  const [rows, fields] = await db.getCities();
  return res.send(rows);
});

// Sample API route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Returns an array of cities from the database
app.get("/cities", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `city`");
  return res.send(rows);
});



// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});