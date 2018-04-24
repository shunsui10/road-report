const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser =require('body-parser');
const mysql = require('mysql');
const connection = require('./db');
const swig = require('swig');
const bcrypt = require('bcrypt');
var session = require('express-session');
const routes = require('./routes/router');
const helmet = require('helmet');
const app = express();   

const routesUpload = require('./routes/api/routesUpload');

app.use('/roadreport/api/upload', routesUpload);

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

/* app.use(helmet());
app.use('/studytracer/imgFiles', express.static(__dirname + '/assets/img')); */

app.use('/', routes);

app.get('/roadreport/', function(req, res){
        res.render('dashboard');  
});

//logout
    app.get('/roadreport/logout', function (req, res) {
    if(session){
        req.session.destroy();
        delete session.uniqueID;
        res.redirect('/studytracer/');
    }else{
        res.redirect('/studytracer/');
    }
});

/* app.get('*', (req, res) => {
    res.render('404', {});
});

app.post('*', (req, res) => {
    res.render('404', {});
}); */

//set port
app.set('port', (process.env.PORT || 3333));

app.listen(app.get('port'), function(){
    console.log('server started on port'+app.get('port'));
})