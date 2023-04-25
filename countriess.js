// Returns an array of countries from the database
app.get("/countries", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `country`");
  return res.render("countries", { countries: rows });
});

// Returns a specific country from the database
app.get("/countries/:code", async (req, res) => {
  const countryCode = req.params.code;
  const [rows, fields] = await db.execute("SELECT * FROM `country` WHERE `Code` = ?", [countryCode]);
  if (rows.length === 0) {
    return res.status(404).send("Country not found");
  }
  return res.render("country", { country: rows[0] });
});

// Adds a new country to the database
app.post("/countries", async (req, res) => {
  const { code, name, continent, region, surfaceArea, indepYear, population, lifeExpectancy, gnp, gnpOld, localName, governmentForm, headOfState, capital, code2 } = req.body;
  const query = "INSERT INTO `country` (`Code`, `Name`, `Continent`, `Region`, `SurfaceArea`, `IndepYear`, `Population`, `LifeExpectancy`, `GNP`, `GNPOld`, `LocalName`, `GovernmentForm`, `HeadOfState`, `Capital`, `Code2`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  try {
    await db.execute(query, [code, name, continent, region, surfaceArea, indepYear, population, lifeExpectancy, gnp, gnpOld, localName, governmentForm, headOfState, capital, code2]);
    console.log(`Added country with code: ${code}`);
    return res.redirect("/countries");
  } catch (err) {
    console.error(err);
    return res.status(500).send("This entry was not able to be added");
  }
});
