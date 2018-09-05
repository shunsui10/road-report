const express = require('express');
var session = require('express-session');
const postgres = require('pg');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connection = require('../db.js');
//var models = require('../models/M_Client');
var multer  = require('multer');
const path = require('path');
var now = new Date();
const app = express();

//set folder to save uploaded file
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage}).single('upload');

app.use(session({
    secret: 'fffdfee',
    resave: false,
    saveUninitialized: false,
}));

module.exports = {

    //get login admin page
    getLoginPage: function(req, res){
        res.redirect('/roadreport/redirect');
    },

     //POST Login admin Page
     postLoginPage: function (req, res) {
        session = req.session;
        console.log(req.body.username);
        //Looking for data in mahasiswa database
        connection.query('select * from admin where?', {
            username: req.body.username
        }, function(err, rows, fields){
            console.log(rows);
            if(rows[0]){
                if (req.body.password == rows[0].password) {
                    //Set session in object
                    var sessionObject = {
                        username: req.body.username,
                        access: 0,//beri akses type untuk staff
                        
                    };
                    session.uniqueID = sessionObject;
                    res.redirect('/roadreport/web/dashboard');
                } else {
                    console.log(req.body.username);
                    res.redirect('/roadreport/redirect');
                }
            }else{
                res.redirect('/roadreport/redirect');
            }
        })
    },

    //getDashboard
    getDashboard: function(req, res){
        session = req.session;
        var count = [], count2 = [], location = [];
        var tmpLtd, tmpLng;
        if (session.uniqueID) {
            if (session.uniqueID.access == 0)
            connection.query('select * from laporan', 
                function(err, rows, fields){
                    if(rows[0]){
                        rows.sort(function(a,b){
                            return(b.latitude-a.latitude);
                        });
                        
                        for(var i = 0; i<rows.length; i++){
                            if(rows[i].latitude != tmpLtd && rows[i] != tmpLng){
                                count.push({'lat':rows[i].latitude, 'lng':rows[i].longitude});
                                count2.push(1);
                            }else {
                               count2[count2.length-1]++;
                            }
                            //console.log(count[i]);
                            //console.log(tmp)
                            tmpLtd = rows[i].latitude;
                            tmpLng = rows[i].longitude;
                        }
                        
                        for(var obj in count){
                            location.push({'lat': JSON.stringify(count[obj].lat),'lng': JSON.stringify(count[obj].lng), 'count': count2[obj]})
                            
                        }
                        
                        
                        res.render('dashboard', {Location: location});
                    }
                });
            else {
                res.redirect('/roadreport/redirect');
            }
        } else {
            res.render('login', {});
        }
    },

    //make priority
    getPriority: function(req, res, rows){
        
    },
    
    //get client address per report
    getClientReportAddr: function(req, res){
        var dataPengguna = [], idpengguna = [];
        session = req.session;
        if(session.uniqueID){
            if(session.uniqueID.access == 0){
                connection.query('select laporan.idpengguna, laporan.latitude, laporan.longitude, pengguna.nama, pengguna.notelpon, pengguna.email, pengguna.tempattinggal, pengguna.noidentitas from laporan inner join pengguna on laporan.idpengguna = pengguna.id where ?',{
                    latitude: req.params.lat,
                }, function(err, rows, fields){
                        if(rows[0]){
                            if(rows[0].longitude == req.params.lng){
                                for(var i=0; i < rows.length; i++){
                                    console.log(rows[i]);
                                    idpengguna.push({'id': rows[i].idpengguna});
                                    console.log("idPtes"+idpengguna[i].id)
                                }
                                res.render('map-report-client', {info: JSON.stringify(rows), info_view: rows});
                            }
                        }
                });
            }else {
                res.redirect('/roadreport/redirect');
            }
        }else {
            res.redirect('/roadreport/redirect');
        }
    },

    //getmap all report
    mapAllReport: function(req, res){
        session = req.session;
        //var getRows = models.getAllLaporan()
        if(session.uniqueID){
            if(session.uniqueID.access == 0){
                connection.query('select * from laporan',
                    function(err, rows, fields){
                        res.render('all-report-map', {laporan: JSON.stringify(rows)});
                });
                // console.log(getRows+"helloo server");
                // res.send(getRows+"hello server array");
            }else {
                res.redirect('/roadreport/redirect');
            }
        }else {
            res.redirect('/roadreport/redirect');
        }
    },

}