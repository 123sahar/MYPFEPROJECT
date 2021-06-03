const mysql=require('mysql');
const express = require('express')
const bodyParser=require('body-parser')
//const con=require('./connect');
const app = express();
var cors = require('cors');
const router = express.Router()
path = require('path');

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname ,'public')));


// Set Static Path
app.use('/', express.static(__dirname));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"projet_pfe"
});


app.use(function (req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:1718' , 'http://localhost:1718'];
  var origin = req.headers.origin;
  /* if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }*/
    res.setHeader('Access-Control-Allow-Origin', '*');


    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
 });


 connection.connect();

 app.use(require("./commercial"));
 app.use(require("./revendeur"));
 app.use(require("./societe"));


const port = process.env.PORT ||1718;
app.listen(port , () => {

  console.log('server is runnnig ' ) });