// Returns an array of cities from the database
app.get("/countries", (req, res) => {
    db.execute("SELECT * FROM `country`", (err, rows, fields) => {
      console.log(`/cities: ${rows.length} rows`);
      return res.send(rows);
    });
  });
