var express = require('express');
var path = require('path');
var fs = require('fs');
var React = require('react');

require('node-jsx').install();
var App = require('./app/App');

var app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
  fs.readFile(path.join(__dirname, 'main.html'), function(err, file) {
    if (err) {
      throw err;
    }
    
    var model = {
      fonts: [
        'Anfisa Grotesk',
        'BoomBoom',
        'Bradobrei',
        'Champignon',
        'Classica One'
      ],
      query: req.query.q || '',
      str: req.query.s || ''
    };
    
    res.send(
      file.toString()
        .split('{content}').join(React.renderToString(React.createElement(App, {data: model})))
        .split('{initialData}').join(JSON.stringify(model))
    );
  });
});

app.listen(3000, function() {
  console.log('http://localhost:3000');
});
