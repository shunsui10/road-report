const express = require('express');
var session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
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

    //login client
    LoginClient: function(req, res){
        console.log(req.body.email)
        connection.query('select * from pengguna where?', {
            email: req.body.email
        }, function(err, rows, fields){
            if (rows[0]) {
                if(rows[0].password == req.body.password){
                    res.json(
                        {
                            'status': "ok",
                            'email': rows[0].email,
                            'password': rows[0].password,
                            'notelpon': rows[0].notelpon,
                            'nama': rows[0].nama,
                            'id': rows[0].id,
                            'tempattinggal': rows[0].tempattinggal,
                            'noidentitas': rows[0].noidentitas
                        });                   
                } else {
                    res.json({'status': "incorrect password"});
                }
            }else {
                res.json({'status': "failed"});
            }
            
        });
    },

    //register
    RegisterClient: function(req, res){
        console.log(req.body.nama+ " "+req.body.email+" "+req.body.password);
        connection.query('select * from pengguna where?',{
            email: req.body.email
        },function(err, rows, field){
            if(rows[0]){
                res.json({'status': "account already exist"});
            }else {
                connection.query('insert into pengguna set?',{
                    email: req.body.email,
                    password: req.body.password,
                    // notelpon: req.notelpon,
                    nama: req.body.nama,
                    // id: req.id,
                    // tempattinggal: req.tempattinggal,
                    // noidentitas: req.noidentitas
                },(err, fields)=>{
                    if(err){
                        res.json({'status': 'failed'})  
                    }else{
                        res.json({'status': 'ok'})
                    }
                });
            }
        })
    },

    getAllItemLaporan: function(req, res){

    },

    getMyLaporan: function(req, res){

    },


    //ClientUpload api
    uploadFile: function(req, res){
        console.log( Date.UTC());
        upload(req, res, (err)=> {
            if(err){
                res.json({'server': 'failed'})
            }else {
                console.log(req.file);
                var timestamp = now.getDate() + '/' + now.getMonth() 
                + '/' + now.getFullYear() + '/' + now.getHours() 
                + ':' + now.getMinutes() + ':' + now.getMilliseconds();
                //console.log(req.file.filename);
                connection.query('insert into laporan set ?', {
                    gambarlaporan: req.file.filename,
                    timestamp: timestamp,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    namaalamat: req.body.addressName,
                    panjangkerusakan: req.body.length,
                    lebarkerusakan: req.body.width,
                    keterangan: req.body.description
                });

                res.json({'server': 'running perfectly'});
            }
        });
    }
}