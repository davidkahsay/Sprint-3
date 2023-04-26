// Returns an array of languages spoken in countries from the database
app.get("/languages", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `countrylanguage`");
  return res.render("languages", { languages: rows });
});

// Returns the languages spoken in a specific country from the database
app.get("/languages/:code", async (req, res) => {
  const countryCode = req.params.code;
  const [rows, fields] = await db.execute("SELECT * FROM `countrylanguage` WHERE `CountryCode` = ?", [countryCode]);
  if (rows.length === 0) {
    return res.status(404).send("Country language not found");
  }
  return res.render("countryLanguage", { countryLanguage: rows });
});

// Adds a new country language to the database
app.post("/languages", async (req, res) => {
  const { countryCode, language, isOfficial, percentage } = req.body;
  const query = "INSERT INTO `countrylanguage` (`CountryCode`, `Language`, `IsOfficial`, `Percentage`) VALUES (?, ?, ?, ?)";
  try {
    await db.execute(query, [countryCode, language, isOfficial, percentage]);
    console.log(`Added language spoken in country with code: ${countryCode}`);
    return res.redirect("/languages");
  } catch (err) {
    console.error(err);
    return res.status(500).send("This entry was not able to be added");
  }
});
