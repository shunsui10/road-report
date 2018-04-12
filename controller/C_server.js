const express = require('express');
var session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connection = require('../db.js');
var fs = require('fs');
const app = express();

 

app.use(session({
    secret: 'fffdfee',
    resave: false,
    saveUninitialized: false,
}));

module.exports = {

    //get login page
    getLoginPage: function(req, res){
        session = req.session;
        if (session.uniqueID) {
            if (session.uniqueID.access == 0)
               res.redirect('/roadreport/redirect');
            else {
                res.render('/roadreport/redirect');
            }
        } else {
            res.render('staff/login', {});
        }
    },

     //POST Login Page
     postLoginPage: function (req, res) {
        session = req.session;
        //Looking for data in mahasiswa database
        connection.query('select * from databaseStaff', {
            username: req.body.username,
        }, function (err, rows, fields) {
            if (rows[0]) {
                if ((rows[0].tipeakun == "staff") && bcrypt.compareSync(req.body.password, rows[0].password)) {
                    //Set session in object
                    var sessionObject = {
                        id: rows[0].id,
                        username: rows[0].username,
                        nama: rows[0].nama,
                        access: 0,//beri akses type untuk staff
                        
                    };
                    session.uniqueID = sessionObject;
                    res.redirect('/roadreport/homestaff');
                } else {
                    console.log(req.body.username);
                    res.redirect('/roadreport/login-staff');
                }
            } else {
                //alert('Anda belum terdaftar, silahkan registrasi terlebih dahulu');
                res.redirect('/roadreport/login-staff');
            }
        });  
    },

    //getDashboard
    getDashboard: function(req, res){
        session = req.session;
        if (session.uniqueID) {
            if (session.uniqueID.access == 0)
            connection.query('select * from pengguna', 
                function(err, rows, fields){
                    res.render('dashboard');
                });
            else {
                res.redirect('/roadreport/redirect');
            }
        } else {
            res.render('staff/login', {});
        }
    },

    uploadFile: function(req, res){
        console.log(req.body);
        res.send("test");
    }
}