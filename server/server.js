var path = require("path");
var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
var server = app.listen(8080, function () {
    console.log("Listening at http://localhost:8080");
});
