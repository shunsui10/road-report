const express = require('express');
//const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = require('./db');
const swig = require('swig');
const bcrypt = require('bcrypt');
var session = require('express-session');
const routes = require('./routes/router');
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');
//set storage
const storage = multer.diskStorage({
    destination: './public/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));  
    }
})

//init upload
const upload =  multer({
    storage: storage
}).single('upload');
const app = express();   

//Swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('/views', express.static(__dirname + '/views/'));

//Session
app.use(session({
    secret: 'fffdfee',
    resave: false,
    saveUninitialized: false,
}));

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(cookieParser());

//app.use('/', routes);

app.get('/roadreport/', function(req, res){
    res.render('home');  
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('home', {
                msg:err
            });
        }else {
            console.log(req.file);
            res.send("test")
        }
    })
})

//set port
app.set('port', (process.env.PORT || 3333));

app.listen(app.get('port'), function(){
    console.log('server started on port'+app.get('port'));
})