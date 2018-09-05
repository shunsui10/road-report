const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser =require('body-parser');
const postgres = require('pg');
const connection = require('./db.js');
const swig = require('swig');
const bcrypt = require('bcryptjs');
var session = require('express-session');
const routes = require('./routes/router');
const helmet = require('helmet');
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', routes);

/* app.use(helmet());
app.use('/studytracer/imgFiles', express.static(__dirname + '/assets/img')); */

app.get('/roadreport/', function(req, res){
        res.render('login');  
});

app.get('/roadreport/redirect', function (req, res) {
    session = req.session;
    if (session.uniqueID) {
        if (session.uniqueID.access == 0) {//Access for alumni
            res.redirect('/roadreport/web/dashboard');
        }
    } else {
        res.redirect('/roadreport/');
    }
});

//logout
app.get('/roadreport/logout', function (req, res) {
    if(session){
        req.session.destroy();
        delete session.uniqueID;
        res.redirect('/roadreport/');
    }else{
        res.redirect('/roadreport/');
    }
});

// connection.query('select * from admin', (err, res)=>{
//     console.log(err, res);
//     connection.end();
// })

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