const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require("fs")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const request = require('request');
const Paper = require('./models/paper');

dotenv.config();

let app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

let server = app.listen(process.env.PORT, () => {
 console.log("Express server has started on port %d", process.env.PORT);
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


let main_router = require('./router/main')(app, fs, Paper);
let admin_router = require('./router/admin')(app, fs, Paper, request);
let error_router = require('./router/error')(app);

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});

mongoose.connect(process.env.MONGO_URL);


