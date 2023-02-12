const path = require("path");
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

const server = app.listen(8080, () => {
    console.log("Listening at http://localhost:8080")
})