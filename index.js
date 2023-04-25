/* Import dependencies */
import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import DatabaseService from "./services/database.service.mjs";
import session from "express-session";
/* Create express instance */

const app = express();
const port = 3000;

app.set("view engine", "pug");

// Serve assets from 'static' folder
app.use(express.static("static"));


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

// login route
app.get("/login", (req, res) => {
  res.render("login");
});

// signup route
app.get("/signup", (req, res) => {
  res.render("signup");
});
// contact us route

app.get("/contactus", (req, res) => {
  res.render("contactus");
});


// Returns an array of cities from the database
app.get("/cities", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `city`");
  return res.render("cities",{rows,fields});
  
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



// Returns an array of cities from the database
app.get("/cities", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `city`");
  return res.send(rows);
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


// staffdash route
app.get("/staffdash", (req, res) => {
  res.render("staffdash");
});

// dash route
app.get("/studentdash", (req, res) => {
  res.render("studentdash");
});
//teacherviewreport route
app.get("/teacherviewreport", (req, res) => {
  res.render("teacherviewreport");
});
// viewquiz route
app.get("/viewquiz", (req, res) => {
  res.render("viewquiz");
});

//assignquiz route
app.get("/assignquiz", (req, res) => {
  res.render("assignquiz");
});
// gradequiz route
app.get("/gradequiz", (req, res) => {
  res.render("gradequiz");
});
// dynamic function
app.get("/welcome/:user", function(req, res) {
  console.log(req.params);
  res.send("Welcome " + req.params.user);
});
//contactstudents route
app.get("/contactstudents", (req, res) => {
  res.render("contactstudents");
});

// this will return an array of countries from the database
app.get("/countries", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `country`");
  return res.render("countries", { countries: rows });
});

// this will return a specific country from the database
app.get("/countries/:code", async (req, res) => {
  const countryCode = req.params.code;
  const [rows, fields] = await db.execute("SELECT * FROM `country` WHERE `Code` = ?", [countryCode]);
  if (rows.length === 0) {
    return res.status(404).send("Country not found");
  }
  return res.render("country", { country: rows[0] });
});

// this adds a new country to the database
app.post("/countries", async (req, res) => {
  const { code, name, continent, region, surfaceArea, indepYear, population, lifeExpectancy, gnp, gnpOld, localName, governmentForm, headOfState, capital, code2 } = req.body;
  const query = "INSERT INTO `country` (`Code`, `Name`, `Continent`, `Region`, `SurfaceArea`, `IndepYear`, `Population`, `LifeExpectancy`, `GNP`, `GNPOld`, `LocalName`, `GovernmentForm`, `HeadOfState`, `Capital`, `Code2`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  await db.execute(query, [code, name, continent, region, surfaceArea, indepYear, population, lifeExpectancy, gnp, gnpOld, localName, governmentForm, headOfState, capital, code2]);
  console.log(`Added country with code: ${code}`);
  return res.redirect("/countries");
});

//////////////////////////////////////////////////////////////////////////////////////////
// Returns an array of countries from the database
app.get("/countrylanguage", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `countrylanguage`");
  return res.render("countrylanguage", { countrylanguage: rows });
});

// Returns a specific country from the database
app.get("/countrylanguage/:code", async (req, res) => {
  const countryCode = req.params.code;
  const [rows, fields] = await db.execute("SELECT * FROM `countrylanguage` WHERE `Code` = ?", [countryCode]);
  if (rows.length === 0) {
    return res.status(404).send("Country not found");
  }
  return res.render("countrylanguage", { countrylanguage: rows[0] });
});

// Adds a new country to the database
app.post("/countrylanguage", async (req, res) => {
  const { countrycode, language, isoffical, Percentage } = req.body;
  const query = "INSERT INTO `countrylanguage` ('countrycode', 'language', 'isoffical', 'Percentage') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  try {
    await db.execute(query, [countrycode, language, isoffical, Percentage]);
    console.log(`Added country with code: ${code}`);
    return res.redirect("/countrylanguage");
  } catch (err) {
    console.error(err);
    return res.status(500).send("This entry was not able to be added");
  }
});

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});