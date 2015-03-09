var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use(function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

var User = mongoose.model('User', {
    name: String,
    password: String
});

app.post('/register', function(req, res)
{
    var tempUser = req.body;
    var newUser =  new User(
        {
            email: tempUser.email,
            password: tempUser.password
        });

   console.log(tempUser.email);
   console.log(tempUser.password);

    newUser.save(function(err)
    {
        res.status(200).json(newUser);
    })
});

mongoose.connect('mongodb://127.0.0.1:/NodeAuthentication');
var db = mongoose.connection;
db.on('error',console.error.bind(console, db))
db.once('open', function callback()
{
    console.log('NodeAuthentication db opened');
});

var server = app.listen(3000, function() {
    console.log('api listening on', server.address().port);
});