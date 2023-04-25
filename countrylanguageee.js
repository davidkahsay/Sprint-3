app.get('/countrylanguage', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM `countrylanguage`');
    res.render('countrylanguage', { rows });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the data');
  }
});

// GET a specific country language by country code and language
app.get('/countrylanguage/:countryCode/:language', async (req, res) => {
  try {
    const countryCode = req.params.countryCode;
    const language = req.params.language;
    const [rows, fields] = await db.execute('SELECT * FROM `countrylanguage` WHERE `CountryCode` = ? AND `Language` = ?', [countryCode, language]);
    if (rows.length === 0) {
      return res.status(404).send('No country language found with the specified code and language');
    }
    const countryLanguage = rows[0];
    res.render('countrylanguage_details', { countryLanguage });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the data');
  }
});
