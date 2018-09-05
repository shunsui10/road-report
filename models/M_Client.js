const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('../db.js');
const app = express();

module.exports = {
    //get all laporan
    getAllLaporan: function(){
        Sendrows;
        connection.query('select * from laporan',
        function(err, rows, fields){
            if(rows[0]){
                for (var obj in rows){
                    Sendrows = {'id': rows[obj].id};
                }
                console.log(Sendrows+"hello");
            }else {
                //Sendrows.push("hello");
            }
        });
        return Sendrows;
    }
}
