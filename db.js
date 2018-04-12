var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tracerstudy',
});

connection.connect(function(err){    
    if(err){
        console.log(err.stack);
        return;
    }
    console.log('mySql connected as id: ' + connection.threadId);
});

module.exports = connection;