var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")
var mongoose = require('mongoose');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(3001, function(){
 console.log("Express server has started on port 3001")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


var router = require('./router/main')(app, fs);

// var db = mongoose.connection;
// db.on('error', console.error);
// db.once('open', function(){
//     console.log("Connected to mongod server");
// });

// mongoose.connect('mongodb+srv://soon3626:pil0104129@cluster0-a96tt.gcp.mongodb.net/sumock?retryWrites=true&w=majority');