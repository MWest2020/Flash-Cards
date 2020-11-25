// modules required
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const events = require("events");

//npm needed.  .use needed to actually use them. 
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

// settings for pug
app.set('view engine', 'pug');

app.listen(3000, () => {console.log('The application is running')});