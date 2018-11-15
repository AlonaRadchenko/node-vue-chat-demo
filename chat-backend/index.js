var express = require('express');
var app = express();
var models  = require('./models');


app.use(express.json());
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  

  // Pass to next layer of middleware
  next();
});

/*app.get('/message/send', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ 
    data: {
      username: 'Eric',
      text: 'Hi'
   }
   
   }));
});*/
app.post('/message/send', function (req, res) {
  models.Messages.create(req.body).then(function() {
    
    res.setHeader('Content-Type', 'application/json');
    
   res.send(JSON.stringify({

      }));
  });
});



app.get('/message/send', function(req,res) {
models.Messages.findAll().then(function(){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    }));
});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});