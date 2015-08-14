var derby = require('derby');

var app = module.exports = derby.createApp('fonts', __filename);


app.use(require('d-bootstrap'));
app.use(require('derby-debug'));

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

//App component
function App() {}
App.prototype.init = function(model) {
  model.start('filtered', 'data.fonts', 'data.query', function(fonts, query) {
    return fonts.filter(function(font) {
      return font.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  });
};

app.component('App', App);

//Routing
app.get('/', function(page, model) {
  //Initial data
  model.set('_page.data', {
    fonts: [
      'Anfisa Grotesk',
      'BoomBoom',
      'Bradobrei',
      'Champignon',
      'Classica One'
    ],
    query: page.req.query.q || '',
    str: page.req.query.s || ''
  });
  page.render('index');
});

