var express = require('express');
var app = express();
var models  = require('./models');



var Sequelize = require('sequelize');

app.use(express.json());
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  

  // Pass to next layer of middleware
  next();
});


app.post('/message/send', function (req, res) {
  
  models.Messages.create(req.body).then(function() {
    
   res.setHeader('Content-Type', 'application/json');
    
   res.send(JSON.stringify({

      }));
  });
});

app.post('/user/get_online_users', function (req, res) { 
  console.log("++++++++++");
   res.setHeader('Content-Type', 'application/json');
   console.log("++++++",req.body.username);
   let username = req.body.username;
   let currentdate = new Date();
   let cd = currentdate;
   cd.setSeconds(cd.getSeconds()-5);
   let cdF=cd.toISOString()
   
   let currentTimestamp = currentdate.toISOString();
  
   models.Users_online_times.findOrCreate({where:{username:username}, 
   defaults:{online_timestamp:currentTimestamp}
  })
  .then(() =>{
    models.Users_online_times.findAll({  
      where:{
        online_timestamp:{
          [Sequelize.Op.gte] : cdF
        }
      }}
    
    )
    .then(users_online_times =>{
      models.Users_online_times.update({
        online_timestamp:currentTimestamp
      },
      {  
        where:{username:username}}
      );
      res.send({
        users_online_times: users_online_times
      })
  
    })
  })
   
  
});




app.get('/message/list', function(req,res) {
 let crAfter = req.query.createdAfter;
 console.log("crAfter"+crAfter);
  res.setHeader('Content-Type', 'application/json');
  let currentdate = new Date();
  let currentTimestamp = currentdate.toISOString();

 
 if(crAfter){
 
  models.Messages.findAll({
 
    where:{
      
      createdAt:
      {
        [Sequelize.Op.gte] : crAfter
      }
    }
  })
  .then(messages =>{
    res.send({
      message: messages, 
      lastPollTime: currentTimestamp
    })

  })

  



 } else {
  res.setHeader('Content-Type', 'application/json');
  models.Messages.count()
  .then(count => {
    var i = count-20;
    models.Messages.findAll({offset:i })
    .then(messages =>{
      res.send({
        message: messages, 
        lastPollTime: currentTimestamp
      })
      
    })
  })
 }


});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});