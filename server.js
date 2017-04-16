/* Simple Server for Robot App*/
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/scripts'));

app.set('port', (process.env.PORT || 8000))

app.listen(app.get('port'), () => {
  console.log("Listening on port ", app.get('port'))
})

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

app.get('/styles/index.css', function(req, res){
  res.sendFile(__dirname + '/styles/index.css');
});

app.get('/styles/animate.css', function(req, res){
  res.sendFile(__dirname + '/styles/animate.css');
});

app.get('/scripts/board.js', function(req, res){
  res.sendFile(__dirname + '/scripts/board.js');
});