/* Simple Server for Robot App*/
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use("/styles",  express.static(path.join(__dirname + '/styles')));
app.use("/scripts", express.static(__dirname + '/scripts'));

app.set('port', (process.env.PORT || 8000))

app.listen(app.get('port'), () => {
  console.log("Listening on port ", app.get('port'))
})

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})
