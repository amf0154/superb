const express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var morgan = require('morgan');
var fs  = require('fs');
var path = require('path');
// setup the logger 
var app = express(); 
const knex = require('./knex/knex.js');
app.use(morgan('combined'));
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }));
morgan(function(tokens, req, res){ return 'some format string' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var routesApi = require('./code/routes/router');
//require('./api/models/db_connection');
app.set('port', process.env.PORT || 3000);
app.use('/api', routesApi);
app.use('/', (req, res) => res.send('Express is working!'));
app.listen(app.get('port'), ()=> console.log(`Server listening on ${app.get('port')}`));

