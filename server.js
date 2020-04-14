const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors()); // Cross-Origin 

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(require('./Routes/fbAds')); // Routes imported

var PORT = process.env.PORT || 8082;

app.listen(PORT, () => console.log('App is running on port ---> ', PORT));