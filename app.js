// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

app.get("/country-report", function(req, res) {
    var sql ='select * from country';
    var output ='<table border="1px">';
    db.query(sql).then(results => {
        for(var row of results) {
            output += '<tr>';
            output += '<td>' + row.Code + '</td>';
            output += '<td>' + row.Name + '</td>';
            output += '<td>' + row.Continent + '</td>';
            output += '<td>' + row.Region + '</td>';
            output += '<td>' + row.Population + '</td>';
            output += '<td>' + row.Capital + '</td>';
            output += '</tr>';
        }
        output+= '</table>';
        res.send(output);
    });
});//


// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});