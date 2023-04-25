// Get all countries
app.get('/countries', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM country');
    return res.send(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error retrieving countries from database');
  }
});

// Get a specific country by code
app.get('/countries/:code', async (req, res) => {
  const countryCode = req.params.code;
  try {
    const [rows] = await connection.execute('SELECT * FROM country WHERE Code = ?', [countryCode]);
    if (rows.length === 0) {
      return res.status(404).send('Country not found');
    }
    return res.send(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error retrieving country from database');
  }
});

// Add a new country
app.post('/countries', async (req, res) => {
  const { Code, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital, Code2 } = req.body;
  try {
    const [result] = await connection.execute('INSERT INTO country (Code, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital, Code2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [Code, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital, Code2]);
    console.log(`Added country ${Code}`);
    return res.send(`Country ${Code} has been added`);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error adding country to database');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
