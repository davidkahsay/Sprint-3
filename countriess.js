// Returns an array of countries from the database
app.get("/countries", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `country`");
  return res.render("countries", { rows, fields });
});

app.get('/countries/:id', async (req, res) => {
  const countryId = req.params.id;
  const country = await db.getCountry(countryId);
  return res.render('country', { country });
})

// Returns JSON array of countries
app.get("/api/countries", async (req, res) => {
  const [rows, fields] = await db.getCountries();
  return res.send(rows);
});

// Adds a new country to the database
app.post("/countries/add", (req, res) => {
  const { name, language } = req.body;
  const query = "INSERT INTO `country` (`Name`, `Language`) VALUES (?, ?)";
  db.execute(query, [name, language], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("This entry was not able to be added");
    }
    console.log(`Added country`);
    return res.send("Your entry has been added");
  });
});
